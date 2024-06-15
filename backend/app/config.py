"""Configuration of the api service."""

import os


ACCESS_TOKEN_EXPIRE_MINUTES = 30
JWT_SECRET_KEY = "truyl_secret_key"
JWT_ALGORITHM = "HS256"

ALLOWED_CORS_ORIGINS = ["http://localhost:4200"]

LOG_LEVEL = os.environ.get("LOG_LEVEL", "TRACE").lower()
