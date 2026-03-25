
import React from 'react';
import { useStore } from '../../store';
import AdminSidebar from '../../components/AdminSidebar';

interface Props {
  onLogout: () => void;
}

const AdminDashboard: React.FC<Props> = ({ onLogout }) => {
  const { audits, leads } = useStore();

  const stats = [
    { label: 'Total Audits', value: audits.length, color: 'text-blue-500' },
    { label: 'Contact Leads', value: leads.length, color: 'text-blue-400' },
    { label: 'Avg Maturity', value: (audits.reduce((a, b) => a + b.totalScore, 0) / (audits.length || 1)).toFixed(1), color: 'text-zinc-300' },
    { label: 'Form Activity', value: 'High', color: 'text-blue-500' },
  ];

  return (
    <div className="flex min-h-screen bg-[#060606]">
      <AdminSidebar currentPath="#admin" onLogout={onLogout} />

      {/* Main Content */}
      <div className="flex-grow p-12 overflow-y-auto">
        <header className="mb-12">
          <h4 className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Command Centre</h4>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Executive Dashboard</h1>
          <p className="text-zinc-500 font-light">Real-time overview of AI strategic inquiries and organizational audits.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="glass-card border-white/5 p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 blur-[30px] -z-10 group-hover:bg-blue-600/10 transition-all" />
              <h4 className="text-zinc-600 text-[10px] font-bold uppercase mb-4 tracking-widest">{stat.label}</h4>
              <div className={`text-4xl font-bold tracking-tight ${stat.color}`}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="glass-card border-white/5 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center justify-between">
              Recent Audits
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Last 5</span>
            </h3>
            <div className="space-y-4">
              {audits.slice(0, 5).map((audit) => (
                <div key={audit.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-blue-500/20 transition-all">
                   <div>
                     <div className="text-white font-bold text-sm">{audit.name}</div>
                     <div className="text-[10px] text-zinc-500 uppercase tracking-widest">{audit.company}</div>
                   </div>
                   <div className="text-right">
                     <div className="text-blue-500 font-black text-lg">{audit.totalScore}</div>
                     <div className="text-[10px] text-zinc-600 font-bold uppercase">{new Date(audit.submittedAt).toLocaleDateString()}</div>
                   </div>
                </div>
              ))}
              {audits.length === 0 && <p className="text-zinc-600 italic text-sm p-4">No audit submissions detected.</p>}
            </div>
          </div>

          <div className="glass-card border-white/5 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center justify-between">
              Direct Inquiries
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Incoming</span>
            </h3>
            <div className="space-y-4">
              {leads.slice(0, 5).map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-blue-500/20 transition-all">
                   <div className="max-w-[70%]">
                     <div className="text-white font-bold text-sm">{lead.name}</div>
                     <div className="text-[10px] text-zinc-500 truncate">{lead.message}</div>
                   </div>
                   <div className="text-right shrink-0">
                     <div className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{lead.type}</div>
                     <div className="text-[10px] text-zinc-600 font-bold uppercase">{new Date(lead.submittedAt).toLocaleDateString()}</div>
                   </div>
                </div>
              ))}
              {leads.length === 0 && <p className="text-zinc-600 italic text-sm p-4">Pipeline currently empty.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
