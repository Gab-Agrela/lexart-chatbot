import React from "react";
import styled from "styled-components";
import { exportToCsv } from "../utils/exportCsv";

export const ChatLinks = ({ userData, responseMessage }) => {
  const { username, chatList } = userData;
  const handleClick = (e) => {
    const { id } = e.target;
    const chat = chatList[id];
    exportToCsv(
      chat.content,
      `${username}_chat_${id + 1}_${chat.dateTime}.csv`
    );
  };
  return userData.username ? (
    <Container>
      <h2>{`${username} conversation history`}</h2>
      <ul>
        {chatList?.map((chat, index) => (
          <li key={index} onClick={handleClick} id={index}>
            {`Conversation ${username} #${index + 1} - ${chat.dateTime}`}
          </li>
        ))}
      </ul>
    </Container>
  ) : (
    <>
      <h2>{responseMessage}</h2>
    </>
  );
};

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: "SF Pro Text", "Arial", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 10px;
      display: flex;
      text-align: center;
      padding: 10px 15px;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
        cursor: pointer;
      }
    }
  }
`;
