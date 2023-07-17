import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const ChatbotContainer = styled.div`
  width: 300px;
  height: 400px;
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
  font-family: "SF Pro Text", "Arial", sans-serif;
`;

const BotMessage = styled.div`
  background-color: #f5f5f5;
  color: #333;
  padding: 10px;
  border-radius: 20px;
  max-width: 70%;
  font-family: "SF Pro Text", "Arial", sans-serif;
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
`;

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  const botMessage = (messageText) => {
    const initialMessageArray = ["Hello,", "Goodbye,", "Good,", "I want"];
    if (initialMessageArray.find((str) => messageText.indexOf(str) > -1)) {
      return { type: "bot", text: "Please, send your username" };
    }
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    const messageText = e.target.message.value;
    const newMessage = { type: "user", text: messageText };
    setMessages([...messages, newMessage]);
    botMessage(messageText);
    e.target.message.value = "";
  };

  return (
    <ChatbotContainer>
      <MessagesContainer>
        {messages.map((message, index) => (
          <Message key={index} isUser={message.type === "user"}>
            {message.type === "user" ? (
              <UserMessage>{message.text}</UserMessage>
            ) : (
              <BotMessage>{message.text}</BotMessage>
            )}
          </Message>
        ))}
      </MessagesContainer>
      <InputContainer onSubmit={handleMessageSubmit}>
        <TextInput
          type="text"
          name="message"
          placeholder="Digite uma mensagem..."
        />
        <SendButton type="submit">Enviar</SendButton>
      </InputContainer>
    </ChatbotContainer>
  );
};

export default Chatbot;
