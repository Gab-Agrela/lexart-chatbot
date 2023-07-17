import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  authenticateUser,
  goodbyeMessage,
  initialMessage,
  loanHandleClick,
  scrollToBottom,
  showLoanOptions,
} from "../utils/functions";
import { getLocalStorage, setLocalStorage } from "../utils/localStorageHelpers";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [, setUser] = useState("");

  const messagesContainerRef = useRef(null);

  useEffect(() => {
    scrollToBottom(messagesContainerRef);
  }, [messages]);

  useEffect(() => {
    const chatLog = getLocalStorage("chat");
    if (chatLog) {
      setMessages(chatLog);
    }
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    const messageText = e.target.message.value;
    const newMessage = {
      type: "user",
      text: messageText,
      dateTime: new Date().toISOString(),
    };
    setLocalStorage(newMessage);
    setMessages([...messages, newMessage]);
    if (!isAuthenticated && !isStarted) {
      initialMessage(messageText, setIsStarted, setMessages);
    }
    if (!isAuthenticated && isStarted) {
      authenticateUser(messageText, setIsAuthenticated, setUser, setMessages);
    }
    if (messageText === "loan" && isAuthenticated) {
      showLoanOptions(setMessages);
    }
    if (messageText.toLowerCase().includes("goodbye") && isStarted) {
      goodbyeMessage(messageText, setMessages);
    }
    setInputValue("");
  };

  return (
    <ChatbotContainer>
      <MessagesContainer ref={messagesContainerRef}>
        {messages.map((message, index) => (
          <Message key={index} isUser={message.type === "user"}>
            {message.type === "user" ? (
              <UserMessage dangerouslySetInnerHTML={{ __html: message.text }} />
            ) : (
              <BotMessage
                dangerouslySetInnerHTML={{ __html: message.text }}
                onClick={(e) => loanHandleClick(e, setMessages)}
              />
            )}
          </Message>
        ))}
      </MessagesContainer>
      <InputContainer onSubmit={handleMessageSubmit}>
        <TextInput
          type="text"
          name="message"
          placeholder="Type a message..."
          value={inputValue}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <SendButton type="submit" disabled={!inputValue}>
          Send
        </SendButton>
      </InputContainer>
    </ChatbotContainer>
  );
};

const ChatbotContainer = styled.div`
  width: 500px;
  height: 600px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const MessagesContainer = styled.div`
  flex-grow: 1;
  overflow: auto;
  padding: 20px;
`;

const Message = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
`;

const UserMessage = styled.div`
  background-color: #2979ff;
  color: #fff;
  padding: 10px;

  border-radius: 20px;
  max-width: 70%;
  word-wrap: break-word;
  font-family: "SF Pro Text", "Arial", sans-serif;
`;

const BotMessage = styled.div`
  background-color: #f5f5f5;
  color: #333;
  padding: 10px;
  border-radius: 20px;
  max-width: 70%;
  word-wrap: break-word;
  font-family: "SF Pro Text", "Arial", sans-serif;
  .loanOptions {
    display: flex;
    flex-direction: column;
    span {
      padding: 5px;
    }
  }
  .option:hover {
    color: black;
    font-size: 16.3px;
    cursor: pointer;
  }
  a {
    text-decoration: none;
    color: #2979ff;
  }
`;

const InputContainer = styled.form`
  display: flex;
  padding: 10px;
`;

const TextInput = styled.input`
  flex-grow: 1;
  padding: 8px;
  border: none;
  border-radius: 4px;
  outline: none;
  font-family: "SF Pro Text", "Arial", sans-serif;
`;

const SendButton = styled.button`
  padding: 8px 16px;
  background-color: #2979ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: "SF Pro Text", "Arial", sans-serif;

  &:hover {
    background-color: #2962ff;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export default Chatbot;
