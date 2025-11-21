import uuid

from fastapi_users import schemas


class UserRead(schemas.BaseUser[uuid.UUID]):
    full_name: str | None = None
    phone: str | None = None
    avatar_url: str | None = None

    class Config:
        from_attributes = True


class UserCreate(schemas.BaseUserCreate):
    full_name: str | None = None
    phone: str | None = None
    avatar_url: str | None = None


class UserUpdate(schemas.BaseUserUpdate):
    full_name: str | None = None
    phone: str | None = None
    avatar_url: str | None = None
