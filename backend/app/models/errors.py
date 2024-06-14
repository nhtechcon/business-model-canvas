"""This module defines enums with possible error codes."""

from enum import Enum


class UserErrorMessages(Enum):
    INCORRECT_USERNAME_PASSWORD = "Incorrect username or password"
    USERNAME_ALREADY_TAKEN = "This username is already taken"
    PASSWORDS_NO_MATCH = "Entered passwords don't match"
    EMAIL_ALREADY_REGISTERED = "This email address is already registered"
