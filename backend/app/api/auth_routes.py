from fastapi import APIRouter, Depends, HTTPException, status
from app.core.auth import get_jwt_strategy
from app.core.users import UserManager, fastapi_users, get_user_manager
from app.models.user import User
from app.schemas.token import RefreshTokenRequest, TokenResponse
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()


@router.post("/login", response_model=TokenResponse)
async def login(
    credentials: OAuth2PasswordRequestForm = Depends(),
    strategy=Depends(get_jwt_strategy),
    user_manager: UserManager = Depends(get_user_manager),
):
    user = await user_manager.authenticate(credentials)

    if user is None or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="LOGIN_BAD_CREDENTIALS"
        )

    tokens = await strategy.create_token_pair(user)
    return tokens


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(
    refresh_data: RefreshTokenRequest,
    strategy=Depends(get_jwt_strategy),
    user_manager: UserManager = Depends(get_user_manager),
):
    user_id = await strategy.read_refresh_token(refresh_data.refresh_token)

    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token"
        )

    try:
        user = await user_manager.get(user_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
        )

    tokens = await strategy.create_token_pair(user)
    return tokens
