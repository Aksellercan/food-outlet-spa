import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:7277/api/login/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token; // Assuming the API returns { "token": "..." }
        localStorage.setItem("authToken", token); // Save the token in local storage
        //auth?.loginWithToken(token); // Save the token in your auth context or storage
        navigate("/");
      } else {
        alert("Invalid credentials. Please try again or register.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <form className="auth-form">
      <h2>Login</h2>
      <input type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button onClick={handleLogin} type="submit">Login</button>
      <button onClick={() => navigate("/register")} type="button">Register</button>
      <button onClick={() => navigate("/?guest=true")} type="button">Continue as Guest</button>
    </form>
  );
}
