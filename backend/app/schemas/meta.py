from pydantic import BaseModel

from app.classes.enums.theme_mode import ThemeMode


class MetaInitial(BaseModel):
    theme_mode: list[ThemeMode]
    countries: list[dict[str, str]]
