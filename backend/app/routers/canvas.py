"""
The api routes for retrieving and editing business model canvas data.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from dependencies.auth import get_current_user
from dependencies.db_session import get_db
from models.api_models import Token, User, Canvas
from service import database_client as db_client

router = APIRouter()


@router.get("/user-canvases", response_model=list[Canvas], tags=["canvas"])
async def get_user_canvases(
    current_user: User = Depends(get_current_user),
    db_session: AsyncSession = Depends(get_db),
):
    """Returns all canvases a user has created."""

    canvas_list = await db_client.get_canvases_created_by_user(
        db_session, current_user.id
    )

    return canvas_list
