import uuid
from datetime import datetime

from fastapi import status
from pydantic import BaseModel


class RestaurantBase(BaseModel):
    name: str
    description: str | None = None
    addressLine1: str
    addressLine2: str | None = None
    city: str | None = None
    country_id: int | None = None
    postCode: str | None = None
    phone: str | None = None


class RestaurantRead(RestaurantBase):
    id: int
    code: uuid.UUID
    created_at: datetime
    updated_at: datetime | None = None
    user_id: uuid.UUID


class RestaurantUpsert(RestaurantBase):
    pass


class RestaurantDelete(BaseModel):
    id: int
    deleted: bool
