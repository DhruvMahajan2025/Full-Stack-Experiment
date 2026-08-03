import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");

  const login = () => {
    if (username === "admin" && password === "1234") {

      // Simulated JWT Token
      const payload = {
        username: username,
        loginTime: new Date().toLocaleString(),
      };

      const fakeToken = btoa(JSON.stringify(payload));

      localStorage.setItem("jwtToken", fakeToken);

      setMessage("Login Successful!");
      setUser(username);
    } else {
      setMessage("Invalid Username or Password");
    }
  };

  const accessProtected = () => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      setMessage("No Token Found");
      return;
    }

    const decoded = JSON.parse(atob(token));

    setMessage(
      `Welcome ${decoded.username}\nLogin Time: ${decoded.loginTime}`
    );
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setMessage("Logged Out");
    setUser("");
  };

  return (
    <div className="container">

      <h1>JWT Authentication</h1>

      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>
        Login
      </button>

      <button onClick={accessProtected}>
        Access Protected Page
      </button>

      <button onClick={logout}>
        Logout
      </button>

      {user && <h3>User : {user}</h3>}

      <pre>{message}</pre>

    </div>
  );
}

export default App;