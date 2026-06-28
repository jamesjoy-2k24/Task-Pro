import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import logoImg from "../assets/02.png";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 bg-slate-50/40 font-sans selection:bg-blue-600 selection:text-white overflow-hidden">
      
      {/* Background Animated Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-blue-200/30 blur-3xl animate-pulse duration-[8000ms]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-indigo-200/30 blur-3xl animate-pulse duration-[10000ms]"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-900 text-sm font-semibold transition-colors duration-200 mb-6 group"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span> 
          Back to home
        </Link>

        {/* Glassmorphic Box */}
        <div className="bg-white/70 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-2xl p-8 md:p-10 flex flex-col gap-6">
          {/* Logo & Header */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-md border border-white/40 flex items-center justify-center">
              <img src={logoImg} alt="Logo" className="w-9 h-9 object-cover" />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-900 to-indigo-950 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-slate-500 text-sm text-center -mt-1">
              Enter your credentials to access your task dashboard
            </p>
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-100 text-rose-600 p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/50 backdrop-blur-md border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl py-3 px-4 outline-none text-slate-800 text-sm font-medium transition-all duration-200"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/50 backdrop-blur-md border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl py-3 px-4 outline-none text-slate-800 text-sm font-medium transition-all duration-200"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 active:scale-[0.98] text-white font-bold rounded-2xl shadow-lg shadow-blue-500/10 transition-all duration-200 mt-2 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500">
            New User?{" "}
            <Link to="/register" className="text-blue-600 hover:text-blue-800 font-bold transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
