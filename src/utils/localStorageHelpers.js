export const setLocalStorage = (message) => {
  const chatContent = getLocalStorage("chat");
  const chatUpdated = [...chatContent, message];
  const chatStrigified = JSON.stringify(chatUpdated);
  localStorage.setItem("chat", chatStrigified);
};

export const getLocalStorage = (key) => {
  const content = localStorage.getItem(key);
  if (content) {
    const parsedContent = JSON.parse(content);
    return parsedContent;
  }
  return "";
};
