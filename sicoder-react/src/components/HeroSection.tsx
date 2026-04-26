import { useState, useEffect, useRef } from 'react';

const texts = [
  "Building My Own Path",
  "Front-End Developer in Progress",
  "Code. Design. Direction.",
];

export default function HeroSection() {
  const [typedText, setTypedText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const textIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    function type() {
      const currentText = texts[textIndexRef.current];
      const isDeleting = isDeletingRef.current;

      if (!isDeleting) {
        // Typing forward
        charIndexRef.current++;
        setTypedText(currentText.substring(0, charIndexRef.current));

        if (charIndexRef.current === currentText.length) {
          // Finished typing — pause then start deleting
          isDeletingRef.current = true;
          timeout = setTimeout(type, 1800);
        } else {
          timeout = setTimeout(type, 110);
        }
      } else {
        // Deleting
        charIndexRef.current--;
        setTypedText(currentText.substring(0, charIndexRef.current));

        if (charIndexRef.current === 0) {
          // Finished deleting — move to next text and pause
          isDeletingRef.current = false;
          textIndexRef.current = (textIndexRef.current + 1) % texts.length;
          timeout = setTimeout(type, 600);
        } else {
          timeout = setTimeout(type, 55);
        }
      }
    }

    // Initial delay before starting
    timeout = setTimeout(type, 1200);
    return () => clearTimeout(timeout);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const btn = document.getElementById('CV-btn');
      const dropdown = document.getElementById('extraLinks');
      if (btn && dropdown && !btn.contains(e.target as Node) && !dropdown.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      const headerHeight = document.querySelector('.header')?.clientHeight || 0;
      window.scrollTo({ top: (target as HTMLElement).offsetTop - headerHeight - 20, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-bg-overlay"></div>
      <div className="hero-content">
        <div className="home">
          {/* Logo / Image side */}
          <div className="home-img">
            <div className="image-container">
              <img
                src="/assets/LIBR-logo-nobg.png"
                alt="SICODER Logo"
                className="logo-3d"
              />
              <div className="hexagon-border">
                <div className="hex"></div>
                <div className="hex"></div>
                <div className="hex"></div>
              </div>
              <div className="glow-effect"></div>
            </div>
          </div>

          {/* Content side */}
          <div className="home-content">
            <div className="intro-text">
              <h6 className="subtitle reveal-text">Hello, I'm</h6>
              <h1 className="title reveal-text">
                Syifa <span className="gradient-text">Fauziyah Arizal</span>
              </h1>
              <div className="typing-container">
                <h3 className="typing-text">
                  I'm a <span className="typed-text">{typedText}</span>
                </h3>
              </div>
            </div>

            <p className="description fade-in">
              I don't just write code. I turn chaos into clarity—
              building interfaces, experiences, and ownership over my craft.
            </p>

            <div className="social-icons">
              <a href="https://www.linkedin.com/in/syifaarizal/" target="_blank" rel="noreferrer" className="social-icon" data-tooltip="LinkedIn">
                <i className="fa-brands fa-linkedin"></i>
                <span className="hover-effect"></span>
              </a>
              <a href="https://github.com/syfaarizal" target="_blank" rel="noreferrer" className="social-icon" data-tooltip="GitHub">
                <i className="fa-brands fa-github"></i>
                <span className="hover-effect"></span>
              </a>
              <a href="https://www.instagram.com/syfaarizal/" target="_blank" rel="noreferrer" className="social-icon" data-tooltip="Instagram">
                <i className="fa-brands fa-instagram"></i>
                <span className="hover-effect"></span>
              </a>
              <a href="#contact" className="social-icon" data-tooltip="Email" onClick={e => { e.preventDefault(); scrollTo('#contact'); }}>
                <i className="fa-solid fa-envelope"></i>
                <span className="hover-effect"></span>
              </a>
            </div>

            <div className="hero-buttons">
              <a href="#contact" className="btn btn-primary pulse-animation"
                onClick={e => { e.preventDefault(); scrollTo('#contact'); }}>
                <span>Hire Me</span>
                <i className="fas fa-arrow-right"></i>
              </a>

              <div className="cv-dropdown">
                <a href="#" id="CV-btn" className="btn btn-secondary"
                  onClick={e => { e.preventDefault(); e.stopPropagation(); setShowDropdown(v => !v); }}>
                  <span>Download CV</span>
                  <i className="fas fa-download" style={{ transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.3s' }}></i>
                </a>
                <div id="extraLinks" className={`cv-dropdown-content${showDropdown ? ' show' : ''}`}>
                  <a href="./assets/CV/CV-FrontEnd-Ind.pdf" className="cv-link" download>
                    <i className="fas fa-file-pdf"></i>
                    CV in Bahasa Indonesia
                  </a>
                  <a href="./assets/CV/CV-FrontEnd-Eng.pdf" className="cv-link" download>
                    <i className="fas fa-file-pdf"></i>
                    CV in English
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-down" onClick={e => { e.preventDefault(); scrollTo('#about'); }}>
        <div className="scroll-animation">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span className="scroll-text">Scroll Down</span>
      </a>
    </section>
  );
}
