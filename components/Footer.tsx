
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-zinc-900 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <div className="text-xl font-bold tracking-tight text-white mb-6">DICKSON NGECHE</div>
          <p className="text-zinc-500 max-w-sm leading-relaxed mb-6">
            Helping organizations transition from AI hype to AI utility. Delivering measurable impact through strategic audits and practical implementation.
          </p>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com/in/dkngeche/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">LinkedIn</a>
            <a href="https://x.com/KariukiNgeche" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">X (Twitter)</a>
            <a href="#admin" className="text-zinc-600 hover:text-zinc-400 transition-colors">Admin Login</a>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-6">Services</h4>
          <ul className="space-y-4 text-zinc-500 text-sm">
            <li><a href="#services" className="hover:text-white">AI Readiness Audit</a></li>
            <li><a href="#services" className="hover:text-white">Strategy & Roadmap</a></li>
            <li><a href="#services" className="hover:text-white">Workflow Automation</a></li>
            <li><a href="#services" className="hover:text-white">Advisory & Enablement</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-zinc-500 text-sm">
            <li><a href="#how-i-work" className="hover:text-white">Methodology</a></li>
            <li><a href="#audit" className="hover:text-white">The Audit</a></li>
            <li><a href="#contact" className="hover:text-white">Get in Touch</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between text-zinc-600 text-xs">
        <p>© 2024 Dickson Ngeche. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
