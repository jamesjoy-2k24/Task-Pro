import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import taskImg from "../assets/01.webp";
import { register } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await register({ name, email, password, role: "user" });
      setUser(data);
      navigate("/user-login");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  // Inline style object
  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e7f8f8 0%, #d5f7fa 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    },
    box: {
      background: "white",
      padding: "15px 20px",
      borderRadius: "16px",
      boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
      width: "100%",
      maxWidth: "360px",
      textAlign: "center",
    },
    title: {
      color: "#1E3A8A",
      marginBottom: "20px",
      fontSize: "28px",
    },
    img: {
      width: "80px",
      margin: "20px auto",
      display: "block",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      textAlign: "left",
      marginTop: "10px",
    },
    label: {
      color: "#555",
      fontSize: "12px",
      marginTop: "13px",
      marginBottom: "4px",
    },
    input: {
      padding: "12px 15px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      fontSize: "15px",
      outline: "none",
    },
    button: {
      background: "#0933ef",
      color: "white",
      padding: "14px",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      marginTop: "25px",
      cursor: "pointer",
    },
    text: {
      marginTop: "20px",
      fontSize: "14px",
      color: "#666",
    },
    link: {
      color: "#667eea",
      fontWeight: "600",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.box}>
        <h1 style={styles.title}>Register</h1>
        <img src={taskImg} alt="Task" style={styles.img} />

        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
        <form onSubmit={handleRegister} style={styles.form}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />

          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>

        <p style={styles.text}>
          Already have account?{" "}
          <Link to="/user-login" style={styles.link}>
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
