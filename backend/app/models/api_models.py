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
    first_name: str | None = None
    last_name: str | None = None
    email: str | None = None


class User(UserBase):
    id: int
