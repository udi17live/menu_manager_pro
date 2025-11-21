from unittest import result
from sqlalchemy import exists, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Country


class CountryService:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_country_data(self, country_id: int) -> Country | None:
        result = await self.session.execute(
            select(Country).where(Country.id == country_id)
        )

        return result.scalar_one_or_none()

    async def is_country_exist(self, country_id: int) -> bool:
        result = await self.session.execute(
            select(exists().where(Country.id == country_id))
        )
        return result.scalar()

    async def get_country_data_for_meta(self) -> list[dict[str, str]]:
        result = await self.session.execute(
            select(
                Country.id,
                Country.name,
                Country.code,
                Country.phone_code,
                Country.currency_code,
                Country.currency_name,
                Country.currency_symbol,
            )
        )

        countries = result.mappings().all()

        country_mappings = []
        for country in countries:
            country_mappings.append(
                {
                    "id": str(country["id"]),
                    "name": country["name"],
                    "code": country["code"],
                    "phone_code": country["phone_code"],
                    "currency_code": country["currency_code"],
                    "currency_symbol": country["currency_symbol"],
                    "currency_name": country["currency_name"],
                }
            )

        return country_mappings
