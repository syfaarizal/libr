import { useEffect, useRef } from 'react';

export default function AboutSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  /* ── counter animation ── */
  useEffect(() => {
    if (!statsRef.current) return;
    const statCards = statsRef.current.querySelectorAll('.stat-card');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number') as HTMLElement;
            if (!statNumber) return;
            const target  = parseInt(statNumber.getAttribute('data-count') || '0');
            const suffix  = statNumber.getAttribute('data-suffix') || '+';
            animateCounter(statNumber, target, suffix);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statCards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  /* ── scroll-reveal for section children ── */
  useEffect(() => {
    if (!sectionRef.current) return;
    const revealEls = sectionRef.current.querySelectorAll('.reveal');

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('revealed');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  function animateCounter(el: HTMLElement, target: number, suffix: string) {
    const duration = 1600;
    const start    = performance.now();
    function update(now: number) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut  = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(easeOut * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  return (
    <section id="about" className="about-section" ref={sectionRef}>

      {/* ── decorative grid dots ── */}
      <div className="about-grid-dots" aria-hidden="true">
        {Array.from({ length: 48 }).map((_, i) => <span key={i} />)}
      </div>

      {/* ── feather watermark ── */}
      <div className="about-watermark" aria-hidden="true">
        <i className="fas fa-feather-alt" />
      </div>

      {/* ── left accent bar ── */}
      <div className="about-side-bar" aria-hidden="true">
        <span className="about-side-dot" />
        <span className="about-side-dot" />
        <span className="about-side-dot" />
        <span className="about-side-line" />
        <span className="about-side-text">About Me</span>
        <span className="about-side-line" />
        <span className="about-side-dot" />
        <span className="about-side-dot" />
        <span className="about-side-dot" />
      </div>

      {/* ── HEADER ── */}
      <div className="about-header reveal reveal-down">
        <div className="about-section-badge">
          <span>01</span>
        </div>
        <h2 className="about-title">
          About <span className="highlight">Me</span>
        </h2>
        <div className="about-title-underline" />
        <p className="about-subtitle">Get to know more about my journey and passion</p>
      </div>

      {/* ── TWO-COLUMN BODY ── */}
      <div className="about-body">

        {/* LEFT */}
        <div className="about-text reveal reveal-left">
          <div className="about-intro">
            <h3 className="about-name">
              Hi, I'm<br />
              <span className="about-name-red">Syifa Fauziyah Arizal</span>
            </h3>
            <div className="about-accent-line" />
            <p className="about-lead">
              I'm a passionate front-end developer and UI designer with a focus on creating clean,
              responsive, and user-friendly web applications.
            </p>
          </div>

          <div className="about-details">
            <p>
              Turning ideas into real products through code and design.
              Always learning and sharpening my front-end skills (HTML, CSS, JavaScript, and modern frameworks).
            </p>
            <p>
              My goal is to build intuitive interfaces that enhance user experience while
              maintaining high performance and accessibility standards.
            </p>
          </div>

          {/* Stats */}
          <div className="stats-container" ref={statsRef}>
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-code" /></div>
              <div className="stat-content">
                <h3 className="stat-number" data-count="3" data-suffix="+">0+</h3>
                <p className="stat-label">Projects<br/>Completed</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-heart" /></div>
              <div className="stat-content">
                <h3 className="stat-number" data-count="100" data-suffix="%">0%</h3>
                <p className="stat-label">Client<br/>Satisfaction</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-clock" /></div>
              <div className="stat-content">
                <h3 className="stat-number" data-count="1" data-suffix="+">0+</h3>
                <p className="stat-label">Years<br/>Learning</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — avatar */}
        <div className="about-visual reveal reveal-right">
          <div className="avatar-wrapper">
            {/* ambient light behind circle */}
            <div className="avatar-ambient" />

            {/* outer pulsing ring */}
            <div className="avatar-ring avatar-ring--outer" />
            {/* mid ring */}
            <div className="avatar-ring avatar-ring--mid" />

            {/* circle photo */}
            <div className="avatar-circle">
              <img
                src="/assets/Syifa-Anime.png"
                alt="Syifa Fauziyah Arizal"
                className="avatar-image"
              />
              <div className="avatar-glow" />
            </div>

            {/* neon arc top */}
            <div className="avatar-neon-arc" />

            {/* scan-line sweep */}
            <div className="avatar-scanline" />

            {/* floating sparks */}
            {[...Array(8)].map((_, i) => (
              <span key={i} className={`avatar-spark avatar-spark--${i + 1}`} />
            ))}
          </div>
        </div>
      </div>

      {/* bottom glow */}
      <div className="about-bottom-glow" aria-hidden="true" />
    </section>
  );
}