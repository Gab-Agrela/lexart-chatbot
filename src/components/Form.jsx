import { useState } from "react";
import styled from "styled-components";
import { exportToCsv } from "../utils/exportCsv";
import {
  authenticateUser,
  goodbyeMessage,
  initialMessage,
  showLoanOptions,
} from "../utils/functions";
import { setLocalStorage } from "../utils/localStorageHelpers";

export const Form = ({ messages, setMessages }) => {
  const [inputValue, setInputValue] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [, setUser] = useState("");

  const [showDownloadButton, setShowDownloadButton] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleExportClick = () => {
    exportToCsv(messages, "chatbot_messages.csv");
    setShowDownloadButton(false);
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
      goodbyeMessage(messageText, setMessages, setShowDownloadButton);
    }
    setInputValue("");
  };

  return (
    <FormContainer onSubmit={handleMessageSubmit}>
      <TextInput
        type="text"
        name="message"
        placeholder="Type a message..."
        value={inputValue}
        onChange={handleInputChange}
        autoComplete="off"
      />
      {showDownloadButton ? (
        <DownloadButton type="submit" onClick={handleExportClick}>
          Dowload
        </DownloadButton>
      ) : (
        <SendButton type="submit" disabled={!inputValue}>
          Send
        </SendButton>
      )}
    </FormContainer>
  );
};

const FormContainer = styled.form`
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

const DownloadButton = styled.button`
  padding: 8px 16px;
  background-color: #8b4deb;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: "SF Pro Text", "Arial", sans-serif;

  &:hover {
    background-color: #7f48d3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
