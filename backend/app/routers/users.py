"""
The api routes for user management
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from dependencies.db_session import get_db
from dependencies.auth import get_current_user
from models.api_models import Token, LoginRequest, User

from service import auth

router = APIRouter()


@router.post("/login", response_model=Token)
async def login_for_access_token(
    body: LoginRequest,
    db_session: AsyncSession = Depends(get_db),
) -> Token:

    user = await auth.authenticate_user(
        db_session, body.username, body.password
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )

    access_token = auth.create_access_token(data={"sub": user.username})

    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/users/me", response_model=User, tags=["users"])
async def get_user_me(current_user: User = Depends(get_current_user)):
    return current_user
