import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({
  children,
  allowedRoles,
}) {

  const { user } = useAuth();


  /*
    STEP 1:
    Check whether the user is authenticated.
  */
  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  /*
    STEP 2:
    If specific roles are required,
    check whether the user's role
    is allowed.
  */
  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {

    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );

  }


  /*
    If authentication and authorization
    checks pass, display the page.
  */
  return children;
}

export default ProtectedRoute;