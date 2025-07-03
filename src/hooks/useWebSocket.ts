/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

type WebSocketEvent =
  | "authenticate"
  | "MESSAGE"
  | "FETCH_CHATS"
  | "UNREAD_MESSAGES"
  | "MESSAGE_LIST"
  | "FETCH_ALL_DRIVER_ONLINE_OFFLINE"; 

interface WebSocketMessage {
  event: WebSocketEvent;
  [key: string]: any; 
}

interface Message {
  id: string;
  message: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
}

interface Driver {
  id: string;
  isOnline: boolean;
}

const useWebSocket = (url: string, authToken: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messageList, setMessageList] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("✅ Connected to WebSocket");
      setIsConnected(true);

      // Authenticate after connection
      ws.send(
        JSON.stringify({
          event: "authenticate",
          token: authToken,
        })
      );
      console.log("🔑 Authentication event sent");

      // Request message list after authentication
      ws.send(JSON.stringify({ event: "MESSAGE_LIST" }));

      // Request driver online/offline status
      ws.send(JSON.stringify({ event: "FETCH_ALL_DRIVER_ONLINE_OFFLINE" }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log("📩 Received WebSocket event:", data.event);

      // Handle different event types
      switch (data.event) {
        case "MESSAGE_LIST":
          console.log('messageList =>',data);
          setMessageList(data);
          setLoading(false);
          break;
        case "FETCH_CHATS":
          setChatMessages(data.data || []);
          setLoading(false);
          break;
        case "FETCH_ALL_DRIVER_ONLINE_OFFLINE":
          // console.log("Driver data received:", data);
          setDrivers(data.data || []);
          setLoading(false);
          break;
        case "MESSAGE":
          // Add new message to chat messages if it belongs to current chat
          setChatMessages((prev) => [...prev, data.data]);
          // Also update message list to show latest message
          if (messageList && messageList.data) {
            const updatedList = messageList.data.map((chat: any) => {
              if (
                chat.user.id === data.data.senderId ||
                chat.user.id === data.data.receiverId
              ) {
                return {
                  ...chat,
                  lastMessage: {
                    message: data.data.message,
                  },
                };
              }
              return chat;
            });
            setMessageList({ ...messageList, data: updatedList });
          }
          break;
        default:
          // console.log("📩 Unhandled message event:", data);
      }
    };

    ws.onclose = () => {
      console.log("❌ Disconnected from WebSocket");
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error("⚠️ WebSocket error:", error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [url, authToken]);

  // Function to send messages
  const sendMessage = (data: WebSocketMessage) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify(data));
      console.log("📤 Message sent:", data);
    } else {
      console.warn("⚠️ WebSocket not connected.");
    }
  };

  // Function to fetch messages for a specific user
  const fetchMessagesByUserId = (userId: string) => {
    if (socket && isConnected) {
      const messagesData: any = {
        event: "FETCH_CHATS",
        receiverId: userId,
      };
      sendMessage(messagesData);
      setLoading(true);
    }
  };

  // Function to fetch driver online/offline status
  const fetchDriverStatus = () => {
    if (socket && isConnected) {
      sendMessage({ event: "FETCH_ALL_DRIVER_ONLINE_OFFLINE" });
      setLoading(true);
    }
  };

  return {
    socket,
    messageList,
    chatMessages,
    loading,
    sendMessage,
    fetchMessagesByUserId,
    drivers,
    fetchDriverStatus,
  };
};

export default useWebSocket;
