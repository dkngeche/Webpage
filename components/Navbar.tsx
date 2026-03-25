
import React, { useState } from 'react';
import { useStore } from '../store';

interface Props {
  currentRoute: string;
}

const Navbar: React.FC<Props> = ({ currentRoute }) => {
  const { config } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'How I Work', href: '#how-i-work' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/70 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#home" className="text-xl font-bold tracking-tight text-white flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-serif italic shadow-lg shadow-blue-500/20">{config.logoInitials}</div>
          <span className="tracking-widest text-sm uppercase font-semibold">{config.brandName}</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-xs font-bold uppercase tracking-widest transition-all hover:text-blue-400 ${
                currentRoute === item.href ? 'text-blue-500' : 'text-zinc-500'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#audit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95"
          >
            Start Audit
          </a>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-b border-white/5 p-8 space-y-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block text-sm font-bold uppercase tracking-widest text-zinc-400"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#audit"
            onClick={() => setIsOpen(false)}
            className="block text-center px-5 py-3 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded-full"
          >
            AI Readiness Audit
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
