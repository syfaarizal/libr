import { useState, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/blog/blog.css"

// Types 
interface BlogCard {
  id: string;
  date: string;
  badge: string;
  title: string;
  excerpt: string;
  tags: string;      // space-separated, mirrors data-tags in HTML
  path: string;
  category: 'challenges' | 'html' | 'css' | 'javascript';
}

// Data (mirrors every card in indexblog.html)
const ALL_CARDS: BlogCard[] = [
  // Challenges
  {
    id: 'day1', category: 'challenges',
    date: 'June 5, 2025', badge: 'Template Literals',
    title: 'Day 1: Print Name and Status',
    excerpt: 'Today I learned about template literals in JavaScript. You know, that thing where you can insert variables directly into strings with backticks...',
    tags: 'javascript template-literals basics',
    path: '/blog/days-challenge/day1',
  },
  {
    id: 'day2', category: 'challenges',
    date: 'June 6, 2025', badge: 'Calculator',
    title: 'Day 2: Simple Age Calculator',
    excerpt: "Today's challenge really made my brain curl 😅 We were asked to create a JavaScript program that calculates age based on birth year...",
    tags: 'javascript calculator age math',
    path: '/blog/days-challenge/day2',
  },
  {
    id: 'day3', category: 'challenges',
    date: 'June 9, 2025', badge: 'Functions',
    title: 'Day 3: Interactive Calculator',
    excerpt: 'Day 3 of this coding challenge really made me frown but also smile when I finally got it working. Building an interactive calculator...',
    tags: 'javascript functions calculator',
    path: '/blog/days-challenge/day3',
  },
  {
    id: 'day4', category: 'challenges',
    date: 'June 11, 2025', badge: 'Game',
    title: 'Day 4: Number Guessing Game',
    excerpt: 'Day 4 of this coding challenge had a different vibe because I was asked to create a simple game: a number guessing challenge...',
    tags: 'javascript game logic',
    path: '/blog/days-challenge/day4',
  },
  {
    id: 'day5', category: 'challenges',
    date: 'July 7, 2025', badge: 'Loops',
    title: 'Day 5: Creative Name Looping',
    excerpt: "After taking some time off to focus on other projects, I'm finally back to the JS challenges! This time working with loops...",
    tags: 'javascript loops array',
    path: '/blog/days-challenge/day5',
  },
  {
    id: 'day6', category: 'challenges',
    date: 'July 15, 2025', badge: 'Logic',
    title: "Day 6: Odd, Even, or Special?",
    excerpt: "Yo! Back again with day 6 challenge. Today I'm playing with numbers, but not just checking if they're odd or even...",
    tags: 'javascript conditions logic',
    path: '/blog/days-challenge/day6',
  },

  // HTML
  {
    id: 'html1', category: 'html',
    date: 'May 15, 2025', badge: 'Basics',
    title: 'HTML Basics: The Foundation of Web Development',
    excerpt: 'HTML is the foundation of all web development. Learn the basic concepts, tags, and structure that...',
    tags: 'html web development basics',
    path: '/blog/html-modul/html1',
  },
  {
    id: 'html2', category: 'html',
    date: 'May 16, 2025', badge: 'Semantics',
    title: 'HTML Intermediate: Structure & Semantics',
    excerpt: 'Take your HTML skills to the next level by learning about iframes, div vs span, and the importance of semantic HTML structure...',
    tags: 'html layout semantics',
    path: '/blog/html-modul/html2',
  },

  // CSS
  {
    id: 'css1', category: 'css',
    date: 'May 17, 2025', badge: 'Styling',
    title: 'CSS Basics: Styling the Web',
    excerpt: 'CSS is what transforms plain HTML into beautiful, visually appealing websites. Learn the fundamentals of styling web pages with colors, fonts, and layouts....',
    tags: 'css web design styling basics',
    path: '/blog/css-modul/css1',
  },
  {
    id: 'css2', category: 'css',
    date: 'May 19, 2025', badge: 'Web Design',
    title: 'CSS Styling: Beyond the Basics',
    excerpt: 'Take your CSS skills further by mastering text styling, the box model, backgrounds, and display properties to create visually appealing websites....',
    tags: 'css web design styling',
    path: '/blog/css-modul/css2',
  },
  {
    id: 'css3', category: 'css',
    date: 'May 22, 2025', badge: 'Layout',
    title: 'CSS Layout: Positioning and Modern Techniques',
    excerpt: 'Master modern CSS layout techniques including positioning, Flexbox, Grid systems, and responsive design to create...',
    tags: 'css layout flexbox grid',
    path: '/blog/css-modul/css3',
  },
  {
    id: 'css4', category: 'css',
    date: 'May 27, 2025', badge: 'Animations',
    title: 'CSS Advanced: Animations, Responsive Design & Best Practices',
    excerpt: 'Master advanced CSS techniques including animations, transitions, responsive units, and professional...',
    tags: 'css animations responsive design',
    path: '/blog/css-modul/css4',
  },

  // JavaScript
  {
    id: 'js1', category: 'javascript',
    date: 'Jan 11, 2026', badge: 'Basics',
    title: 'JavaScript Basics: Your First Step Into the Logic World',
    excerpt: 'If HTML is the skeleton and CSS is the outfit, JavaScript is the brain. Without it, your website is just...',
    tags: 'javascript basics',
    path: '/blog/js-modul/js1',
  },
  {
    id: 'js2', category: 'javascript',
    date: 'Jan 11, 2026', badge: 'Logic',
    title: 'Logic Brain Gym: Mastering Control Flow',
    excerpt: 'This is where JavaScript stops being just a language and starts becoming a way of thinking....',
    tags: 'javascript logic control flow',
    path: '/blog/js-modul/js2',
  },
  {
    id: 'js2s', category: 'javascript',
    date: 'Jan 12, 2026', badge: 'Solutions',
    title: 'Logic Brain Gym — Solutions',
    excerpt: "This page contains the official solutions for Module 2. If you haven't tried the challenges yet — stop scrolling.",
    tags: 'javascript logic solutions',
    path: '/blog/js-modul/js2-solutions',
  },
  {
    id: 'js3', category: 'javascript',
    date: 'Jan 12, 2026', badge: 'Arrays & Objects',
    title: 'Data Exploration: Array & Object',
    excerpt: 'If JavaScript is a kitchen, arrays and objects are the fridge. Messy data = no cooking...',
    tags: 'javascript array object data',
    path: '/blog/js-modul/js3',
  },
  {
    id: 'js3s', category: 'javascript',
    date: 'Jan 12, 2026', badge: 'Solutions',
    title: 'Array & Object — Solutions',
    excerpt: "Official solutions for Module 3 challenges. If you didn't try first — scroll back.",
    tags: 'javascript array object data solutions',
    path: '/blog/js-modul/js3-solutions',
  },
  {
    id: 'js4', category: 'javascript',
    date: 'Jan 12, 2026', badge: 'Functions',
    title: 'Function Mastery: From Beginner to Clean Code',
    excerpt: "When your code gets long and copy–paste starts spreading, that's your sign: you need functions...",
    tags: 'javascript function cleancode',
    path: '/blog/js-modul/js4',
  },
  {
    id: 'js4s', category: 'javascript',
    date: 'Jan 12, 2026', badge: 'Solutions',
    title: 'Function Mastery — Solutions',
    excerpt: "This page contains the official solutions for Module 4. If you haven't tried the challenges yet — stop scrolling.",
    tags: 'javascript function cleancode solutions',
    path: '/blog/js-modul/js4-solutions',
  },
  {
    id: 'js5', category: 'javascript',
    date: 'Jan 13, 2026', badge: 'DOM',
    title: 'DOM Manipulation: When Code Starts Moving the Page',
    excerpt: 'This is where JavaScript stops being theory and starts touching the screen...',
    tags: 'javascript dom front-end',
    path: '/blog/js-modul/js5',
  },
  {
    id: 'js5s', category: 'javascript',
    date: 'Jan 13, 2026', badge: 'Solutions',
    title: 'DOM Manipulation — Solutions',
    excerpt: "Tried the challenges already? Good. Now let's break them down like real front-end devs.",
    tags: 'javascript dom front-end solutions',
    path: '/blog/js-modul/js5-solutions',
  },
  {
    id: 'js6', category: 'javascript',
    date: 'Jan 13, 2026', badge: 'Async',
    title: 'Asynchronous JavaScript: Keep Your UI Alive',
    excerpt: 'JavaScript is single-threaded. If your code waits and freezes, your UI dies....',
    tags: 'javascript async fetch api',
    path: '/blog/js-modul/js6',
  },
  {
    id: 'js6s', category: 'javascript',
    date: 'Jan 13, 2026', badge: 'Solutions',
    title: 'Asynchronous JavaScript — Solutions',
    excerpt: "Async is not about speed. It's about control, UX, and resilience.",
    tags: 'javascript async fetch api solutions',
    path: '/blog/js-modul/js6-solutions',
  },
  {
    id: 'js7', category: 'javascript',
    date: 'Jan 14, 2026', badge: 'Projects',
    title: 'Mini Projects Gallery',
    excerpt: 'Tutorials teach you how to type. Projects prove you can think and build.',
    tags: 'javascript projects portfolio',
    path: '/blog/js-modul/js7',
  },
];

// All filter tags — mirrors indexblog.html filter buttons
const FILTER_TAGS = [
  { label: 'All',              value: 'all' },
  { label: 'JavaScript',       value: 'javascript' },
  { label: 'HTML',             value: 'html' },
  { label: 'CSS',              value: 'css' },
  { label: 'Games',            value: 'game' },
  { label: 'Calculator',       value: 'calculator' },
  { label: 'Loops',            value: 'loops' },
  { label: 'Math',             value: 'math' },
  { label: 'Conditions',       value: 'conditions' },
  { label: 'Arrays',           value: 'array' },
  { label: 'Template Literals',value: 'template-literals' },
  { label: 'Functions',        value: 'functions' },
  { label: 'Logic',            value: 'logic' },
  { label: 'Grid',             value: 'grid' },
  { label: 'Layout',           value: 'layout' },
  { label: 'Flexbox',          value: 'flexbox' },
  { label: 'Animations',       value: 'animations' },
  { label: 'Basics',           value: 'basics' },
  { label: 'Web Design',       value: 'web design' },
  { label: 'Responsive Design',value: 'responsive design' },
  { label: 'Styling',          value: 'styling' },
  { label: 'Web Development',  value: 'web development' },
  { label: 'Age',              value: 'age' },
  { label: 'Semantics',        value: 'semantics' },
  { label: 'Solutions',        value: 'solutions' },
];

// Sections — mirrors HTML section order
const SECTIONS: { key: BlogCard['category']; label: string; span: string }[] = [
  { key: 'challenges', label: 'Challenges ', span: 'Day-By-Day' },
  { key: 'html',       label: 'HT',          span: 'ML' },
  { key: 'css',        label: 'C',            span: 'SS' },
  { key: 'javascript', label: 'Java',         span: 'Script' },
];

// Animated counter hook
function useAnimatedCounter(target: number, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, start]);
  return value;
}

// Scroll reveal hook 
function useScrollReveal() {
  useEffect(() => {
    const reveal = () => {
      document.querySelectorAll<HTMLElement>('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 150) {
          el.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', reveal);
    reveal();
    return () => window.removeEventListener('scroll', reveal);
  }, []);
}

// Main Page 
export default function BlogIndexPage() {
  const [search, setSearch]             = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [counterStarted, setCounterStarted] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);
  const totalCards = ALL_CARDS.length;

  // Start animated counters after 1 s (mirrors HTML setTimeout 1000)
  useEffect(() => {
    const t = setTimeout(() => setCounterStarted(true), 1000);
    return () => clearTimeout(t);
  }, []);

  // Scroll reveal
  useScrollReveal();

  // Keyboard shortcut Ctrl+K / Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Filter logic — mirrors filterPosts() in indexblog.html
  const searchTerm = search.toLowerCase().trim();
  const isFiltered = !!(searchTerm || activeFilter !== 'all');

  const visibleCards = ALL_CARDS.filter(card => {
    const matchesFilter = activeFilter === 'all' || card.tags.includes(activeFilter);
    const matchesSearch = !searchTerm ||
      card.tags.includes(searchTerm) ||
      card.title.toLowerCase().includes(searchTerm) ||
      card.excerpt.toLowerCase().includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const visibleCount = visibleCards.length;

  // Animated stat counters
  const cTotal  = useAnimatedCounter(totalCards, 2000, counterStarted);
  const cDays   = useAnimatedCounter(30,         2000, counterStarted);
  const cStreak = useAnimatedCounter(3,          2000, counterStarted);
  const cCats   = useAnimatedCounter(4,          2000, counterStarted);

  return (
    <div className="blog-index-page">

      {/* Particle Background */}
      <Particles />

      {/* Back to Portfolio */}
      <div className="blog-back-btn">
        <Link to="/" aria-label="Back to Portfolio">
          <i className="fas fa-arrow-left"></i>
          Back to Portfolio
        </Link>
      </div>

      {/* Header */}
      <div className="blog-index-header-wrap">
        <div className="blog-index-header">
          <h1>My <span>Blog</span></h1>
          <p>Explore my journey in learning, building, and growing as a front-end developer. Dive into tutorials, challenges, and insights from my coding adventures.</p>
        </div>

        {/* Stats */}
        <div className="blog-stats">
          <div className="blog-stat-item">
            <span className="blog-stat-number">{isFiltered ? visibleCount : cTotal}</span>
            <span className="blog-stat-label">Posts</span>
          </div>
          <div className="blog-stat-item">
            <span className="blog-stat-number">{cDays}</span>
            <span className="blog-stat-label">Days</span>
          </div>
          <div className="blog-stat-item">
            <span className="blog-stat-number">{cStreak}</span>
            <span className="blog-stat-label">Streak</span>
          </div>
          <div className="blog-stat-item">
            <span className="blog-stat-number">{cCats}</span>
            <span className="blog-stat-label">Categories</span>
          </div>
        </div>

        {/* Controls */}
        <div className="blog-controls">
          <div className="blog-search-wrap">
            <i className="fas fa-search blog-search-icon"></i>
            <input
              ref={searchRef}
              id="searchInput"
              type="text"
              className="blog-search-input"
              placeholder="Search posts by title, tag, or content..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Escape') {
                  setSearch('');
                  searchRef.current?.blur();
                }
              }}
            />
          </div>
          <div className="blog-filter-section">
            <p className="blog-filter-intro">Filter by tag:</p>
            <div className="blog-filter-tags">
              {FILTER_TAGS.map(tag => (
                <button
                  key={tag.value}
                  className={`blog-filter-tag${activeFilter === tag.value ? ' active' : ''}`}
                  onClick={() => setActiveFilter(tag.value)}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Section — hidden when filtering or searching */}
      {!isFiltered && <FeaturedSection />}

      {/* Blog Sections */}
      {SECTIONS.map(section => {
        const sectionCards = visibleCards.filter(c => c.category === section.key);
        if (sectionCards.length === 0) return null;
        return (
          <section key={section.key} className="blog-section-group reveal">
            <div className="blog-section-group-header">
              <h2>{section.label}<span>{section.span}</span></h2>
            </div>
            <div className="blog-cards-grid">
              {sectionCards.map(card => (
                <BlogCardItem key={card.id} card={card} />
              ))}
            </div>
          </section>
        );
      })}

      {/* No Results */}
      {visibleCount === 0 && (
        <div className="blog-no-results">
          <i className="fas fa-search"></i>
          <h3>No posts found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Footer */}
      <footer className="blog-index-footer">
        <p>&copy; 2026 SICODER. Blog | Personal Learning Journey</p>
        <p>Front-end development &amp; UI design insights</p>
        <div className="blog-footer-links">
          <Link to="/">Portfolio</Link>
          <a href="mailto:syfaarizal@gmail.com">Contact</a>
          <a href="https://github.com/syfaarizal" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </footer>

      {/* Logo Sticky */}
      <div className="blog-logo-sticky">
        <Link to="#" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src="/assets/LIBR-logo-nobg.png" alt="Logo LIBR" />
        </Link>
      </div>

    </div>
  );
}

// Featured Section
function FeaturedSection() {
  return (
    <section className="blog-section-group reveal">
      <div className="blog-featured-shell">
        <div className="blog-featured-content">
          <span className="blog-featured-badge">
            Featured
          </span>
          <h3 className="blog-featured-title">
            Latest Challenge: DOM Manipulation Mastery
          </h3>
          <p className="blog-featured-text">
            Discover how JavaScript brings web pages to life. Learn to manipulate the Document Object Model with practical examples and real-world applications that will transform your front-end skills.
          </p>
          <Link to="/blog/js-modul/js5" className="blog-read-more" aria-label="Read more about DOM Manipulation">
            Explore Now <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
        <div className="blog-featured-aside">
          <i className="fas fa-code blog-featured-icon"></i>
        </div>
      </div>
    </section>
  );
}

// Blog Card Component
function BlogCardItem({ card }: { card: BlogCard }) {
  return (
    <Link
      to={card.path}
      className="blog-index-card"
      data-tags={card.tags}
      aria-label={`Read more about ${card.title}`}
    >
      <div className="blog-card-header-row">
        <span className="blog-card-date">{card.date}</span>
        <span className="blog-card-badge">{card.badge}</span>
      </div>
      <h3>{card.title}</h3>
      <p>{card.excerpt}</p>
      <div className="blog-card-footer-row">
        <span className="blog-read-more">
          Read more <i className="fas fa-arrow-right"></i>
        </span>
      </div>
    </Link>
  );
}

// Particles Component
function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 20,
        duration: 20 + Math.random() * 10,
      })),
    []
  );

  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const nodes = root.querySelectorAll<HTMLElement>('.blog-particle');
    nodes.forEach((el, i) => {
      const p = particles[i];
      if (!p) return;
      el.style.setProperty('--particle-left', `${p.left}%`);
      el.style.setProperty('--particle-delay', `${p.delay}s`);
      el.style.setProperty('--particle-duration', `${p.duration}s`);
    });
  }, [particles]);

  return (
    <div ref={containerRef} className="blog-particles" id="particles">
      {particles.map(p => (
        <div key={p.id} className="blog-particle" />
      ))}
    </div>
  );
}
