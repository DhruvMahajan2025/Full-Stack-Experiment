import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

/*
  Mock users for our experiment.

  In a real application, these users would
  normally come from a database.
*/
const users = [
  {
    username: "admin",
    password: "admin123",
    role: "Admin",
  },
  {
    username: "editor",
    password: "editor123",
    role: "Editor",
  },
  {
    username: "viewer",
    password: "viewer123",
    role: "Viewer",
  },
];

export function AuthProvider({ children }) {

  /*
    Check localStorage when application starts.

    This allows the user to remain logged in
    even after refreshing the browser.
  */
  const [user, setUser] = useState(() => {

    const token = localStorage.getItem("jwtToken");

    if (!token) {
      return null;
    }

    try {

      const decodedUser = JSON.parse(atob(token));

      return decodedUser;

    } catch (error) {

      localStorage.removeItem("jwtToken");

      return null;
    }
  });


  /*
    LOGIN FUNCTION
  */
  const login = (username, password) => {

    const foundUser = users.find(
      (u) =>
        u.username === username &&
        u.password === password
    );

    /*
      If username/password is incorrect
    */
    if (!foundUser) {
      return false;
    }

    /*
      Information that will be stored
      inside our simulated JWT payload.
    */
    const payload = {
      username: foundUser.username,
      role: foundUser.role,
      loginTime: new Date().toLocaleString(),
    };

    /*
      Mock JWT generation.

      btoa() converts the JSON string
      into Base64.

      NOTE:
      This is a simulation, not a real
      cryptographically signed JWT.
    */
    const token = btoa(
      JSON.stringify(payload)
    );

    /*
      Store token in browser
    */
    localStorage.setItem(
      "jwtToken",
      token
    );

    /*
      Update global authentication state
    */
    setUser(payload);

    return true;
  };


  /*
    LOGOUT FUNCTION
  */
  const logout = () => {

    localStorage.removeItem("jwtToken");

    setUser(null);
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


/*
  Custom hook used by components
  to access authentication information.
*/
export function useAuth() {

  return useContext(AuthContext);
}