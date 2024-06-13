"""FastAPI dependency for db session"""

from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession

from service.database_client import async_session


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """Creates a new async_session and returns it."""

    db = async_session()

    try:
        yield db
    finally:
        await db.close()
