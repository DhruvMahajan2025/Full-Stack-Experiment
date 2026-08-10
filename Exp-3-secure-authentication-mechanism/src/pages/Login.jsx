import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();


  const handleLogin = (event) => {

    event.preventDefault();

    setError("");


    const success = login(
      username,
      password
    );


    if (success) {

      navigate("/dashboard");

    } else {

      setError(
        "Invalid username or password"
      );

    }
  };


  return (
    <div className="login-container">

      <div className="login-card">

        <h1>SecureAuth</h1>

        <p className="subtitle">
          JWT Authentication & RBAC
        </p>


        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
          />


          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />


          {error && (
            <p className="error">
              {error}
            </p>
          )}


          <button
            className="login-button"
            type="submit"
          >
            Login
          </button>

        </form>


        <div className="demo-accounts">

          <h3>Demo Accounts</h3>

          <p>
            <strong>Admin:</strong>
            admin / admin123
          </p>

          <p>
            <strong>Editor:</strong>
            editor / editor123
          </p>

          <p>
            <strong>Viewer:</strong>
            viewer / viewer123
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;