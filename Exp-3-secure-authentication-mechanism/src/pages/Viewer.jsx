import { useAuth } from "../context/AuthContext";

function Viewer() {

  const { user } = useAuth();


  return (
    <div className="page">

      <h1>Viewer Area</h1>


      <div className="viewer-panel">

        <h2>
          Read-Only Access
        </h2>

        <p>
          Welcome, {user.username}.
        </p>

        <p>
          Your Viewer role allows you
          to view application content.
        </p>


        <div className="actions">

          <button>
            View Reports
          </button>

          <button>
            View Content
          </button>

        </div>


        <div className="permission-note">

          <strong>
            Permission Level:
          </strong>

          <p>
            Read-only
          </p>

        </div>

      </div>

    </div>
  );
}

export default Viewer;