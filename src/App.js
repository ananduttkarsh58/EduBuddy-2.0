import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import TS from "./pages/ts/ts";
import Chatbot from "./pages/chatbot/chatbot";
import Teacherdash from "./pages/teacherdash/teacherdash";
import TD from "./pages/teachersdirectory/td";
import Messages from "./pages/messages/messages";
import PPT from "./pages/ppt/ppt";
import NOTES from "./pages/notes/notes";
import SubjectNotes from "./pages/subjectnotes/subjectnotes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ts" element={<TS />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/teacherdashboard" element={<Teacherdash />} />
        <Route path="/teachersdirectory" element={<TD />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/ppt" element={<PPT />} />
        <Route path="/notes" element={<NOTES />} />
        <Route path="/subjectnotes" element={<SubjectNotes />} />
      </Routes>
    </Router>
  );
}

export default App;