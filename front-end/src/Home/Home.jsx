import logoImg from '../assets/02.png';
import heroImg from '../assets/11.avif';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setShowOptions(true);
  };

  return (
    <div className="min-height-screen text-black min-h-screen flex flex-col font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-20 py-5 bg-gray-50 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="Logo" className="w-11 h-11 rounded-xl shadow-lg border border-white/20 object-cover" />
          <span className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-900 to-black bg-clip-text text-transparent">
            Shana.net
          </span>
        </div>
        
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/" className="hidden sm:inline-block text-blue-900   hover:text-blue-600 font-medium text-lg transition duration-200">Home</Link>
          <Link to="/about" className="hidden sm:inline-block text-blue-900 hover:text-blue-600 font-medium text-lg transition duration-200">AboutUs</Link>
          <Link to="/service" className="hidden sm:inline-block text-blue-900 hover:text-blue-600 font-medium text-lg transition duration-200">Service</Link>
          <button 
            className="bg-white text-blue-700 hover:bg-blue-50 active:scale-95 px-6 py-2.5 rounded-full font-bold text-sm md:text-base shadow-md hover:shadow-lg transition-all duration-200"
            onClick={() => setShowOptions(!showOptions)}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Sign Up / Login Options Dialog */}
      {showOptions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowOptions(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white text-slate-800 rounded-2xl shadow-2xl p-8 w-full max-w-sm border border-slate-100 transform transition-all scale-100 flex flex-col gap-5">
            <h3 className="font-bold text-2x text-center">Login As</h3>
            <p className="text-slate-500 text-center text-sm -mt-2">Choose your account type to proceed to the workspace</p>
            <div className="flex flex-col gap-3">
              <Link 
                to="/user-login" 
                className="w-full text-center py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold rounded-xl shadow-md transition duration-200"
              >
                User Account
              </Link>

            </div>
            <button 
              onClick={() => setShowOptions(false)} 
              className="text-slate-400 hover:text-slate-600 text-sm font-medium transition duration-200 mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 px-6 md:px-20 py-16 md:py-24 max-w-7xl mx-auto flex-grow">
        <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none mb-6">
            Task <span className="text-blue-900 bg-gradient-to-r from-blue-900 to-indigo-950 bg-clip-text">Manager</span>
          </h1>
          <p className="text-base md:text-lg text-black leading-relaxed mb-8 max-w-xl">
            Turn your ideas into action with Todo Manager. Organize tasks, set priorities, 
            and monitor progress with a simple and intuitive platform. Stay focused on what matters most,
            reduce stress, and accomplish a task management experience designed for everyday productivity.
          </p>
          <button 
            className="bg-transparent hover:bg-black active:scale-95 text-black border-2 border-black hover:bg-black hover:text-white px-8 py-3.5 rounded-full font-bold text-base md:text-lg shadow-md hover:shadow-lg transition-all duration-200"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}
