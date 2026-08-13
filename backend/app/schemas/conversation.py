from pydantic import BaseModel, Field


class CreateDirectConversationRequest(BaseModel):
    username: str


class CreateGroupConversationRequest(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    usernames: list[str] = Field(min_length=1, max_length=50)


class ConversationMemberResponse(BaseModel):
    user_id: int
    username: str
    display_name: str
    avatar_url: str | None
    role: str
    is_online: bool


class ConversationResponse(BaseModel):
    id: int
    type: str
    name: str | None
    avatar_url: str | None
    members: list[ConversationMemberResponse]