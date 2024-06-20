"""
The api routes for user management
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from dependencies.db_session import get_db
from dependencies.auth import get_current_user
from models.api_models import Token, LoginRequest, User, RegistrationRequest
from models.errors import UserErrorMessages
from service import auth, database_client as db_client

router = APIRouter()


@router.post("/login", response_model=Token, tags=["api-auth"])
async def login_for_access_token(
    body: LoginRequest,
    db_session: AsyncSession = Depends(get_db),
) -> Token:
    """Login endpoint which returns an access token for valid login
    credentials."""

    user = await auth.authenticate_user(
        db_session, body.username, body.password
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=UserErrorMessages.INCORRECT_USERNAME_PASSWORD,
        )

    access_token, expires_at = auth.create_access_token(
        data={"sub": user.username}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_at": expires_at,
    }


@router.get("/users/me", response_model=User, tags=["user"])
async def get_user_me(current_user: User = Depends(get_current_user)):
    """Returns the profile of the currenty logged in user."""

    return current_user


@router.post("/register", response_model=User, tags=["api-auth"])
async def register_user(
    body: RegistrationRequest,
    db_session: AsyncSession = Depends(get_db),
) -> User:
    """User registration endpoint"""

    if body.password1 != body.password2:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=UserErrorMessages.PASSWORDS_NO_MATCH,
        )

    # Ensure username is available
    existing_username = await db_client.get_user_by_username(
        db_session, body.username
    )
    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=UserErrorMessages.USERNAME_ALREADY_TAKEN,
        )

    # Ensure email is not registered
    existing_email = await db_client.get_user_by_email(db_session, body.email)
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=UserErrorMessages.EMAIL_ALREADY_REGISTERED,
        )

    user = await auth.create_user(db_session, body)

    return user
