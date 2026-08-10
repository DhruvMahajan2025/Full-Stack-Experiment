import { Link } from "react-router-dom";

function Unauthorized() {

  return (
    <div className="page unauthorized">

      <div className="unauthorized-card">

        <h1>403</h1>

        <h2>
          Access Denied
        </h2>

        <p>
          You do not have permission
          to access this resource.
        </p>

        <p>
          Your current role does not
          have the required permissions.
        </p>


        <Link
          className="back-button"
          to="/dashboard"
        >
          Return to Dashboard
        </Link>

      </div>

    </div>
  );
}

export default Unauthorized;