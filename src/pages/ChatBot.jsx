import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getLocalStorage } from "../utils/localStorageFunctions";
import { MessagesContainer } from "../components/MessagesContainer";
import { FormContainer } from "../components/FormContainer";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const chatLog = getLocalStorage("chat");
    if (chatLog) {
      setMessages(chatLog);
    }
  }, []);

  return (
    <Container>
      <ChatbotContainer>
        <MessagesContainer messages={messages} setMessages={setMessages} />
        <FormContainer messages={messages} setMessages={setMessages} />
      </ChatbotContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const ChatbotContainer = styled.div`
  width: 600px;
  height: 100vh;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export default Chatbot;
