import { useAuth } from "../context/AuthContext";

function Admin() {

  const { user } = useAuth();


  return (
    <div className="page">

      <h1>Admin Panel</h1>


      <div className="admin-panel">

        <h2>
          Administrator Access
        </h2>

        <p>
          Welcome, {user.username}.
        </p>

        <p>
          Your Admin role gives you
          full application permissions.
        </p>


        <div className="actions">

          <button>
            Manage Users
          </button>

          <button>
            Manage Roles
          </button>

          <button>
            System Settings
          </button>

          <button>
            View Security Logs
          </button>

        </div>

      </div>

    </div>
  );
}

export default Admin;