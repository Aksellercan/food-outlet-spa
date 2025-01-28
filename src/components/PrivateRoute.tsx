import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  return auth?.user ? children : <Navigate to="/home" />;
}
