"""Main module of the backend api of the busines model canvas application."""

from contextlib import asynccontextmanager

from fastapi import FastAPI

from routers import users
from service.database_client import init_tables


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_tables()

    yield


app = FastAPI(lifespan=lifespan)

app.include_router(users.router)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
