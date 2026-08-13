from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.models.contact import Contact
from app.models.user import User
from app.schemas.contacts import (
    AddContactRequest,
    ContactResponse,
)


router = APIRouter(
    prefix="/contacts",
    tags=["Contacts"]
)


@router.post(
    "",
    response_model=ContactResponse,
    status_code=status.HTTP_201_CREATED
)
def add_contact(
    request: AddContactRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    contact_user = (
        db.query(User)
        .filter(User.username == request.username)
        .first()
    )

    if not contact_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    if contact_user.id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You cannot add yourself"
        )

    existing_contact = (
        db.query(Contact)
        .filter(
            Contact.user_id == current_user.id,
            Contact.contact_user_id == contact_user.id
        )
        .first()
    )

    if existing_contact:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Contact already exists"
        )

    contact = Contact(
        user_id=current_user.id,
        contact_user_id=contact_user.id,
        nickname=request.nickname
    )

    db.add(contact)
    db.commit()
    db.refresh(contact)

    return ContactResponse(
        id=contact.id,
        username=contact_user.username,
        display_name=contact_user.display_name,
        avatar_url=contact_user.avatar_url,
        is_online=contact_user.is_online,
        nickname=contact.nickname
    )


@router.get(
    "",
    response_model=list[ContactResponse]
)
def get_contacts(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    contacts = (
        db.query(Contact)
        .filter(Contact.user_id == current_user.id)
        .all()
    )

    result = []

    for contact in contacts:
        user = (
            db.query(User)
            .filter(User.id == contact.contact_user_id)
            .first()
        )

        if user:
            result.append(
                ContactResponse(
                    id=contact.id,
                    username=user.username,
                    display_name=user.display_name,
                    avatar_url=user.avatar_url,
                    is_online=user.is_online,
                    nickname=contact.nickname
                )
            )

    return result


@router.delete("/{contact_id}")
def delete_contact(
    contact_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    contact = (
        db.query(Contact)
        .filter(
            Contact.id == contact_id,
            Contact.user_id == current_user.id
        )
        .first()
    )

    if not contact:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact not found"
        )

    db.delete(contact)
    db.commit()

    return {
        "message": "Contact removed successfully"
    }


@router.get(
    "/search/{username}",
    response_model=list[ContactResponse]
)
def search_users(
    username: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    users = (
        db.query(User)
        .filter(
            User.username.ilike(f"%{username}%"),
            User.id != current_user.id
        )
        .limit(20)
        .all()
    )

    result = []

    for user in users:
        contact = (
            db.query(Contact)
            .filter(
                Contact.user_id == current_user.id,
                Contact.contact_user_id == user.id
            )
            .first()
        )

        result.append(
            ContactResponse(
                id=contact.id if contact else 0,
                username=user.username,
                display_name=user.display_name,
                avatar_url=user.avatar_url,
                is_online=user.is_online,
                nickname=contact.nickname if contact else None
            )
        )

    return result