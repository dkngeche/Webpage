
import React, { useState, useEffect } from 'react';
import { useStore } from '../../store';

const PILLARS = [
  { 
    id: 'strategy', 
    label: 'Strategy & Leadership', 
    questions: [
      { id: 'strat_1', text: 'Does your organization have a documented AI vision?' },
      { id: 'strat_2', text: 'Is leadership willing to invest in long-term AI R&D?' },
      { id: 'strat_3', text: 'Are business goals clearly mapped to technical capabilities?' }
    ]
  },
  { 
    id: 'operations', 
    label: 'Processes & Operations', 
    questions: [
      { id: 'ops_1', text: 'Are your workflows documented and standardized?' },
      { id: 'ops_2', text: 'Is there a high volume of repetitive cognitive tasks?' },
      { id: 'ops_3', text: 'Can you easily identify where bottlenecks occur in delivery?' }
    ]
  },
  { 
    id: 'data', 
    label: 'Data & Information', 
    questions: [
      { id: 'data_1', text: 'Is your data centralized and easily accessible?' },
      { id: 'data_2', text: 'Do you have high-quality, labeled data for your core business?' },
      { id: 'data_3', text: 'Is there a robust data governance and privacy policy?' }
    ]
  },
  { 
    id: 'tools', 
    label: 'Tools & Technology', 
    questions: [
      { id: 'tools_1', text: 'Is your current tech stack API-friendly?' },
      { id: 'tools_2', text: 'Do you use modern cloud infrastructure (AWS/Azure/GCP)?' },
      { id: 'tools_3', text: 'Are you already using early-stage AI tools internally?' }
    ]
  },
  { 
    id: 'people', 
    label: 'People & Culture', 
    questions: [
      { id: 'people_1', text: 'Is your team open to AI-driven workflow changes?' },
      { id: 'people_2', text: 'Do you have internal data science or automation talent?' },
      { id: 'people_3', text: 'Is there a budget for upskilling staff on AI tools?' }
    ]
  }
];

const AuditPage: React.FC = () => {
  const { addAudit } = useStore();
  const [step, setStep] = useState(0); // 0: intro, 1-5: pillars, 6: contact, 7: results
  const [questionScores, setQuestionScores] = useState<Record<string, number>>({});
  const [userInfo, setUserInfo] = useState({ name: '', email: '', company: '' });

  // Scroll to top when the step changes (moving between phases)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const totalSteps = PILLARS.length + 1; // Pillars + Contact

  const handleScoreChange = (qId: string, value: number) => {
    setQuestionScores(prev => ({ ...prev, [qId]: value }));
  };

  const isPillarComplete = (pillarIdx: number) => {
    const pillar = PILLARS[pillarIdx];
    return pillar.questions.every(q => questionScores[q.id] !== undefined);
  };

  const nextStep = () => {
    if (step === PILLARS.length + 1) {
      // Aggregate question scores into pillar scores for the store
      const finalPillarScores: any = {};
      PILLARS.forEach(pillar => {
        const pillarSum = pillar.questions.reduce((sum, q) => sum + (questionScores[q.id] || 0), 0);
        finalPillarScores[pillar.id] = Math.round(pillarSum / pillar.questions.length);
      });

      const total = (Object.values(questionScores) as number[]).reduce((a, b) => a + b, 0);
      
      addAudit({
        ...userInfo,
        scores: finalPillarScores,
        totalScore: total
      });
    }
    setStep(prev => prev + 1);
  };

  const renderProgress = () => {
    const progress = (step / totalSteps) * 100;
    return (
      <div className="w-full bg-white/5 h-1 rounded-full mb-16 relative overflow-hidden">
        <div 
          className="bg-blue-600 h-full rounded-full transition-all duration-700 ease-out glow-blue" 
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  const renderIntro = () => (
    <div className="max-w-3xl mx-auto text-center py-24 animate-fade-up">
      <h4 className="text-blue-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-8">Clinical Assessment</h4>
      <h2 className="text-6xl font-bold text-white mb-10 tracking-tight">AI Readiness Audit</h2>
      <p className="text-xl text-zinc-400 mb-16 font-light leading-relaxed">
        A clinical evaluation of your business foundations. In 5 minutes, we'll determine your maturity score across 15 independent data points.
      </p>
      <button 
        onClick={() => setStep(1)}
        className="px-14 py-6 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-all text-xl shadow-[0_0_50px_rgba(59,130,246,0.3)]"
      >
        Begin Diagnostic
      </button>
    </div>
  );

  const renderPillarStep = (idx: number) => {
    const pillar = PILLARS[idx - 1];
    return (
      <div className="max-w-3xl mx-auto py-12 animate-fade-up">
        <h3 className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em] mb-6">Phase 0{idx}</h3>
        <h2 className="text-5xl font-bold text-white mb-16 tracking-tight">{pillar.label}</h2>
        <div className="space-y-20">
          {pillar.questions.map((q, qIdx) => (
            <div key={q.id} className="animate-fade-up" style={{ animationDelay: `${qIdx * 0.1}s` }}>
              <p className="text-2xl text-zinc-300 mb-8 font-light">
                <span className="text-blue-500/50 mr-4 font-mono text-sm uppercase">Q.{qIdx + 1}</span>
                {q.text}
              </p>
              <div className="grid grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    onClick={() => handleScoreChange(q.id, val)}
                    className={`h-20 rounded-2xl border transition-all font-bold text-xl ${
                      questionScores[q.id] === val 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-[0_0_30px_rgba(59,130,246,0.4)] scale-105' 
                        : 'bg-white/5 border-white/5 text-zinc-600 hover:border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-zinc-700 mt-6 font-bold uppercase tracking-[0.2em]">
                <span>Strongly Disagree</span>
                <span>Strongly Agree</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-24 pt-12 border-t border-white/5 flex justify-between items-center">
           <button onClick={() => setStep(step - 1)} className="text-zinc-600 font-bold hover:text-white transition-colors text-xs uppercase tracking-widest">Previous</button>
           <button 
             disabled={!isPillarComplete(idx - 1)}
             onClick={nextStep} 
             className="px-12 py-5 bg-white text-black font-bold rounded-full hover:bg-zinc-200 disabled:opacity-20 disabled:cursor-not-allowed transition-all text-lg shadow-xl"
           >
             Next Phase
           </button>
        </div>
      </div>
    );
  };

  const renderContactStep = () => (
    <div className="max-w-2xl mx-auto py-12 text-center animate-fade-up">
      <h2 className="text-5xl font-bold text-white mb-10 tracking-tight">Diagnostic Summary</h2>
      <p className="text-zinc-400 mb-16 text-xl font-light">Submit your details to generate your final strategic gap analysis report.</p>
      <div className="space-y-6 mb-16">
        <input 
          type="text" 
          placeholder="Name" 
          className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-white text-lg outline-none focus:border-blue-600 transition-colors placeholder:text-zinc-700"
          value={userInfo.name}
          onChange={e => setUserInfo({...userInfo, name: e.target.value})}
        />
        <input 
          type="email" 
          placeholder="Business Email" 
          className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-white text-lg outline-none focus:border-blue-600 transition-colors placeholder:text-zinc-700"
          value={userInfo.email}
          onChange={e => setUserInfo({...userInfo, email: e.target.value})}
        />
        <input 
          type="text" 
          placeholder="Organization" 
          className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-white text-lg outline-none focus:border-blue-600 transition-colors placeholder:text-zinc-700"
          value={userInfo.company}
          onChange={e => setUserInfo({...userInfo, company: e.target.value})}
        />
      </div>
      <button 
        disabled={!userInfo.name || !userInfo.email}
        onClick={nextStep}
        className="w-full py-6 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-all text-xl shadow-[0_0_50px_rgba(59,130,246,0.3)]"
      >
        Calculate Maturity Profile
      </button>
    </div>
  );

  const renderResults = () => {
    const totalPossible = PILLARS.length * 3 * 5; // 5 pillars, 3 questions each, 5 points max
    const actualScore = (Object.values(questionScores) as number[]).reduce((a, b) => a + b, 0);
    const avgScore = actualScore / (PILLARS.length * 3);
    const level = Math.ceil(avgScore);

    // Calculate pillar-specific health
    const pillarInsights = PILLARS.map(p => {
      const sum = p.questions.reduce((s, q) => s + (questionScores[q.id] || 0), 0);
      const avg = sum / p.questions.length;
      return { 
        label: p.label, 
        status: avg > 3.5 ? 'Strategic' : avg > 2 ? 'Emerging' : 'Critical Gaps' 
      };
    });

    return (
      <div className="max-w-5xl mx-auto py-24 animate-fade-up">
        <div className="text-center mb-24">
          <h2 className="text-[10px] font-bold text-zinc-600 mb-6 uppercase tracking-[0.3em]">Aggregate Maturity Quotient</h2>
          <div className="text-[10rem] font-black text-white mb-10 leading-none tracking-tighter glow-blue">
            {avgScore.toFixed(1)}<span className="text-blue-600 text-6xl">/5</span>
          </div>
          <p className="text-3xl text-white font-bold tracking-tight">
            {level <= 2 ? 'Stage 1: Foundational' : level <= 4 ? 'Stage 3: Optimized' : 'Stage 5: Autonomous Leader'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-24">
          {pillarInsights.map((insight, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl border-white/5 hover:border-blue-600/30 transition-all text-center">
               <h4 className="text-zinc-600 text-[8px] font-bold uppercase mb-2 tracking-widest">{insight.label}</h4>
               <p className={`text-xs font-bold tracking-tight ${insight.status === 'Strategic' ? 'text-blue-500' : insight.status === 'Emerging' ? 'text-zinc-300' : 'text-zinc-600'}`}>
                 {insight.status}
               </p>
            </div>
          ))}
        </div>

        <div className="bg-blue-600 rounded-[4rem] p-20 text-center text-white relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          <h3 className="text-4xl md:text-5xl font-bold mb-10 tracking-tight">Full Blueprint Generated</h3>
          <p className="text-xl text-blue-100 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
            I've processed your 15 independent data points. You'll receive a clinical gap analysis and competitive roadmap via email within 24 business hours.
          </p>
          <a href="#home" className="inline-block px-14 py-7 bg-white text-black font-bold rounded-full hover:bg-zinc-100 transition-all text-xl hover:scale-105 active:scale-95 shadow-2xl">
            Return to Command Centre
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#080808] pt-12 px-6">
      <div className="max-w-6xl mx-auto">
        {step > 0 && step <= PILLARS.length + 1 && renderProgress()}
        {step === 0 && renderIntro()}
        {step >= 1 && step <= PILLARS.length && renderPillarStep(step)}
        {step === PILLARS.length + 1 && renderContactStep()}
        {step === PILLARS.length + 2 && renderResults()}
      </div>
    </div>
  );
};

export default AuditPage;
