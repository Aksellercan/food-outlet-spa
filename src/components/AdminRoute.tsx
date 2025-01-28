import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth?.user) {
    // Redirect to login if not logged in
    return <Navigate to="/home" state={{ from: location }} />;
  }

  if (auth.user.role !== "Admin") {
    // Redirect if not admin
    return <Navigate to="/not-authorized" />;
  }

  return children; // Allow access to admin
}
