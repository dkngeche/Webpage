
import React, { useState } from 'react';
import { useStore } from '../../store';

const HomePage: React.FC = () => {
  const { services, addLead, config } = useStore();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await addLead({
      name: formData.name,
      email: formData.email,
      message: formData.message,
      type: 'booking'
    });
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="overflow-hidden bg-[#080808]">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 md:pt-40 md:pb-56 px-6">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-5xl mx-auto text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Strategy First AI Consulting
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-10 leading-[0.95] tracking-tight">
            Work <span className="gradient-text">Smarter,</span> Not Just Faster.
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 mb-14 max-w-3xl mx-auto font-light leading-relaxed">
            I help high-growth organizations audit operations, identify strategic AI opportunities, and implement systems that drive actual profit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="#audit" className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)] text-lg hover:scale-105 active:scale-95">
              Take AI Audit
            </a>
            <a href="#services" className="w-full sm:w-auto px-10 py-5 bg-transparent hover:bg-white/5 border border-white/10 text-white font-bold rounded-full transition-all text-lg hover:border-blue-500/50">
              Our Services
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-600/10 blur-[80px] group-hover:bg-blue-600/20 transition-all -z-10" />
            <div className="relative glass-card p-4 rounded-[2rem] overflow-hidden transform hover:-rotate-1 transition-transform duration-500">
              <img 
                src={config.profileImageUrl} 
                alt={`${config.brandName} - AI Strategy Consultant`} 
                className="rounded-2xl grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700 aspect-[4/5] object-cover"
              />
              <div className="absolute bottom-10 left-10 glass-card p-6 rounded-2xl shadow-2xl animate-fade-up border-none">
                <div className="text-4xl font-bold text-white">94%</div>
                <div className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.2em]">Efficiency Increase</div>
              </div>
            </div>
          </div>
          <div className="animate-fade-up">
             <h4 className="text-blue-500 font-bold uppercase tracking-[0.2em] text-xs mb-6">The Consultant</h4>
            <h2 className="text-5xl font-bold text-white mb-8 leading-tight tracking-tight">Authority in Business-First AI.</h2>
            <div className="space-y-8 text-zinc-400 text-lg font-light leading-relaxed">
              <p>
                In a market flooded with hype, I specialize in <strong>Utility</strong>. I bridge the gap between technical possibility and operational reality.
              </p>
              <p>
                I don't sell tools. I sell <strong>competitive advantage</strong> through systems thinking and practical AI integration.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                {['Maturity Audits', 'Workflow Design', 'Advisory', 'Systems Integration'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-white text-sm font-bold uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 px-6 relative bg-[#060606]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
            <div>
               <h4 className="text-blue-500 font-bold uppercase tracking-[0.2em] text-xs mb-4">Core Focus</h4>
              <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">AI Advisory Services</h2>
              <p className="text-zinc-500 text-xl font-light max-w-2xl">
                I help companies stop experimenting and start implementing AI systems that actually scale.
              </p>
            </div>
            <a href="#services" className="px-8 py-4 glass-card text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-blue-600 transition-all hover:border-blue-500 shadow-lg hover:shadow-blue-500/20">
              View All Services
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={service.id} className={`glass-card p-12 rounded-[2.5rem] hover:border-blue-500/50 transition-all group relative overflow-hidden animate-fade-up`} style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[40px] -z-10 group-hover:bg-blue-600/10 transition-all" />
                <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-10 group-hover:scale-110 transition-transform shadow-inner">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">{service.title}</h3>
                <p className="text-zinc-500 mb-10 leading-relaxed font-light text-lg">
                  {service.description}
                </p>
                <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Efficiency Outcome</span>
                  <div className="w-8 h-px bg-white/10" />
                </div>
                <p className="text-white mt-4 font-bold tracking-tight">{service.outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking / Contact Form Section */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-3xl mx-auto glass-card p-12 md:p-16 rounded-[3rem] relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-600/5 blur-[60px] -z-10" />
          <div className="text-center mb-12">
            <h4 className="text-blue-500 font-bold uppercase tracking-[0.2em] text-xs mb-4">Direct Access</h4>
            <h2 className="text-4xl font-bold text-white tracking-tight">Book a Strategy Session</h2>
            <p className="text-zinc-500 mt-4 font-light">
              Ready to move beyond the audit? Send a direct inquiry for a 30-minute high-level scoping call.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-12 animate-fade-up">
              <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent</h3>
              <p className="text-zinc-400">I'll get back to you within 24 business hours.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-8 text-blue-500 font-bold uppercase tracking-widest text-xs hover:text-blue-400"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Your Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-blue-600 transition-all"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Business Email</label>
                  <input 
                    required
                    type="email" 
                    placeholder="john@company.com" 
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-blue-600 transition-all"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Scope of Interest</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Tell me about your organization and current AI challenges..." 
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-blue-600 transition-all resize-none"
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                />
              </div>
              <button 
                disabled={isSubmitting}
                type="submit"
                className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Request Scoping Call'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6">
        <div className="max-w-6xl mx-auto relative group">
          <div className="absolute inset-0 bg-blue-600/10 blur-[120px] -z-10 animate-pulse" />
          <div className="glass-card p-16 md:p-32 rounded-[4rem] text-center transition-all duration-1000">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-10 tracking-tighter">Your AI Roadmap Starts <span className="gradient-text">Here.</span></h2>
            <p className="text-xl md:text-2xl text-zinc-400 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
              Don't guess your AI strategy. Audit your existing foundations and build on bedrock.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <a href="#audit" className="w-full sm:w-auto px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all shadow-[0_0_50px_rgba(59,130,246,0.3)] text-xl">
                Book AI Audit
              </a>
              <a href="#how-i-work" className="w-full sm:w-auto px-12 py-6 glass-card text-white font-bold rounded-full transition-all text-xl hover:bg-white/5">
                My Process
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
