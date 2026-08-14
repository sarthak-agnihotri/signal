# Signal — Real-Time Messaging Application

> A full-stack real-time messaging application inspired by Signal, built to demonstrate modern web development concepts including authentication, one-to-one messaging, group conversations, online presence, and real-time communication.

![Signal](https://img.shields.io/badge/Project-Signal-blue)
![Frontend](https://img.shields.io/badge/Frontend-Next.js-black)
![Backend](https://img.shields.io/badge/Backend-FastAPI-green)
![Real-Time](https://img.shields.io/badge/Communication-Real--Time-orange)
![Database](https://img.shields.io/badge/Database-PostgreSQL-blue)
![Deployed](https://img.shields.io/badge/Deployed-Render%20%26%20Vercel-success)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📌 Table of Contents

* [About the Project](#-about-the-project)
* [Live Demo](#-live-demo)
* [Project Objectives](#-project-objectives)
* [Features](#-features)
* [Application Overview](#-application-overview)
* [Technology Stack](#-technology-stack)
* [System Architecture](#-system-architecture)
* [Project Structure](#-project-structure)
* [Core Functionality](#-core-functionality)
* [Authentication](#-authentication)
* [Real-Time Messaging](#-real-time-messaging)
* [One-to-One Conversations](#-one-to-one-conversations)
* [Group Conversations](#-group-conversations)
* [Online Presence](#-online-presence)
* [Frontend](#-frontend)
* [Backend](#-backend)
* [API Communication](#-api-communication)
* [Installation and Setup](#-installation-and-setup)
* [Environment Variables](#-environment-variables)
* [Running the Application](#-running-the-application)
* [Usage](#-usage)
* [Database](#-database)
* [Security Considerations](#-security-considerations)
* [Error Handling](#-error-handling)
* [Real-World Challenges Solved](#-real-world-challenges-solved)
* [Future Improvements](#-future-improvements)
* [Learning Outcomes](#-learning-outcomes)
* [Testing](#-testing)
* [Deployment](#-deployment)
* [Contributing](#-contributing)
* [License](#-license)
* [Author](#-author)

---

# 📱 About the Project

**Signal** is a full-stack real-time messaging application inspired by the core user experience of modern secure messaging platforms.

The application allows users to communicate through individual conversations as well as group conversations. It provides a responsive chat interface where users can view conversations, send messages, see other users' online status, and participate in groups.

The project was developed as a practical full-stack application to demonstrate:

* User authentication with JWT
* Real-time communication using WebSockets
* One-to-one messaging
* Group conversations
* Conversation management
* Online/offline presence
* REST API communication
* Modern frontend development with Next.js
* Backend development with FastAPI
* PostgreSQL database integration
* Production deployment using Render and Vercel

> **Note:** This project is a learning and portfolio implementation inspired by Signal's messaging experience. It is **not the official Signal application** and does not claim to implement Signal Protocol end-to-end encryption.

---

# 🌐 Live Demo

The application is deployed and available online.

| Service               | URL                                   | Status |
| --------------------- | ------------------------------------- | ------ |
| **Frontend**          | https://signal-indol-xi.vercel.app    | ✅ Live |
| **Backend API**       | https://signal-xnx9.onrender.com      | ✅ Live |
| **API Documentation** | https://signal-xnx9.onrender.com/docs | ✅ Live |

### 🧪 Test Credentials

```text
Username: testuser7
Password: securepassword123
```

> You can also register your own account using the registration page.

---

# 🎯 Project Objectives

The primary objective of this project is to build a functional real-time messaging platform while applying practical full-stack development concepts.

### Primary Objectives

1. Build a modern messaging interface using Next.js.
2. Implement secure authentication using JWT.
3. Enable real-time communication using WebSockets.
4. Support one-to-one conversations.
5. Support group conversations.
6. Display user online/offline status.
7. Persist conversations and messages.
8. Connect a modern frontend with a REST API.
9. Maintain a clean and scalable project structure.
10. Deploy the application to production.

---

# ✨ Features

## 👤 User Features

* User registration
* OTP verification
* User login
* JWT authentication
* User profile information
* Display name support
* User avatar support
* Online/offline status
* Secure password hashing using bcrypt

## 💬 Messaging Features

* Real-time message sending
* Real-time message receiving
* Persistent conversation history
* One-to-one conversations
* Group conversations
* Message timestamps
* Dynamic conversation updates
* Message delivery status

## 👥 Group Features

* Create group conversations
* Add multiple members
* Group name support
* Display group members
* Group messaging
* Member roles

## 🟢 Presence Features

* Real-time online status
* Offline status detection
* Conversation member status
* Active member visibility

## 🎨 UI Features

* Modern messaging interface
* Conversation sidebar
* Conversation search
* Chat window
* Message composer
* Enter-key message sending
* User information display
* Group information display
* Responsive layout
* Real-time UI updates

---

# 🏗️ Application Overview

The application follows a client-server architecture with real-time communication.

```text
                    ┌──────────────────────┐
                    │      User / Client   │
                    └──────────┬───────────┘
                               │
                               │ HTTPS / WSS
                               ▼
                    ┌──────────────────────┐
                    │   Next.js Frontend   │
                    │      (Vercel)        │
                    │                      │
                    │  - Login/Register    │
                    │  - Conversations     │
                    │  - Chat Interface    │
                    │  - Groups            │
                    │  - User Presence     │
                    └──────────┬───────────┘
                               │
                     HTTP REST / WebSocket
                               │
                               ▼
                    ┌──────────────────────┐
                    │   FastAPI Backend    │
                    │       (Render)       │
                    │                      │
                    │  - Authentication    │
                    │  - Users             │
                    │  - Conversations     │
                    │  - Messages          │
                    │  - Groups            │
                    │  - Presence          │
                    │  - WebSocket Manager │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     PostgreSQL       │
                    │       (Render)       │
                    │                      │
                    │  Users               │
                    │  Conversations       │
                    │  Members             │
                    │  Messages            │
                    │  Contacts            │
                    │  Message Reads       │
                    └──────────────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

| Technology        | Purpose                        |
| ----------------- | ------------------------------ |
| **Next.js 14**    | Frontend application framework |
| **React 18**      | Building UI components         |
| **TypeScript**    | Type-safe development          |
| **Tailwind CSS**  | Styling and responsive UI      |
| **Fetch API**     | Backend API communication      |
| **WebSocket API** | Real-time communication        |

## Backend

| Technology            | Purpose                            |
| --------------------- | ---------------------------------- |
| **FastAPI**           | Python backend framework           |
| **SQLAlchemy**        | ORM for database operations        |
| **PostgreSQL**        | Production database                |
| **python-jose / JWT** | Authentication                     |
| **WebSockets**        | Real-time communication            |
| **bcrypt**            | Password hashing                   |
| **psycopg2-binary**   | PostgreSQL adapter                 |
| **uvicorn[standard]** | ASGI server with WebSocket support |

## Deployment

| Technology     | Purpose                        |
| -------------- | ------------------------------ |
| **Render**     | Backend hosting and PostgreSQL |
| **Vercel**     | Frontend hosting               |
| **GitHub**     | Version control                |
| **Cloudflare** | SSL/CDN infrastructure         |

---

# 🧩 System Architecture

The application is divided into logical layers.

```text
┌───────────────────────────────────────────────┐
│                  Frontend                     │
│                                               │
│  Pages → Components → State → API Requests   │
└───────────────────────┬───────────────────────┘
                        │
                        │ HTTP REST / WebSocket
                        ▼
┌───────────────────────────────────────────────┐
│                   Backend                     │
│                                               │
│ Routes → Controllers → Services → Database   │
│            WebSocket Manager                  │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│                  Database                     │
│                                               │
│ Users | Conversations | Members | Messages   │
│ Contacts | MessageReads | Reactions          │
└───────────────────────────────────────────────┘
```

This separation makes the application easier to maintain, debug, and extend.

---

# 📂 Project Structure

```text
signal/
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── chat/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── public/
│   ├── .env.local
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   └── tailwind.config.js
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── websocket_manager.py
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── conversation.py
│   │   │   ├── message.py
│   │   │   ├── contact.py
│   │   │   └── reaction.py
│   │   ├── api/
│   │   │   ├── auth.py
│   │   │   ├── contacts.py
│   │   │   ├── conversations.py
│   │   │   └── messages.py
│   │   └── services/
│   │       └── auth_service.py
│   ├── requirements.txt
│   └── .env
│
├── README.md
└── .gitignore
```

---

# 🔐 Authentication

Authentication is responsible for identifying users and protecting application functionality.

## Registration Flow

```text
User
 │
 ├── Register
 │       │
 │       ▼
 │   Backend
 │       │
 │       ▼
 │   User Created
 │       │
 │       ▼
 │   OTP Generated
 │       │
 │       ▼
 │   OTP Verified
 │       │
 │       ▼
 │   JWT Token Generated
 │
 └── Login
         │
         ▼
      Backend
         │
         ▼
   Credentials Verified
         │
         ▼
   JWT Token Generated
         │
         ▼
      Chat App
```

## JWT Token Flow

```text
1. User logs in.
2. Backend validates credentials.
3. Backend generates a JWT token.
4. Token is returned to the frontend.
5. Frontend stores the token.
6. Token is sent with protected API requests.
7. Backend validates the token.
8. Authorized resources are returned.
```

---

# 💬 Real-Time Messaging

Real-time messaging is one of the core features of Signal.

Instead of requiring users to refresh the page, WebSockets allow messages and other events to be delivered dynamically.

## Message Flow

```text
User A
  │
  │ Send Message
  ▼
Frontend WebSocket
  │
  ▼
Backend WebSocket Manager
  │
  ├── Validate Request
  │
  ├── Store Message
  │
  └── Broadcast Message
          │
          ▼
       User B
          │
          ▼
   Chat Interface Updated
```

## WebSocket Events

| Event       | Description                    |
| ----------- | ------------------------------ |
| `message`   | Send or receive a message      |
| `delivered` | Message delivery event         |
| `read`      | Message read event             |
| `typing`    | Typing indicator event         |
| `connect`   | Establish WebSocket connection |

---

# 👤 One-to-One Conversations

Users can communicate privately through individual conversations.

Each direct conversation contains:

* Conversation ID
* Conversation type
* Participant information
* Username
* Display name
* Online/offline status
* Message history

## Creating a Direct Conversation

```text
1. Click "+ New Chat".
2. Enter the recipient username.
3. Click "Start Chat".
4. Conversation is created.
5. The conversation appears in the sidebar.
6. Users can start exchanging messages.
```

---

# 👥 Group Conversations

The application supports group conversations containing multiple members.

## Group Message Flow

```text
                 ┌── User A
                 │
                 ├── User B
Group Message ───┼── User C
                 │
                 └── User D
```

## Creating a Group

```text
1. Click "+ New Group".
2. Enter a group name.
3. Enter member usernames.
4. Click "Create Group".
5. The group conversation is created.
6. Members can exchange messages in real time.
```

## Group Features

* Multiple members
* Group name
* Member roles
* Real-time messaging
* Member presence
* Group information

---

# 🟢 Online Presence

The application tracks whether users are currently online.

## How It Works

```text
1. User connects.
2. WebSocket connection is established.
3. User is marked as online.
4. Presence information is updated.
5. Conversation members can see the status.
6. User disconnects.
7. User is marked as offline.
```

## Status Indicators

```text
🟢 Online  - User is currently active
⚪ Offline - User is not currently active
```

---

# 🖥️ Frontend

The frontend provides the complete user-facing experience.

## Conversation Management

Users can:

* View conversations
* Select conversations
* Search conversations
* View user/group information
* View avatars
* View online status

## Chat Interface

The chat interface provides:

* Message history
* Sender information
* Message timestamps
* Delivery status
* Message input
* Send functionality
* Real-time updates
* Typing indicators

## Frontend State

The application manages state for:

* Current user
* Selected conversation
* Conversations
* Messages
* Members
* Online status
* Loading states
* Error states

## Direct Chat Modal

```text
+ New Chat
     │
     ▼
Enter Username
     │
     ▼
Start Chat
     │
     ▼
Conversation Created
```

## Group Chat Modal

```text
+ New Group
     │
     ▼
Group Name + Members
     │
     ▼
Create Group
     │
     ▼
Group Conversation Created
```

---

# ⚙️ Backend

The FastAPI backend acts as the central service responsible for business logic and data management.

## User Management

* User registration
* OTP verification
* Login
* JWT generation
* User lookup
* User profile data
* Password hashing

## Conversation Management

* Direct conversations
* Group conversations
* Conversation listing
* Conversation members
* Conversation information

## Message Management

* Sending messages
* Receiving messages
* Message persistence
* Message retrieval
* Delivery status
* Read receipts

## Group Management

* Group creation
* Member management
* Group information
* Group messaging
* Member roles

## WebSocket Manager

The WebSocket manager maintains active connections and broadcasts events to connected users.

```python
class ConnectionManager:
    - active_connections
    - connect(conversation_id, websocket)
    - disconnect(conversation_id, websocket)
    - broadcast(conversation_id, message)
```

---

# 🔄 API Communication

The frontend communicates with the backend using REST APIs and WebSockets.

## REST API Endpoints

| Method | Endpoint                      | Description                |
| ------ | ----------------------------- | -------------------------- |
| POST   | `/auth/register`              | Register a new user        |
| POST   | `/auth/login`                 | Login user                 |
| POST   | `/auth/verify-otp`            | Verify OTP                 |
| GET    | `/auth/me`                    | Get current user           |
| GET    | `/conversations`              | Get conversations          |
| POST   | `/conversations/direct`       | Create direct conversation |
| POST   | `/conversations/group`        | Create group               |
| GET    | `/messages/{id}`              | Get conversation messages  |
| GET    | `/contacts`                   | Get contacts               |
| POST   | `/contacts`                   | Add contact                |
| GET    | `/contacts/search/{username}` | Search users               |

## WebSocket Endpoint

```text
wss://signal-xnx9.onrender.com/ws/{conversation_id}
```

This endpoint is used for real-time messaging and conversation events.

---

# 🚀 Installation and Setup

## Prerequisites

Install the following:

* Node.js v18+
* npm v9+
* Python v3.10+
* pip v22+
* Git
* PostgreSQL for production

## Verify Installations

```bash
node --version
npm --version
python --version
pip --version
git --version
```

---

## Clone the Repository

```bash
git clone https://github.com/sarthak-agnihotri/signal.git
cd signal
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:3000
```

---

## Backend Setup

### Windows

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

### macOS / Linux

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

Backend:

```text
http://127.0.0.1:8001
```

Swagger API documentation:

```text
http://127.0.0.1:8001/docs
```

---

# 🔑 Environment Variables

## Frontend `.env.local`

### Production

```env
NEXT_PUBLIC_API_URL=https://signal-xnx9.onrender.com
NEXT_PUBLIC_WS_URL=wss://signal-xnx9.onrender.com
```

### Local Development

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8001
NEXT_PUBLIC_WS_URL=ws://127.0.0.1:8001
```

## Backend `.env`

```env
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-secret-key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

> **Important:** Never commit `.env` or `.env.local` files containing secrets to GitHub.

Add them to `.gitignore`:

```gitignore
.env
.env.local
venv/
__pycache__/
node_modules/
.next/
```

---

# ▶️ Running the Application

Both frontend and backend services must be running.

## Terminal 1 — Backend

```bash
cd backend

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

uvicorn app.main:app --reload --port 8001
```

## Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🧑‍💻 Usage

## Step 1 — Register

1. Open the application.
2. Select **Register**.
3. Enter username.
4. Enter password.
5. Enter display name.
6. Create the account.
7. Complete OTP verification.

For the demo environment, the OTP is:

```text
123456
```

## Step 2 — Login

1. Select **Login**.
2. Enter username.
3. Enter password.
4. Click **Login**.

## Step 3 — Start a Conversation

1. Click **+ New Chat**.
2. Enter the recipient username.
3. Click **Start Chat**.
4. Select the conversation.

## Step 4 — Send a Message

1. Open a conversation.
2. Type a message.
3. Press **Enter** or click the send button.
4. The message is delivered through WebSockets.

## Step 5 — Create a Group

1. Click **+ New Group**.
2. Enter a group name.
3. Enter member usernames.
4. Click **Create Group**.

## Step 6 — Observe Presence

```text
🟢 Green indicator → Online
No indicator       → Offline
```

---

# 🗄️ Database

The production application uses **PostgreSQL** with **SQLAlchemy ORM**.

## Database Schema

```text
┌─────────────┐     ┌─────────────────┐     ┌─────────────┐
│    Users    │     │  Conversations  │     │   Messages  │
├─────────────┤     ├─────────────────┤     ├─────────────┤
│ id          │────▶│ id              │◀────│ id          │
│ username    │     │ type            │     │ content     │
│ display_name│     │ name            │     │ sender_id   │
│ password_hash│    │ avatar_url      │     │ conversation_id
│ phone       │     │ created_at      │     │ status      │
│ is_active   │     │ updated_at      │     │ created_at  │
│ created_at  │     └─────────────────┘     └─────────────┘
│ updated_at  │             │
└─────────────┘             │
                            ▼
                  ┌────────────────────┐
                  │ ConversationMembers│
                  ├────────────────────┤
                  │ user_id            │
                  │ conversation_id    │
                  │ role               │
                  │ joined_at           │
                  └────────────────────┘
```

## Key Tables

| Table                  | Description                      |
| ---------------------- | -------------------------------- |
| `users`                | User accounts and authentication |
| `conversations`        | Direct and group conversations   |
| `conversation_members` | Users belonging to conversations |
| `messages`             | Sent messages                    |
| `contacts`             | User contact relationships       |
| `message_reads`        | Message read receipts            |
| `message_reactions`    | Message reactions                |

---

# 🔒 Security Considerations

## Implemented Security Measures

* **Password Hashing:** bcrypt
* **JWT Authentication:** Token-based authentication
* **HTTPS:** Encrypted production traffic
* **CORS:** Configured trusted origins
* **Input Validation:** Backend request validation
* **Environment Variables:** Secrets stored outside source code
* **SQL Injection Protection:** SQLAlchemy parameterized queries
* **PostgreSQL SSL:** Secure production database connection

## Important Security Disclaimer

Although this project is inspired by Signal, it does **not** implement the production Signal Protocol or independently audited end-to-end encryption.

The application should therefore **not be used for sensitive communications or presented as a secure Signal Protocol implementation**.

---

# ❌ Error Handling

The application handles common errors gracefully.

| Error                | Handling                      |
| -------------------- | ----------------------------- |
| Invalid credentials  | Displays login error          |
| Registration error   | Displays validation error     |
| API failure          | Displays request error        |
| Backend unavailable  | Displays connection error     |
| Network failure      | Displays network error        |
| Empty message        | Prevents sending              |
| Unauthorized request | Redirects to login            |
| Invalid conversation | Displays conversation error   |
| User not found       | Displays user-not-found error |

---

# 🧠 Real-World Challenges Solved

## 1. WebSocket Deployment on Render

### Challenge

WebSocket connections initially failed after deployment.

Example error:

```text
WARNING: No supported WebSocket library detected
```

### Solution

Added WebSocket-compatible dependencies:

```text
uvicorn[standard]
websockets
wsproto
```

This enabled the FastAPI application to support WebSocket connections in production.

---

## 2. CORS Configuration

### Challenge

The Vercel frontend was initially blocked from accessing the Render backend.

Example:

```text
Access to fetch at 'https://signal-xnx9.onrender.com/auth/login'
from origin 'https://signal-indol-xi.vercel.app'
has been blocked by CORS policy
```

### Solution

Configured trusted frontend and backend origins:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://signal-indol-xi.vercel.app",
        "https://signal-xnx9.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 3. PostgreSQL Persistence

### Challenge

Using local SQLite during development caused production data to be lost or reset when the application environment changed.

### Solution

Configured PostgreSQL for production using an environment variable:

```python
DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL:
    engine = create_engine(DATABASE_URL)
else:
    engine = create_engine("sqlite:///./cipherchat.db")
```

This allows local development and production deployment to use different database configurations.

---

## 4. Vercel Environment Variables

### Challenge

Local `.env.local` values are not automatically available in Vercel production.

### Solution

Configured production environment variables directly in the Vercel project:

```text
NEXT_PUBLIC_API_URL
NEXT_PUBLIC_WS_URL
```

---

## 5. bcrypt Compatibility

### Challenge

Password hashing compatibility issues occurred with bcrypt and authentication dependencies.

### Solution

Password hashing was handled using bcrypt-compatible functionality with password length validation.

```python
def hash_password(password: str) -> str:
    if len(password) > 72:
        password = password[:72]

    return bcrypt.hash(password)
```

---

# 🔮 Future Improvements

## 💬 Messaging

* Message reactions
* Message editing
* Message deletion
* Reply to messages
* Message forwarding
* Message search
* Improved read receipts
* Typing indicators
* Advanced delivery status

## 📁 Media

* Image sharing
* Video sharing
* Document sharing
* Voice messages
* File upload progress
* Media previews

## 👥 Groups

* Group administrators
* Add/remove members
* Leave group
* Group permissions
* Group description
* Group avatars
* Group settings

## 🎨 User Experience

* Dark/light theme
* Improved mobile interface
* Push notifications
* Better loading states
* Message pagination
* Infinite scrolling

## 🔐 Security

* Signal Protocol implementation
* End-to-end encryption
* Refresh token architecture
* Rate limiting
* Secure session management
* Device management

## ☁️ Infrastructure

* Docker containerization
* CI/CD pipeline
* Automated tests
* Centralized logging
* Monitoring
* Alerts
* Horizontal scaling
* WebSocket load balancing

---

# 📚 Learning Outcomes

This project provided practical experience in full-stack software development.

## Frontend Development

* React components
* React hooks
* Next.js App Router
* TypeScript
* Tailwind CSS
* State management
* REST API integration
* WebSocket client integration
* Responsive UI development

## Backend Development

* FastAPI
* REST API development
* JWT authentication
* WebSockets
* SQLAlchemy
* PostgreSQL
* Password hashing
* Request validation
* Database operations
* Environment configuration

## Full-Stack Development

* Frontend/backend integration
* Client-server architecture
* API design
* Authentication flows
* Real-time communication
* State management
* Error handling
* Production deployment

## Software Engineering

* Git and GitHub
* Project organization
* Debugging
* Documentation
* Environment management
* Deployment
* Feature development

---

# 📈 Scalability

For a larger production system, the architecture could be extended using load balancing, multiple backend instances, a message broker, caching, database optimization, and distributed WebSocket infrastructure.

```text
                     Load Balancer
                          │
             ┌────────────┼────────────┐
             ▼            ▼            ▼
         Backend       Backend       Backend
         Server 1      Server 2      Server 3
             │            │            │
             └────────────┼────────────┘
                          │
                    Message Broker
                          │
                          ▼
                       Database
```

Potential technologies for future scaling include:

* Redis
* Message queues
* Database indexing
* Caching
* Horizontal scaling
* WebSocket load balancing
* CDN integration

---

# 🧪 Testing

## Authentication Testing

* Register a new user
* Test invalid registration data
* Login with valid credentials
* Login with invalid credentials
* Verify OTP
* Test unauthorized access

## Messaging Testing

* Send a message
* Receive a message in real time
* Verify message persistence
* Switch between conversations
* Test empty messages
* Test backend connectivity

## Group Testing

* Create a group
* Add members
* Send group messages
* Verify group information
* Verify member information
* Verify group conversation loading

## Presence Testing

* Open the application with multiple users
* Verify online status
* Disconnect a user
* Verify offline status
* Reconnect the user
* Verify online status again

---

# 🚀 Deployment

The application is deployed using:

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** Render PostgreSQL
* **Repository:** GitHub

## Backend Deployment — Render

1. Push the project to GitHub.
2. Create a Web Service on Render.
3. Connect the GitHub repository.
4. Configure the backend root directory.
5. Add environment variables.
6. Configure the build/start commands.
7. Deploy the service.
8. Verify the API documentation.

Required environment variables:

```text
DATABASE_URL
JWT_SECRET
JWT_ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES
```

## Frontend Deployment — Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Set the root directory to `frontend`.
4. Configure environment variables.
5. Deploy the project.
6. Verify API and WebSocket communication.

Required environment variables:

```text
NEXT_PUBLIC_API_URL
NEXT_PUBLIC_WS_URL
```

## PostgreSQL Deployment

1. Create a PostgreSQL database on Render.
2. Obtain the database connection URL.
3. Add it to the backend environment variables.
4. Deploy the backend.
5. Verify database connectivity.
6. Verify table creation and persistence.

## Current Live URLs

| Service               | URL                                   |
| --------------------- | ------------------------------------- |
| **Frontend**          | https://signal-indol-xi.vercel.app    |
| **Backend API**       | https://signal-xnx9.onrender.com      |
| **API Documentation** | https://signal-xnx9.onrender.com/docs |

---

# 🤝 Contributing

Contributions are welcome.

## 1. Fork the Repository

```bash
git fork <repository>
```

## 2. Clone Your Fork

```bash
git clone <your-fork-url>
```

## 3. Create a Feature Branch

```bash
git checkout -b feature/your-feature
```

## 4. Make Your Changes

Implement and test the feature.

## 5. Commit Your Changes

```bash
git add .
git commit -m "Add your feature"
```

## 6. Push the Branch

```bash
git push origin feature/your-feature
```

## 7. Open a Pull Request

Create a Pull Request describing the changes.

---

# 📄 License

This project is intended for educational and portfolio purposes.

MIT License.

```text
Copyright (c) 2026 Sarthak Agnihotri

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

# 👨‍💻 Author

## Sarthak Agnihotri

**B.Tech — Computer Science & Engineering**

### Interests

* Full-Stack Development
* MERN Stack
* Backend Development
* Cloud & DevOps
* Software Engineering

### Connect

| Platform      | Link                                      |
| ------------- | ----------------------------------------- |
| **GitHub**    | https://github.com/sarthak-agnihotri      |
| **LinkedIn**  | https://linkedin.com/in/sarthak-agnihotri |
| **Portfolio** | https://sarthakagnihotri.dev/             |

---

# ⭐ Project Summary

**Signal** is a full-stack real-time messaging application demonstrating the development of a modern communication platform using:

* Next.js
* React
* TypeScript
* Tailwind CSS
* FastAPI
* PostgreSQL
* SQLAlchemy
* JWT authentication
* WebSockets
* Vercel
* Render

The project demonstrates practical software engineering concepts including authentication, REST APIs, real-time communication, database persistence, conversation management, group messaging, online presence, error handling, and production deployment.

The architecture is designed to provide a strong foundation for future features such as media sharing, notifications, end-to-end encryption, automated testing, Docker, CI/CD, monitoring, and horizontal scaling.

---

## ⭐ If You Found This Project Useful

Consider giving the repository a ⭐ on GitHub!

---

**Built with ❤️ by Sarthak Agnihotri**
