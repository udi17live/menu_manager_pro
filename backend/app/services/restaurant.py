import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.restaurant import Restaurant
from app.schemas.restaurant import RestaurantUpsert
from app.models import restaurant
from app.services.country import CountryService


class RestaurantService:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_restaurants_for_user(self, user_id: uuid.UUID) -> list[Restaurant]:
        result = await self.session.execute(
            select(Restaurant).where(Restaurant.user_id == user_id)
        )

        return list(result.scalars().all())

    async def create_restaurant(
        self, restaurant_object: RestaurantUpsert, user_id: uuid.UUID
    ) -> Restaurant | None:
        restaurant_data = restaurant_object.model_dump()
        restaurant_data["user_id"] = user_id

        country_id = restaurant_object.country_id
        country_service = CountryService(self.session)
        is_country_exist = await country_service.is_country_exist(country_id)
        if not is_country_exist:
            return None

        restaurant = Restaurant(**restaurant_data)
        self.session.add(restaurant)
        await self.session.commit()
        await self.session.refresh(restaurant)

        return restaurant

    async def update_restaurant(
        self,
        restaurant_id: int,
        restaurant_object: RestaurantUpsert,
        user_id: uuid.UUID,
    ) -> Restaurant | None:
        result = await self.session.execute(
            select(Restaurant).where(
                Restaurant.id == restaurant_id, Restaurant.user_id == user_id
            )
        )

        existing_restaurant = result.scalar_one_or_none()

        if not existing_restaurant:
            return None

        country_id = restaurant_object.country_id
        country_service = CountryService(self.session)
        is_country_exist = await country_service.is_country_exist(country_id)
        if not is_country_exist:
            return None

        update_data = restaurant_object.model_dump(exclude_unset=True)

        for field, value in update_data.items():
            if (
                hasattr(existing_restaurant, field)
                and field != "id"
                and field != "code"
            ):
                setattr(existing_restaurant, field, value)

        await self.session.commit()
        await self.session.refresh(existing_restaurant)

        return existing_restaurant

    async def delete_restaurant(self, restaurant_id: int, user_id: uuid.UUID) -> bool:
        result = await self.session.execute(
            select(Restaurant).where(
                Restaurant.id == restaurant_id, Restaurant.user_id == user_id
            )
        )

        existing_restaurant = result.scalar_one_or_none()

        if not existing_restaurant:
            return False

        await self.session.delete(existing_restaurant)
        await self.session.commit()

        return True
