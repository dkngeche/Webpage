
import React from 'react';

interface Props {
  currentPath: string;
  onLogout: () => void;
}

const AdminSidebar: React.FC<Props> = ({ currentPath, onLogout }) => {
  const navItems = [
    { label: 'Dashboard', href: '#admin' },
    { label: 'Leads & Audits', href: '#admin/leads' },
    { label: 'CMS / Content', href: '#admin/cms' },
  ];

  return (
    <div className="w-64 bg-zinc-950 border-r border-zinc-900 p-8 flex flex-col shrink-0">
      <div className="text-white font-bold text-xl mb-12 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-xs italic">DN</div>
        ADMIN
      </div>
      <nav className="space-y-2 flex-grow">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
              currentPath === item.href
                ? 'bg-blue-600/10 text-blue-500 border border-blue-600/20'
                : 'text-zinc-500 hover:text-white hover:bg-white/5'
            }`}
          >
            {item.label}
          </a>
        ))}
        <div className="pt-8 mt-8 border-t border-zinc-900 space-y-2">
          <a href="#home" className="block px-4 py-3 text-zinc-500 hover:text-white transition-colors text-sm">
            ← View Website
          </a>
          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-3 text-red-500 hover:text-red-400 transition-colors text-sm font-bold uppercase tracking-widest"
          >
            Sign Out
          </button>
        </div>
      </nav>
      <div className="pt-8 border-t border-zinc-900">
        <div className="text-[10px] text-zinc-600 font-bold uppercase mb-2 tracking-widest">Logged in as</div>
        <div className="text-sm text-zinc-300">Dickson Ngeche</div>
      </div>
    </div>
  );
};

export default AdminSidebar;
