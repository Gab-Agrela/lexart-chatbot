import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Message } from "./Message";

export const MessagesContainer = ({ messages, setMessages }) => {
  const messagesContainerRef = useRef(null);

  const scrollToBottom = (messagesContainerRef) => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom(messagesContainerRef);
  }, [messages]);
  return (
    <Container ref={messagesContainerRef}>
      {messages.map((message, index) => (
        <Message message={message} index={index} setMessages={setMessages} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  flex-grow: 1;
  overflow: auto;
  padding: 20px;
`;
