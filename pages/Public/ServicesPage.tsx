
import React from 'react';
import { useStore } from '../../store';

const ServicesPage: React.FC = () => {
  const { services } = useStore();

  return (
    <div className="py-32 px-6 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <header className="mb-32 animate-fade-up">
          <h4 className="text-blue-500 font-bold uppercase tracking-[0.2em] text-xs mb-6">Expertise</h4>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter">Strategic Systems.</h1>
          <p className="text-2xl text-zinc-500 max-w-3xl font-light leading-relaxed">
            I deploy frameworks that transform raw AI potential into operational excellence.
          </p>
        </header>

        <div className="space-y-48">
          {services.map((service, index) => (
            <div key={service.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-24 items-center animate-fade-up ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={`${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="inline-flex items-center gap-4 mb-10">
                   <div className="h-px w-8 bg-blue-600" />
                   <span className="text-blue-500 font-bold uppercase tracking-[0.3em] text-[10px]">Service Model 0{index + 1}</span>
                </div>
                <h2 className="text-5xl font-bold text-white mb-10 tracking-tight">{service.title}</h2>
                
                <div className="space-y-12">
                  <div className="glass-card p-8 rounded-2xl border-white/5">
                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">The Challenge</h4>
                    <p className="text-zinc-300 text-lg font-light leading-relaxed">{service.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-4 ml-8">Consulting Approach</h4>
                    <p className="text-zinc-400 font-light leading-relaxed border-l border-blue-600/30 pl-8">{service.approach}</p>
                  </div>
                  <div className="p-10 bg-blue-600/5 border border-blue-600/20 rounded-[2rem] shadow-inner">
                    <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-4">Primary Value Proposition</h4>
                    <p className="text-white font-bold text-2xl tracking-tight">{service.outcome}</p>
                  </div>
                </div>
              </div>
              
              <div className={`relative ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <div className="absolute inset-0 bg-blue-600/5 blur-[100px] -z-10" />
                <div className="aspect-[16/10] glass-card rounded-[3rem] p-12 flex items-center justify-center group overflow-hidden">
                   <div className="text-white text-9xl font-black opacity-5 select-none transform group-hover:scale-110 transition-transform duration-700">
                     {service.title.split(' ')[0].toUpperCase()}
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-48 text-center py-32 glass-card rounded-[4rem] border-white/10 relative overflow-hidden group">
           <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/10 blur-[80px] -z-10 group-hover:bg-blue-600/20 transition-all" />
           <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tighter">Bespoke Solutions for Scale.</h3>
           <p className="text-zinc-400 mb-14 max-w-xl mx-auto text-xl font-light">Custom workshops and executive advisory for industry leaders.</p>
           <a href="#contact" className="inline-block px-12 py-6 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 text-lg">
             Request Session
           </a>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
