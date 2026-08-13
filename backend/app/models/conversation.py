from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String

from app.database import Base


class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    type = Column(
        String(20),
        nullable=False
    )

    name = Column(
        String(100),
        nullable=True
    )

    avatar_url = Column(
        String(500),
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc)
    )

    updated_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc)
    )


class ConversationMember(Base):
    __tablename__ = "conversation_members"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    conversation_id = Column(
        Integer,
        ForeignKey("conversations.id"),
        nullable=False
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    role = Column(
        String(20),
        default="MEMBER"
    )

    joined_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc)
    )