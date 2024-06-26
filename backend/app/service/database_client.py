"""
Provides the database client functions
"""

from sqlalchemy import event, select
from sqlalchemy.ext.asyncio import (
    create_async_engine,
    AsyncSession,
)
from sqlalchemy.orm import sessionmaker, selectinload

from models.db_models import (
    metadata,
    DB_User,
    DB_Canvas,
    DB_UserCanvas,
    DB_BmcEntry,
)
from models.common_models import BmcEntity


DATABASE_URL = "sqlite+aiosqlite:///./data.sqlite"

engine = create_async_engine(DATABASE_URL)

async_session = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)


@event.listens_for(engine.sync_engine, "connect")
def do_connect(dbapi_connection, _):
    # disable aiosqlite's emitting of the BEGIN statement entirely.
    # also stops it from emitting COMMIT before any DDL.
    dbapi_connection.isolation_level = None


@event.listens_for(engine.sync_engine, "begin")
def do_begin(conn):
    # emit our own BEGIN
    conn.exec_driver_sql("BEGIN")


async def init_tables():
    """Initializes the database tables."""

    async with engine.begin() as conn:
        await conn.run_sync(metadata.create_all)


######################### Actual CRUD operations ############################


async def get_user_by_username(
    db_session: AsyncSession, username: str
) -> DB_User:
    user = (
        await db_session.scalars(
            select(DB_User).where(DB_User.username == username)
        )
    ).first()

    if user:
        return user


async def get_user_by_email(db_session: AsyncSession, email: str) -> DB_User:
    user = (
        await db_session.scalars(select(DB_User).where(DB_User.email == email))
    ).first()

    if user:
        return user


async def get_canvases_created_by_user(
    db_session: AsyncSession, user_id: int
) -> list[DB_Canvas]:
    user_canvases = (
        await db_session.scalars(
            select(DB_Canvas).where(DB_Canvas.creator_id == user_id)
        )
    ).all()

    return user_canvases or []


async def get_user_canvas(
    db_session: AsyncSession, user_id: int, canvas_id: str
) -> DB_Canvas:
    canvas = (
        await db_session.scalars(
            select(DB_Canvas)
            .where(DB_Canvas.creator_id == user_id, DB_Canvas.id == canvas_id)
            .options(selectinload(DB_Canvas.entries))
        )
    ).first()

    if canvas:
        return canvas


async def create_canvas(
    db_session: AsyncSession, name: str, creator_id: int
) -> DB_Canvas:

    new_canvas = DB_Canvas(name=name, creator_id=creator_id)

    try:
        async with db_session.begin():
            # Create canvas
            db_session.add(new_canvas)
            await db_session.flush()
            await db_session.refresh(new_canvas)

            # Create mapping
            db_user_canvas = DB_UserCanvas(
                user_id=creator_id,
                canvas_id=new_canvas.id,
                is_creator=True,
            )
            db_session.add(db_user_canvas)

        await db_session.refresh(new_canvas)

        return new_canvas

    except Exception as exc:
        await db_session.rollback()
        raise exc


async def get_canvas_entries(
    db_session: AsyncSession, canvas_id: str
) -> list[DB_BmcEntry]:

    entries = (
        await db_session.scalars(
            select(DB_BmcEntry)
            .where(DB_BmcEntry.canvas_id == canvas_id)
            .order_by(DB_BmcEntry.last_updated)
        )
    ).all()

    return entries or []


async def create_canvas_entry(
    db_session: AsyncSession, canvas_id: str, entity: BmcEntity, creator_id: int
) -> DB_BmcEntry:

    new_entry = DB_BmcEntry(
        text="", entity=entity, canvas_id=canvas_id, creator_id=creator_id
    )

    try:
        async with db_session.begin():
            db_session.add(new_entry)
            await db_session.flush()
            await db_session.refresh(new_entry)
        return new_entry

    except Exception as exc:
        await db_session.rollback()
        raise exc


async def update_canvas_entry(
    db_session: AsyncSession, canvas_id: str, entry_id: int, text: str
) -> DB_BmcEntry:

    result = await db_session.execute(
        select(DB_BmcEntry).filter_by(id=entry_id, canvas_id=canvas_id)
    )
    entry = result.scalar_one_or_none()

    if entry:
        entry.text = text
        await db_session.commit()
        await db_session.refresh(entry)
        return entry
    else:
        raise ValueError("Entry not found")
