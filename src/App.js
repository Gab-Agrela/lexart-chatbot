import { Routes, Route, BrowserRouter } from "react-router-dom";
import Chatbot from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chatbot />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
