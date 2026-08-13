from datetime import datetime, timedelta, timezone
from jose import jwt
from passlib.hash import bcrypt  # Direct import instead of CryptContext
from sqlalchemy.orm import Session
from app.config import settings
from app.models.user import User


def hash_password(password: str) -> str:
    # Bcrypt has a 72-byte limit - truncate if needed
    if len(password) > 72:
        password = password[:72]
    return bcrypt.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Also truncate for verification
    if len(plain_password) > 72:
        plain_password = plain_password[:72]
    return bcrypt.verify(plain_password, hashed_password)


def create_access_token(user_id: int) -> str:
    expires_at = datetime.now(timezone.utc) + timedelta(
        minutes=settings.access_token_expire_minutes
    )
    payload = {"sub": str(user_id), "exp": expires_at}
    return jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)


def authenticate_user(db: Session, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return None
    if not verify_password(password, user.password_hash):
        return None
    return user