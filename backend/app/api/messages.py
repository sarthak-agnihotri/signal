from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.models.message import Message
from app.models.conversation import ConversationMember
from app.schemas.message import (
    MessageResponse,
    SendMessageRequest,
)
from app.websocket_manager import manager


router = APIRouter(
    prefix="/messages",
    tags=["Messages"]
)


def check_conversation_member(
    conversation_id: int,
    user_id: int,
    db: Session
):
    membership = (
        db.query(ConversationMember)
        .filter(
            ConversationMember.conversation_id
            == conversation_id,
            ConversationMember.user_id
            == user_id
        )
        .first()
    )

    return membership


@router.post(
    "/{conversation_id}",
    response_model=MessageResponse,
    status_code=status.HTTP_201_CREATED
)
async def send_message(
    conversation_id: int,
    request: SendMessageRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    membership = check_conversation_member(
        conversation_id,
        current_user.id,
        db
    )

    if not membership:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not a member of this conversation"
        )

    message = Message(
        conversation_id=conversation_id,
        sender_id=current_user.id,
        content=request.content,
        status="SENT"
    )

    db.add(message)
    db.commit()
    db.refresh(message)

    response = MessageResponse(
        id=message.id,
        conversation_id=message.conversation_id,
        sender_id=message.sender_id,
        sender_username=current_user.username,
        content=message.content,
        status=message.status,
        created_at=message.created_at
    )

    await manager.broadcast(
        conversation_id,
        {
            "type": "message",
            "data": response.model_dump(mode="json")
        }
    )

    return response


@router.get(
    "/{conversation_id}",
    response_model=list[MessageResponse]
)
def get_messages(
    conversation_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    membership = check_conversation_member(
        conversation_id,
        current_user.id,
        db
    )

    if not membership:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not a member of this conversation"
        )

    messages = (
        db.query(Message)
        .filter(
            Message.conversation_id
            == conversation_id
        )
        .order_by(Message.created_at.asc())
        .all()
    )

    result = []

    for message in messages:

        sender = (
            db.query(User)
            .filter(User.id == message.sender_id)
            .first()
        )

        result.append(
            MessageResponse(
                id=message.id,
                conversation_id=message.conversation_id,
                sender_id=message.sender_id,
                sender_username=sender.username,
                content=message.content,
                status=message.status,
                created_at=message.created_at
            )
        )

    return result