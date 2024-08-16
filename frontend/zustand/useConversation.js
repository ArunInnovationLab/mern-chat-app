import { create } from "zustand";

const useConversations = create((set) => ({
  selectedConversation: null,

  setSelectedConversation: (conversation) => {
    set({ selectedConversation: conversation });
  },

  messages: [],

  setMessages: (messages) => set({ messages }),
}));

export default useConversations;
