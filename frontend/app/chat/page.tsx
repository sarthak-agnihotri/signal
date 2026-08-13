"use client";

import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8001";

type Member = {
  user_id: number;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  role: string;
  is_online: boolean;
};

type Conversation = {
  id: number;
  type: string;
  name: string | null;
  avatar_url: string | null;
  members: Member[];
};

type Message = {
  id: number;
  conversation_id: number;
  sender_id: number;
  sender_username: string;
  content: string;
  status: string;
  created_at: string;
};

export default function ChatPage() {
  const [conversations, setConversations] =
    useState<Conversation[]>([]);

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [message, setMessage] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [currentUserId, setCurrentUserId] =
    useState<number | null>(null);

  const [currentUsername, setCurrentUsername] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [socket, setSocket] =
    useState<WebSocket | null>(null);

const [showGroupModal, setShowGroupModal] =
  useState(false);

const [groupName, setGroupName] =
  useState("");

const [groupUsernames, setGroupUsernames] =
  useState("");

const [creatingGroup, setCreatingGroup] =
  useState(false);

  // ==========================================
  // GET CURRENT USER
  // ==========================================

  const loadCurrentUser = async () => {
    const token =
      localStorage.getItem("access_token");

    if (!token) {
      window.location.href = "/";
      return null;
    }

    try {
      const response = await fetch(
        `${API_URL}/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        localStorage.removeItem("access_token");
        window.location.href = "/";
        return null;
      }

      const user = await response.json();

      setCurrentUserId(user.id);
      setCurrentUsername(user.username);

      return user.id;
    } catch (error) {
      console.error(
        "Failed to load current user:",
        error
      );

      return null;
    }
  };

  // ==========================================
  // LOAD CONVERSATIONS
  // ==========================================

  const loadConversations = async () => {
    const token =
      localStorage.getItem("access_token");

    if (!token) return;

    try {
      const response = await fetch(
        `${API_URL}/conversations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.error(
          "Failed to load conversations"
        );
        return;
      }

      const data: Conversation[] =
        await response.json();

      setConversations(data);

      if (data.length > 0) {
        setSelectedConversation(data[0]);
      }
    } catch (error) {
      console.error(
        "Load conversations error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD MESSAGES
  // ==========================================

  const loadMessages = async (
    conversationId: number
  ) => {
    const token =
      localStorage.getItem("access_token");

    if (!token) return;

    try {
      const response = await fetch(
        `${API_URL}/messages/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.error(
          "Failed to load messages"
        );
        return;
      }

      const data: Message[] =
        await response.json();

      setMessages(data);
    } catch (error) {
      console.error(
        "Load messages error:",
        error
      );
    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    const initialize = async () => {
      await loadCurrentUser();
      await loadConversations();
    };

    initialize();
  }, []);

  // ==========================================
  // LOAD MESSAGES WHEN CHAT CHANGES
  // ==========================================

  useEffect(() => {
    if (!selectedConversation) {
      return;
    }

    loadMessages(
      selectedConversation.id
    );
  }, [selectedConversation]);

  // ==========================================
  // CONNECT WEBSOCKET
  // ==========================================

  useEffect(() => {
    if (
      !selectedConversation ||
      currentUserId === null
    ) {
      return;
    }

    const conversationId =
      selectedConversation.id;

    console.log(
      "Connecting WebSocket:",
      conversationId,
      "user:",
      currentUserId
    );

    const ws = new WebSocket(
      `ws://127.0.0.1:8001/ws/${conversationId}`
    );

    ws.onopen = () => {
      console.log(
        "🟢 WebSocket connected:",
        conversationId
      );

      // Tell backend which user is connected
      ws.send(
        JSON.stringify({
          type: "connect",
          user_id: currentUserId,
        })
      );
    };

    ws.onmessage = (event) => {
      console.log(
        "📨 WebSocket event:",
        event.data
      );

      try {
        const data = JSON.parse(event.data);

        // ======================================
        // NEW MESSAGE
        // ======================================

        if (data.type === "message") {
          const incomingMessage: Message =
            data.data;

          setMessages((previous) => {
            const exists = previous.some(
              (msg) =>
                msg.id === incomingMessage.id
            );

            if (exists) {
              return previous;
            }

            return [
              ...previous,
              incomingMessage,
            ];
          });
        }

        // ======================================
        // MESSAGE DELIVERED
        // ======================================

        if (
          data.type ===
          "message_delivered"
        ) {
          const messageId =
            data.data.message_id;

          setMessages((previous) =>
            previous.map((msg) =>
              msg.id === messageId
                ? {
                    ...msg,
                    status:
                      "DELIVERED",
                  }
                : msg
            )
          );
        }

        // ======================================
        // MESSAGE READ
        // ======================================

        if (
          data.type ===
          "message_read"
        ) {
          const messageId =
            data.data.message_id;

          setMessages((previous) =>
            previous.map((msg) =>
              msg.id === messageId
                ? {
                    ...msg,
                    status: "READ",
                  }
                : msg
            )
          );
        }

        // ======================================
        // TYPING
        // ======================================

        if (data.type === "typing") {
          console.log(
            "Typing:",
            data.user_id,
            data.is_typing
          );
        }

        // ======================================
        // BACKEND ERROR
        // ======================================

        if (data.type === "error") {
          console.error(
            "❌ WebSocket server error:",
            data.message
          );
        }
      } catch (error) {
        console.error(
          "❌ Invalid WebSocket data:",
          error
        );
      }
    };

    ws.onerror = (error) => {
      console.error(
        "❌ WebSocket error:",
        error
      );
    };

    ws.onclose = (event) => {
      console.log(
        "🔴 WebSocket disconnected:",
        event.code,
        event.reason
      );
    };

    setSocket(ws);

    return () => {
      console.log(
        "Closing WebSocket:",
        conversationId
      );

      ws.close();

      setSocket((current) =>
        current === ws
          ? null
          : current
      );
    };
  }, [
    selectedConversation,
    currentUserId,
  ]);

  // ==========================================
  // SEND MESSAGE THROUGH WEBSOCKET
  // ==========================================

  const sendMessage = () => {
    const content =
      message.trim();

    if (!content) {
      return;
    }

    if (!selectedConversation) {
      console.error(
        "No conversation selected"
      );
      return;
    }

    if (currentUserId === null) {
      console.error(
        "Current user ID not available"
      );
      return;
    }

    if (!socket) {
      console.error(
        "WebSocket is not connected"
      );
      return;
    }

    if (
      socket.readyState !==
      WebSocket.OPEN
    ) {
      console.error(
        "WebSocket is not open"
      );
      return;
    }

    console.log(
      "📤 Sending message:",
      content
    );

    socket.send(
      JSON.stringify({
        type: "message",
        user_id: currentUserId,
        content: content,
      })
    );

    setMessage("");
  };

  // ==========================================
  // GET DISPLAY NAME
  // ==========================================

  const getConversationName = (
    conversation: Conversation
  ) => {
    if (
      conversation.type ===
      "GROUP"
    ) {
      return (
        conversation.name ||
        "Unnamed Group"
      );
    }

    const otherMember =
      conversation.members.find(
        (member) =>
          member.user_id !==
          currentUserId
      );

    return (
      otherMember?.display_name ||
      otherMember?.username ||
      "Unknown User"
    );
  };

  // ==========================================
  // GET OTHER MEMBER
  // ==========================================

  const getOtherMember = (
    conversation: Conversation
  ) => {
    return conversation.members.find(
      (member) =>
        member.user_id !==
        currentUserId
    );
  };

  // ==========================================
  // SEARCH
  // ==========================================

  const filteredConversations =
    conversations.filter(
      (conversation) =>
        getConversationName(
          conversation
        )
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

    //Group
    const createGroup = async () => {
  const name = groupName.trim();

  const usernames = groupUsernames
    .split(",")
    .map((username) => username.trim())
    .filter(Boolean);

  if (!name) {
    alert("Enter group name");
    return;
  }

  if (usernames.length === 0) {
    alert("Enter at least one username");
    return;
  }

  const token =
    localStorage.getItem("access_token");

  if (!token) {
    return;
  }

  try {
    setCreatingGroup(true);

    const response = await fetch(
      `${API_URL}/conversations/group`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          name,
          usernames,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(
        data.detail ||
        "Failed to create group"
      );
      return;
    }

    console.log(
      "Group created:",
      data
    );

    // Add new group to sidebar
    setConversations((previous) => [
      ...previous,
      data,
    ]);

    // Open newly created group
    setSelectedConversation(data);

    // Clear form
    setGroupName("");
    setGroupUsernames("");

    // Close modal
    setShowGroupModal(false);

  } catch (error) {
    console.error(
      "Create group error:",
      error
    );

    alert(
      "Unable to create group"
    );

  } finally {
    setCreatingGroup(false);
  }
};

  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = async () => {
    const token =
      localStorage.getItem(
        "access_token"
      );

    if (token) {
      try {
        await fetch(
          `${API_URL}/auth/logout`,
          {
            method: "POST",
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error(
          "Logout error:",
          error
        );
      }
    }

    if (socket) {
      socket.close();
    }

    localStorage.removeItem(
      "access_token"
    );

    window.location.href = "/";
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="h-screen flex items-center justify-center bg-[#f5f5f3]">
        <div className="text-center">
          <div className="text-4xl mb-4">
            💬
          </div>

          <p className="text-gray-500">
            Loading Signal...
          </p>
        </div>
      </main>
    );
  }

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <main className="h-screen bg-[#f5f5f3] flex overflow-hidden">

      {/* =====================================
          SIDEBAR
      ===================================== */}

      <aside className="w-[360px] bg-white border-r border-gray-200 flex flex-col">

        {/* HEADER */}

        <div className="px-5 py-5 border-b border-gray-100">

          <div className="flex items-center justify-between">

            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Signal
              </h1>

              <p className="text-xs text-gray-400 mt-1">
                @{currentUsername}
              </p>
            </div>

            <button
              onClick={logout}
              className="h-10 w-10 rounded-full hover:bg-gray-100"
              title="Logout"
            >
              🚪
            </button>

          </div>

          {/* SEARCH */}

          <div className="mt-5">

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search conversations"
              className="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-100"
            />

          </div>

        </div>

        {/* CONVERSATIONS */}

        <div className="flex-1 overflow-y-auto">

          {filteredConversations.length ===
          0 ? (

            <div className="p-8 text-center">

              <div className="text-4xl mb-3">
                💬
              </div>

              <p className="font-medium text-gray-700">
                No conversations
              </p>

              <p className="text-sm text-gray-400 mt-1">
                Start a new conversation
              </p>

            </div>

          ) : (

            filteredConversations.map(
              (conversation) => {

                const otherMember =
                  getOtherMember(
                    conversation
                  );

                const name =
                  getConversationName(
                    conversation
                  );

                const isOnline =
                  conversation.type ===
                  "DIRECT"
                    ? otherMember?.is_online
                    : false;

                return (
                  <button
                    key={conversation.id}
                    onClick={() =>
                      setSelectedConversation(
                        conversation
                      )
                    }
                    className={`w-full flex items-center gap-3 px-5 py-4 text-left ${
                      selectedConversation?.id ===
                      conversation.id
                        ? "bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                  >

                    {/* AVATAR */}

                    <div className="relative">

                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">

                        {conversation.type ===
                        "GROUP"
                          ? "👥"
                          : name
                              .charAt(0)
                              .toUpperCase()}

                      </div>

                      {isOnline && (
                        <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white" />
                      )}

                    </div>

                    {/* INFO */}

                    <div className="min-w-0 flex-1">

                      <div className="flex justify-between">

                        <p className="font-medium text-gray-900 truncate">
                          {name}
                        </p>

                      </div>

                      <p className="text-sm text-gray-400 mt-1">

                        {conversation.type ===
                        "GROUP"
                          ? `${conversation.members.length} members`
                          : isOnline
                          ? "Online"
                          : "Offline"}

                      </p>

                    </div>

                  </button>
                );
              }
            )
          )}

        </div>

        {/* NEW CHAT */}

        <div className="border-t border-gray-100 p-4">

          <button
  onClick={() =>
    setShowGroupModal(true)
  }
  className="w-full rounded-xl bg-blue-500 text-white py-3 font-medium hover:bg-blue-600"
>
  + New Group
</button>

        </div>

      </aside>

      {/* =====================================
          CHAT
      ===================================== */}

      <section className="flex-1 flex flex-col">

        {!selectedConversation ? (

          <div className="flex-1 flex items-center justify-center">

            <div className="text-center">

              <div className="text-6xl mb-4">
                💬
              </div>

              <h2 className="text-xl font-semibold">
                Welcome to Signal
              </h2>

              <p className="text-gray-400 mt-2">
                Select a conversation to start
                messaging.
              </p>

            </div>

          </div>

        ) : (

          <>

            {/* CHAT HEADER */}

            <header className="h-[76px] bg-white border-b border-gray-200 flex items-center px-6">

              <div className="h-11 w-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">

                {selectedConversation.type ===
                "GROUP"
                  ? "👥"
                  : getConversationName(
                      selectedConversation
                    )
                      .charAt(0)
                      .toUpperCase()}

              </div>

              <div className="ml-3">

                <h2 className="font-semibold text-gray-900">

                  {getConversationName(
                    selectedConversation
                  )}

                </h2>

                <p className="text-xs text-green-500">

                  {selectedConversation.type ===
                  "GROUP"
                    ? `${selectedConversation.members.length} members`
                    : getOtherMember(
                        selectedConversation
                      )?.is_online
                    ? "online"
                    : "offline"}

                </p>

              </div>

              <div className="ml-auto flex gap-2">

                <button className="h-10 w-10 rounded-full hover:bg-gray-100">
                  🔍
                </button>

                <button className="h-10 w-10 rounded-full hover:bg-gray-100">
                  ⋮
                </button>

              </div>

            </header>

            {/* PRIVACY */}

            <div className="bg-blue-50 border-b border-blue-100 px-6 py-2 text-center">

              <span className="text-xs text-blue-600">
                🔐 Messages are simulated encrypted
                for this demo
              </span>

            </div>

            {/* MESSAGES */}

            <div className="flex-1 overflow-y-auto p-6 space-y-3">

              {messages.length ===
              0 ? (

                <div className="h-full flex items-center justify-center">

                  <div className="text-center">

                    <div className="text-4xl mb-3">
                      👋
                    </div>

                    <p className="font-medium text-gray-700">
                      No messages yet
                    </p>

                    <p className="text-sm text-gray-400">
                      Send the first message.
                    </p>

                  </div>

                </div>

              ) : (

                messages.map((msg) => {

                  const mine =
                    msg.sender_id ===
                    currentUserId;

                  const date =
                    new Date(
                      msg.created_at
                    );

                  const time =
                    date.toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    );

                  return (

                    <div
                      key={msg.id}
                      className={`flex ${
                        mine
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >

                      <div
                        className={`max-w-[65%] rounded-2xl px-4 py-3 ${
                          mine
                            ? "bg-blue-500 text-white rounded-br-md"
                            : "bg-white text-gray-900 border border-gray-100 rounded-bl-md"
                        }`}
                      >

                        {!mine &&
                          selectedConversation.type ===
                            "GROUP" && (

                            <p className="text-xs font-semibold text-blue-500 mb-1">
                              {
                                msg.sender_username
                              }
                            </p>

                          )}

                        <p className="text-sm leading-5">
                          {msg.content}
                        </p>

                        <div
                          className={`flex items-center justify-end gap-1 mt-1 ${
                            mine
                              ? "text-blue-100"
                              : "text-gray-400"
                          }`}
                        >

                          <span className="text-[10px]">
                            {time}
                          </span>

                          {mine && (

                            <span className="text-xs">

                              {msg.status ===
                              "SENT"
                                ? "✓"
                                : "✓✓"}

                            </span>

                          )}

                        </div>

                      </div>

                    </div>

                  );
                })
              )}

            </div>

            {/* COMPOSER */}

            <div className="bg-white border-t border-gray-200 p-4">

              <div className="flex items-center gap-3">

                <button
                  className="h-11 w-11 rounded-full hover:bg-gray-100 text-xl"
                >
                  +
                </button>

                <input
                  value={message}
                  onChange={(e) =>
                    setMessage(
                      e.target.value
                    )
                  }
                  onKeyDown={(e) => {

                    if (
                      e.key ===
                      "Enter"
                    ) {
                      e.preventDefault();
                      sendMessage();
                    }

                  }}
                  placeholder="Type a message..."
                  className="flex-1 rounded-full bg-gray-100 px-5 py-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-100"
                />

                <button
                  onClick={sendMessage}
                  disabled={
                    !socket ||
                    socket.readyState !==
                      WebSocket.OPEN
                  }
                  className="h-11 w-11 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ➤
                </button>

              </div>

            </div>

          </>

        )}

      </section>
{showGroupModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white rounded-2xl shadow-xl w-[420px] p-6">

      <div className="flex items-center justify-between mb-5">

        <h2 className="text-xl font-semibold text-gray-900">
          Create Group
        </h2>

        <button
          onClick={() =>
            setShowGroupModal(false)
          }
          className="h-8 w-8 rounded-full hover:bg-gray-100"
        >
          ✕
        </button>

      </div>

      {/* GROUP NAME */}

      <label className="block text-sm font-medium text-gray-700 mb-2">
        Group Name
      </label>

      <input
        value={groupName}
        onChange={(e) =>
          setGroupName(e.target.value)
        }
        placeholder="e.g. College Friends"
        className="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-200"
      />

      {/* USERS */}

      <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">
        Members
      </label>

      <input
        value={groupUsernames}
        onChange={(e) =>
          setGroupUsernames(e.target.value)
        }
        placeholder="rahul, amit, rohan"
        className="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-200"
      />

      <p className="text-xs text-gray-400 mt-2">
        Enter usernames separated by commas.
      </p>

      {/* BUTTONS */}

      <div className="flex gap-3 mt-6">

        <button
          onClick={() => {
            setShowGroupModal(false);
            setGroupName("");
            setGroupUsernames("");
          }}
          className="flex-1 rounded-xl bg-gray-100 text-gray-700 py-3 font-medium hover:bg-gray-200"
        >
          Cancel
        </button>

        <button
          onClick={createGroup}
          disabled={creatingGroup}
          className="flex-1 rounded-xl bg-blue-500 text-white py-3 font-medium hover:bg-blue-600 disabled:opacity-50"
        >
          {creatingGroup
            ? "Creating..."
            : "Create Group"}
        </button>

      </div>

    </div>

  </div>
)}
    </main>
  );
}