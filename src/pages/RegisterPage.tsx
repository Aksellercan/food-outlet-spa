import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    auth?.register(username, password);
    alert("Registration successful. Please log in.");
    navigate("/");
  };

  return (
    <form className="auth-form">
      <h2>Register</h2>
      <input type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Register</button>
    </form>
  );
}
