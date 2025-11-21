from fastapi import APIRouter, Depends, HTTPException, status
from pydantic.types import SecretType
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.users import current_active_user
from app.db.session import get_db
from app.models import User
from app.schemas.setting import SettingUpdate, SettingRead
from app.services.setting import SettingService

router = APIRouter(prefix="/settings", tags=["settings"])


async def get_setting_service(
    session: AsyncSession = Depends(get_db),
) -> SettingService:
    return SettingService(session=session)


@router.get("/me", response_model=SettingRead)
async def get_own_settings(
    service: SettingService = Depends(get_setting_service),
    user: User = Depends(current_active_user),
):
    user_id = user.id

    settings = await service.get_service_for_user(user_id)

    if not settings:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error loading settings",
        )

    return settings


@router.put("/me", response_model=SettingRead)
async def update_own_settings(
    settings: SettingUpdate,
    service: SettingService = Depends(get_setting_service),
    user: User = Depends(current_active_user),
):
    updated_settings = await service.update_service_for_user(user.id, settings)

    if not updated_settings:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Settings not found for user with user_id: {user.id}",
        )

    return updated_settings
