import uuid
from typing import AsyncGenerator, Optional
from fastapi import Depends, HTTPException, Request
from fastapi_users import BaseUserManager, FastAPIUsers, UUIDIDMixin
from sqlalchemy import select

from app.models.user import User
from app.db.users import get_user_db
from app.core.config import settings
from app.core.auth import auth_backend
from app.models import Country, Setting
from app.classes.enums.theme_mode import ThemeMode


class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):
    reset_password_token_secret = settings.secret_key
    verification_token_secret = settings.secret_key

    async def on_after_register(
        self,
        user: User,
        request: Optional[Request] = None,
    ) -> None:
        print(f"User {user.email} has been registered")

        # Getting the DB session
        session = self.user_db.session

        try:
            # Get Default Country
            default_country_code = settings.default_country_code

            print(default_country_code)
            result = await session.execute(
                select(Country).where(Country.code == default_country_code)
            )
            default_country = result.scalar_one_or_none()
            print(default_country)
            if not default_country:
                raise ValueError(
                    f"Default Country with code '{default_country_code}' not found in database"
                )

            # Creating a settings object when a user registers
            new_setting = Setting(
                user_id=user.id,
                country_id=default_country.id,
                theme_mode=ThemeMode.LIGHT,
            )

            session.add(new_setting)
            await session.commit()
            await session.refresh(new_setting)

            print(
                f"New setting created for user {user.email} under settings id: {new_setting.id}"
            )
        except Exception as e:
            print("Failed to create user, rolling back: ", e)

            # Removing User
            await session.rollback()

            try:
                await session.delete(user)
                await session.commit()
                print(
                    f"User with email {user.email} deleted successfully due to error: ",
                    e,
                )
            except Exception as delete_error:
                print("Failed to delete user, exeption: ", delete_error)
                await session.rollback()

            raise HTTPException(
                status_code=500,
                detail="Failed to complete user registration",
            )

    async def on_after_forgot_password(
        self,
        user: User,
        token: str,
        request: Optional[Request] = None,
    ) -> None:
        print(f"User {user.email} forgot password. Token: {token}")

    async def on_after_request_verify(
        self, user: User, token: str, request: Optional[Request] = None
    ) -> None:
        print(f"📧 Verification for {user.email}. Token: {token}")

    # async def validate_password(
    #     self,
    #     password: str,
    #     user: User | dict,
    # ) -> None:
    #     if len(password):
    #         raise ValueError("Password must be atleast 8 Characters long")


async def get_user_manager(
    user_db=Depends(get_user_db),
) -> AsyncGenerator[UserManager, None]:
    yield UserManager(user_db)


fastapi_users = FastAPIUsers[User, uuid.UUID](get_user_manager, [auth_backend])


current_active_user = fastapi_users.current_user(active=True)
current_super_user = fastapi_users.current_user(active=True, superuser=True)
current_verified_user = fastapi_users.current_user(active=True, verified=True)
