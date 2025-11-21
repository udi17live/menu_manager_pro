from termios import BS0
import uuid
from datetime import datetime

from fastapi import status
from pydantic import BaseModel

from app.classes.enums.theme_mode import ThemeMode


class SettingBase(BaseModel):
    theme_mode: ThemeMode | None = None
    country_id: int | None = None


class SettingUpdate(SettingBase):
    pass


class SettingRead(SettingBase):
    id: int
    user_id: uuid.UUID
    created_at: datetime
    updated_at: datetime
