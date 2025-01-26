import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (username.trim() === "" || password.trim() === "") {
  //     setErrorMessage("Both fields are required.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post("http://localhost:7277/api/login/login", {
  //       username,
  //       password
  //     }, {
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     });

  //     if (response.status === 200) {
  //       const { token } = response.data; // Extract the token from the response
  //       localStorage.setItem("authToken", token); // Store the token in localStorage (or a more secure storage option)
  //       auth?.login(username, password);  // Store the user info if needed
  //       navigate("/home");
  //     }
  //   } catch (error) {
  //     setErrorMessage("Invalid credentials. Please try again or register.");
  //   }
  // };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7277/api/login/login', {
        username,
        password
      });
      if (response.data.token) {
        // Store the token, redirect user, etc.
        navigate("/home");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Error logging in. Please try again.");
    }
  };

  const handleRegister = async () => {
    if (username.trim() === "" || password.trim() === "") {
      setErrorMessage("Both fields are required.");
      return;
    }

    try {
      await axios.post("http://localhost:7277/api/login/register", {
        username,
        password
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      alert("Registration successful! You can now log in.");
      navigate("/login");
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      <button type="button" onClick={() => navigate("/register")}>Register</button>
      <button type="button" onClick={() => navigate("/home?guest=true")}>Continue as Guest</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
}
