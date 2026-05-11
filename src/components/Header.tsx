import { useState, useEffect, useRef } from 'react';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#blog', label: 'Blog' },
  { href: '#project', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navIndicatorRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active nav
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.15, rootMargin: '-100px 0px -100px 0px' });
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Update nav indicator
  useEffect(() => {
    if (!navIndicatorRef.current || !navRef.current) return;
    if (window.innerWidth <= 768) return;
    const activeLink = navRef.current.querySelector('.nav-link.active') as HTMLElement;
    if (activeLink) {
      const linkRect = activeLink.getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();
      navIndicatorRef.current.style.width = `${linkRect.width}px`;
      navIndicatorRef.current.style.left = `${linkRect.left - navRect.left}px`;
      navIndicatorRef.current.style.opacity = '1';
    }
  }, [activeSection]);

  // Close menu on outside click or escape
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const nav = document.querySelector('.nav-menu');
      const toggle = document.getElementById('menu-toggle');
      if (nav && toggle && !nav.contains(e.target as Node) && !toggle.contains(e.target as Node)) {
        setMenuOpen(false);
        document.body.style.overflow = '';
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenuOpen(false); document.body.style.overflow = ''; }
    };
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    document.body.style.overflow = '';
    const target = document.querySelector(href);
    if (target) {
      const headerHeight = document.querySelector('.header')?.clientHeight || 0;
      window.scrollTo({ top: (target as HTMLElement).offsetTop - headerHeight - 20, behavior: 'smooth' });
    }
  };

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <a href="https://sicoder.netlify.app/" className="logo">LIBR</a>

      <div className="menu-toggle" id="menu-toggle" onClick={toggleMenu}>
        <div className={`hamburger${menuOpen ? ' active' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <nav ref={navRef} className={`nav-menu${menuOpen ? ' active' : ''}`}>
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            className={`nav-link${activeSection === link.href.slice(1) ? ' active' : ''}`}
            data-text={link.label}
            onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
          >
            {link.label}
          </a>
        ))}
        <div ref={navIndicatorRef} className="nav-indicator"></div>
      </nav>

      {/* Theme Toggle */}
      <div className="theme-toggle">
        <input type="checkbox" id="theme-switch" className="theme-switch"
          onChange={(e) => {
            document.body.classList.toggle('light-theme', e.target.checked);
          }}
        />
        <label htmlFor="theme-switch" className="theme-label">
          <i className="fas fa-sun"></i>
          <i className="fas fa-moon"></i>
          <span className="theme-ball"></span>
        </label>
      </div>
    </header>
  );
}
