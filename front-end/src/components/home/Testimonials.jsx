export default function Testimonials() {
  const reviews = [
    {
      quote: "Shana completely reformed how we track client milestones. The simplicity of moving task states keeps our team focused and aligned.",
      author: "Sarah Jenkins",
      role: "Lead Product Designer",
      company: "Apex Studio",
      initials: "SJ"
    },
    {
      quote: "Building our backend integration was a breeze because task deadlines were clean. Highly recommend it to any startup looking for zero bloat.",
      author: "Marcus Chen",
      role: "CTO & Co-Founder",
      company: "StackFlow",
      initials: "MC"
    },
    {
      quote: "Beautiful interface, solid speed, and excellent collaboration tools. It has shortened our weekly sync meetings by nearly half.",
      author: "Elena Rostova",
      role: "Operations Manager",
      company: "Vortex Agency",
      initials: "ER"
    }
  ];

  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto bg-slate-50/30 backdrop-blur-sm rounded-[3rem] border border-slate-100/50">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
          Loved by <span className="bg-gradient-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent">Modern Teams</span>
        </h2>
        <p className="text-slate-600">
          Hear from leaders who have upgraded their workflow efficiency.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {reviews.map((rev, idx) => (
          <div 
            key={idx} 
            className="bg-white/50 backdrop-blur-xl border border-white/60 p-8 rounded-3xl shadow-lg flex flex-col justify-between gap-6"
          >
            <p className="text-slate-600 italic leading-relaxed text-sm">
              "{rev.quote}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center border border-blue-200">
                {rev.initials}
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">{rev.author}</h4>
                <p className="text-[11px] text-slate-500 font-medium">{rev.role} at {rev.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
