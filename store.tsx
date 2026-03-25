
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Service, CaseStudy, Blog, AuditSubmission, Lead, SiteConfig } from './types';

const FORMSPREE_URL = 'https://formspree.io/f/mpqwvael';

interface StoreContextType {
  services: Service[];
  caseStudies: CaseStudy[];
  blogs: Blog[];
  audits: AuditSubmission[];
  leads: Lead[];
  config: SiteConfig;
  addAudit: (audit: Omit<AuditSubmission, 'id' | 'submittedAt'>) => Promise<void>;
  addLead: (lead: Omit<Lead, 'id' | 'submittedAt'>) => Promise<void>;
  updateService: (service: Service) => void;
  updateCaseStudy: (study: CaseStudy) => void;
  updateBlog: (blog: Blog) => void;
  updateConfig: (config: SiteConfig) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('dn_config');
    return saved ? JSON.parse(saved) : {
      brandName: 'Dickson Ngeche',
      logoInitials: 'DN',
      profileImageUrl: 'https://images.unsplash.com/photo-1767798776570-cef6c8615523?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    };
  });

  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('dn_services');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        title: 'AI Readiness Audit',
        description: 'A deep-dive evaluation of your current data, talent, and tech stack.',
        problem: 'Organizations often jump into AI without understanding if they have the foundations required to succeed.',
        approach: 'I audit 5 key pillars: Strategy, Operations, Data, Tools, and Culture to identify gaps.',
        outcome: 'A clear AI Maturity Score and a prioritized list of high-impact opportunities.',
        icon: 'Search'
      },
      {
        id: '2',
        title: 'AI Strategy & Roadmap',
        description: 'Creating a strategic blueprint for long-term AI success.',
        problem: 'Without a clear strategy, AI initiatives become disjointed projects with no ROI.',
        approach: 'Mapping AI capabilities to business goals, defining KPIs, and phase-by-phase execution plans.',
        outcome: 'A scalable 12-24 month strategy that aligns technology with business value.',
        icon: 'Map'
      },
      {
        id: '3',
        title: 'Workflow Automation',
        description: 'Integrating AI into daily operations for immediate efficiency gains.',
        problem: 'Repetitive cognitive tasks draining expensive human talent.',
        approach: 'Identifying manual workflows and layering Agentic AI and LLMs to automate reasoning steps.',
        outcome: 'Reductions in operational costs by up to 40% and faster processing times.',
        icon: 'Cpu'
      }
    ];
  });

  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [audits, setAudits] = useState<AuditSubmission[]>(() => {
    const saved = localStorage.getItem('dn_audits');
    return saved ? JSON.parse(saved) : [];
  });
  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('dn_leads');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('dn_services', JSON.stringify(services));
    localStorage.setItem('dn_audits', JSON.stringify(audits));
    localStorage.setItem('dn_leads', JSON.stringify(leads));
    localStorage.setItem('dn_config', JSON.stringify(config));
  }, [services, audits, leads, config]);

  const sendToFormspree = async (data: any, type: string) => {
    try {
      await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          formType: type,
          _subject: `New ${type} from Dickson Ngeche Portfolio`
        })
      });
    } catch (error) {
      console.error('Formspree submission error:', error);
    }
  };

  const addAudit = async (audit: Omit<AuditSubmission, 'id' | 'submittedAt'>) => {
    const newAudit = {
      ...audit,
      id: Math.random().toString(36).substr(2, 9),
      submittedAt: new Date().toISOString()
    };
    setAudits(prev => [newAudit, ...prev]);
    await sendToFormspree(newAudit, 'AI Audit Submission');
  };

  const addLead = async (lead: Omit<Lead, 'id' | 'submittedAt'>) => {
    const newLead = {
      ...lead,
      id: Math.random().toString(36).substr(2, 9),
      submittedAt: new Date().toISOString()
    };
    setLeads(prev => [newLead, ...prev]);
    await sendToFormspree(newLead, lead.type === 'booking' ? 'Booking Request' : 'Contact Message');
  };

  const updateService = (updated: Service) => {
    setServices(prev => prev.map(s => s.id === updated.id ? updated : s));
  };

  const updateCaseStudy = (updated: CaseStudy) => {
    setCaseStudies(prev => prev.map(s => s.id === updated.id ? updated : s));
  };

  const updateBlog = (updated: Blog) => {
    setBlogs(prev => prev.map(s => s.id === updated.id ? updated : s));
  };

  const updateConfig = (updated: SiteConfig) => {
    setConfig(updated);
  };

  return (
    <StoreContext.Provider value={{ 
      services, caseStudies, blogs, audits, leads, config,
      addAudit, addLead, updateService, updateCaseStudy, updateBlog, updateConfig
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
