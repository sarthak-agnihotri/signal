# Signal — Real-Time Messaging Application

> A full-stack real-time messaging application inspired by Signal, built to demonstrate modern web development concepts including authentication, one-to-one messaging, group conversations, online presence, and real-time communication.

![Signal](https://img.shields.io/badge/Project-Signal-blue)
![Frontend](https://img.shields.io/badge/Frontend-Next.js-black)
![Backend](https://img.shields.io/badge/Backend-API-green)
![Real-Time](https://img.shields.io/badge/Communication-Real--Time-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📌 Table of Contents

* [About the Project](#-about-the-project)
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
* [Screenshots](#-screenshots)
* [Database](#-database)
* [Security Considerations](#-security-considerations)
* [Error Handling](#-error-handling)
* [Future Improvements](#-future-improvements)
* [Learning Outcomes](#-learning-outcomes)
* [Challenges Solved](#-challenges-solved)
* [Testing](#-testing)
* [Deployment](#-deployment)
* [Contributing](#-contributing)
* [License](#-license)
* [Author](#-author)

---

# 📱 About the Project

**Signal** is a full-stack real-time messaging application inspired by the core user experience of modern secure messaging platforms.

The application allows users to communicate through individual conversations as well as group conversations. It provides a responsive chat interface where users can view conversations, send messages, see other users' online status, and participate in groups.

The project was developed as a practical full-stack application to demonstrate the implementation of:

* User authentication
* Real-time communication
* One-to-one messaging
* Group messaging
* Conversation management
* User presence
* REST API communication
* Modern frontend development
* Backend API development
* State management
* Responsive UI design

> **Note:** This project is a learning/portfolio implementation inspired by Signal's messaging experience. It is not the official Signal application and should not be considered a production implementation of Signal's end-to-end encryption protocol.

---

# 🎯 Project Objectives

The main objective of the project is to build a functional real-time messaging platform while applying concepts from full-stack software development.

### Primary objectives

1. Build a modern messaging interface.
2. Implement user authentication.
3. Allow users to communicate in real time.
4. Support one-to-one conversations.
5. Support group conversations.
6. Display user online/offline status.
7. Maintain conversation and message state.
8. Connect a modern frontend with a backend API.
9. Create a scalable project structure.
10. Provide a clean and intuitive user experience.

---

# ✨ Features

## 👤 User Features

* User registration
* User login
* User authentication
* User profile information
* Display name
* User avatar
* Online/offline status
* User identification

## 💬 Messaging Features

* Send messages
* Receive messages
* Real-time communication
* Conversation history
* Individual conversations
* Group conversations
* Message timestamps
* Dynamic conversation updates

## 👥 Group Features

* Create group conversations
* Add members to groups
* Display group name
* Display group avatar
* View group members
* Group roles
* Group messaging

## 🟢 Presence Features

* Online status
* Offline status
* Real-time user presence
* Conversation member status

## 🎨 UI Features

* Modern messaging interface
* Conversation sidebar
* Chat window
* Message composer
* User information display
* Group information
* Responsive layout
* Clean navigation
* Real-time UI updates

---

# 🏗️ Application Overview

The application follows a client-server architecture.

```text
                    ┌──────────────────────┐
                    │      User / Client   │
                    └──────────┬───────────┘
                               │
                               │
                               ▼
                    ┌──────────────────────┐
                    │     Next.js Frontend │
                    │                      │
                    │  - Login/Register    │
                    │  - Conversations     │
                    │  - Chat Interface    │
                    │  - Groups            │
                    │  - User Presence     │
                    └──────────┬───────────┘
                               │
                         HTTP / Real-Time
                               │
                               ▼
                    ┌──────────────────────┐
                    │      Backend API     │
                    │                      │
                    │  - Authentication    │
                    │  - Users             │
                    │  - Conversations     │
                    │  - Messages          │
                    │  - Groups            │
                    │  - Presence          │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       Database       │
                    │                      │
                    │  Users               │
                    │  Conversations       │
                    │  Members             │
                    │  Messages             │
                    └──────────────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

| Technology          | Purpose                        |
| ------------------- | ------------------------------ |
| Next.js             | Frontend application framework |
| React               | Building UI components         |
| TypeScript          | Type-safe development          |
| CSS / Tailwind CSS  | Styling and responsive UI      |
| Fetch / HTTP Client | Backend API communication      |

## Backend

The backend provides the application's API and handles business logic such as:

* Authentication
* User management
* Conversations
* Messages
* Groups
* Members
* Online presence

## Database

The backend uses a persistent database to store application data such as:

* Users
* Conversations
* Conversation members
* Messages
* Groups
* User relationships

---

# 🧩 System Architecture

The application is divided into multiple logical layers.

```text
┌───────────────────────────────────────────────┐
│                  Frontend                     │
│                                               │
│  Pages → Components → State → API Requests   │
└───────────────────────┬───────────────────────┘
                        │
                        │ HTTP / Real-Time
                        ▼
┌───────────────────────────────────────────────┐
│                   Backend                     │
│                                               │
│ Routes → Controllers → Services → Database   │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│                  Database                     │
│                                               │
│ Users | Conversations | Members | Messages   │
└───────────────────────────────────────────────┘
```

This separation makes the application easier to maintain and extend.

---

# 📂 Project Structure

A simplified structure of the project is:

```text
signal/
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── ...
│   │
│   ├── components/
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
│
├── backend/
│   ├── ...
│   ├── requirements.txt
│   └── ...
│
├── README.md
└── .gitignore
```

> The exact structure may vary depending on the latest project files.

---

# 🔐 Authentication

Authentication is responsible for identifying users and protecting application functionality.

The general authentication flow is:

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
   Authentication
      Successful
         │
         ▼
      Chat App
```

After successful authentication, the frontend can access the user's conversations and messaging functionality.

---

# 💬 Real-Time Messaging

Real-time messaging is one of the main features of the application.

Instead of requiring the user to continuously refresh the page, messages can be delivered and reflected in the interface dynamically.

### Message flow

```text
User A
  │
  │ Send Message
  ▼
Frontend
  │
  ▼
Backend
  │
  ├── Validate Request
  │
  ├── Store Message
  │
  └── Broadcast / Deliver
          │
          ▼
       User B
          │
          ▼
   Chat Interface Updated
```

This provides a messaging experience similar to modern chat applications.

---

# 👤 One-to-One Conversations

Users can communicate privately through individual conversations.

Each conversation contains information such as:

* Conversation ID
* Conversation type
* Other participant
* User information
* Messages
* Online status
* Last conversation activity

The frontend dynamically loads the selected conversation and displays its messages.

---

# 👥 Group Conversations

The application also supports group conversations.

A group can contain multiple members, with each member having information such as:

```text
Member
├── User ID
├── Username
├── Display Name
├── Avatar
├── Role
└── Online Status
```

Groups allow multiple users to communicate inside the same conversation.

### Group message flow

```text
                 ┌── User A
                 │
                 ├── User B
Group Message ───┼── User C
                 │
                 └── User D
```

---

# 🟢 Online Presence

The application keeps track of whether users are currently online.

This information can be used by the frontend to display:

* Online
* Offline
* Active members
* Member availability

Example:

```text
John Doe
🟢 Online
```

or

```text
John Doe
⚪ Offline
```

Presence information improves the real-time messaging experience.

---

# 🖥️ Frontend

The frontend is responsible for the complete user-facing experience.

Important frontend responsibilities include:

### Conversation Management

The conversation panel allows users to:

* View conversations
* Select conversations
* View conversation names
* View user/group avatars
* See online status

### Chat Interface

The chat area provides:

* Message history
* Message sender information
* Message timestamps
* Message input
* Send functionality
* Dynamic updates

### User Interface State

The frontend maintains state for information such as:

* Current user
* Selected conversation
* Conversations
* Messages
* Members
* Online status
* Loading states
* Error states

---

# ⚙️ Backend

The backend acts as the central service responsible for application logic.

It handles:

### User Management

* User registration
* Login
* User lookup
* User profile data

### Conversation Management

* Creating conversations
* Fetching conversations
* Finding conversation members
* Loading conversation information

### Message Management

* Sending messages
* Storing messages
* Retrieving messages
* Delivering messages

### Group Management

* Creating groups
* Adding members
* Managing group information
* Handling group messages

---

# 🔄 API Communication

The frontend communicates with the backend through HTTP API requests.

The local backend used during development is:

```text
http://127.0.0.1:8001
```

The frontend uses this backend to perform operations such as:

```text
Frontend
   │
   ├── Authentication Requests
   │
   ├── Conversation Requests
   │
   ├── Message Requests
   │
   ├── Group Requests
   │
   └── User Requests
             │
             ▼
        Backend API
```

For production deployment, the API URL should be configured through environment variables instead of hard-coded development URLs.

---

# 🚀 Installation and Setup

## Prerequisites

Before running the project, make sure the following are installed:

* Node.js
* npm
* Git
* Backend runtime required by the project
* Database required by the backend

Verify Node.js:

```bash
node --version
```

Verify npm:

```bash
npm --version
```

Verify Git:

```bash
git --version
```

---

# 📥 Clone the Repository

Clone the repository:

```bash
git clone <YOUR_REPOSITORY_URL>
```

Move into the project:

```bash
cd signal
```

---

# 📦 Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend should then be available at:

```text
http://localhost:3000
```

> Use the port shown by Next.js if your local configuration uses a different port.

---

# ⚙️ Backend Setup

Open another terminal and navigate to the backend directory:

```bash
cd backend
```

Install the backend dependencies according to the backend's package/dependency manager.

Start the backend server using the project's configured development command.

The development API is expected to run at:

```text
http://127.0.0.1:8001
```

---

# 🔑 Environment Variables

For production-quality configuration, environment-specific values should be stored in environment variables.

Example:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8001
```

If the backend requires additional configuration, add those variables to the backend environment file.

### Important

Do **not** commit secrets such as:

```text
API keys
Database passwords
JWT secrets
Private keys
Cloud credentials
```

to GitHub.

Add environment files to `.gitignore` where appropriate.

---

# ▶️ Running the Application

The application requires both frontend and backend services.

### Terminal 1 — Backend

```bash
cd backend
# backend start command
```

### Terminal 2 — Frontend

```bash
cd frontend
npm install
npm run dev
```

Then open the frontend in your browser.

```text
http://localhost:3000
```

---

# 🧑‍💻 Usage

Once the application is running:

### Step 1 — Register

Create a new user account.

### Step 2 — Login

Log in using the registered credentials.

### Step 3 — Open Conversations

View the available conversations from the conversation sidebar.

### Step 4 — Start Messaging

Select a conversation and send a message.

### Step 5 — Create / Use Groups

Use the group functionality to communicate with multiple users.

### Step 6 — Observe Presence

Users can see whether other members are online or offline.

---

# 📸 Screenshots

Add screenshots of the completed application here.

Recommended screenshots:

### Login / Registration

```text
screenshots/login.png
```

### Main Chat Interface

```text
screenshots/chat.png
```

### One-to-One Conversation

```text
screenshots/private-chat.png
```

### Group Conversation

```text
screenshots/group-chat.png
```

### Online Presence

```text
screenshots/online-status.png
```

Example Markdown:

```md
![Login](screenshots/login.png)

![Chat Interface](screenshots/chat.png)

![Group Chat](screenshots/group-chat.png)
```

---

# 🗄️ Database

The application requires persistent storage for messaging-related data.

A typical logical database structure is:

```text
Users
 │
 ├── Conversations
 │       │
 │       ├── Conversation Members
 │       │
 │       └── Messages
 │
 └── Groups
         │
         └── Group Members
```

## Users

Stores information about application users.

Example fields:

```text
user_id
username
display_name
avatar_url
```

## Conversations

Stores conversation-level information.

Example fields:

```text
conversation_id
type
name
avatar_url
```

## Members

Associates users with conversations.

Example fields:

```text
user_id
conversation_id
role
```

## Messages

Stores messages sent within conversations.

Example fields may include:

```text
message_id
conversation_id
sender_id
content
created_at
```

---

# 🔒 Security Considerations

Security is an important part of any messaging application.

The project should follow practices such as:

* Never expose passwords in frontend code.
* Never commit secrets to Git.
* Validate user input on the backend.
* Authenticate protected requests.
* Authorize users before allowing access to private conversations.
* Validate conversation membership.
* Sanitize user-controlled content where necessary.
* Use HTTPS in production.
* Store sensitive configuration using environment variables.

### Important Security Note

Although this project is inspired by Signal, it should **not** be represented as implementing Signal's production-grade end-to-end encryption unless the actual Signal Protocol and associated cryptographic architecture have been correctly implemented and independently reviewed.

---

# ❌ Error Handling

The application should gracefully handle common errors such as:

* Invalid login credentials
* Invalid registration data
* Failed API requests
* Backend unavailable
* Network failures
* Empty messages
* Unauthorized requests
* Invalid conversation IDs
* Missing conversation data
* Failed message delivery

The frontend should provide appropriate feedback rather than allowing errors to break the complete application.

---

# 🧪 Testing

Testing should cover the major application workflows.

## Authentication Testing

* Register a new user
* Attempt registration with invalid information
* Login with valid credentials
* Login with invalid credentials
* Verify authenticated access

## Messaging Testing

* Send a message
* Receive a message
* Verify message persistence
* Verify conversation updates
* Verify empty message handling

## Group Testing

* Create a group
* Add members
* Send group messages
* Verify member information
* Verify group conversation loading

## Presence Testing

* Open application with multiple users
* Verify online status
* Close/logout a user
* Verify offline status

---

# 🚀 Deployment

The project can be deployed by hosting the frontend and backend separately or through a unified deployment architecture.

A typical production architecture could be:

```text
                    Internet
                       │
                       ▼
                ┌───────────────┐
                │   Frontend    │
                │   Next.js     │
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │    Backend    │
                │      API      │
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │   Database    │
                └───────────────┘
```

Possible deployment platforms can be selected based on the backend, database, and hosting requirements.

---

# 🔮 Future Improvements

The current application provides the core messaging experience, but several advanced features can be added.

## Messaging

* Message reactions
* Message editing
* Message deletion
* Reply to messages
* Forward messages
* Message search
* Read receipts
* Typing indicators
* Message delivery status

## Media

* Image sharing
* Video sharing
* Document sharing
* Voice messages
* Image previews
* File upload progress

## Groups

* Group administrators
* Add/remove members
* Leave group
* Group permissions
* Group description
* Group settings

## User Experience

* Dark/light theme
* Better responsive mobile UI
* Notifications
* Better loading states
* Message pagination
* Infinite scrolling

## Security

* Stronger authentication
* Refresh-token architecture
* Rate limiting
* Secure session management
* End-to-end encryption using an established protocol
* Device/session management

## Infrastructure

* Docker support
* CI/CD pipeline
* Automated testing
* Production logging
* Monitoring
* Horizontal scaling
* WebSocket infrastructure optimization

---

# 📚 Learning Outcomes

This project helped demonstrate practical knowledge of:

### Frontend Development

* React
* Next.js
* TypeScript
* Component-based architecture
* State management
* API integration
* Responsive UI design

### Backend Development

* REST APIs
* Authentication
* Request validation
* Business logic
* Database operations
* Real-time communication

### Full-Stack Development

* Frontend-backend integration
* Client-server architecture
* API design
* Data flow
* Error handling
* Authentication flow

### Software Engineering

* Git and GitHub
* Project organization
* Environment configuration
* Debugging
* Documentation
* Feature development

---

# 🧠 Challenges Solved

During development, several practical challenges were addressed.

### 1. Real-Time Communication

Building a messaging interface that updates dynamically requires coordination between the frontend and backend.

### 2. Conversation State

The application needs to maintain the correct conversation while users switch between different chats.

### 3. Group Members

Groups require additional logic for managing multiple users and their roles.

### 4. Online Presence

User presence needs to be reflected dynamically in the interface.

### 5. Frontend and Backend Integration

The frontend and backend must consistently exchange correctly structured data.

### 6. UI State Management

The application needs to manage multiple states simultaneously, including:

```text
Current User
Selected Conversation
Messages
Conversations
Members
Online Status
Loading State
Error State
```

---

# 📈 Possible Scalability Improvements

For a larger production system, the architecture could be extended with:

```text
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
```

A message broker and distributed real-time infrastructure could be introduced when the number of concurrent users increases.

Caching, database indexing, pagination, connection management, and horizontal scaling would also become important.

---

# 🤝 Contributing

Contributions are welcome.

### 1. Fork the repository

```bash
git fork <repository>
```

### 2. Clone your fork

```bash
git clone <your-fork-url>
```

### 3. Create a feature branch

```bash
git checkout -b feature/your-feature
```

### 4. Make your changes

Implement and test your feature.

### 5. Commit your changes

```bash
git add .
git commit -m "Add your feature"
```

### 6. Push the branch

```bash
git push origin feature/your-feature
```

### 7. Open a Pull Request

Create a Pull Request describing your changes.

---

# 📄 License

This project is intended for educational and portfolio purposes.

If a specific open-source license is added to the repository, update this section accordingly.

---

# 👨‍💻 Author

## Sarthak Agnihotri

**B.Tech Computer Science & Engineering**

Interested in:

* Full-Stack Development
* MERN Stack
* Backend Development
* Cloud & DevOps
* Software Engineering

### GitHub

[github.com/sarthak-agnihotri](https://github.com/sarthak-agnihotri)

---

# ⭐ Project Summary

**Signal** is a full-stack real-time messaging application that demonstrates the development of a modern communication platform using a frontend application, backend API, persistent data storage, authentication, real-time messaging, conversations, groups, and online presence.

The project focuses on practical software engineering principles and provides a foundation that can be extended with advanced messaging, media sharing, notifications, security, testing, and production deployment capabilities.

---

## ⭐ If you found this project useful

Consider giving the repository a ⭐ on GitHub.
