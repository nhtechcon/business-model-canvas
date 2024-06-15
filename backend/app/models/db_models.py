"""
This module contains the database models based on sqlalchemy
"""

from datetime import datetime, UTC
from functools import partial

from sqlalchemy import ForeignKey, Enum, DateTime
from sqlalchemy.orm import declarative_base, Mapped, mapped_column, relationship

from models.common_models import BmcEntity


Base = declarative_base()

metadata = Base.metadata


######################### Actual database models ############################


class DB_User(Base):
    """This table holds all registered users"""

    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        primary_key=True, autoincrement=True, index=True
    )
    username: Mapped[str] = mapped_column(index=True, unique=True)
    email: Mapped[str] = mapped_column(index=True, unique=True)
    hashed_password: Mapped[str]


class DB_Canvas(Base):
    """This table holds basic information about all canvases."""

    __tablename__ = "canvas"

    id: Mapped[int] = mapped_column(
        primary_key=True, autoincrement=True, index=True
    )
    name: Mapped[str] = mapped_column(index=True)
    creation_date: Mapped[datetime] = mapped_column(
        default=partial(datetime.now, tz=UTC)
    )
    last_edit_date: Mapped[datetime] = mapped_column(
        default=partial(datetime.now, tz=UTC),
        onupdate=partial(datetime.now, tz=UTC),
    )

    users = relationship(
        "DB_User", secondary="user_canvases", back_populates="canvas"
    )
    entries = relationship(
        "DB_BmcEntry", back_populates="canvas", cascade="all, delete-orphan"
    )


class DB_BmcEntry(Base):
    """Represents an entry in the business model canvas with all its
    information (e.g. content, date of creation, last edit date,
    which user created the entry)."""

    __tablename__ = "bmc_entries"

    id: Mapped[int] = mapped_column(
        primary_key=True, autoincrement=True, index=True
    )
    text: Mapped[str] = mapped_column()
    date: Mapped[datetime] = mapped_column(
        default=partial(datetime.now, tz=UTC)
    )
    last_updated: Mapped[datetime] = mapped_column(
        default=partial(datetime.now, tz=UTC),
        onupdate=partial(datetime.now, tz=UTC),
    )
    entity: Mapped[BmcEntity] = mapped_column(Enum(BmcEntity))
    canvas_id: Mapped[int] = mapped_column(ForeignKey("canvas.id"))
    creator_id: Mapped[int] = mapped_column(ForeignKey("users.id"))

    canvas = relationship("DB_Canvas", back_populates="entries")


class DB_UserCanvas(Base):
    """This association table establishes a many-to-many relationship between
    users and canvases."""

    __tablename__ = "user_canvases"

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"), primary_key=True
    )
    canvas_id: Mapped[int] = mapped_column(
        ForeignKey("canvas.id"), primary_key=True
    )
