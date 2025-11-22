from fastapi_users.authentication import (
    AuthenticationBackend,
    BearerTransport,
    JWTStrategy,
)
from app.core.config import settings
from typing import Optional
from fastapi import Response
from fastapi_users import models
import jwt
from datetime import datetime, timedelta


# Custom JWT Strategy to support the use of Refresh Tokens
class JWTRefreshStrategy(JWTStrategy):
    def __init__(
        self,
        secret: str,
        lifetime_seconds: int | None,
        refresh_lifetime_seconds: int | None,
        token_audience: list[str] = ["fastapi_users:auth"],
        algorithm: str = "HS256",
        public_key: Optional[str] | None = None,
    ):
        super().__init__(
            secret, lifetime_seconds, token_audience, algorithm, public_key
        )
        self.refresh_lifetime_seconds = refresh_lifetime_seconds

    async def write_token(self, user: models.UP) -> str:
        # return await super().write_token(user)
        access_toke_data = {
            "sub": str(user.id),
            "aud": self.token_audience,
            "exp": datetime.utcnow() + timedelta(seconds=self.lifetime_seconds),
        }

        return jwt.encode(
            access_toke_data,
            self.encode_key,
            algorithm=self.algorithm,
        )

    async def create_token_pair(self, user: models.UP) -> dict:
        access_token = await self.write_token(user)

        refresh_token_data = {
            "sub": str(user.id),
            "aud": self.token_audience,
            "type": "refresh",
            "exp": datetime.utcnow() + timedelta(seconds=self.refresh_lifetime_seconds),
        }

        refresh_token = jwt.encode(
            refresh_token_data,
            self.encode_key,
            algorithm=self.algorithm,
        )

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
        }

    async def read_refresh_token(
        self,
        token: str,
    ) -> Optional[str]:
        try:
            data = jwt.decode(
                token,
                self.decode_key,
                audience=self.token_audience,
                algorithms=[self.algorithm],
            )

            if data.get("type") != "refresh":
                return None
            return data.get("sub")
        except jwt.PyJWTError:
            return None


def get_jwt_strategy() -> JWTRefreshStrategy:
    return JWTRefreshStrategy(
        secret=settings.secret_key,
        lifetime_seconds=settings.access_token_expiry_in_mins * 60,
        refresh_lifetime_seconds=settings.refresh_token_expiry_in_days * 24 * 60 * 60,
        token_audience=["fastapi-users:auth"],
        algorithm=settings.algorithm,
    )


bearer_transport = BearerTransport(tokenUrl="auth/jwt/login")

auth_backend = AuthenticationBackend(
    name="jwt",
    transport=bearer_transport,
    get_strategy=get_jwt_strategy,
)
