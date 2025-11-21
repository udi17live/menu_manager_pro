from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.users import current_active_user
from app.db.session import get_db
from app.models.user import User
from app.services.restaurant import RestaurantService
from app.schemas.restaurant import (
    RestaurantDelete,
    RestaurantRead,
    RestaurantUpsert,
)

router = APIRouter(prefix="/restaurants", tags=["restaurants"])


async def get_restaurant_service(
    session: AsyncSession = Depends(get_db),
) -> RestaurantService:
    return RestaurantService(session=session)


@router.get("/me", response_model=list[RestaurantRead])
async def get_own_restaurants(
    service: RestaurantService = Depends(get_restaurant_service),
    user: User = Depends(current_active_user),
):
    user_id = user.id
    restaurants = await service.get_restaurants_for_user(user_id)
    return restaurants


@router.post("/", response_model=RestaurantRead)
async def create_restaurant(
    restaurant: RestaurantUpsert,
    service: RestaurantService = Depends(get_restaurant_service),
    user: User = Depends(current_active_user),
):
    restaurant = await service.create_restaurant(restaurant, user.id)
    if not restaurant:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Invalid country or could not create the restaurant",
        )
    return restaurant


@router.put("/{restaurant_id}", response_model=RestaurantRead)
async def update_restaurant(
    restaurant_id: str,
    restaurant: RestaurantUpsert,
    service: RestaurantService = Depends(get_restaurant_service),
    user: User = Depends(current_active_user),
):
    restaurant = await service.update_restaurant(
        int(restaurant_id), restaurant, user.id
    )

    if not restaurant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The restaurant you are trying to update cannot be found or deos not exist for user",
        )
    return restaurant


@router.delete("/{restaurant_id}", response_model=RestaurantDelete)
async def delete_restaurant(
    restaurant_id: str,
    service: RestaurantService = Depends(get_restaurant_service),
    user: User = Depends(current_active_user),
):
    result = await service.delete_restaurant(int(restaurant_id), user.id)

    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The restaurant you are trying to delete cannot be found or deos not exist for user",
        )
    return RestaurantDelete(id=restaurant_id, deleted=result)


# todo
@router.delete("/{code}", response_model=RestaurantDelete)
async def get_restaurant_public(
    restaurant_id: str,
    service: RestaurantService = Depends(get_restaurant_service),
    user: User = Depends(current_active_user),
):
    result = await service.delete_restaurant(int(restaurant_id), user.id)

    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The restaurant you are trying to delete cannot be found or deos not exist for user",
        )
    return RestaurantDelete(id=restaurant_id, deleted=result)
