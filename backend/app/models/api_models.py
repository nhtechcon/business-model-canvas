"""
This module contains the api models based on pydantic
"""

from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr
from humps import camelize

from models.common_models import BmcEntity


class ApiBaseModel(BaseModel):
    class Config:
        alias_generator = camelize
        populate_by_name = True


class LoginRequest(ApiBaseModel):
    username: str
    password: str


class RegistrationRequest(ApiBaseModel):
    username: str
    password1: str
    password2: str
    email: EmailStr


class TokenData(ApiBaseModel):
    model_config = ConfigDict(extra="ignore")

    id: int
    username: str | None = None
    email: EmailStr


class Token(ApiBaseModel):
    model_config = ConfigDict(extra="ignore")

    access_token: str
    token_type: str
    expires_at: datetime
    token_data: TokenData


class UserBase(ApiBaseModel):
    username: str
    email: str | None = None


class User(UserBase):
    id: int


class Canvas(ApiBaseModel):
    id: str
    name: str
    creation_date: datetime
    last_edit_date: datetime

    class Config:
        orm_mode = True


class CreateCanvasRequest(ApiBaseModel):
    name: str


class BmcEntry(ApiBaseModel):
    id: int
    text: str
    date: datetime
    last_updated: datetime
    entity: BmcEntity

    class Config:
        orm_mode = True


class FullCanvas(Canvas, ApiBaseModel):
    entries: list[BmcEntry]
