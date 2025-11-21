from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.classes.enums.theme_mode import ThemeMode
from app.db.session import get_db
from app.schemas.meta import MetaInitial
from app.services.country import CountryService

router = APIRouter(prefix="/meta", tags=["meta"])


@router.get("/initial", response_model=MetaInitial)
async def get_meta_data(
    session: AsyncSession = Depends(get_db)
) -> MetaInitial | HTTPException:
    service = CountryService(session=session)

    theme_mode: list[ThemeMode] = [ThemeMode.LIGHT, ThemeMode.DARK, ThemeMode.SYSTEM]

    countries = await service.get_country_data_for_meta()

    if not countries:
        return HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error loading countries data",
        )

    return MetaInitial(theme_mode=theme_mode, countries=countries)
