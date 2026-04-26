import { useEffect, useRef } from 'react';

export default function AboutSection() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!statsRef.current) return;

    const statCards = statsRef.current.querySelectorAll('.stat-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumber = entry.target.querySelector('.stat-number') as HTMLElement;
          if (!statNumber) return;
          const target = parseInt(statNumber.getAttribute('data-count') || '0');
          const isPercentage = statNumber.textContent?.includes('%');
          const suffix = isPercentage ? '%' : '+';
          animateCounter(statNumber, target, suffix);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statCards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  function animateCounter(el: HTMLElement, target: number, suffix: string) {
    const duration = 1500;
    const start = performance.now();
    function update(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(easeOutQuart * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  return (
    <section id="about" className="section-card">
      <div className="section-header">
        <div className="section-title">
          <span className="title-number">01</span>
          <h2>About <span className="highlight">Me</span></h2>
        </div>
        <p className="section-subtitle">Get to know more about my journey and passion</p>
      </div>

      <div className="about-content">
        <div className="about-text">
          <div className="about-intro">
            <h3>Hi, I'm <span className="gradient-text">Syifa Fauziyah Arizal</span></h3>
            <div className="accent-line"></div>
            <p className="lead-text">
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

          <div className="stats-container" ref={statsRef}>
            <div className="stat-card animate-on-scroll">
              <div className="stat-icon"><i className="fas fa-code"></i></div>
              <div className="stat-content">
                <h3 className="stat-number" data-count="3">0+</h3>
                <p className="stat-label">Projects Completed</p>
              </div>
            </div>
            <div className="stat-card animate-on-scroll">
              <div className="stat-icon"><i className="fas fa-heart"></i></div>
              <div className="stat-content">
                <h3 className="stat-number" data-count="100">0%</h3>
                <p className="stat-label">Client Satisfaction</p>
              </div>
            </div>
            <div className="stat-card animate-on-scroll">
              <div className="stat-icon"><i className="fas fa-clock"></i></div>
              <div className="stat-content">
                <h3 className="stat-number" data-count="1">0+</h3>
                <p className="stat-label">Years Learning</p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-visual">
          <div className="floating-avatar">
            <div className="avatar-container">
              <img src="/assets/Syifa-Anime.png" alt="Syifa Fauziyah Arizal" className="avatar-image" />
              <div className="avatar-overlay"></div>
              <div className="tech-tags">
                <span className="tech-tag" style={{ '--i': 1 } as React.CSSProperties}>HTML5</span>
                <span className="tech-tag" style={{ '--i': 2 } as React.CSSProperties}>CSS3</span>
                <span className="tech-tag" style={{ '--i': 3 } as React.CSSProperties}>JS</span>
                <span className="tech-tag" style={{ '--i': 4 } as React.CSSProperties}>UI/UX</span>
              </div>
              <div className="ring"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
