
import React, { useState } from 'react';
import { useStore } from '../../store';
import AdminSidebar from '../../components/AdminSidebar';
import { Service, SiteConfig } from '../../types';

interface Props {
  onLogout: () => void;
}

const CMSManager: React.FC<Props> = ({ onLogout }) => {
  const { services, updateService, config, updateConfig } = useStore();
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingConfig, setEditingConfig] = useState<SiteConfig>(config);
  const [activeTab, setActiveTab] = useState<'services' | 'identity'>('services');

  const handleConfigSave = () => {
    updateConfig(editingConfig);
    alert('Brand Identity Updated.');
  };

  return (
    <div className="flex min-h-screen bg-[#060606]">
      <AdminSidebar currentPath="#admin/cms" onLogout={onLogout} />

      <div className="flex-grow p-12 overflow-y-auto">
        <header className="mb-12">
          <h4 className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Content</h4>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Authority Management</h1>
          <p className="text-zinc-500 font-light mb-8">Customize your strategic services and public brand assets.</p>
          
          <div className="flex gap-4 p-1 glass-card border-white/5 rounded-xl w-fit">
            <button 
              onClick={() => setActiveTab('services')}
              className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'services' ? 'bg-blue-600 text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
              Services
            </button>
            <button 
              onClick={() => setActiveTab('identity')}
              className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'identity' ? 'bg-blue-600 text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
              Identity & Assets
            </button>
          </div>
        </header>

        {activeTab === 'services' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Services List */}
            <div className="animate-fade-up">
              <h2 className="text-xl font-bold text-white mb-6">Core Service Modules</h2>
              <div className="space-y-4">
                {services.map((service) => (
                  <div 
                    key={service.id} 
                    className={`p-8 rounded-[2rem] border transition-all cursor-pointer relative overflow-hidden group ${
                      editingService?.id === service.id 
                        ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.1)]' 
                        : 'glass-card border-white/5 hover:border-white/10'
                    }`}
                    onClick={() => setEditingService(service)}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 blur-[30px] -z-10" />
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-white font-bold text-xl tracking-tight">{service.title}</h3>
                      <div className="px-2 py-1 bg-zinc-800 text-zinc-500 text-[8px] font-bold uppercase tracking-widest rounded">Active Module</div>
                    </div>
                    <p className="text-zinc-500 text-sm font-light leading-relaxed line-clamp-2">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Editor Panel */}
            <div className="animate-fade-up">
              <h2 className="text-xl font-bold text-white mb-6">
                {editingService ? `Module: ${editingService.title}` : 'Select a component to configure'}
              </h2>
              {editingService ? (
                <div className="glass-card border-white/10 p-10 rounded-[3rem] space-y-8 animate-fade-up">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3 ml-1">Strategic Title</label>
                    <input 
                      type="text" 
                      className="w-full bg-black border border-white/10 p-4 rounded-xl text-white outline-none focus:border-blue-600 transition-all"
                      value={editingService.title}
                      onChange={(e) => setEditingService({...editingService, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3 ml-1">Short Mission</label>
                    <textarea 
                      rows={2}
                      className="w-full bg-black border border-white/10 p-4 rounded-xl text-white outline-none focus:border-blue-600 transition-all resize-none"
                      value={editingService.description}
                      onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                      <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3 ml-1">The Problem</label>
                      <textarea 
                        rows={4}
                        className="w-full bg-black border border-white/10 p-4 rounded-xl text-white text-sm font-light outline-none focus:border-blue-600 transition-all resize-none"
                        value={editingService.problem}
                        onChange={(e) => setEditingService({...editingService, problem: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3 ml-1">The Methodology</label>
                      <textarea 
                        rows={4}
                        className="w-full bg-black border border-white/10 p-4 rounded-xl text-white text-sm font-light outline-none focus:border-blue-600 transition-all resize-none"
                        value={editingService.approach}
                        onChange={(e) => setEditingService({...editingService, approach: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3 ml-1">Efficiency Outcome</label>
                    <input 
                      type="text" 
                      className="w-full bg-black border border-white/10 p-4 rounded-xl text-white outline-none focus:border-blue-600 transition-all"
                      value={editingService.outcome}
                      onChange={(e) => setEditingService({...editingService, outcome: e.target.value})}
                    />
                  </div>
                  <button 
                    onClick={() => {
                      updateService(editingService);
                      alert('System Module Updated Successfully.');
                    }}
                    className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 text-lg active:scale-95"
                  >
                    Commit Changes
                  </button>
                </div>
              ) : (
                <div className="glass-card border-white/5 border-dashed p-32 rounded-[4rem] text-center text-zinc-700 flex flex-col items-center">
                  <p className="font-bold uppercase tracking-[0.2em] text-[10px]">Editor Standby</p>
                  <p className="text-sm mt-2 max-w-xs">Select a modular strategic block from the inventory to adjust current parameters.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'identity' && (
          <div className="max-w-4xl mx-auto animate-fade-up">
            <h2 className="text-xl font-bold text-white mb-6">Brand Identity & Global Assets</h2>
            <div className="glass-card border-white/10 p-12 rounded-[3rem] space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3 ml-1">Brand Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-black border border-white/10 p-4 rounded-xl text-white outline-none focus:border-blue-600 transition-all"
                    value={editingConfig.brandName}
                    onChange={(e) => setEditingConfig({...editingConfig, brandName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3 ml-1">Logo Initials</label>
                  <input 
                    maxLength={2}
                    type="text" 
                    className="w-full bg-black border border-white/10 p-4 rounded-xl text-white outline-none focus:border-blue-600 transition-all text-center uppercase font-bold"
                    value={editingConfig.logoInitials}
                    onChange={(e) => setEditingConfig({...editingConfig, logoInitials: e.target.value.toUpperCase()})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3 ml-1">Consultant Portrait Image URL</label>
                <div className="flex gap-6 items-center">
                  <div className="w-24 h-24 shrink-0 glass-card rounded-2xl overflow-hidden border-white/10">
                    <img src={editingConfig.profileImageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="https://images.unsplash.com/..."
                    className="flex-grow bg-black border border-white/10 p-4 rounded-xl text-white text-sm outline-none focus:border-blue-600 transition-all"
                    value={editingConfig.profileImageUrl}
                    onChange={(e) => setEditingConfig({...editingConfig, profileImageUrl: e.target.value})}
                  />
                </div>
                <p className="mt-4 text-[10px] text-zinc-600 font-light">Recommended Aspect Ratio: 4:5. High-resolution professional portraits only.</p>
              </div>

              <div className="pt-8 border-t border-white/5">
                <button 
                  onClick={handleConfigSave}
                  className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 text-lg"
                >
                  Save Global Assets
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CMSManager;
