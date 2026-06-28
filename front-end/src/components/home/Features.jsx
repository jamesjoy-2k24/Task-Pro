export default function Features() {
  const featuresList = [
    {
      title: "Interactive Kanban Board",
      description: "Visualize workflows, drag and drop tasks, and manage statuses from start to finish seamlessly.",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
      )
    },
    {
      title: "Smart Prioritization",
      description: "Set critical priorities, track flags, and align your energy with what matters most today.",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
      )
    },
    {
      title: "Progress & Insights",
      description: "Monitor milestones and completion rates with beautiful task status aggregations.",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Seamless Team Spaces",
      description: "Bring your team together. Allocate projects, assign responsibilities, and speed up delivery.",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
          Everything You Need to <span className="bg-gradient-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent">Stay Structured</span>
        </h2>
        <p className="text-slate-600">
          Clean task boards, analytics, and collaborative capabilities built to simplify your daily work.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuresList.map((feat, idx) => (
          <div 
            key={idx} 
            className="group relative bg-white/40 hover:bg-white/85 backdrop-blur-md border border-white/50 p-8 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col gap-5"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors duration-300">
              {feat.icon}
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">{feat.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{feat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
