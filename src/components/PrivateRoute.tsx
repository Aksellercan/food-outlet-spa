import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";


export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  // return auth?.user ? children : <Navigate to="/home" />;
  const location = useLocation();

  return auth?.user ? (
    children
  ) : (
    <Navigate to="/home" state={{ from: location }} />
  );
}
