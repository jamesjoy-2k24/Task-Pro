import { useState } from 'react';

export default function InteractiveDemo() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Draft landing page copy', category: 'Marketing', status: 'todo', priority: 'Low' },
    { id: 2, title: 'Connect user authentication', category: 'Backend', status: 'progress', priority: 'High' },
    { id: 3, title: 'Refactor home page components', category: 'Frontend', status: 'progress', priority: 'Medium' },
    { id: 4, title: 'Deploy production instance', category: 'DevOps', status: 'done', priority: 'High' },
  ]);

  const moveTask = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === id) {
          let nextStatus;
          if (task.status === 'todo') nextStatus = 'progress';
          else if (task.status === 'progress') nextStatus = 'done';
          else nextStatus = 'todo';
          return { ...task, status: nextStatus };
        }
        return task;
      })
    );
  };

  const columns = [
    { key: 'todo', title: 'To Do', color: 'bg-amber-500' },
    { key: 'progress', title: 'In Progress', color: 'bg-blue-600' },
    { key: 'done', title: 'Completed', color: 'bg-emerald-500' },
  ];

  return (
    <section id="demo" className="py-20 px-6 md:px-12 max-w-7xl mx-auto scrolling-section">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
          Try the <span className="bg-gradient-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent">Live Workspace</span>
        </h2>
        <p className="text-slate-600">
          Click any task card in the board below to move it to the next workspace column in real-time.
        </p>
      </div>

      {/* Board Container */}
      <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-6 md:p-8 rounded-3xl shadow-2xl max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {columns.map(col => (
            <div key={col.key} className="bg-slate-50/50 backdrop-blur-md rounded-2xl p-4 border border-slate-100 flex flex-col gap-4 min-h-[320px]">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${col.color}`}></span>
                  <h3 className="font-bold text-slate-800 text-base">{col.title}</h3>
                </div>
                <span className="bg-white/80 border border-slate-200 text-xs px-2 py-0.5 rounded-full text-slate-500 font-bold">
                  {tasks.filter(t => t.status === col.key).length}
                </span>
              </div>

              <div className="flex flex-col gap-3 flex-grow">
                {tasks.filter(t => t.status === col.key).map(task => (
                  <div 
                    key={task.id} 
                    onClick={() => moveTask(task.id)}
                    className="group bg-white border border-slate-150 p-4 rounded-xl shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 hover:border-blue-400 active:scale-[0.98] select-none flex flex-col gap-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                        {task.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        task.priority === 'High' ? 'bg-rose-50 text-rose-600' :
                        task.priority === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {task.priority} Priority
                      </span>
                    </div>
                    <p className="text-slate-800 text-sm font-semibold leading-snug group-hover:text-blue-600 transition-colors">
                      {task.title}
                    </p>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[11px] text-slate-400">
                      <div className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Today</span>
                      </div>
                      <span className="text-blue-500 font-bold group-hover:underline">Move →</span>
                    </div>
                  </div>
                ))}
                {tasks.filter(t => t.status === col.key).length === 0 && (
                  <div className="flex flex-col items-center justify-center flex-grow py-12 text-slate-400 text-center gap-2">
                    <svg className="w-8 h-8 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0V9a2 2 0 00-2-2H6a2 2 0 00-2 2v2m16 4h-2a2 2 0 00-2 2v3m-6-3h2a2 2 0 002-2v-3" />
                    </svg>
                    <p className="text-xs">No tasks in this stage</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
