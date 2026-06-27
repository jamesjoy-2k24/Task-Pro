import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import './Login.css';
import { login } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export default function Adminlogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await login({ email, password });
      if (data.user?.role !== 'admin') {
        throw new Error('Not an admin account');
      }
      setUser(data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h1>Admin</h1>
        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>
        <p className="signup-text">
          New User? <Link to="/admin-register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
