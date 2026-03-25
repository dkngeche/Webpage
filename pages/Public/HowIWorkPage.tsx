
import React from 'react';

const HowIWorkPage: React.FC = () => {
  const steps = [
    {
      title: 'Contextual Discovery',
      desc: 'We map the intersection of your business objectives and current AI potential. We identify the "High Leverage" nodes in your organization.',
      details: ['ROI Modeling', 'Strategic Alignment', 'Bottleneck Mapping']
    },
    {
      title: 'Foundation Audit',
      desc: 'A comprehensive technical and cultural diagnostic. We evaluate if your data is "AI-Ready" or just digital noise.',
      details: ['Data Health Check', 'Tech Stack Evaluation', 'Talent Audit']
    },
    {
      title: 'Architecture & Logic',
      desc: 'Defining the specific LLM architecture and workflow logic required to achieve the identified goals. No generic solutions.',
      details: ['Prompt Engineering', 'Agent Workflows', 'Privacy Guardrails']
    },
    {
      title: 'Pilot Deployment',
      desc: 'Rapid iteration on a high-impact prototype. We prove the thesis with real data and real user feedback.',
      details: ['Rapid Prototyping', 'User Testing', 'KPI Verification']
    },
    {
      title: 'Scale & Optimization',
      desc: 'Integrating the proven workflows across the organization. Training teams to thrive in an AI-augmented environment.',
      details: ['Global Rollout', 'Staff Upskilling', 'Continuous Tuning']
    }
  ];

  return (
    <div className="py-32 px-6 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-48 animate-fade-up">
           <h4 className="text-blue-500 font-bold uppercase tracking-[0.2em] text-xs mb-6">Process</h4>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-10 tracking-tighter">Clinical Execution.</h1>
          <p className="text-2xl text-zinc-500 max-w-3xl mx-auto font-light leading-relaxed">
            I operate with surgical precision. Each phase is designed to minimize risk and maximize strategic impact.
          </p>
        </header>

        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2" />
          
          <div className="space-y-40">
            {steps.map((step, idx) => (
              <div key={idx} className={`flex flex-col lg:flex-row items-center gap-24 animate-fade-up ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-1 w-full text-center lg:text-left">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-[1.5rem] bg-blue-600/10 border border-blue-500/20 text-blue-500 text-3xl font-bold mb-10 relative shadow-inner ${idx % 2 !== 0 ? 'lg:float-right ml-10' : 'lg:float-left mr-10'}`}>
                    0{idx + 1}
                  </div>
                  <div className="clear-both">
                    <h2 className="text-4xl font-bold text-white mb-8 tracking-tight">{step.title}</h2>
                    <p className="text-xl text-zinc-400 font-light leading-relaxed mb-10">{step.desc}</p>
                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                      {step.details.map((d, i) => (
                        <span key={i} className="px-5 py-2 glass-card rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-400 border-none">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex-1 hidden lg:block">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-56 text-center group">
          <div className="inline-block p-1 rounded-full bg-gradient-to-r from-blue-600 to-transparent mb-12">
             <div className="bg-[#080808] px-12 py-8 rounded-full">
                <h2 className="text-4xl font-bold text-white tracking-tight">Outcome-First Methodology.</h2>
             </div>
          </div>
          <p className="text-2xl text-zinc-500 max-w-2xl mx-auto font-light leading-relaxed mb-16">
            I don't deliver PDFs. I deliver functional business infrastructure.
          </p>
          <a href="#audit" className="inline-block px-14 py-7 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-all shadow-[0_0_50px_rgba(59,130,246,0.2)] text-xl hover:scale-105">
            Begin Your Audit
          </a>
        </div>
      </div>
    </div>
  );
};

export default HowIWorkPage;
