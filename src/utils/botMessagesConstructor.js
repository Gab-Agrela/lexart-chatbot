import { htmlMessages, textMessages } from "./botMessages";
import { setLocalStorage, setUserLocalStorage } from "./localStorageFunctions";
import { validateFields } from "./userFunctions";

export const initialMessage = (messageText, setIsStarted, setMessages) => {
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
    return setMessages((prevState) => [...prevState, firstMessage]);
  } else {
    const firstMessage = {
      type: "bot",
      text: textMessages["showTermsToStart"],
      dateTime: new Date().toISOString(),
    };
    setLocalStorage(firstMessage);
    return setMessages((prevState) => [...prevState, firstMessage]);
  }
};

export const authenticateUser = (
  messageText,
  setIsAuthenticated,
  setUser,
  setMessages
) => {
  if (messageText.trim().split(" ").length === 2) {
    const [username, password] = messageText.trim().split(" ");
    const verifyFields = validateFields(username, password)

    if (verifyFields) {
      const wrongUsernameOrPassword = {
        type: "bot",
        text: verifyFields,
        dateTime: new Date().toISOString(),
      }
      setLocalStorage(wrongUsernameOrPassword);
      return setMessages((prevState) => [...prevState, wrongUsernameOrPassword]);

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
      return setMessages((prevState) => [...prevState, welcomeMessage]);
    }
  } else {
    const wrongFormat = {
      type: "bot",
      text: textMessages["wrongFormat"],
      dateTime: new Date().toISOString(),
    };
    setLocalStorage(wrongFormat);
    return setMessages((prevState) => [...prevState, wrongFormat]);
  }
};

export const loanOptions = (setMessages) => {
  const loanMessage = {
    type: "bot",
    text: textMessages["loanOptions"],
    html: htmlMessages["loanOptions"],
    dateTime: new Date().toISOString(),
  };
  setLocalStorage(loanMessage);
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
      }];
    setLocalStorage(loanCustomMessage);
    return setMessages((prevState) => [...prevState, ...loanCustomMessage]);
  }
};

export const goodbyeMessage = (
  messageText,
  setMessages,
  setShowDownloadButton
) => {
  if (messageText.includes("goodbye")) {
    const firstMessage = {
      type: "bot",
      text: textMessages["goodbye"],
      html: htmlMessages["goodbye"],
      dateTime: new Date().toISOString(),
    };
    setLocalStorage(firstMessage);
    setShowDownloadButton(true);
    return setMessages((prevState) => [...prevState, firstMessage]);
  }
};

export const dontUnderstand = (messages, setMessages) => {
  const dontUnderstandMessage = [
    {
      type: "bot",
      text: textMessages["dontUnderstand"],
      dateTime: new Date().toISOString(),
    },
    {
      type: "bot",
      text: messages[messages.length - 1].text,
      html: messages[messages.length - 1].html || '',
      dateTime: new Date().toISOString(),
    }];
  setLocalStorage(dontUnderstandMessage);
  return setMessages((prevState) => [...prevState, ...dontUnderstandMessage]);
}