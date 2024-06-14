"""Defines functions for authentication."""

from datetime import datetime, timedelta, UTC

import jwt
from pwdlib import PasswordHash
from sqlalchemy.ext.asyncio import AsyncSession

from config import ACCESS_TOKEN_EXPIRE_MINUTES, JWT_ALGORITHM, JWT_SECRET_KEY
from service import database_client as db
from models.api_models import TokenData, RegistrationRequest
from models.db_models import DB_User


def verify_password(plain_password, hashed_password) -> bool:
    password_hash = PasswordHash.recommended()
    return password_hash.verify(plain_password, hashed_password)


async def authenticate_user(
    session: AsyncSession, username: str, password: str
) -> DB_User:
    """Verifies that the user is indeed registered."""

    user = await db.get_user_by_username(session, username)

    if not user:
        return False

    if not verify_password(password, user.hashed_password):
        return False

    return user


def create_access_token(data: dict) -> str:
    """Creates a new JWT access token."""

    to_encode = data.copy()
    expires = datetime.now(UTC) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expires})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)

    return encoded_jwt


def decode_access_jwt(token: str) -> TokenData:
    """Tries to decode the given access token."""

    try:
        decoded = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
    except jwt.PyJWTError:
        return None

    username: str = decoded.get("sub")
    if username is None:
        return None

    return TokenData(username=username)


async def create_user(
    db_session: AsyncSession, user: RegistrationRequest
) -> DB_User:
    """Registers the given user by creating it in the database."""
    password_hash = PasswordHash.recommended()
    hashed_password = password_hash.hash(user.password1)

    db_user = DB_User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
    )

    db_session.add(db_user)
    await db_session.commit()
    await db_session.refresh(db_user)

    return db_user
