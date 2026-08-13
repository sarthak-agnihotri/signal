from pydantic import BaseModel, Field


class AddContactRequest(BaseModel):
    username: str
    nickname: str | None = Field(default=None, max_length=100)


class ContactResponse(BaseModel):
    id: int
    username: str
    display_name: str
    avatar_url: str | None
    is_online: bool
    nickname: str | None