"""Main module of the backend api of the busines model canvas application."""

from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from routers import users, canvas
from models.errors import ErrorMessage
from service.database_client import init_tables
from config import ALLOWED_CORS_ORIGINS, LOG_LEVEL


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_tables()

    yield


app = FastAPI(lifespan=lifespan)


@app.exception_handler(HTTPException)
async def custom_http_exception_handler(request: Request, exc: HTTPException):
    """Custom exception handler to ensure that ErrorMessage is properly
    handled."""

    if isinstance(exc.detail, ErrorMessage):
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": str(exc.detail)},
        )
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )


app.include_router(users.router, prefix="/api")
app.include_router(canvas.router, prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8080,
        reload=True,
        log_level=LOG_LEVEL,
    )
