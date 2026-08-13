from datetime import datetime, timezone
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import os

# Import database - this now uses DATABASE_URL from environment
from app.database import Base, engine, SessionLocal

from app.api.auth import router as auth_router
from app.api.contacts import router as contacts_router
from app.api.conversations import router as conversations_router
from app.api.messages import router as messages_router

from app.websocket_manager import manager

# Import all models so they're registered with SQLAlchemy
from app.models.user import User
from app.models.contact import Contact
from app.models.conversation import Conversation, ConversationMember
from app.models.message import Message
from app.models.reaction import MessageReaction, MessageRead

# Create FastAPI app FIRST
app = FastAPI(
    title="CipherChat API",
    description="Privacy-focused real-time messaging platform",
    version="1.0.0"
)

# Add CORS middleware (allow your frontend URL)
app.add_middleware(
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://signal-xnx9.onrender.com",
        "https://signal-indol-xi.vercel.app",  # ← YOUR ACTUAL VERCEL URL
        # Add any other Vercel preview URLs
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router)
app.include_router(contacts_router)
app.include_router(conversations_router)
app.include_router(messages_router)

# ============================================
# CREATE TABLES ON STARTUP (with logging)
# ============================================
@app.on_event("startup")
def init_db():
    print("🔧 Creating database tables...")
    print(f"📊 Using database: {os.getenv('DATABASE_URL', 'SQLite (local)')[:50]}...")
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables ready")

# ============================================
# ROOT ENDPOINTS
# ============================================
@app.get("/")
def root():
    return {
        "message": "CipherChat API is running",
        "status": "ok"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

# ============================================
# WEBSOCKET ENDPOINT
# ============================================
@app.websocket("/ws/{conversation_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    conversation_id: int
):
    print(f"🔥 WebSocket endpoint called: conversation={conversation_id}")

    await manager.connect(conversation_id, websocket)

    print(f"🟢 WebSocket connected: conversation={conversation_id}")

    try:
        while True:
            data = await websocket.receive_json()

            event_type = data.get("type")
            user_id = data.get("user_id")

            if not user_id:
                continue

            db = SessionLocal()

            try:
                # Check whether user belongs to conversation
                membership = (
                    db.query(ConversationMember)
                    .filter(
                        ConversationMember.conversation_id == conversation_id,
                        ConversationMember.user_id == user_id
                    )
                    .first()
                )

                if not membership:
                    await websocket.send_json({
                        "type": "error",
                        "message": "You are not a member of this conversation"
                    })
                    continue

                # =========================
                # SEND MESSAGE
                # =========================
                if event_type == "message":

                    content = data.get("content", "").strip()

                    if not content:
                        continue

                    user = (
                        db.query(User)
                        .filter(User.id == user_id)
                        .first()
                    )

                    if not user:
                        continue

                    message = Message(
                        conversation_id=conversation_id,
                        sender_id=user_id,
                        content=content,
                        status="SENT"
                    )

                    db.add(message)
                    db.commit()
                    db.refresh(message)

                    await manager.broadcast(
                        conversation_id,
                        {
                            "type": "message",
                            "data": {
                                "id": message.id,
                                "conversation_id": message.conversation_id,
                                "sender_id": message.sender_id,
                                "sender_username": user.username,
                                "content": message.content,
                                "status": "SENT",
                                "created_at": message.created_at.isoformat()
                            }
                        }
                    )

                # =========================
                # DELIVERED
                # =========================
                elif event_type == "delivered":

                    message_id = data.get("message_id")

                    if not message_id:
                        continue

                    message = (
                        db.query(Message)
                        .filter(
                            Message.id == message_id,
                            Message.conversation_id == conversation_id
                        )
                        .first()
                    )

                    if not message:
                        continue

                    receipt = (
                        db.query(MessageRead)
                        .filter(
                            MessageRead.message_id == message_id,
                            MessageRead.user_id == user_id
                        )
                        .first()
                    )

                    if not receipt:
                        receipt = MessageRead(
                            message_id=message_id,
                            user_id=user_id
                        )

                        db.add(receipt)
                        db.commit()

                    await manager.broadcast(
                        conversation_id,
                        {
                            "type": "message_delivered",
                            "data": {
                                "message_id": message_id,
                                "user_id": user_id
                            }
                        }
                    )

                # =========================
                # READ
                # =========================
                elif event_type == "read":

                    message_id = data.get("message_id")

                    if not message_id:
                        continue

                    message = (
                        db.query(Message)
                        .filter(
                            Message.id == message_id,
                            Message.conversation_id == conversation_id
                        )
                        .first()
                    )

                    if not message:
                        continue

                    receipt = (
                        db.query(MessageRead)
                        .filter(
                            MessageRead.message_id == message_id,
                            MessageRead.user_id == user_id
                        )
                        .first()
                    )

                    if receipt:
                        receipt.read_at = datetime.now(timezone.utc)
                    else:
                        receipt = MessageRead(
                            message_id=message_id,
                            user_id=user_id
                        )
                        db.add(receipt)

                    db.commit()

                    await manager.broadcast(
                        conversation_id,
                        {
                            "type": "message_read",
                            "data": {
                                "message_id": message_id,
                                "user_id": user_id
                            }
                        }
                    )

                # =========================
                # TYPING
                # =========================
                elif event_type == "typing":

                    await manager.broadcast(
                        conversation_id,
                        {
                            "type": "typing",
                            "user_id": user_id,
                            "is_typing": data.get(
                                "is_typing",
                                False
                            )
                        }
                    )

            finally:
                db.close()

    except WebSocketDisconnect:
        manager.disconnect(
            conversation_id,
            websocket
        )


@app.get("/websocket-test")
def websocket_test():
    return FileResponse("websocket-test.html")