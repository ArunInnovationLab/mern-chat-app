"use client";

import React, { useEffect, useState } from "react";
import Picker, { EmojiClickData } from "emoji-picker-react";
import useLogout from "@/hooks/useLogout";
import { useRouter } from "next/navigation";
import useGetConversations from "@/hooks/useGetConversations";
import Image from "next/image";
import useConversation from "@/zustand/useConversation";
import useGetMessages from "@/hooks/useGetMessages";
import toast from "react-hot-toast";
import { useSocketContext } from "@/providers/socket-provider";
import useListenMessages from "@/hooks/useListenMessages";

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { loading, logout } = useLogout();

  const { loading: loadingUsers, conversation } = useGetConversations();

  const { selectedConversation, setSelectedConversation, setMessages } =
    useConversation();

  const { loading: loadingMessages, messages } = useGetMessages();

  useListenMessages();

  const router = useRouter();

  const { onlineUsers } = useSocketContext();

  useEffect(() => {
    console.log("messages...", messages);
  }, [selectedConversation, messages]);

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const handleEmojiClick = (emojiObject: EmojiClickData) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const handleLogout = async () => {
    if (!window.confirm("Are you sure you want to log out?")) {
      return;
    }

    logout();
  };

  const handleSendMessage = async () => {
    if (message.trim() === "" || !selectedConversation) return;

    try {
      const response = await fetch(
        `${baseUrl}/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you store the JWT in local storage
          },
          credentials: "include",
          body: JSON.stringify({ message }),
        }
      );

      const res = await response.json();
      setMessages([...messages, res]);

      if (res) {
        if (res?.error) {
          throw new Error(res.error);
        }
      }
    } catch (error: any) {
      toast.error(error.message, { id: "error" });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Online Users Section */}
      <div className="lg:w-1/4 w-full bg-gray-100 border-b lg:border-r border-gray-300 p-4 overflow-y-auto lg:overflow-scroll">
        <h2 className="text-xl font-semibold mb-4">Online Users</h2>
        <ul className="space-y-2">
          {conversation?.map((user) => (
            <li
              key={user._id}
              onClick={() => setSelectedConversation(user)}
              className={`flex items-center p-2 rounded-md cursor-pointer ${
                onlineUsers.includes(user?._id) ? "bg-green-100" : "bg-gray-200"
              } hover:bg-green-300   ${
                user._id === selectedConversation?._id ? "bg-green-300" : ""
              }`}
            >
              <div className="w-10 h-10 bg-gray-400 rounded-full mr-3">
                <Image
                  className="w-10 h-10 rounded-full"
                  alt=""
                  src={user.profilePic}
                  width={1000}
                  height={1000}
                />
              </div>
              <div>
                <p className="font-medium">{user.fullName}</p>
                <p
                  className={`text-sm ${
                    onlineUsers.includes(user?._id)
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {onlineUsers.includes(user?._id) ? "Online" : "Offline"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* <Conversations handleUserClick={handleUserClick} /> */}

      {/* Chats Section */}
      <div className="lg:w-3/4 w-full flex flex-col bg-white">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold mb-4">Chats</h2>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="bg-red-600 hover:bg-red-900 duration-300 text-white rounded-md px-4 py-2 disabled:opacity-50"
          >
            Logout
          </button>
        </div>
        <div className="flex-grow p-4">
          <div className="border border-gray-300 rounded-md bg-gray-50 overflow-y-auto h-[calc(100vh-15rem)]">
            {messages.length > 0 ? (
              <div className="space-y-2 p-2">
                {messages.map((msg: any) => (
                  <div
                    key={msg._id}
                    className={`flex ${
                      msg.senderId === selectedConversation?._id
                        ? "justify-start"
                        : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-xs p-2 rounded-md text-white ${
                        msg.senderId === selectedConversation?._id
                          ? "bg-green-500 shadow-md"
                          : "bg-blue-500 shadow-lg"
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center pt-10">No messages yet.</p>
            )}
          </div>
        </div>

        {/* Chat Input */}
        <div className="border-t border-gray-300 p-4">
          <div className="relative flex items-center">
            <button
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className="mr-2 bg-yellow-400 rounded-md px-4 py-2"
            >
              😀
            </button>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              onClick={handleSendMessage}
              className="ml-2 bg-blue-600 hover:bg-blue-900 duration-300 text-white rounded-md px-4 py-2"
            >
              Send
            </button>
            {showEmojiPicker && (
              <div className="absolute bottom-full left-0 shadow-xl">
                <Picker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// "use client";

// import React, { useState } from "react";
// import Picker, { EmojiClickData } from 'emoji-picker-react';

// // Define types for users and chats
// type User = {
//   id: number;
//   name: string;
//   status: string;
// };

// type Message = {
//   text: string;
//   sentBy: "me" | "other";
// };

// type Chat = {
//   id: number;
//   name: string;
//   messages: Message[];
// };

// // Dummy data
// const onlineUsers: User[] = [
//   { id: 1, name: "John Doe", status: "online" },
//   { id: 2, name: "Jane Smith", status: "offline" },
//   { id: 3, name: "Robert Brown", status: "online" },
//   { id: 4, name: "Emily Johnson", status: "offline" },
//   { id: 5, name: "Michael Davis", status: "online" },
// ];

// const chats: Chat[] = [
//   { id: 1, name: "John Doe", messages: [
//     { text: "Hey, how's it going?", sentBy: "other" },
//     { text: "I'm doing well, thanks!", sentBy: "me" }
//   ]},
//   { id: 2, name: "Jane Smith", messages: [
//     { text: "Got the files you sent.", sentBy: "other" },
//     { text: "Great, let me know if you need anything else.", sentBy: "me" }
//   ]},
//   // Add more chat data as needed
// ];

// const Dashboard = () => {
//   const [selectedUser, setSelectedUser] = useState<Chat | null>(null);
//   const [message, setMessage] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);

//   const handleUserClick = (userId: number) => {
//     const userChat = chats.find(chat => chat.id === userId) || null;
//     setSelectedUser(userChat);
//   };

//   const handleSendMessage = () => {
//     if (message.trim() === "" || !selectedUser) return;

//     const updatedMessages: Message[] = [
//       ...selectedUser.messages,
//       { text: message, sentBy: 'me' }
//     ];

//     setSelectedUser({
//       ...selectedUser,
//       messages: updatedMessages,
//     });
//     setMessage(""); // Clear the input field after sending
//   };

//   const handleEmojiClick = (emojiObject: EmojiClickData) => {
//     setMessage(prevMessage => prevMessage + emojiObject.emoji);
//   };

//   return (
//     <div className="flex flex-col lg:flex-row h-screen bg-gray-200">
//       {/* Online Users Section */}
//       <div className="lg:w-1/4 w-full bg-gray-800 text-white border-r border-gray-700 p-4 overflow-y-auto">
//         <h2 className="text-xl font-semibold mb-4">Online Users</h2>
//         <ul className="space-y-2">
//           {onlineUsers.map(user => (
//             <li
//               key={user.id}
//               onClick={() => handleUserClick(user.id)}
//               className={`flex items-center p-2 rounded-md cursor-pointer ${user.status === "online" ? "bg-green-600" : "bg-gray-600"} hover:bg-gray-500`}
//             >
//               <div className="w-10 h-10 bg-gray-500 rounded-full mr-3"></div>
//               <div>
//                 <p className="font-medium">{user.name}</p>
//                 <p className={`text-sm ${user.status === "online" ? "text-green-300" : "text-gray-400"}`}>{user.status}</p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Chats Section */}
//       <div className="lg:w-3/4 w-full flex flex-col bg-white">
//         <div className="flex-grow p-4">
//           <h2 className="text-xl font-semibold mb-4">Chats</h2>
//           <div className="border border-gray-300 rounded-md bg-gray-100 overflow-y-auto h-[calc(100vh-11rem)]">
//             {selectedUser ? (
//               <div className="space-y-2 p-2">
//                 {selectedUser.messages.map((message, index) => (
//                   <div
//                     key={index}
//                     className={`flex ${message.sentBy === "me" ? "justify-end" : "justify-start"}`}
//                   >
//                     <div className={`max-w-xs p-2 rounded-md text-white ${message.sentBy === "me" ? "bg-blue-500 shadow-lg" : "bg-gray-300 text-gray-800 shadow-md"} ${message.sentBy === "me" ? "text-right" : "text-left"}`}>
//                       {message.text}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-center pt-10">Select a user to start chatting.</p>
//             )}
//           </div>
//         </div>

//         {/* Chat Input */}
//         <div className="border-t border-gray-300 p-4 bg-gray-200">
//           <div className="relative flex items-center">
//             <input
//               type="text"
//               className="w-full border border-gray-300 rounded-md p-2"
//               placeholder="Type a message..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             />
//             <button
//               onClick={() => setShowEmojiPicker(prev => !prev)}
//               className="ml-2 bg-yellow-400 rounded-md px-4 py-2"
//             >
//               😀
//             </button>
//             <button
//               onClick={handleSendMessage}
//               className="ml-2 bg-blue-600 text-white rounded-md px-4 py-2"
//             >
//               Send
//             </button>
//             {showEmojiPicker && (
//               <div className="absolute bottom-full left-0">
//                 <Picker onEmojiClick={handleEmojiClick} />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
