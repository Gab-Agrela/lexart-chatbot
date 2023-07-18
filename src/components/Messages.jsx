import { useEffect, useRef } from "react";
import styled from "styled-components";
import { loanHandleClick, scrollToBottom } from "../utils/functions";

export const Messages = ({ messages, setMessages }) => {
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    scrollToBottom(messagesContainerRef);
  }, [messages]);
  return (
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
  );
};

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
