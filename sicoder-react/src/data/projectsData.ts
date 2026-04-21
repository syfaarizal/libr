// src/data/projectsData.ts

export type ProjectCategory = 'web' | 'ui' | 'mobile' | 'personal' | 'experimental';
export type ProjectTech = 'html' | 'css' | 'js' | 'react' | 'gsap' | 'figma' | 'tailwind' | 'api';

export interface Project {
  id: number;
  title: string;
  description: string;
  category: ProjectCategory;
  tech: ProjectTech[];
  date: string;
  featured: boolean;
  image: string;
  demo: string;
  code: string;
  detail: string;
}

export interface TimelineEntry {
  date: string;
  title: string;
  description: string;
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: 'Login Page Showcase',
    description:
      'A collection of creative login page templates with modern animations and micro-interactions.',
    category: 'web',
    tech: ['html', 'css', 'js', 'gsap'],
    date: '2025-09-15',
    featured: true,
    image: '../assets/img/showcase-review.png',
    demo: 'https://syfaarizal.github.io/showcase-login-page/',
    code: 'https://github.com/syfaarizal/showcase-login-page',
    detail: './project-detail1.html?id=1',
  },
  {
    id: 2,
    title: 'Digital CV Portfolio',
    description:
      'Modern digital CV integrated with portfolio showcasing skills and projects.',
    category: 'personal',
    tech: ['html', 'css', 'js'],
    date: '2025-08-10',
    featured: false,
    image: '../assets/img/CVDigital.png',
    demo: 'https://syfaarizal.github.io/landing-page-sicoder/',
    code: 'https://github.com/syfaarizal/landing-page-sicoder',
    detail: './project-detail2.html?id=2',
  },
  {
    id: 3,
    title: 'CruisePoint Indonesia',
    description:
      'Professional landing page for a travel agency with responsive design.',
    category: 'web',
    tech: ['html', 'css', 'js'],
    date: '2025-07-05',
    featured: false,
    image: '../assets/img/CruisePoint.png',
    demo: 'https://syfaarizal.github.io/cruishpoint-indonesia/',
    code: 'https://github.com/syfaarizal/cruishpoint-indonesia',
    detail: './project-detail3.html?id=3',
  },
  {
    id: 4,
    title: 'Pomodoro Timer FocusFlow',
    description:
      'Clean and minimalistic UI design for a Pomodoro timer application.',
    category: 'ui',
    tech: ['react', 'tailwind'],
    date: '2026-01-14',
    featured: false,
    image: '../assets/img/review-pomodoro-focusflow.png',
    demo: 'https://pomodoro-focusflow.vercel.app/',
    code: 'https://github.com/syfaarizal/pomodoro-focusflow',
    detail: './project-detail4.html?id=4',
  },
  {
    id: 5,
    title: 'Bisik-Bisik | Anonymous Chat',
    description:
      'An anonymous chat application with real-time messaging and privacy features.',
    category: 'web',
    tech: ['react', 'tailwind', 'api', 'gsap'],
    date: '2026-01-05',
    featured: false,
    image: '../assets/img/bisik-bisik-preview.png',
    demo: 'https://bisik-bisik.vercel.app/',
    code: 'https://github.com/syfaarizal/bisik-bisik',
    detail: './project-detail5.html?id=5',
  },
];

export const timelineData: TimelineEntry[] = [
  {
    date: 'Jan 2026',
    title: 'Bisik-Bisik | Anonymous Chat',
    description: 'Real-time anonymous chat application',
  },
  {
    date: 'Jan 2026',
    title: 'Pomodoro Timer FocusFlow',
    description: 'Productivity timer application',
  },
  {
    date: 'Nov 2025',
    title: 'CruisePoint Indonesia',
    description: 'Modern cruise booking platform',
  },
  {
    date: 'Sep 2025',
    title: 'Login Page Showcase',
    description: 'Collection of animated login pages',
  },
  {
    date: 'Aug 2025',
    title: 'Digital CV Portfolio',
    description: 'Personal branding website',
  },
];

export const CATEGORY_FILTERS = [
  { label: 'All Projects', value: 'all' },
  { label: 'Web Development', value: 'web' },
  { label: 'UI/UX Design', value: 'ui' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'Personal', value: 'personal' },
  { label: 'Experimental', value: 'experimental' },
] as const;

export const TECH_FILTERS: { label: string; value: ProjectTech }[] = [
  { label: 'HTML5', value: 'html' },
  { label: 'CSS3', value: 'css' },
  { label: 'JavaScript', value: 'js' },
  { label: 'React', value: 'react' },
  { label: 'GSAP', value: 'gsap' },
  { label: 'Figma', value: 'figma' },
];

export const SORT_OPTIONS = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Oldest First', value: 'oldest' },
  { label: 'Difficulty', value: 'difficulty' },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]['value'];