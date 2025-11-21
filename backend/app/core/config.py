from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache
from dotenv import load_dotenv
import os

load_dotenv()


class Settings(BaseSettings):
    # Application
    app_name: str = os.getenv("APP_NAME")
    app_version: str = os.getenv("APP_VERSION")
    debug: bool = bool(os.getenv("APP_DEBUG"))

    # API Prefix
    api_prefix: str = os.getenv("API_PREFIX")

    # Db
    database_url: str = os.getenv("DB_URL")
    db_echo: bool = bool(os.getenv("DB_ECHO"))

    # JWT
    secret_key: str = os.getenv("JWT_SECRET")
    algorithm: str = os.getenv("JWT_ALGORITHM")
    access_token_expiry_in_mins: int = int(os.getenv("JWT_ACCESS_TOKEN_EXP") or 15)

    # cors
    backend_cors_origins: list[str] = os.getenv("CORS_ORIGINS").split(",")

    # defaults
    default_country_code: str = os.getenv("DEFAULT_COUNTRY_CODE") or "LK"

    model_config = SettingsConfigDict(
        env_file=".env", case_sensitive=False, extra="ignore"
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
