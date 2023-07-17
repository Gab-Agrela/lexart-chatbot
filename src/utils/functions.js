import { setLocalStorage } from "./localStorageHelpers";

export const initialMessage = (messageText, setIsStarted, setMessages) => {
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
    if (username && password) {
      setIsAuthenticated(true);
      setUser(username);

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
      text: "Wrong format, send your username and password. Example: username password",
      dateTime: new Date().toISOString(),
    };
    setLocalStorage(wrongFormat);
    return setMessages((prevState) => [...prevState, wrongFormat]);
  }
};

export const showLoanOptions = (setMessages) => {
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
  setLocalStorage(loanMessage);
  return setMessages((prevState) => [...prevState, loanMessage]);
};

export const loanHandleClick = (e, setMessages) => {
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
    setLocalStorage(loanCustomMessage);
    return setMessages((prevState) => [...prevState, loanCustomMessage]);
  }
};

export const goodbyeMessage = (messageText, setMessages) => {
  if (messageText.includes("goodbye")) {
    const firstMessage = {
      type: "bot",
      text: `<span>Thank you for using our services! 
      If you have any more questions in the future, feel free to ask. 
      Goodbye and have a great day!</span><br>
      <span>Click here to download the chat history in CSV format`,
      dateTime: new Date().toISOString(),
    };
    setLocalStorage(firstMessage);
    return setMessages((prevState) => [...prevState, firstMessage]);
  }
};

export const scrollToBottom = (messagesContainerRef) => {
  if (messagesContainerRef.current) {
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  }
};
