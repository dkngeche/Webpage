
export interface Service {
  id: string;
  title: string;
  description: string;
  problem: string;
  approach: string;
  outcome: string;
  icon: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  title: string;
  summary: string;
  fullContent: string;
  category: string;
  image: string;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
}

export interface AuditSubmission {
  id: string;
  name: string;
  email: string;
  company: string;
  scores: {
    strategy: number;
    operations: number;
    data: number;
    tools: number;
    people: number;
  };
  totalScore: number;
  submittedAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  message: string;
  type: 'contact' | 'booking';
  submittedAt: string;
}

export interface SiteConfig {
  brandName: string;
  logoInitials: string;
  profileImageUrl: string;
}

export type ViewType = 'public' | 'admin';
