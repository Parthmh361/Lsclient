import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [SelectedChat, setSelectedChat] = useState();
  const [User, setUser] = useState();
  const [Notification, setNotification] = useState([]);
  const [Chats, setChats] = useState([]);

  const navigate = useNavigate();
  
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("User"));
    setUser(userInfo);

    if (!userInfo) return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{
        SelectedChat,
        setSelectedChat,
        User,
        setUser,
        Notification,
        setNotification,
        Chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;