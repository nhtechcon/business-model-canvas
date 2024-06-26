"""
The api routes for retrieving and editing business model canvas data.
"""

from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.ext.asyncio import AsyncSession

from dependencies.auth import get_current_user, can_user_access_canvas
from dependencies.db_session import get_db
from models import api_models, db_models
from service import database_client as db_client

router = APIRouter()


@router.get(
    "/user-canvases", response_model=list[api_models.Canvas], tags=["canvas"]
)
async def get_user_canvases(
    current_user: api_models.User = Depends(get_current_user),
    db_session: AsyncSession = Depends(get_db),
):
    """Returns all canvases a user has created."""

    canvas_list = await db_client.get_canvases_created_by_user(
        db_session, current_user.id
    )

    return canvas_list


@router.post("/canvas", response_model=api_models.Canvas, tags=["canvas"])
async def create_canvas(
    req: api_models.CreateCanvasRequest,
    current_user: api_models.User = Depends(get_current_user),
    db_session: AsyncSession = Depends(get_db),
):
    """Creates a new canvas under the name of the user."""

    await db_session.close()

    new_canvas = await db_client.create_canvas(
        db_session, req.name, current_user.id
    )

    return new_canvas


@router.get(
    "/canvas/{canvas_id}",
    response_model=api_models.FullCanvas,
    tags=["canvas"],
)
async def get_canvas(
    canvas: db_models.DB_Canvas = Depends(can_user_access_canvas),
):
    """Returns the full canvas, with info and entries."""

    if not canvas:
        raise HTTPException(status_code=404, detail="Canvas not found")

    return canvas


@router.get(
    "/canvas/{canvas_id}/entries",
    response_model=list[api_models.BmcEntry],
    tags=["canvas"],
)
async def get_canvas_entries(
    canvas: db_models.DB_Canvas = Depends(can_user_access_canvas),
):
    """Returns all canvas entries for the canvas if the user can access it."""

    if not canvas:
        raise HTTPException(status_code=404, detail="Canvas not found")

    return canvas.entries


@router.post(
    "/canvas/{canvas_id}/entries",
    response_model=api_models.BmcEntry,
    tags=["canvas"],
)
async def post_canvas_entry(
    canvas_id: str,
    req: api_models.CreateEntryRequest,
    canvas: db_models.DB_Canvas = Depends(can_user_access_canvas),
    current_user: api_models.User = Depends(get_current_user),
    db_session: AsyncSession = Depends(get_db),
):
    """Creates a new entry in the given canvas, if the user can access it."""

    await db_session.close()

    new_entry = await db_client.create_canvas_entry(
        db_session, canvas_id, req.entity, current_user.id
    )

    return new_entry


@router.put(
    "/canvas/{canvas_id}/entries",
    response_model=api_models.BmcEntry,
    tags=["canvas"],
)
async def put_canvas_entry(
    canvas_id: str,
    req: api_models.UpdateEntryRequest,
    _: db_models.DB_Canvas = Depends(can_user_access_canvas),
    __: api_models.User = Depends(get_current_user),
    db_session: AsyncSession = Depends(get_db),
):
    """Creates a new entry in the given canvas, if the user can access it."""

    await db_session.close()

    try:
        result = await db_client.update_canvas_entry(
            db_session, canvas_id, req.id, req.text
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

    return result


@router.delete(
    "/canvas/{canvas_id}/entries/{entry_id}",
    tags=["canvas"],
    status_code=204,
)
async def delete_canvas_entry(
    canvas_id: str,
    entry_id: int,
    _: db_models.DB_Canvas = Depends(can_user_access_canvas),
    __: api_models.User = Depends(get_current_user),
    db_session: AsyncSession = Depends(get_db),
):
    """Deletes an entry from the given canvas, if the user can access it."""

    await db_session.close()

    try:
        await db_client.delete_canvas_entry(db_session, canvas_id, entry_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

    return Response(status_code=204)
