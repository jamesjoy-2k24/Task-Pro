import logoImg from '../../assets/02.png';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar({ onSignUpClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-lg border-b border-white/50 shadow-md py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-12">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative overflow-hidden rounded-xl shadow-md border border-white/50 w-10 h-10 flex items-center justify-center bg-white/40">
            <img 
              src={logoImg} 
              alt="Logo" 
              className="w-8 h-8 object-cover transition-transform duration-500 group-hover:scale-110" 
            />
          </div>
          <span className="text-xl md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-900 to-indigo-950 bg-clip-text text-transparent">
            Shana.net
          </span>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          <Link to="/" className="relative text-slate-700 hover:text-blue-900 font-semibold text-base transition-colors duration-200 group">
            Home
            <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/about" className="relative text-slate-600 hover:text-blue-900 font-semibold text-base transition-colors duration-200 group">
            About Us
            <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/service" className="relative text-slate-600 hover:text-blue-900 font-semibold text-base transition-colors duration-200 group">
            Services
            <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <button 
            className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 px-6 py-2.5 rounded-full font-bold text-sm md:text-base transition-all duration-200 border border-blue-500/30"
            onClick={onSignUpClick}
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="md:hidden p-2 rounded-lg bg-white/50 border border-slate-200 hover:bg-white transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl border-b border-slate-200/60 shadow-lg p-6 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200">
          <Link 
            to="/" 
            className="text-slate-800 hover:text-blue-600 font-semibold text-lg py-2 border-b border-slate-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="text-slate-850 hover:text-blue-600 font-semibold text-lg py-2 border-b border-slate-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link 
            to="/service" 
            className="text-slate-800 hover:text-blue-600 font-semibold text-lg py-2 border-b border-slate-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Services
          </Link>
          <button 
            className="w-full text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-bold text-base mt-2"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onSignUpClick();
            }}
          >
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
}
