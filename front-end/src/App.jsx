import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Adminlogin from "./Login/Adminlogin";
import Adminregister from "./Register/Adminregister";
import Dashboard from "./Dashboard/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-login" element={<Login />} />
        <Route path="/admin-login" element={<Adminlogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-register" element={<Adminregister />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

function Page({ title }) {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        fontSize: "32px",
        color: "#1e3a8a",
      }}
    >
      {title} Page
    </div>
  );
}

export default App;
