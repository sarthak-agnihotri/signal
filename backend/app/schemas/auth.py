from pydantic import BaseModel, Field


class RegisterRequest(BaseModel):
    username: str = Field(min_length=3, max_length=50)
    phone: str | None = None
    password: str = Field(min_length=6, max_length=100)
    display_name: str = Field(min_length=1, max_length=100)


class VerifyOTPRequest(BaseModel):
    username: str
    otp: str


class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: int
    username: str
    phone: str | None
    display_name: str
    avatar_url: str | None
    is_online: bool

    class Config:
        from_attributes = True