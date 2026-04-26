import { Skill, BlogPost, Project } from '../types';

export const skills: Skill[] = [
  // Technical Skills
  { category: 'technical', name: 'HTML5', desc: 'Semantic & accessible structure', icon: 'fas fa-code', level: 90 },
  { category: 'technical', name: 'CSS3', desc: 'Flexbox, Grid, Animations, Styling', icon: 'fab fa-css3-alt', level: 85 },
  { category: 'technical', name: 'JavaScript', desc: 'DOM, Events, Basic Logic, Interactivity', icon: 'fab fa-js', level: 80 },
  { category: 'technical', name: 'Responsive Design', desc: 'Mobile-first, Flexible Layouts, Media Queries', icon: 'fas fa-mobile-alt', level: 88 },
  { category: 'technical', name: 'Git & GitHub', desc: 'Version Control, Commits, Repositories', icon: 'fab fa-git-alt', level: 75 },
  { category: 'technical', name: 'QA Testing', desc: 'Manual cross-device testing & issue tracking', icon: 'fas fa-bug', level: 70 },
  { category: 'technical', name: 'React Basics', desc: 'Component-based architecture, JSX, State Management', icon: 'fab fa-react', level: 50 },
  { category: 'technical', name: 'Tailwind CSS', desc: 'Utility-first CSS Framework', icon: 'fas fa-wind', level: 30 },

  // Design Skills
  { category: 'design', name: 'UI/UX Design', desc: 'Focus on clean layout & visual hierarchy', icon: 'fas fa-paint-brush', level: 82 },
  { category: 'design', name: 'Typography', desc: 'Matching brand with aesthetic', icon: 'fas fa-font', level: 78 },
  { category: 'design', name: 'CSS Animation', desc: 'Smooth interaction, hover, @keyframes', icon: 'fas fa-film', level: 85 },
  { category: 'design', name: 'Component Design', desc: 'Reusable layout design', icon: 'fas fa-th', level: 80 },

  // Soft Skills
  { category: 'soft', name: 'Problem Solving', desc: 'Enjoys debugging and solving tricky errors', icon: 'fas fa-lightbulb', level: 90 },
  { category: 'soft', name: 'Consistency', desc: 'Steady learning routine, committed to progress', icon: 'fas fa-calendar-check', level: 88 },
  { category: 'soft', name: 'Collaboration', desc: 'Communicative and open-minded team player', icon: 'fas fa-users', level: 85 },
  { category: 'soft', name: 'Self-Learning', desc: 'Actively explores tech and learns independently', icon: 'fas fa-graduation-cap', level: 92 },

  // Tools
  { category: 'tools', name: 'VS Code', desc: 'Main code editor — clean, fast, reliable', icon: 'fas fa-code', level: 95 },
  { category: 'tools', name: 'GitHub', desc: 'For version control and project hosting', icon: 'fab fa-github', level: 80 },
  { category: 'tools', name: 'Figma', desc: 'For wireframing and UI design', icon: 'fab fa-figma', level: 65 },
  { category: 'tools', name: 'Notion', desc: 'Used for planning and documentation', icon: 'fas fa-sticky-note', level: 75 },
  { category: 'tools', name: 'ChatGPT', desc: 'Helps refine ideas and accelerate tasks', icon: 'fas fa-robot', level: 85 },
];

export const blogPosts: BlogPost[] = [
  {
    date: 'June 5, 2025',
    title: 'Day 1: Print Name and Status',
    excerpt: "Today I learned about template literals in JavaScript. You know, that thing where you can insert variables...",
    link: '../../blog/days-challenge/day1.html',
  },
  {
    date: 'June 6, 2025',
    title: 'Day 2: Simple Age Calculator',
    excerpt: "Today's challenge really made my brain curl 😅 We were asked to create a JavaScript program that...",
    link: '../../blog/days-challenge/day2.html',
  },
  {
    date: 'June 9, 2025',
    title: 'Day 3: Interactive Calculator',
    excerpt: 'Day 3 of this coding challenge really made me frown but also smile when I finally got it working. I was...',
    link: '../../blog/days-challenge/day3.html',
  },
  {
    date: 'June 11, 2025',
    title: 'Day 4: Number Guessing Game',
    excerpt: 'Day 4 of this coding challenge had a different vibe because I was asked to create a simple game...',
    link: '../../blog/days-challenge/day4.html',
  },
  {
    date: 'July 7, 2025',
    title: 'Day 5: Creative Name Looping',
    excerpt: "After taking some time off to focus on other projects, I'm finally back to the JS challenges! This time...",
    link: '../../blog/days-challenge/day5.html',
  },
  {
    date: 'July 15, 2025',
    title: "Day 6: Odd, Even, or Special?",
    excerpt: "Yo! Back again with day 6 challenge. Today I'm playing with numbers, but not just checking...",
    link: '../../blog/days-challenge/day6.html',
  },
];

export const projects: Project[] = [
  {
    category: 'web',
    title: 'Login Page Showcase — SICODER',
    description: 'My collection of creative login page templates built with clean and modern front-end code.',
    tags: ['HTML', 'CSS', 'JavaScript', 'GSAP', 'Responsive'],
    demo: 'https://syfaarizal.github.io/showcase-login-page/',
    code: 'https://github.com/syfaarizal/showcase-login-page',
    image: '/assets/showcase-review.png',
  },
  {
    category: 'personal',
    title: 'Digital CV — Personal Brand',
    description: 'A modern digital CV integrated into my personal portfolio.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive', 'Personal Branding'],
    demo: 'https://syfaarizal.github.io/landing-page-sicoder/',
    code: 'https://github.com/syfaarizal/landing-page-sicoder',
    image: '/assets/CVDigital.png',
  },
  {
    category: 'web',
    title: 'CruisePoint Indonesia – Landing Page',
    description: 'A professional and responsive landing page built for CruisePoint Indonesia.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    demo: 'https://syfaarizal.github.io/cruishpoint-indonesia/',
    code: 'https://github.com/syfaarizal/cruishpoint-indonesia',
    image: '/assets/CruisePoint.png',
  },
];
