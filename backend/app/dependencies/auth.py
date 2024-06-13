"""Authentication dependency"""

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from dependencies.db_session import get_db
from service.auth import decode_access_jwt
from service.database_client import get_user_by_username


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db_session: AsyncSession = Depends(get_db),
):
    """Dependency to retrieve the user from the given token."""

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )

    token_payload = decode_access_jwt(token)
    if not token_payload:
        raise credentials_exception

    user = await get_user_by_username(
        db_session, username=token_payload.username
    )
    if user is None:
        raise credentials_exception

    return user
