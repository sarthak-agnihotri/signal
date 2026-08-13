markdown
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

- [About the Project](#-about-the-project)
- [Live Demo](#-live-demo)
- [Project Objectives](#-project-objectives)
- [Features](#-features)
- [Application Overview](#-application-overview)
- [Technology Stack](#-technology-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Core Functionality](#-core-functionality)
- [Authentication](#-authentication)
- [Real-Time Messaging](#-real-time-messaging)
- [One-to-One Conversations](#-one-to-one-conversations)
- [Group Conversations](#-group-conversations)
- [Online Presence](#-online-presence)
- [Frontend](#-frontend)
- [Backend](#-backend)
- [API Communication](#-api-communication)
- [Installation and Setup](#-installation-and-setup)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [Usage](#-usage)
- [Screenshots](#-screenshots)
- [Database](#-database)
- [Security Considerations](#-security-considerations)
- [Error Handling](#-error-handling)
- [Real-World Challenges Solved](#-real-world-challenges-solved)
- [Future Improvements](#-future-improvements)
- [Learning Outcomes](#-learning-outcomes)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

# 📱 About the Project

**Signal** is a full-stack real-time messaging application inspired by the core user experience of modern secure messaging platforms.

The application allows users to communicate through individual conversations as well as group conversations. It provides a responsive chat interface where users can view conversations, send messages, see other users' online status, and participate in groups.

The project was developed as a practical full-stack application to demonstrate the implementation of:

- User authentication with JWT
- Real-time communication via WebSockets
- One-to-one and group messaging
- Conversation management
- User presence (online/offline status)
- REST API communication
- Modern frontend development with Next.js
- Backend API development with FastAPI
- PostgreSQL database integration
- Production deployment on Render and Vercel

> **Note:** This project is a learning/portfolio implementation inspired by Signal's messaging experience. It is not the official Signal application.

---

# 🌐 Live Demo

The application is fully deployed and accessible online:

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | [https://signal-indol-xi.vercel.app](https://signal-indol-xi.vercel.app) | ✅ Live |
| **Backend API** | [https://signal-xnx9.onrender.com](https://signal-xnx9.onrender.com) | ✅ Live |
| **API Documentation** | [https://signal-xnx9.onrender.com/docs](https://signal-xnx9.onrender.com/docs) | ✅ Live |

### 🧪 Test Credentials
Username: testuser7
Password: securepassword123

text

> **Note:** You can also register your own account using the registration page.

---

# 🎯 Project Objectives

The main objective of the project is to build a functional real-time messaging platform while applying concepts from full-stack software development.

### Primary Objectives

1. Build a modern messaging interface with Next.js
2. Implement secure user authentication with JWT
3. Allow users to communicate in real time via WebSockets
4. Support one-to-one conversations
5. Support group conversations with multiple members
6. Display user online/offline status
7. Maintain conversation and message state
8. Connect a modern frontend with a REST API
9. Create a scalable project structure
10. Deploy to production on Render and Vercel

---

# ✨ Features

## 👤 User Features

- User registration with OTP verification
- User login with JWT authentication
- User profile information
- Display name support
- User avatar support
- Online/offline status tracking
- Secure password hashing with bcrypt

## 💬 Messaging Features

- Send and receive messages in real time
- Conversation history persistence
- Individual (one-to-one) conversations
- Group conversations with multiple members
- Message timestamps
- Dynamic conversation updates
- Message delivery status

## 👥 Group Features

- Create group conversations
- Add multiple members to groups
- Group name support
- Display group members
- Group messaging
- Role-based member management

## 🟢 Presence Features

- Real-time online status
- Offline status detection
- Conversation member status display
- Active member visibility

## 🎨 UI Features

- Modern messaging interface
- Conversation sidebar with search
- Chat window with message history
- Message composer with enter key support
- User information display
- Group information display
- Responsive layout
- Clean navigation
- Real-time UI updates

---

# 🏗️ Application Overview

The application follows a client-server architecture with real-time capabilities.

```text
                    ┌──────────────────────┐
                    │      User / Client   │
                    └──────────┬───────────┘
                               │
                               │ HTTPS / WSS
                               ▼
                    ┌──────────────────────┐
                    │   Next.js Frontend   │
                    │   (Vercel)           │
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
                    │   (Render)           │
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
                    │   PostgreSQL         │
                    │   (Render)           │
                    │                      │
                    │  Users               │
                    │  Conversations       │
                    │  ConversationMembers │
                    │  Messages            │
                    │  Contacts            │
                    │  MessageReads        │
                    └──────────────────────┘
🛠️ Technology Stack
Frontend
Technology	Purpose
Next.js 14	Frontend application framework
React 18	Building UI components
TypeScript	Type-safe development
Tailwind CSS	Styling and responsive UI
Fetch API	Backend API communication
WebSocket API	Real-time messaging
Backend
Technology	Purpose
FastAPI	Python backend framework
SQLAlchemy	ORM for database operations
PostgreSQL	Production database
JWT (python-jose)	Authentication
WebSockets	Real-time communication
bcrypt	Password hashing
psycopg2-binary	PostgreSQL adapter
uvicorn[standard]	ASGI server with WebSocket support
Deployment
Technology	Purpose
Render	Backend hosting + PostgreSQL
Vercel	Frontend hosting
GitHub	Version control
Cloudflare	SSL/CDN
🧩 System Architecture
The application is divided into multiple logical layers.

text
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
This separation makes the application easier to maintain and extend.

📂 Project Structure
text
signal/
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx              # Login/Register page
│   │   ├── chat/
│   │   │   └── page.tsx          # Main chat interface
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
│   │   ├── main.py               # FastAPI application
│   │   ├── database.py           # Database connection
│   │   ├── websocket_manager.py  # WebSocket connection manager
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
🔐 Authentication
Authentication is responsible for identifying users and protecting application functionality.

Registration Flow
text
User
 │
 ├── Register (username, password, display_name)
 │       │
 │       ▼
 │   Backend
 │       │
 │       ▼
 │   User Created
 │       │
 │       ▼
 │   OTP Generated (123456 for demo)
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
     Credentials
       Verified
         │
         ▼
   JWT Token Generated
         │
         ▼
      Chat App
JWT Token Flow
text
1. User logs in → Backend validates credentials
2. Backend generates JWT token with user_id
3. Token sent to frontend
4. Frontend stores token in localStorage
5. Token included in Authorization header for subsequent requests
6. Backend validates token on protected routes
💬 Real-Time Messaging
Real-time messaging is one of the main features of the application. Instead of requiring the user to continuously refresh the page, messages are delivered and reflected in the interface dynamically.

Message Flow
text
User A
  │
  │ Send Message
  ▼
Frontend (WebSocket)
  │
  ▼
Backend (WebSocket Manager)
  │
  ├── Validate Request
  │
  ├── Store Message in Database
  │
  └── Broadcast to Conversation
          │
          ▼
       User B
          │
          ▼
   Chat Interface Updated
WebSocket Events
Event Type	Description
message	Send a new message
delivered	Mark message as delivered
read	Mark message as read
typing	User typing indicator
connect	Connect user to WebSocket
👤 One-to-One Conversations
Users can communicate privately through individual conversations.

Each conversation contains:

Conversation ID

Conversation type (DIRECT)

Other participant information

Username and display name

Online/offline status

Messages

The frontend dynamically loads the selected conversation and displays its messages.

Creating a Direct Conversation
text
1. Click "+ New Chat" button
2. Enter username of recipient
3. Click "Start Chat"
4. Conversation is created instantly
5. Start sending messages!
👥 Group Conversations
The application also supports group conversations. A group can contain multiple members.

Group Message Flow
text
                 ┌── User A
                 │
                 ├── User B
Group Message ───┼── User C
                 │
                 └── User D
Creating a Group
text
1. Click "+ New Group" button
2. Enter group name
3. Enter member usernames (comma-separated)
4. Click "Create Group"
5. All members can now send messages
Group Features
Multiple members

Group name

Member roles

Real-time messaging

Member online status

🟢 Online Presence
The application keeps track of whether users are currently online.

How It Works
text
1. User connects → WebSocket established
2. User marked as online in database
3. Online status broadcast to conversation members
4. Frontend displays status indicators
5. User disconnects → WebSocket closed
6. User marked as offline
Status Indicators
text
🟢 Online  - User is currently active
⚪ Offline - User is not currently active
🖥️ Frontend
The frontend is responsible for the complete user-facing experience.

Conversation Management
The conversation panel allows users to:

View all conversations

Select conversations

View conversation names

View user/group avatars

See online status

Search conversations

Chat Interface
The chat area provides:

Message history

Message sender information

Message timestamps

Message delivery status

Message input

Send functionality

Dynamic updates

Typing indicators

User Interface State
The frontend maintains state for:

Current user

Selected conversation

Conversations list

Messages

Members

Online status

Loading states

Error states

Direct Chat Modal
text
+ New Chat Button → Modal → Enter Username → Start Chat
Group Chat Modal
text
+ New Group Button → Modal → Group Name + Members → Create Group
⚙️ Backend
The backend acts as the central service responsible for application logic.

User Management
Registration with OTP verification

Login with JWT generation

User lookup by username

User profile data

Password hashing with bcrypt

Conversation Management
Creating direct conversations

Creating group conversations

Fetching user conversations

Finding conversation members

Loading conversation information

Message Management
Sending messages via WebSocket

Storing messages in database

Retrieving messages by conversation

Message delivery status

Message read receipts

Group Management
Creating groups

Adding members

Managing group information

Handling group messages

Member role management

WebSocket Manager
python
class ConnectionManager:
    - active_connections: Dict[int, List[WebSocket]]
    - connect(conversation_id, websocket)
    - disconnect(conversation_id, websocket)
    - broadcast(conversation_id, message)
🔄 API Communication
The frontend communicates with the backend through HTTP API requests and WebSocket connections.

REST API Endpoints
Method	Endpoint	Description
POST	/auth/register	Register new user
POST	/auth/login	Login user
POST	/auth/verify-otp	Verify OTP
GET	/auth/me	Get current user
GET	/conversations	Get all conversations
POST	/conversations/direct	Create direct conversation
POST	/conversations/group	Create group conversation
GET	/messages/{id}	Get messages by conversation
GET	/contacts	Get contacts
POST	/contacts	Add contact
GET	/contacts/search/{username}	Search users
WebSocket Endpoint
Endpoint	Description
wss://signal-xnx9.onrender.com/ws/{conversation_id}	WebSocket connection for real-time messaging
🚀 Installation and Setup
Prerequisites
Before running the project, make sure the following are installed:

Node.js (v18 or higher)

npm (v9 or higher)

Python (v3.10 or higher)

pip (v22 or higher)

Git

PostgreSQL (for production) or SQLite (for development)

Verify Installations
bash
node --version
npm --version
python --version
pip --version
git --version
Clone the Repository
bash
git clone https://github.com/sarthak-agnihotri/signal.git
cd signal
Frontend Setup
bash
cd frontend
npm install
npm run dev
The frontend will be available at: http://localhost:3000

Backend Setup
bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
The backend API will be available at: http://127.0.0.1:8001

API Documentation: http://127.0.0.1:8001/docs

🔑 Environment Variables
Frontend (.env.local)
env
NEXT_PUBLIC_API_URL=https://signal-xnx9.onrender.com
NEXT_PUBLIC_WS_URL=wss://signal-xnx9.onrender.com
For Local Development
env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8001
NEXT_PUBLIC_WS_URL=ws://127.0.0.1:8001
Backend (.env or Render Environment Variables)
env
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-secret-key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
Important: Never commit secrets to GitHub. Add .env and .env.local to .gitignore.

▶️ Running the Application
The application requires both frontend and backend services running simultaneously.

Terminal 1 — Backend
bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn app.main:app --reload --port 8001
Terminal 2 — Frontend
bash
cd frontend
npm run dev
Access the Application
Open your browser and navigate to:

text
http://localhost:3000
🧑‍💻 Usage
Step 1 — Register
Open the application

Click on "Register" tab

Enter:

Username

Password

Display Name

Click "Create account"

Enter OTP: 123456 (demo)

Step 2 — Login
Click on "Login" tab

Enter your username and password

Click "Login"

Step 3 — Start a Conversation
Click "+ New Chat" button

Enter the username of the person you want to chat with

Click "Start Chat"

Step 4 — Send a Message
Select a conversation from the sidebar

Type your message in the input box

Press Enter or click the send button (➤)

Step 5 — Create a Group
Click "+ New Group" button

Enter a group name

Enter member usernames separated by commas

Click "Create Group"

Step 6 — Observe Presence
🟢 Green dot next to a user's name = Online

No dot = Offline

📸 Screenshots
Login Page
text
┌─────────────────────────────────────┐
│  💬                                 │
│  Signal                             │
│  Simple. Private. Connected.        │
│                                      │
│  ┌──────────────┐  ┌─────────────┐ │
│  │    Login     │  │   Register  │ │
│  └──────────────┘  └─────────────┘ │
│                                      │
│  Username                           │
│  [__________________________]       │
│                                      │
│  Password                           │
│  [__________________________]       │
│                                      │
│  [      Login      ]                │
│                                      │
│  🔒 Privacy first                   │
│  Your conversations are protected   │
└─────────────────────────────────────┘
Chat Interface
text
┌──────────────┬───────────────────────────────────────┐
│ Signal       │  🔍 Search conversations              │
│ @testuser7   │                                      │
│              │  Test User 8                         │
│              │  Online                              │
│ 🚪          │                                      │
│              │  🔐 Messages are simulated encrypted │
│ Search...    │                                      │
│              │  ┌──────────────────────────┐       │
│ Test User 8  │  │ Hello! How are you?      │       │
│ Online       │  └──────────────────────────┘       │
│              │                                      │
│              │  ┌──────────────────────────┐       │
│              │  │ I'm good, thanks!        │       │
│              │  └──────────────────────────┘       │
│              │                                      │
│              │  [Type a message...]          [➤]   │
│              │                                      │
│ + New Chat   │                                      │
│ + New Group  │                                      │
└──────────────┴───────────────────────────────────────┘
🗄️ Database
The application uses PostgreSQL for production with SQLAlchemy ORM.

Schema Diagram
text
┌─────────────┐     ┌─────────────────┐     ┌─────────────┐
│    Users    │     │  Conversations  │     │   Messages  │
├─────────────┤     ├─────────────────┤     ├─────────────┤
│ id          │────▶│ id              │◀────│ id          │
│ username    │     │ type            │     │ content     │
│ display_name│     │ name            │     │ sender_id   │
│ password_hash│    │ avatar_url      │     │ conversation_id│
│ phone       │     │ created_at      │     │ status      │
│ is_active   │     │ updated_at      │     │ created_at  │
│ created_at  │     └─────────────────┘     └─────────────┘
│ updated_at  │            │
└─────────────┘            │
                           │
                    ┌──────▼───────┐
                    │ Conversation │
                    │   Members    │
                    ├──────────────┤
                    │ user_id      │
                    │ conversation_id│
                    │ role         │
                    │ joined_at    │
                    └──────────────┘
Key Tables
Table	Description
users	User accounts and authentication
conversations	Direct and group conversations
conversation_members	Users in conversations
messages	All sent messages
contacts	User contact lists
message_reads	Read receipts
message_reactions	Message reactions
🔒 Security Considerations
Implemented Security Measures
Password Hashing: bcrypt for secure password storage

JWT Authentication: Secure token-based authentication

HTTPS: All production traffic encrypted

CORS: Configured to allow only trusted origins

Input Validation: Request validation on backend

Environment Variables: Secrets stored outside codebase

SQL Injection Prevention: SQLAlchemy ORM with parameterized queries

SSL: Render PostgreSQL requires SSL

Important Security Note
Although this project is inspired by Signal, it should not be represented as implementing Signal's production-grade end-to-end encryption unless the actual Signal Protocol and associated cryptographic architecture have been correctly implemented and independently reviewed.

❌ Error Handling
The application gracefully handles common errors:

Error	Handling
Invalid login credentials	Show "Invalid username or password"
Registration errors	Show validation errors
Failed API requests	Show error messages
Backend unavailable	Show "Unable to connect"
Network failures	Show "Network error"
Empty messages	Prevent sending
Unauthorized requests	Redirect to login
Invalid conversation IDs	Show "Conversation not found"
User not found	Show "User does not exist"
🧠 Real-World Challenges Solved
1. WebSocket Deployment on Render
Challenge: WebSocket connections failing with 404

Error Log:

text
WARNING: No supported WebSocket library detected
Solution:

txt
# Added to requirements.txt
uvicorn[standard]==0.52.2
websockets==14.1
wsproto==1.2.0
2. CORS Configuration
Challenge: Frontend blocked from accessing backend

Error:

text
Access to fetch at 'https://signal-xnx9.onrender.com/auth/login' 
from origin 'https://signal-indol-xi.vercel.app' has been blocked 
by CORS policy
Solution:

python
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
3. PostgreSQL Connection
Challenge: Data resetting on every deploy

Solution:

python
DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL:
    engine = create_engine(DATABASE_URL)
else:
    engine = create_engine("sqlite:///./cipherchat.db")
4. Environment Variables in Vercel
Challenge: .env.local ignored by Git and Vercel

Solution:

Set NEXT_PUBLIC_API_URL and NEXT_PUBLIC_WS_URL in Vercel dashboard

Environment variables now work in production

5. bcrypt Password Hashing Compatibility
Challenge: Password hashing failing with newer bcrypt versions

Solution:

python
# Fixed by using direct bcrypt import
from passlib.hash import bcrypt

def hash_password(password: str) -> str:
    if len(password) > 72:
        password = password[:72]
    return bcrypt.hash(password)
🔮 Future Improvements
Messaging
Message reactions (👍, ❤️, etc.)

Message editing and deletion

Reply to specific messages

Forward messages

Message search

Read receipts with timestamps

Typing indicators (UI implemented)

Message delivery status (✓, ✓✓)

Media
Image sharing and preview

Video sharing

Document sharing

Voice messages

File upload progress bars

Groups
Group administrators

Add/remove members

Leave group

Group permissions

Group description

Group settings and avatars

User Experience
Dark/light theme toggle

Better responsive mobile UI

Push notifications

Better loading states

Message pagination

Infinite scrolling

Security
End-to-end encryption (Signal Protocol)

Refresh token architecture

Rate limiting

Secure session management

Device management

Infrastructure
Docker containerization

CI/CD pipeline

Automated testing

Production logging

Monitoring and alerts

Horizontal scaling

WebSocket load balancing

📚 Learning Outcomes
This project helped demonstrate practical knowledge of:

Frontend Development
React components and hooks

Next.js App Router

TypeScript type safety

Tailwind CSS styling

State management

API integration

Responsive UI design

WebSocket client integration

Backend Development
FastAPI framework

REST API design

JWT authentication

WebSocket implementation

SQLAlchemy ORM

Password hashing with bcrypt

Request validation

Database operations

Environment configuration

Full-Stack Development
Frontend-backend integration

Client-server architecture

API design principles

Data flow management

Error handling

Authentication flow

Real-time communication

Software Engineering
Git and GitHub

Project organization

Environment configuration

Debugging

Documentation

Feature development

Production deployment

🧠 Challenges Solved
During development, several practical challenges were addressed:

1. Real-Time Communication
Building a messaging interface that updates dynamically requires coordination between the frontend and backend via WebSockets.

2. Conversation State
The application needs to maintain the correct conversation while users switch between different chats.

3. Group Members
Groups require additional logic for managing multiple users and their roles.

4. Online Presence
User presence needs to be reflected dynamically in the interface.

5. Frontend and Backend Integration
The frontend and backend must consistently exchange correctly structured data.

6. UI State Management
The application needs to manage multiple states simultaneously:

Current User

Selected Conversation

Messages

Conversations

Members

Online Status

Loading State

Error State

📈 Scalability Improvements
For a larger production system, the architecture could be extended with:

text
                 Load Balancer
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
       Backend      Backend      Backend
       Server 1     Server 2     Server 3
          │            │            │
          └────────────┼────────────┘
                       │
                Message Broker
                       │
                       ▼
                    Database
A message broker and distributed real-time infrastructure could be introduced when the number of concurrent users increases.

Caching, database indexing, pagination, connection management, and horizontal scaling would also become important.

🧪 Testing
Authentication Testing
Register a new user

Attempt registration with invalid information

Login with valid credentials

Login with invalid credentials

Verify authenticated access

Messaging Testing
Send a message

Receive a message in real time

Verify message persistence

Verify conversation updates

Test empty message handling

Group Testing
Create a group

Add members

Send group messages

Verify member information

Verify group conversation loading

Presence Testing
Open application with multiple users

Verify online status

Close/logout a user

Verify offline status

🚀 Deployment
The project is deployed on Render (backend) and Vercel (frontend).

Backend (Render)
Push code to GitHub

Create Web Service on Render

Connect to GitHub repository

Add Environment Variables:

DATABASE_URL

JWT_SECRET

Deploy automatically on push

Frontend (Vercel)
Push code to GitHub

Import project to Vercel

Set root directory to frontend

Add Environment Variables:

NEXT_PUBLIC_API_URL

NEXT_PUBLIC_WS_URL

Auto-deploys on push

Database (Render PostgreSQL)
Create PostgreSQL database on Render

Get Internal Database URL

Add to backend environment variables

Tables created automatically on startup

Current Live URLs
Service	URL
Frontend	https://signal-indol-xi.vercel.app
Backend API	https://signal-xnx9.onrender.com
API Documentation	https://signal-xnx9.onrender.com/docs
🤝 Contributing
Contributions are welcome!

1. Fork the Repository
bash
git fork <repository>
2. Clone Your Fork
bash
git clone <your-fork-url>
3. Create a Feature Branch
bash
git checkout -b feature/your-feature
4. Make Your Changes
Implement and test your feature.

5. Commit Your Changes
bash
git add .
git commit -m "Add your feature"
6. Push the Branch
bash
git push origin feature/your-feature
7. Open a Pull Request
Create a Pull Request describing your changes.

📄 License
This project is intended for educational and portfolio purposes.

MIT License

Copyright (c) 2024 Sarthak Agnihotri

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

👨‍💻 Author
Sarthak Agnihotri
B.Tech Computer Science & Engineering

Interests
Full-Stack Development

MERN Stack

Backend Development

Cloud & DevOps

Software Engineering

Connect
Platform	Link
GitHub	github.com/sarthak-agnihotri
LinkedIn	linkedin.com/in/sarthak-agnihotri
Portfolio	sarthakagnihotri.dev
⭐ Project Summary
Signal is a full-stack real-time messaging application that demonstrates the development of a modern communication platform using a frontend application, backend API, persistent data storage, authentication, real-time messaging, conversations, groups, and online presence.

The project focuses on practical software engineering principles and provides a foundation that can be extended with advanced messaging, media sharing, notifications, security, testing, and production deployment capabilities.

⭐ If you found this project useful
Consider giving the repository a ⭐ on GitHub!

Built with ❤️ by Sarthak Agnihotri
