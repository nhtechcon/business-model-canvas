"""Defines functions for authentication."""

from datetime import datetime, timedelta, UTC

import jwt
from pwdlib import PasswordHash
from sqlalchemy.ext.asyncio import AsyncSession

from config import ACCESS_TOKEN_EXPIRE_MINUTES, JWT_ALGORITHM, JWT_SECRET_KEY
from service import database_client as db


def verify_password(plain_password, hashed_password):
    password_hash = PasswordHash.recommended()
    return password_hash.verify(plain_password, hashed_password)


async def authenticate_user(
    session: AsyncSession, username: str, password: str
):
    """Verifies that the user is indeed registered."""

    user = await db.get_user_by_username(session, username)

    if not user:
        return False

    if not verify_password(password, user.hashed_password):
        return False

    return user


def create_access_token(data: dict):
    """Creates a new JWT access token."""

    to_encode = data.copy()
    expires = datetime.now(UTC) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expires})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)

    return encoded_jwt
