import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [, setUser] = useState("");
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const loanHandleClick = (e) => {
    const { className, id } = e.target;
    if (className === "option") {
      const message = {
        a: `<span>If you want to start a new business venture, 
        renovate your home or consolidate debt, we are here to help you with your loan. 
        Click <a href="http://loan-more-information-url" target="_blank">here</a>
         to see more informations.</span>
        `,
        b: `Our loan conditions offer flexibility and convenience. 
        Borrow any amount between $1,000 and $100,000 at competitive rates starting from 3.5%. 
        Repay comfortably with flexible terms ranging from 6 months to 5 years and fixed monthly installments. 
        Collateral may be required, and additional fees may apply. 
        Review the lender's specific terms and conditions for accurate details.
        Click <a href="http://loan-more-information-url" target="_blank">here</a>
         to see more informations.</span>`,
        c: `If you have any questions or need guidance regarding our loan application process, 
        our friendly customer support team is here to help. 
        Click <a href="http://loan-help-url" target="_blank">here</a>
         to see more informations.</span>`,
      };
      const loanCustomMessage = {
        type: "bot",
        text: message[id],
        dateTime: new Date().toISOString(),
      };
      return setMessages((prevState) => [...prevState, loanCustomMessage]);
    }
  };

  const initialMessage = (messageText) => {
    const initialMessageArray = ["hello", "goodbye", "good", "i want"];
    if (
      initialMessageArray.some((str) => messageText.toLowerCase().includes(str))
    ) {
      setIsStarted(true);
      const firstMessage = {
        type: "bot",
        text: "Please, send your username and password. Example: username password",
        dateTime: new Date().toISOString(),
      };
      return setMessages((prevState) => [...prevState, firstMessage]);
    }
  };

  const authenticateUser = (messageText) => {
    if (messageText.trim().split(" ").length === 2) {
      const [username, password] = messageText.trim().split(" ");
      if (username && password) {
        setIsAuthenticated(true);
        setUser(username);

        const welcomeMessage = {
          type: "bot",
          text: `Welcome, ${username}! Type "loan" to see the options.`,
          dateTime: new Date().toISOString(),
        };
        setMessages((prevState) => [...prevState, welcomeMessage]);
      }
    } else {
      const wrongFormat = {
        type: "bot",
        text: "Wrong format, send your username and password. Example: username password",
        dateTime: new Date().toISOString(),
      };
      setMessages((prevState) => [...prevState, wrongFormat]);
    }
  };

  const showLoanOptions = () => {
    const mountText = `
    <div class="loanOptions">
      <span>Choose and click on one of the options below for more information:</span>
      <span class="option" id="a">a - Do you want to apply for a loan?</span>
      <span class="option" id="b">b - Loan conditions</span>
      <span class="option" id="c">c - Help</span>
    </div>`;
    const loanMessage = {
      type: "bot",
      text: mountText,
      dateTime: new Date().toISOString(),
    };
    return setMessages((prevState) => [...prevState, loanMessage]);
  };

  const goodbyeMessage = (messageText) => {
    if (messageText.includes("goodbye")) {
      const firstMessage = {
        type: "bot",
        text: `<span>Thank you for using our services! 
        If you have any more questions in the future, feel free to ask. 
        Goodbye and have a great day!</span><br>
        <span>Click here to download the chat history in CSV format`,
        dateTime: new Date().toISOString(),
      };
      return setMessages((prevState) => [...prevState, firstMessage]);
    }
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    const messageText = e.target.message.value;
    const newMessage = {
      type: "user",
      text: messageText,
      dateTime: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
    if (!isAuthenticated && !isStarted) {
      initialMessage(messageText);
    }
    if (!isAuthenticated && isStarted) {
      authenticateUser(messageText);
    }
    if (messageText === "loan" && isAuthenticated) {
      showLoanOptions();
    }
    if (messageText.toLowerCase().includes("goodbye") && isStarted) {
      goodbyeMessage(messageText);
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
                onClick={loanHandleClick}
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
