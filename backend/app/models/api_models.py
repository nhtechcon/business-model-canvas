"""
This module contains the api models based on pydantic
"""

from datetime import datetime

from pydantic import BaseModel, EmailStr

from models.common_models import BmcEntity


class LoginRequest(BaseModel):
    username: str
    password: str


class RegistrationRequest(BaseModel):
    username: str
    password1: str
    password2: str
    email: EmailStr


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class UserBase(BaseModel):
    username: str
    email: str | None = None


class User(UserBase):
    id: int


class Canvas(BaseModel):
    id: int
    name: str
    creation_date: datetime
    last_edit_date: datetime

    class Config:
        orm_mode = True


class CreateCanvasRequest(BaseModel):
    name: str


class BmcEntry(BaseModel):
    id: int
    text: str
    date: datetime
    last_updated: datetime
    entity: BmcEntity

    class Config:
        orm_mode = True
