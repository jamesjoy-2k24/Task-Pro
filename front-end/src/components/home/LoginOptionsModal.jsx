import { Link } from 'react-router-dom';

export default function LoginOptionsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-white/80 backdrop-blur-2xl text-slate-800 rounded-3xl shadow-2xl p-8 w-full max-w-sm border border-white/50 transform transition-all scale-100 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="text-center">
          <h3 className="font-extrabold text-2xl bg-gradient-to-r from-blue-900 to-indigo-950 bg-clip-text text-transparent">
            Get Started
          </h3>
          <p className="text-slate-500 text-sm mt-2">
            Choose your account type to proceed to the workspace
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link 
            to="/user-login" 
            className="w-full text-center py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:scale-[0.98] text-white font-semibold rounded-2xl shadow-md shadow-blue-500/10 transition-all duration-200"
          >
            User Account
          </Link>
        
        </div>

        <button 
          onClick={onClose} 
          className="text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors duration-200 text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
