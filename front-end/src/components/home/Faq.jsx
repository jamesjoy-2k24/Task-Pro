import { useState } from 'react';

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: "What is Shana Task Pro?",
      a: "Shana Task Pro is a modern collaborative workspace designed to organize tasks, structure goals, and prioritize daily objectives with interactive Kanban boards."
    },
    {
      q: "Can I use it with my entire team?",
      a: "Yes! Professional and Enterprise plans support collaborative spaces, custom task assignment, and workspace-level permission configurations."
    },
    {
      q: "Is there a free trial or free version?",
      a: "Our Starter plan is completely free of charge, supporting up to three workspaces and standard boards. No credit card is required to sign up."
    },
    {
      q: "Can I export my workspaces and data?",
      a: "Absolutely. All boards and checklists can be exported directly from your workspace dashboard in structured format for local backup."
    }
  ];

  return (
    <section className="py-20 px-6 md:px-12 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
          Frequently Asked <span className="bg-gradient-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent">Questions</span>
        </h2>
        <p className="text-slate-600">
          Find fast answers to common questions about accounts, features, and setup.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div 
              key={idx} 
              className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
            >
              <button 
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full text-left p-6 flex justify-between items-center font-bold text-slate-800 hover:text-blue-900 transition-colors"
              >
                <span>{faq.q}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`}>
                  ▼
                </span>
              </button>
              
              <div 
                className={`transition-all duration-300 overflow-hidden ${
                  isOpen ? 'max-h-40 border-t border-slate-100/55 p-6 bg-slate-50/20' : 'max-h-0'
                }`}
              >
                <p className="text-slate-600 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
