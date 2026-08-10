import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

  const { user, logout } = useAuth();

  // Don't show navbar if user isn't logged in
  if (!user) {
    return null;
  }

  return (
    <nav className="navbar">

      <div className="logo">
        SecureAuth
      </div>

      <div className="nav-links">

        <Link to="/dashboard">
          Dashboard
        </Link>

        {/* Admin only */}
        {user.role === "Admin" && (
          <Link to="/admin">
            Admin Panel
          </Link>
        )}

        {/* Admin and Editor */}
        {(user.role === "Admin" ||
          user.role === "Editor") && (
          <Link to="/editor">
            Editor Panel
          </Link>
        )}

        {/* All authenticated users */}
        <Link to="/viewer">
          Viewer Area
        </Link>

        <span className="role-badge">
          {user.username} ({user.role})
        </span>

        <button
          className="logout-button"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;