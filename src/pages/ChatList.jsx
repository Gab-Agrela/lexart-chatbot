import React, { useState } from "react";
import styled from "styled-components";
import { searchUserChatLog } from "../api/queries";
import { ChatLinks } from "../components/ChatLinks";
import { Link } from "react-router-dom";

export const ChatList = () => {
  const [username, setUsername] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [userData, setUserData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await searchUserChatLog(username);
    setResponseMessage(user.message);
    if (user.message === "Success") {
      setUserData(user.data);
    } else {
      setUserData({});
    }
  };

  return (
    <ChatListContainer>
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "black",
          fontSize: "18px",
          fontFamily: '"SF Pro Text", "Arial", sans-serif;',
        }}
      >
        Back to ChatBot
      </Link>
      <h2>Chat Download</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={username.length < 6}>
          Search
        </button>
      </form>
      <ChatLinks userData={userData} responseMessage={responseMessage} />
    </ChatListContainer>
  );
};

const ChatListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 5px;
  font-family: "SF Pro Text", "Arial", sans-serif;
  height: 100vh;

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 10px;
    }

    input {
      margin: 5px;
      padding: 10px;
      border: 1px solid #ccc;
      font-size: 16px;
      border-radius: 5px;
    }

    button {
      margin-top: 10px;
      margin-bottom: 10px;
      padding: 10px 0;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: #0056b3;
      }
      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
        &:hover {
          background-color: #ccc;
        }
      }
    }
  }
`;
