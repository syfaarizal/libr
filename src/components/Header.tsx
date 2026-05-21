import { useState, useEffect, useRef } from 'react';
import type { CSSProperties, MouseEvent } from 'react';
import { useTheme } from '../hooks/useTheme';
import type { Theme } from '../types';

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
  const [themeTransition, setThemeTransition] = useState<{
    from: Theme;
    x: string;
    y: string;
    shrinking: boolean;
  } | null>(null);
  const navIndicatorRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const themeToggleRef = useRef<HTMLDivElement>(null);
  const transitionTimerRef = useRef<number | null>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.slice(1));

    const updateActiveSection = () => {
      const headerHeight = document.querySelector('.header')?.clientHeight || 0;
      const scrollProbe = window.scrollY + headerHeight + window.innerHeight * 0.3;
      let nextActive = sectionIds[0];

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;

        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollProbe >= sectionTop && scrollProbe < sectionBottom) {
          nextActive = id;
        }
      });

      const pageBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (docHeight - pageBottom < 24) {
        nextActive = sectionIds[sectionIds.length - 1];
      }

      setActiveSection((prev) => (prev === nextActive ? prev : nextActive));
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  useEffect(() => {
    if (!navIndicatorRef.current || !navRef.current) return;
    if (window.innerWidth <= 768) return;

    const activeLink = navRef.current.querySelector('.nav-link.active') as HTMLElement | null;
    if (!activeLink) return;

    const linkRect = activeLink.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    navIndicatorRef.current.style.width = `${linkRect.width}px`;
    navIndicatorRef.current.style.left = `${linkRect.left - navRect.left}px`;
    navIndicatorRef.current.style.opacity = '1';
  }, [activeSection]);

  useEffect(() => {
    const handleClick = (e: MouseEvent | globalThis.MouseEvent) => {
      const nav = document.querySelector('.nav-menu');
      const toggle = document.getElementById('menu-toggle');
      if (nav && toggle && !nav.contains(e.target as Node) && !toggle.contains(e.target as Node)) {
        setMenuOpen(false);
        document.body.style.overflow = '';
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        document.body.style.overflow = '';
      }
    };

    document.addEventListener('click', handleClick as EventListener);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('click', handleClick as EventListener);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const toggleMenu = (e: MouseEvent<HTMLDivElement>) => {
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
      window.scrollTo({
        top: (target as HTMLElement).offsetTop - headerHeight - 20,
        behavior: 'smooth',
      });
    }
  };

  const handleThemeToggle = () => {
    if (themeTransition) return;

    const rect = themeToggleRef.current?.getBoundingClientRect();
    const x = rect ? `${rect.left + rect.width / 2}px` : 'calc(100% - 55px)';
    const y = rect ? `${rect.top + rect.height / 2}px` : '40px';

    setThemeTransition({
      from: theme,
      x,
      y,
      shrinking: false,
    });

    window.requestAnimationFrame(() => {
      toggleTheme();
      window.requestAnimationFrame(() => {
        setThemeTransition((prev) =>
          prev ? { ...prev, shrinking: true } : null
        );
      });
    });

    transitionTimerRef.current = window.setTimeout(() => {
      setThemeTransition(null);
      transitionTimerRef.current = null;
    }, 720);
  };

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <a href="https://sicoder.netlify.app/" className="logo">
        LIBR
      </a>

      <div className="menu-toggle" id="menu-toggle" onClick={toggleMenu}>
        <div className={`hamburger${menuOpen ? ' active' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <nav ref={navRef} className={`nav-menu${menuOpen ? ' active' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`nav-link${activeSection === link.href.slice(1) ? ' active' : ''}`}
            data-text={link.label}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(link.href);
            }}
          >
            {link.label}
          </a>
        ))}
        <div ref={navIndicatorRef} className="nav-indicator"></div>
      </nav>

      {themeTransition && (
        <div
          className={`theme-transition-overlay theme-transition-overlay--${themeTransition.from}${themeTransition.shrinking ? ' is-shrinking' : ''}`}
          style={
            {
              '--theme-origin-x': themeTransition.x,
              '--theme-origin-y': themeTransition.y,
            } as CSSProperties
          }
          aria-hidden="true"
        />
      )}

      <div ref={themeToggleRef} className="theme-toggle">
        <input
          type="checkbox"
          id="theme-switch"
          className="theme-switch"
          checked={theme === 'light'}
          onChange={handleThemeToggle}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
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
