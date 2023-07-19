import { useEffect, useState } from "react";
import styled from "styled-components";

import {
  authenticateUser,
  dontUnderstand,
  goodbyeMessage,
  initialMessage,
  loanOptions,
} from "../utils/botMessagesConstructor";
import {
  clearLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from "../utils/localStorageFunctions";
import { textMessages } from "../utils/botMessages";

export const FormContainer = ({ messages, setMessages }) => {
  const [inputValue, setInputValue] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [, setUser] = useState("");

  useEffect(() => {
    const chatLog = getLocalStorage("chat");
    if (chatLog) {
      const hasStarted = chatLog.filter(
        (message) => message.text === textMessages["requireCredentials"]
      );
      if (hasStarted) {
        setChatStarted(true);
      }
    }
    const user = getLocalStorage("user");
    if (user) {
      setIsAuthenticated(true);
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
      html: "",
      dateTime: new Date().toISOString(),
    };
    setLocalStorage(newMessage);
    setMessages([...messages, newMessage]);

    if (!isAuthenticated && !chatStarted) {
      return initialMessage(
        messageText,
        setChatStarted,
        setMessages,
        setInputValue
      );
    }
    if (!isAuthenticated && chatStarted) {
      return authenticateUser(
        messageText,
        setIsAuthenticated,
        setUser,
        setMessages,
        setInputValue
      );
    }
    if (messageText.toLowerCase() === "loan" && isAuthenticated) {
      return loanOptions(setMessages, setInputValue);
    }
    if (messageText.toLowerCase().includes("goodbye") && chatStarted) {
      setTimeout(() => {
        clearLocalStorage();
        setMessages([]);
        setIsAuthenticated(false);
        setChatStarted(false);
      }, 10000);
      return goodbyeMessage(messageText, setMessages, setInputValue);
    }

    return dontUnderstand(messages, setMessages, setInputValue);
  };

  return (
    <Container onSubmit={handleMessageSubmit}>
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
    </Container>
  );
};

const Container = styled.form`
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
