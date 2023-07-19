import { insertUserChatLog } from "../api/queries";
import { htmlMessages, textMessages } from "./botMessages";
import {
  getLocalStorage,
  setLocalStorage,
  setUserLocalStorage,
} from "./localStorageFunctions";
import { validateFields } from "./userFunctions";

export const initialMessage = (
  messageText,
  setIsStarted,
  setMessages,
  setInputValue
) => {
  const initialMessageArray = ["hello", "goodbye", "good", "i want"];
  if (
    initialMessageArray.some((str) => messageText.toLowerCase().includes(str))
  ) {
    setIsStarted(true);
    const firstMessage = {
      type: "bot",
      text: textMessages["requireCredentials"],
      dateTime: new Date().toISOString(),
    };
    setLocalStorage(firstMessage);
    setInputValue("");
    return setMessages((prevState) => [...prevState, firstMessage]);
  } else {
    const firstMessage = {
      type: "bot",
      text: textMessages["showTermsToStart"],
      dateTime: new Date().toISOString(),
    };
    setLocalStorage(firstMessage);
    setInputValue("");
    return setMessages((prevState) => [...prevState, firstMessage]);
  }
};

export const authenticateUser = async (
  messageText,
  setIsAuthenticated,
  setUser,
  setMessages,
  setInputValue
) => {
  if (messageText.trim().split(" ").length === 2) {
    const [username, password] = messageText.trim().split(" ");
    const verifyFields = validateFields(username, password);

    if (verifyFields) {
      const wrongUsernameOrPassword = {
        type: "bot",
        text: verifyFields,
        dateTime: new Date().toISOString(),
      };
      setLocalStorage(wrongUsernameOrPassword);
      setInputValue("");
      return setMessages((prevState) => [
        ...prevState,
        wrongUsernameOrPassword,
      ]);
    } else {
      setIsAuthenticated(true);
      setUser(username);
      setUserLocalStorage(username);
      const welcomeMessage = {
        type: "bot",
        text: `Welcome, ${username}! Type "loan" to see the options.`,

        dateTime: new Date().toISOString(),
      };
      setLocalStorage(welcomeMessage);
      setInputValue("");
      return setMessages((prevState) => [...prevState, welcomeMessage]);
    }
  } else {
    const wrongFormat = {
      type: "bot",
      text: textMessages["wrongFormat"],

      dateTime: new Date().toISOString(),
    };
    setLocalStorage(wrongFormat);
    setInputValue("");
    return setMessages((prevState) => [...prevState, wrongFormat]);
  }
};

export const loanOptions = (setMessages, setInputValue) => {
  const loanMessage = {
    type: "bot",
    text: textMessages["loanOptions"],
    html: htmlMessages["loanOptions"],
    dateTime: new Date().toISOString(),
  };
  setLocalStorage(loanMessage);
  setInputValue("");
  return setMessages((prevState) => [...prevState, loanMessage]);
};

export const loanOptionDetails = (e, setMessages) => {
  const { className, id } = e.target;
  if (className === "option") {
    const loanCustomMessage = [
      {
        type: "bot",
        text: textMessages["loanOptionsSplitted"][id],
        html: htmlMessages["loanOptionsSplitted"][id],
        dateTime: new Date().toISOString(),
      },
      {
        type: "bot",
        text: textMessages["loanOptionDetails"][id],
        html: htmlMessages["loanOptionDetails"][id],
        dateTime: new Date().toISOString(),
      },
      {
        type: "bot",
        text: textMessages["endChat"],
        dateTime: new Date().toISOString(),
      },
    ];
    setLocalStorage(...loanCustomMessage);
    return setMessages((prevState) => [...prevState, ...loanCustomMessage]);
  }
};

export const goodbyeMessage = async (
  messageText,
  setMessages,
  setInputValue
) => {
  if (messageText.toLowerCase().includes("goodbye")) {
    const firstMessage = [
      {
        type: "bot",
        text: textMessages["goodbye"],
        html: htmlMessages["goodbye"],
        dateTime: new Date().toISOString(),
      },
      {
        type: "bot",
        text: textMessages["clearChat"],

        dateTime: new Date().toISOString(),
      },
    ];
    setLocalStorage(...firstMessage);
    const username = getLocalStorage("user");
    const mountedChatLogObject = {
      dateTime: new Date().toISOString(),
      content: getLocalStorage("chat").map(({ type, text, dateTime }) => {
        return { type, text, dateTime };
      }),
    };
    await insertUserChatLog(username, mountedChatLogObject);
    setInputValue("");

    return setMessages((prevState) => [...prevState, ...firstMessage]);
  }
};

export const dontUnderstand = (messages, setMessages, setInputValue) => {
  const dontUnderstandMessage = [
    {
      type: "bot",
      text: textMessages["dontUnderstand"],
      dateTime: new Date().toISOString(),
    },
    {
      type: "bot",
      text: messages[messages.length - 1].text,
      html: messages[messages.length - 1].html || "",
      dateTime: new Date().toISOString(),
    },
  ];
  setLocalStorage(...dontUnderstandMessage);
  setInputValue("");
  return setMessages((prevState) => [...prevState, ...dontUnderstandMessage]);
};
