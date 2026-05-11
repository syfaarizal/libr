export interface Skill {
  category: 'technical' | 'design' | 'soft' | 'tools';
  name: string;
  desc: string;
  icon: string;
  level: number;
}

export interface BlogPost {
  date: string;
  title: string;
  excerpt: string;
  link: string;
}

export interface BlogIndexPost {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  category: 'challenge' | 'html' | 'css' | 'javascript';
  tags: string[];
  badge: string;
  path: string;
}

export interface Project {
  category: 'web' | 'personal';
  title: string;
  description: string;
  tags: string[];
  demo: string;
  code: string;
  image: string;
}

export type Theme = 'dark' | 'light';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}
