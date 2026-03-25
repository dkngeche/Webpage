
import React, { useState } from 'react';

interface Props {
  onLogin: (password: string) => boolean;
}

const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin(password)) {
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-6">
      <div className="absolute top-0 left-0 w-full h-full bg-blue-600/5 blur-[150px] pointer-events-none" />
      
      <div className="max-w-md w-full glass-card p-12 rounded-[2.5rem] border-white/10 animate-fade-up relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[40px] pointer-events-none" />
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center font-serif italic text-white text-2xl mx-auto mb-6 shadow-lg shadow-blue-500/20">DN</div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Admin Portal</h2>
          <p className="text-zinc-500 mt-2 font-light">Access internal strategic dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Secure Password</label>
            <input
              autoFocus
              type="password"
              placeholder="••••••••••••"
              className={`w-full bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} p-4 rounded-xl text-white outline-none focus:border-blue-600 transition-all text-center tracking-widest`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center mt-2">Invalid Access Key</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 active:scale-95"
          >
            Enter Command Centre
          </button>
        </form>

        <div className="mt-10 text-center">
          <a href="#home" className="text-zinc-600 hover:text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors">
            ← Return to Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
