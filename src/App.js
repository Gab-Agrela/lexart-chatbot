import { Routes, Route, BrowserRouter } from "react-router-dom";
import Chatbot from "./pages/ChatBot";
import { ChatList } from "./pages/ChatList";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chatbot />}></Route>
        <Route path="/chatList" element={<ChatList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
