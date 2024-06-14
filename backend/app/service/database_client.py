"""
Provides the database client functions
"""

from sqlalchemy import event, select
from sqlalchemy.ext.asyncio import (
    create_async_engine,
    AsyncSession,
)
from sqlalchemy.orm import sessionmaker

from models.db_models import metadata, DB_User


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
