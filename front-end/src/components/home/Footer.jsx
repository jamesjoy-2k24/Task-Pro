import logoImg from '../../assets/02.png';
import { Link } from 'react-router-dom';

export default function Footer() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing!");
  };

  return (
    <footer className="w-full bg-slate-50/50 backdrop-blur-md border-t border-slate-200/60 py-16 px-6 md:px-12 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 mb-12">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Logo" className="w-10 h-10 rounded-xl shadow-md border border-white/20 object-cover" />
            <span className="text-xl font-black bg-gradient-to-r from-blue-900 to-black bg-clip-text text-transparent">
              Shana.net
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
            A premium workspace layout optimized to structure tasks, increase team velocity, and achieve daily breakthroughs.
          </p>
        </div>

        {/* Links Column 1 */}
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-slate-800 text-sm">Product</h4>
          <Link to="/" className="text-xs text-slate-500 hover:text-blue-900 transition-colors">Features</Link>
          <a href="#demo" className="text-xs text-slate-500 hover:text-blue-900 transition-colors">Workspace Demo</a>
          <Link to="/" className="text-xs text-slate-500 hover:text-blue-900 transition-colors">Pricing Options</Link>
        </div>

        {/* Links Column 2 */}
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-slate-800 text-sm">Company</h4>
          <Link to="/about" className="text-xs text-slate-500 hover:text-blue-900 transition-colors">About Us</Link>
          <Link to="/service" className="text-xs text-slate-500 hover:text-blue-900 transition-colors">Services</Link>
          <Link to="/" className="text-xs text-slate-500 hover:text-blue-900 transition-colors">Privacy Policy</Link>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-slate-800 text-sm">Stay Updated</h4>
          <p className="text-xs text-slate-500">Subscribe to get productivity updates.</p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input 
              type="email" 
              required
              placeholder="name@email.com" 
              className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-blue-500 w-full shadow-sm"
            />
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 text-xs font-bold transition-colors"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-200/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
        <span>© {new Date().getFullYear()} Shana Task Pro. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-blue-900 transition-colors">Twitter</a>
          <a href="#" className="hover:text-blue-900 transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-blue-900 transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
