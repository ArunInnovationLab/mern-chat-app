import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Conversation = {
  _id: string;
  fullName: string;
  username: string;
  gender: string;
  profilePic: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversation, setConversations] = useState<Conversation[]>([]);
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);

      try {
        const res = await fetch(`${baseUrl}/api/users`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data.map((d1: Conversation) => ({ ...d1, status: "online" })));
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversation };
};

export default useGetConversations;
