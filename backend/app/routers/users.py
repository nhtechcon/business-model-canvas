"""
The api routes for user management
"""

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from dependencies.db_session import get_db
from models.api_models import Token, LoginRequest

from service import auth

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


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


@router.get("/users", tags=["users"])
async def get_users():
    return []


@router.get("/users/me", tags=["users"])
async def get_user_me():
    return {}


@router.get("/users/{username}", tags=["users"])
async def get_user(username: str):
    return {}
