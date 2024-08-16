"use client";
import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";

const SocketContext = createContext<any>(undefined);

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }: { children: any }) => {
  const [socket, setSocket] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("chat-user");
      const parsedUser = user ? JSON.parse(user) : null;
      setUserId(parsedUser?._id || null);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const socket = io("http://localhost:2000", {
        query: {
          userId: userId,
        },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        console.log("getOnlineUsers", users);
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [userId]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
