from turtle import update
import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Setting
from app.schemas.setting import SettingUpdate
from app.services.country import CountryService


class SettingService:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_service_for_user(self, user_id: uuid.UUID) -> Setting | None:
        result = await self.session.execute(
            select(Setting).where(Setting.user_id == user_id)
        )

        return result.scalar_one_or_none()

    async def update_service_for_user(
        self,
        user_id: uuid.UUID,
        setting_object: SettingUpdate,
    ) -> Setting | None:
        user_setting = await self.get_service_for_user(user_id)

        if not user_setting:
            return None

        country_id = setting_object.country_id
        country_service = CountryService(self.session)
        is_country_exist = await country_service.is_country_exist(country_id)
        if not is_country_exist:
            return None

        update_data = setting_object.model_dump(exclude_unset=True)

        for field, value in update_data.items():
            if hasattr(user_setting, field):
                setattr(user_setting, field, value)

        await self.session.commit()
        await self.session.refresh(user_setting)

        return user_setting
