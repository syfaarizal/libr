import { useState, useEffect, useCallback } from 'react';
import { Theme } from '../types';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) return saved;
    if (window.matchMedia?.('(prefers-color-scheme: light)').matches) return 'light';
    return 'dark';
  });

  useEffect(() => {
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem('theme', theme);

    const metaColor = theme === 'light' ? '#f8f9fa' : '#0a0a0a';
    let metaEl = document.querySelector('meta[name="theme-color"]');
    if (!metaEl) {
      metaEl = document.createElement('meta');
      (metaEl as HTMLMetaElement).name = 'theme-color';
      document.head.appendChild(metaEl);
    }
    metaEl.setAttribute('content', metaColor);
  }, [theme]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 't') {
        e.preventDefault();
        toggleTheme();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  return { theme, toggleTheme };
}
