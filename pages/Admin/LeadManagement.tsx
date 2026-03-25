
import React from 'react';
import { useStore } from '../../store';
import AdminSidebar from '../../components/AdminSidebar';

interface Props {
  onLogout: () => void;
}

const LeadManagement: React.FC<Props> = ({ onLogout }) => {
  const { audits, leads } = useStore();

  return (
    <div className="flex min-h-screen bg-[#060606]">
      <AdminSidebar currentPath="#admin/leads" onLogout={onLogout} />

      <div className="flex-grow p-12 overflow-y-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h4 className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Pipeline</h4>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Leads & Assessments</h1>
            <p className="text-zinc-500 font-light">Deep clinical data from organizational maturity audits.</p>
          </div>
          <button className="px-6 py-2.5 bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-blue-600 transition-all hover:border-blue-500">
            Download Dataset
          </button>
        </header>

        <section className="mb-20">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-4">
            Organizational Audits 
            <span className="text-[10px] bg-blue-600/20 text-blue-500 px-3 py-1 rounded-full uppercase tracking-widest">{audits.length}</span>
          </h2>
          <div className="glass-card border-white/5 rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em]">
                  <th className="px-8 py-6">Principal</th>
                  <th className="px-8 py-6">Organization</th>
                  <th className="px-8 py-6">Maturity Score</th>
                  <th className="px-8 py-6">Submission Date</th>
                  <th className="px-8 py-6 text-right">Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {audits.map((audit) => (
                  <tr key={audit.id} className="hover:bg-blue-600/5 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="text-white font-bold text-sm">{audit.name}</div>
                      <div className="text-zinc-500 text-[10px] lowercase tracking-wider">{audit.email}</div>
                    </td>
                    <td className="px-8 py-6 text-zinc-400 text-sm font-light">{audit.company}</td>
                    <td className="px-8 py-6">
                      <span className="text-blue-500 font-black text-xl">
                        {audit.totalScore}<span className="text-[10px] text-zinc-700 ml-1">/15</span>
                      </span>
                    </td>
                    <td className="px-8 py-6 text-zinc-500 text-[10px] font-bold uppercase">
                      {new Date(audit.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-zinc-600 group-hover:text-blue-500 transition-colors text-[10px] font-bold uppercase tracking-widest">Full Report</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {audits.length === 0 && <div className="p-16 text-center text-zinc-600 italic text-sm">No diagnostic data available.</div>}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-4">
            Strategic Inquiries
            <span className="text-[10px] bg-blue-600/20 text-blue-500 px-3 py-1 rounded-full uppercase tracking-widest">{leads.length}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leads.map((lead) => (
              <div key={lead.id} className="glass-card p-8 rounded-[2rem] border-white/5 hover:border-blue-500/20 transition-all relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 blur-[30px] -z-10" />
                 <div className="flex justify-between items-start mb-6">
                   <div>
                     <h4 className="text-white font-bold text-lg tracking-tight">{lead.name}</h4>
                     <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{lead.email}</p>
                   </div>
                   <span className="px-3 py-1 bg-blue-600/10 text-blue-500 rounded-full text-[10px] font-bold uppercase tracking-widest border border-blue-600/20">
                     {lead.type}
                   </span>
                 </div>
                 <div className="bg-black/20 p-6 rounded-2xl border border-white/5 mb-6">
                    <p className="text-zinc-400 text-sm font-light leading-relaxed italic">"{lead.message}"</p>
                 </div>
                 <div className="text-[10px] text-zinc-700 font-bold uppercase tracking-widest">Received: {new Date(lead.submittedAt).toLocaleString()}</div>
              </div>
            ))}
            {leads.length === 0 && <div className="col-span-2 glass-card p-16 text-center text-zinc-600 italic text-sm rounded-[2rem]">No inquiry messages in queue.</div>}
          </div>
        </section>
      </div>
    </div>
  );
};

export default LeadManagement;
