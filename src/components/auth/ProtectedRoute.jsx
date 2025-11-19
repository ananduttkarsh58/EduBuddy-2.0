import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }) {
  // Check both localStorage and sessionStorage
  const token =
    localStorage.getItem("authToken") ||
    sessionStorage.getItem("authToken");

  const userRole =
    localStorage.getItem("userRole") ||
    sessionStorage.getItem("userRole");

  // Not logged in → go to /auth
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  // Normalize allowedRole into an array (supports string OR array)
  const allowedRoles = Array.isArray(allowedRole)
    ? allowedRole
    : [allowedRole];

  // If role mismatch → redirect to correct dashboard
  if (allowedRole && !allowedRoles.includes(userRole)) {
    const correctPath =
      userRole === "student" ? "/home" : "/teacherdashboard";
    return <Navigate to={correctPath} replace />;
  }

  return children;
}
