"""
This module contains the api models based on pydantic
"""

from datetime import datetime
from typing_extensions import Annotated

from pydantic import BaseModel, EmailStr
from humps import camelize

from models.common_models import BmcEntity


class ApiBaseModel(BaseModel):
    class Config:
        alias_generator = camelize
        populate_by_name = True
        from_attributes = True
        extra = "ignore"


class LoginRequest(ApiBaseModel):
    username: str
    password: str


class RegistrationRequest(ApiBaseModel):
    username: str
    password1: str
    password2: str
    email: EmailStr


class TokenData(ApiBaseModel):
    id: int
    username: str | None = None
    email: EmailStr


class Token(ApiBaseModel):
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


class CreateEntryRequest(ApiBaseModel):
    entity: BmcEntity
