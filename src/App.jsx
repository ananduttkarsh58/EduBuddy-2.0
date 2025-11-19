// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";

// Auth Pages (NEW)
import AuthPage from "./pages/auth/authpage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Home from "./pages/home/home";
import TS from "./pages/ts/ts";
import Chatbot from "./pages/chatbot/chatbot";
import Messages from "./pages/TeacherMessages/messages";
import Teacherdash from "./pages/teacherdash/teacherdash";
import TD from "./pages/teachersdirectory/td";
import PPT from "./pages/ppt/ppt";
import NOTES from "./pages/studentnotes/notes";
import SubjectNotes from "./pages/subjectnotes/subjectnotes"; //
import TeacherNotes from "./pages/teachernotes/notes";
import TeacherChatbot from "./pages/TeacherChatbot/chatbot";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import TeacherMessages from "./pages/TeacherMessages/messages";
import TeacherMessagesPage from "./pages/TS_teacher/TS_teacher";
import StudentsSubjectNotes from "./pages/studentsubjectnotes/studentsubjectnotes";
import TeacherDirectoryMaterial from "./pages/TeacherDirectoryMaterial/teacherdirectorymaterial";





export default function App() {
  return (
    <Routes>
      {/* Auth Route - Landing page redirects to login */}
      <Route path="/auth" element={<AuthPage />} />

      <Route path="/reset-password" element={<ResetPasswordPage />} />

      <Route
        path="/teachermessagepage"
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherMessagesPage />
          </ProtectedRoute>
        }
      />

      {/* Redirect root to auth */}
      <Route path="/" element={<Navigate to="/auth" replace />} />

      <Route path="/teachermessages" element={<ProtectedRoute allowedRole="teacher"><TeacherMessages /></ProtectedRoute>
  }
/>

      {/* STUDENT ROUTES - Protected with original paths */}



      <Route
        path="/teacherdirectorymaterial"
        element={
          <ProtectedRoute allowedRole="student">
            <TeacherDirectoryMaterial />
          </ProtectedRoute>
        }
      />


      <Route
        path="/studentsubjectnotes"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentsSubjectNotes />
          </ProtectedRoute>
        }
      />




      <Route
        path="/home"
        element={
          <ProtectedRoute allowedRole="student">
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ts"
        element={
          <ProtectedRoute allowedRole="student">
            <TS />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chatbot"
        element={
          <ProtectedRoute allowedRole="student">
            <Chatbot />
          </ProtectedRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <ProtectedRoute allowedRole="student">
            <Messages />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notes"
        element={
          <ProtectedRoute allowedRole="student">
            <NOTES />
          </ProtectedRoute>
        }
      />
      <Route
        path="/subjectnotes"
        element={
          <ProtectedRoute allowedRole="student">
            <SubjectNotes />
          </ProtectedRoute>
        }
      />

      {/* TEACHER ROUTES - Protected with original paths */}
      <Route
        path="/teacherdashboard"
        element={
          <ProtectedRoute allowedRole="teacher">
            <Teacherdash />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teachernotes"
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherNotes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teachersubjectnotes"
        element={
          <ProtectedRoute allowedRole="teacher">
            <SubjectNotes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacherchatbot"
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherChatbot />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teachersdirectory"
        element={
          <ProtectedRoute allowedRole={["teacher", "student"]}>
            <TD />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ppt"
        element={
          <ProtectedRoute allowedRole="teacher">
            <PPT />
          </ProtectedRoute>
        }
      />

      {/* 404 - Redirect to auth */}
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}
