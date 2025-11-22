from contextlib import asynccontextmanager

from fastapi import APIRouter, FastAPI

from app.api.meta_routes import router as meta_router
from app.api.restaurant_routes import router as restaurant_routes
from app.api.setting_routes import router as settings_router
from app.core.auth import auth_backend
from app.core.config import settings
from app.core.users import fastapi_users
from app.db.session import engine
from app.models.base import Base
from app.schemas.user import UserCreate, UserRead, UserUpdate


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()


app = FastAPI(
    title=settings.app_name,
    lifespan=lifespan,
    debug=settings.debug,
    version=settings.app_version,
    docs_url="/docs" if settings.debug else None,
    redoc_url="/redoc" if settings.debug else None,
)

api_router = APIRouter(prefix="/api")

api_router.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
    tags=["auth"],
)
api_router.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)
api_router.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)
api_router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/auth",
    tags=["auth"],
)


# routes
api_router.include_router(
    router=meta_router,
)

api_router.include_router(
    router=settings_router,
)

api_router.include_router(
    router=restaurant_routes,
)


# Adding api_router to app
app.include_router(api_router)
