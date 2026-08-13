from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.models.conversation import (
    Conversation,
    ConversationMember,
)
from app.schemas.conversation import (
    CreateDirectConversationRequest,
    CreateGroupConversationRequest,
    ConversationMemberResponse,
    ConversationResponse,
)


router = APIRouter(
    prefix="/conversations",
    tags=["Conversations"]
)


def build_conversation_response(
    conversation: Conversation,
    db: Session
):
    members = (
        db.query(ConversationMember)
        .filter(
            ConversationMember.conversation_id
            == conversation.id
        )
        .all()
    )

    member_response = []

    for member in members:
        user = (
            db.query(User)
            .filter(User.id == member.user_id)
            .first()
        )

        if user:
            member_response.append(
                ConversationMemberResponse(
                    user_id=user.id,
                    username=user.username,
                    display_name=user.display_name,
                    avatar_url=user.avatar_url,
                    role=member.role,
                    is_online=user.is_online
                )
            )

    return ConversationResponse(
        id=conversation.id,
        type=conversation.type,
        name=conversation.name,
        avatar_url=conversation.avatar_url,
        members=member_response
    )


@router.post(
    "/direct",
    response_model=ConversationResponse,
    status_code=status.HTTP_201_CREATED
)
def create_direct_conversation(
    request: CreateDirectConversationRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    other_user = (
        db.query(User)
        .filter(User.username == request.username)
        .first()
    )

    if not other_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    if other_user.id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You cannot chat with yourself"
        )

    # Check if direct conversation already exists
    user_conversations = (
        db.query(ConversationMember)
        .filter(
            ConversationMember.user_id
            == current_user.id
        )
        .all()
    )

    for membership in user_conversations:

        conversation = (
            db.query(Conversation)
            .filter(
                Conversation.id
                == membership.conversation_id,
                Conversation.type == "DIRECT"
            )
            .first()
        )

        if not conversation:
            continue

        other_member = (
            db.query(ConversationMember)
            .filter(
                ConversationMember.conversation_id
                == conversation.id,
                ConversationMember.user_id
                == other_user.id
            )
            .first()
        )

        if other_member:
            return build_conversation_response(
                conversation,
                db
            )

    # Create new conversation
    conversation = Conversation(
        type="DIRECT"
    )

    db.add(conversation)
    db.flush()

    db.add(
        ConversationMember(
            conversation_id=conversation.id,
            user_id=current_user.id,
            role="MEMBER"
        )
    )

    db.add(
        ConversationMember(
            conversation_id=conversation.id,
            user_id=other_user.id,
            role="MEMBER"
        )
    )

    db.commit()
    db.refresh(conversation)

    return build_conversation_response(
        conversation,
        db
    )


@router.post(
    "/group",
    response_model=ConversationResponse,
    status_code=status.HTTP_201_CREATED
)
def create_group_conversation(
    request: CreateGroupConversationRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    conversation = Conversation(
        type="GROUP",
        name=request.name
    )

    db.add(conversation)
    db.flush()

    # Creator becomes admin
    db.add(
        ConversationMember(
            conversation_id=conversation.id,
            user_id=current_user.id,
            role="ADMIN"
        )
    )

    added_users = {current_user.id}

    for username in request.usernames:

        user = (
            db.query(User)
            .filter(User.username == username)
            .first()
        )

        if not user:
            raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"User '{username}' not found"
    )

        if user.id in added_users:
            continue

        db.add(
            ConversationMember(
                conversation_id=conversation.id,
                user_id=user.id,
                role="MEMBER"
            )
        )

        added_users.add(user.id)

    db.commit()
    db.refresh(conversation)

    return build_conversation_response(
        conversation,
        db
    )


@router.get(
    "",
    response_model=list[ConversationResponse]
)
def get_conversations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    memberships = (
        db.query(ConversationMember)
        .filter(
            ConversationMember.user_id
            == current_user.id
        )
        .all()
    )

    conversations = []

    for membership in memberships:

        conversation = (
            db.query(Conversation)
            .filter(
                Conversation.id
                == membership.conversation_id
            )
            .first()
        )

        if conversation:
            conversations.append(
                build_conversation_response(
                    conversation,
                    db
                )
            )

    return conversations