import axios from "axios";
require("dotenv/config");

const backUrl = process.env.BACKEND_URL;
const baseUrl = `${backUrl}/chat`;

export const insertUserChatLog = async (username, chatLog) => {
  try {
    const response = await axios.post(`${baseUrl}/insertNewChat`, {
      username,
      chatLog,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchUserChatLog = async (username) => {
  try {
    const response = await axios.get(`${baseUrl}/searchUserChat`, {
      params: {
        username,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
