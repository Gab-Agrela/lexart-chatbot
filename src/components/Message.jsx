import styled from "styled-components";
import { loanOptionDetails } from "../utils/botMessagesConstructor";

export const Message = ({ message, index, setMessages }) => {
  return (
    <Container key={index} isUser={message.type === "user"}>
      {message.type === "user" ? (
        <UserMessage>{message.text}</UserMessage>
      ) : (
        <BotMessage
          dangerouslySetInnerHTML={{
            __html: message.html ? message.html : message.text,
          }}
          onClick={(e) => loanOptionDetails(e, setMessages)}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
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
