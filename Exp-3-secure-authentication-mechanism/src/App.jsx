import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Editor from "./pages/Editor";
import Viewer from "./pages/Viewer";
import Unauthorized from "./pages/Unauthorized";


function App() {

  return (

    <AuthProvider>

      <BrowserRouter>

        <Navbar />


        <Routes>

          {/* ================= PUBLIC ROUTE ================= */}

          <Route
            path="/login"
            element={<Login />}
          />


          {/* ================= AUTHENTICATED ROUTE ================= */}

          <Route
            path="/dashboard"
            element={

              <ProtectedRoute>

                <Dashboard />

              </ProtectedRoute>

            }
          />


          {/* ================= ADMIN ONLY ================= */}

          <Route
            path="/admin"
            element={

              <ProtectedRoute
                allowedRoles={["Admin"]}
              >

                <Admin />

              </ProtectedRoute>

            }
          />


          {/* ================= ADMIN + EDITOR ================= */}

          <Route
            path="/editor"
            element={

              <ProtectedRoute
                allowedRoles={[
                  "Admin",
                  "Editor",
                ]}
              >

                <Editor />

              </ProtectedRoute>

            }
          />


          {/* ================= ALL AUTHENTICATED ROLES ================= */}

          <Route
            path="/viewer"
            element={

              <ProtectedRoute
                allowedRoles={[
                  "Admin",
                  "Editor",
                  "Viewer",
                ]}
              >

                <Viewer />

              </ProtectedRoute>

            }
          />


          {/* ================= UNAUTHORIZED ================= */}

          <Route
            path="/unauthorized"
            element={<Unauthorized />}
          />


          {/* ================= DEFAULT ================= */}

          <Route
            path="/"
            element={
              <Navigate
                to="/login"
                replace
              />
            }
          />


          <Route
            path="*"
            element={
              <Navigate
                to="/login"
                replace
              />
            }
          />

        </Routes>

      </BrowserRouter>

    </AuthProvider>

  );
}

export default App;