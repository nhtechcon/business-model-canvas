"""Authentication and authorization dependency"""

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from dependencies.db_session import get_db
from service.auth import decode_access_jwt
from service import database_client as db_client
from models import api_models, db_models


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

    user = await db_client.get_user_by_username(
        db_session, username=token_payload.username
    )
    if user is None:
        raise credentials_exception

    return user


async def can_user_access_canvas(
    canvas_id: str,
    current_user: api_models.User = Depends(get_current_user),
    db_session: AsyncSession = Depends(get_db),
) -> db_models.DB_UserCanvas:
    """Authorization check: Dependency to perform the authorization check
    if user can access the requested canvas. If he can access the canvas, it
    will be returned."""

    canvas_result = await db_client.get_user_canvas(
        db_session, current_user.id, canvas_id
    )
    if not canvas_result:
        raise HTTPException(
            status_code=403,
            detail="User not authorized to access entries for this canvas.",
        )
    return canvas_result
