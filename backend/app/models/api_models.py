"""
This module contains the api models based on pydantic
"""

from pydantic import BaseModel


class LoginRequest(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class UserBase(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int


class UserInDB(UserBase):
    hashed_password: str
