import { useAuth } from "../context/AuthContext";

function Dashboard() {

  const { user } = useAuth();


  return (
    <div className="page">

      <h1>Dashboard</h1>


      <div className="welcome-card">

        <h2>
          Welcome, {user.username}!
        </h2>

        <p>
          You have successfully authenticated
          using the JWT authentication system.
        </p>

      </div>


      <div className="info-grid">

        <div className="info-card">

          <h3>Authentication</h3>

          <p>
            Status:
            <strong> Authenticated</strong>
          </p>

        </div>


        <div className="info-card">

          <h3>User Role</h3>

          <p>
            {user.role}
          </p>

        </div>


        <div className="info-card">

          <h3>Session Type</h3>

          <p>
            Stateless
          </p>

        </div>

      </div>


      <div className="details-card">

        <h2>Authentication Details</h2>

        <p>
          <strong>Username:</strong>{" "}
          {user.username}
        </p>

        <p>
          <strong>Role:</strong>{" "}
          {user.role}
        </p>

        <p>
          <strong>Login Time:</strong>{" "}
          {user.loginTime}
        </p>

        <p>
          <strong>Token Status:</strong>{" "}
          Active
        </p>

      </div>

    </div>
  );
}

export default Dashboard;