"""
This module contains the database models based on sqlalchemy
"""

from sqlalchemy.orm import declarative_base, Mapped, mapped_column


Base = declarative_base()

metadata = Base.metadata


######################### Actual database models ############################


class DB_User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        primary_key=True, autoincrement=True, index=True
    )
    username: Mapped[str] = mapped_column(index=True, unique=True)
    email: Mapped[str] = mapped_column(index=True, unique=True)
    first_name: Mapped[str]
    last_name: Mapped[str]
    hashed_password: Mapped[str]
