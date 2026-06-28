import heroImg from '../../assets/11.avif';

export default function Hero({ onGetStarted }) {
  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
      {/* Text Content */}
      <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50/80 border border-blue-100 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          Next-Gen Workspace
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none mb-6 text-slate-900">
          Simplify Your <span className="bg-gradient-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent">Daily Flow</span>
        </h1>
        
        <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
          Turn your ideas into action with Task Pro. Organize tasks, set priorities, 
          and monitor progress with a simple and intuitive platform designed for everyday productivity.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button 
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 px-8 py-4 rounded-full font-bold text-base transition-all duration-200"
            onClick={onGetStarted}
          >
            Get Started Free
          </button>
          
          <a 
            href="#demo"
            className="w-full sm:w-auto text-center bg-white/60 hover:bg-white/90 active:scale-95 text-slate-800 border border-slate-200 px-8 py-4 rounded-full font-bold text-base shadow-sm transition-all duration-200 backdrop-blur-md"
          >
            Try Live Demo
          </a>
        </div>
      </div>

      {/* Visual Image/Mockup container with glass effects */}
      <div className="flex-1 w-full max-w-xl lg:max-w-none relative z-10 group">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-indigo-400 rounded-3xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500"></div>
        <div className="relative p-2 bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl">
          <img 
            src={heroImg} 
            alt="Task Pro Dashboard Preview" 
            className="w-full h-auto rounded-2xl object-cover shadow-inner border border-white/40 aspect-[4/3]"
          />
          {/* Decorative floating widget */}
          <div className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur-xl border border-white/50 p-4 rounded-2xl shadow-xl max-w-[200px] hidden md:flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
              ✓
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Completed Today</p>
              <h4 className="text-base font-bold text-slate-800">12 Tasks Done</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
