import axios from "axios";

const port = 3001;
const baseUrl = `http://localhost:${port}/chat`;

export const insertUserChatLog = async (username, chatLog) => {
  axios
    .post(`${baseUrl}/insertNewChat`, {
      username,
      chatLog,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};
