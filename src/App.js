import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import TS from "./pages/ts/ts";
import Chatbot from "./pages/chatbot/chatbot";
import Teacherdash from "./pages/teacherdash/teacherdash";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ts" element={<TS />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/teacherdashboard" element={<Teacherdash />} />
      </Routes>
    </Router>
  );
}

export default App;