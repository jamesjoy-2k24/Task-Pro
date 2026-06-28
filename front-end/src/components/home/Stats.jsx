export default function Stats() {
  const statsList = [
    { value: "10K+", label: "Active Professionals", desc: "Trusting Shana daily" },
    { value: "1.2M+", label: "Tasks Orchestrated", desc: "From drafting to completion" },
    { value: "99.9%", label: "Platform Uptime", desc: "Ready whenever you are" },
    { value: "35%", label: "Efficiency Boost", desc: "Average reported by teams" },
  ];

  return (
    <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="relative bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row justify-between gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-200/60">
        {statsList.map((stat, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center justify-center text-center pt-6 md:pt-0 md:px-6">
            <h3 className="text-4xl md:text-5xl font-black text-blue-900 tracking-tight mb-2 bg-gradient-to-r from-blue-700 to-indigo-950 bg-clip-text text-transparent">
              {stat.value}
            </h3>
            <h4 className="text-sm font-bold text-slate-800 mb-1">{stat.label}</h4>
            <p className="text-xs text-slate-500">{stat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
