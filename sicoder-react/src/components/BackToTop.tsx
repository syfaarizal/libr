import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <a
      href="#"
      id="backToTop"
      className={`back-to-top${visible ? ' visible' : ''}`}
      onClick={(e) => { e.preventDefault(); scrollToTop(); }}
      aria-hidden={!visible}
    >
      <img src="/assets/LIBR-logo-nobg.png" alt="Logo LIBR" />
    </a>
  );
}
