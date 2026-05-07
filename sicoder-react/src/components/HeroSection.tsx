import { useState, useEffect, useRef } from 'react';

const texts = [
  "Building My Own Path",
  "Front-End Developer in Progress",
  "Code. Design. Direction.",
];

const navLinks = ["Home", "About", "Skills", "Blog", "Projects", "Contact"];

const stats = [
  { icon: "code",   label: "Projects",     value: "10+",  sub: "Completed"     },
  { icon: "trophy", label: "Experience",   value: "1+",   sub: "Years Learning" },
  { icon: "layers", label: "Technologies", value: "10+",  sub: "Tech Stack"     },
  { icon: "user",   label: "Focus",        value: "100%", sub: "On Growth"      },
];

export default function HeroSection() {
  const [typedText,    setTypedText]    = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [darkMode,     setDarkMode]     = useState(true);
  const textIndexRef  = useRef(0);
  const charIndexRef  = useRef(0);
  const isDeletingRef = useRef(false);

  /* ── typing effect ── */
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    function type() {
      const currentText = texts[textIndexRef.current];
      const isDeleting  = isDeletingRef.current;
      if (!isDeleting) {
        charIndexRef.current++;
        setTypedText(currentText.substring(0, charIndexRef.current));
        if (charIndexRef.current === currentText.length) {
          isDeletingRef.current = true;
          timeout = setTimeout(type, 1800);
        } else {
          timeout = setTimeout(type, 110);
        }
      } else {
        charIndexRef.current--;
        setTypedText(currentText.substring(0, charIndexRef.current));
        if (charIndexRef.current === 0) {
          isDeletingRef.current = false;
          textIndexRef.current  = (textIndexRef.current + 1) % texts.length;
          timeout = setTimeout(type, 600);
        } else {
          timeout = setTimeout(type, 55);
        }
      }
    }
    timeout = setTimeout(type, 1200);
    return () => clearTimeout(timeout);
  }, []);

  /* ── close dropdown on outside click ── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const btn      = document.getElementById('CV-btn');
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
      const headerHeight = document.querySelector('.navbar')?.clientHeight || 0;
      window.scrollTo({ top: (target as HTMLElement).offsetTop - headerHeight - 20, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ════════════ NAVBAR ════════════ */}
      <nav className="navbar">
        <a href="#" className="navbar-logo">LIBR</a>
        <ul className="navbar-links">
          {navLinks.map((link, i) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className={i === 0 ? 'active' : ''}
                onClick={e => { e.preventDefault(); scrollTo(`#${link.toLowerCase()}`); }}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
        <div className={`navbar-toggle${darkMode ? ' on' : ''}`} onClick={() => setDarkMode(v => !v)} />
      </nav>

      {/* ════════════ HERO ════════════ */}
      <section id="home" className="hero-section">

        <div className="hero-bg-overlay" />

        {/* scattered particles */}
        <div className="particles">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="particle" style={{
              left:             `${Math.random() * 100}%`,
              top:              `${20 + Math.random() * 60}%`,
              ['--dur'  as string]: `${3 + Math.random() * 4}s`,
              ['--delay'as string]: `${Math.random() * 5}s`,
              width:  `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
            }} />
          ))}
        </div>

        {/* ── side labels – absolute inside hero, scroll away naturally ── */}
        <div className="hero-side-dots"><span /><span /><span /></div>
        <div className="hero-side-label hero-side-label--left">Front-End Developer</div>
        <div className="hero-side-num">01</div>
        <div className="hero-side-label hero-side-label--right">Building · Learning · Growing</div>

        {/* ── main two-column layout ── */}
        <div className="home">

          {/* LEFT — logo */}
          <div className="home-img">
            <div className="image-container">

              {/* rotating geometric rings */}
              <div className="geo-rings">
                <div className="geo-ring geo-ring-1">
                  <svg viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon
                      points="170,10 215,80 295,55 270,135 340,170 270,205 295,285 215,260 170,330 125,260 45,285 70,205 0,170 70,135 45,55 125,80"
                      stroke="rgba(200,20,20,0.55)" strokeWidth="1.2" fill="none"
                    />
                  </svg>
                </div>
                <div className="geo-ring geo-ring-2">
                  <svg viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon
                      points="140,8 175,65 240,45 220,110 278,140 220,170 240,235 175,215 140,272 105,215 40,235 60,170 2,140 60,110 40,45 105,65"
                      stroke="rgba(200,20,20,0.3)" strokeWidth="1" fill="none"
                    />
                  </svg>
                </div>
                <div className="geo-ring geo-ring-3">
                  <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="4" width="312" height="312"
                      stroke="rgba(200,20,20,0.18)" strokeWidth="1" fill="none"
                      transform="rotate(15 160 160)" />
                    <rect x="24" y="24" width="272" height="272"
                      stroke="rgba(200,20,20,0.12)" strokeWidth="1" fill="none"
                      transform="rotate(30 160 160)" />
                    {[[14,14],[294,14],[14,294],[294,294]].map(([cx,cy], i) => (
                      <rect key={i} x={cx-5} y={cy-5} width="10" height="10"
                        fill="none" stroke="rgba(220,30,30,0.6)" strokeWidth="1.2"
                        transform={`rotate(45 ${cx} ${cy})`} />
                    ))}
                    {[[14,14],[306,14],[14,306],[306,306]].map(([x,y], i) => (
                      <line key={i} x1={x} y1={y} x2="160" y2="160"
                        stroke="rgba(200,20,20,0.1)" strokeWidth="0.8" />
                    ))}
                  </svg>
                </div>
              </div>

              {/* bubble sphere — transparent with inward red glow */}
              <div className="logo-sphere">
                <img src="/assets/LIBR-logo-nobg.png" alt="LIBR Logo" className="logo-3d" />
                <div className="glow-effect" />
              </div>

            </div>
          </div>

          {/* RIGHT — text */}
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
                <div className="typing-underline" />
              </div>
            </div>

            <p className="description fade-in">
              I don't just write code. I turn chaos into clarity—
              building interfaces, experiences, and ownership over my craft.
            </p>

            <div className="social-icons">
              {[
                { href: "https://www.linkedin.com/in/syifaarizal/", icon: "fa-brands fa-linkedin",  tip: "LinkedIn"  },
                { href: "https://github.com/syfaarizal",            icon: "fa-brands fa-github",    tip: "GitHub"    },
                { href: "https://www.instagram.com/syfaarizal/",    icon: "fa-brands fa-instagram", tip: "Instagram" },
                { href: "#contact",                                  icon: "fa-solid fa-envelope",   tip: "Email"     },
              ].map(({ href, icon, tip }) => (
                <a key={tip} href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  className="social-icon" data-tooltip={tip}
                  onClick={href === '#contact' ? (e => { e.preventDefault(); scrollTo('#contact'); }) : undefined}
                >
                  <i className={icon} />
                  <span className="hover-effect" />
                </a>
              ))}
            </div>

            <div className="hero-buttons">
              <a href="#contact" className="btn btn-primary pulse-animation"
                onClick={e => { e.preventDefault(); scrollTo('#contact'); }}>
                <span>Hire Me</span>
                <i className="fas fa-arrow-right" />
              </a>

              <div className="cv-dropdown">
                <a href="#" id="CV-btn" className="btn btn-secondary"
                  onClick={e => { e.preventDefault(); e.stopPropagation(); setShowDropdown(v => !v); }}>
                  <span>Download CV</span>
                  <i className="fas fa-download"
                    style={{ transform: showDropdown ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
                </a>
                <div id="extraLinks" className={`cv-dropdown-content${showDropdown ? ' show' : ''}`}>
                  <a href="./assets/CV/CV-FrontEnd-Ind.pdf" className="cv-link" download>
                    <i className="fas fa-file-pdf" /> CV in Bahasa Indonesia
                  </a>
                  <a href="./assets/CV/CV-FrontEnd-Eng.pdf" className="cv-link" download>
                    <i className="fas fa-file-pdf" /> CV in English
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── STATS BAR ── */}
        <div className="stats-bar">
          {stats.map((s, i) => (
            <div className="stat-item" key={i}>
              <div className="stat-icon-wrap">
                {s.icon === 'code'   && <i className="fas fa-code" />}
                {s.icon === 'trophy' && <i className="fas fa-trophy" />}
                {s.icon === 'layers' && <i className="fas fa-layer-group" />}
                {s.icon === 'user'   && <i className="fas fa-user" />}
              </div>
              <div className="stat-info">
                <span className="stat-label">{s.label}</span>
                <span className="stat-value">{s.value}</span>
                <span className="stat-sub">{s.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── SCROLL DOWN ── */}
        <a href="#about" className="scroll-down"
          onClick={e => { e.preventDefault(); scrollTo('#about'); }}>
          <div className="scroll-animation">
            <span /><span /><span />
          </div>
          <span className="scroll-text">Scroll Down</span>
        </a>

      </section>
    </>
  );
}