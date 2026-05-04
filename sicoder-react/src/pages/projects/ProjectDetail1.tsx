import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/projects/project-detail.module.css';

// ── Scroll-animation hook ────────────────────────────────────────────────────
function useAnimateOnScroll() {
  const ref = useRef<HTMLElement | null>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, animated };
}

// ── AnimatedSection wrapper ──────────────────────────────────────────────────
function AnimatedSection({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { ref, animated } = useAnimateOnScroll();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`${className ?? ''} ${animated ? styles.animated : ''}`}
    >
      {children}
    </section>
  );
}

// ── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, onHide }: { message: string; onHide: () => void }) {
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHiding(true), 2000);
    const t2 = setTimeout(onHide, 2350);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onHide]);

  return (
    <div className={`${styles.toast} ${hiding ? styles.hide : ''}`}>
      {message}
    </div>
  );
}

// ── Footer (shared) ──────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/assets/img/sicoder-logo.png" alt="SICODER Logo" />
            <div className="logo-glow" />
          </div>
          <p className="footer-tagline">Building the web, one project at a time</p>
          <p className="footer-credit">© 2026 SICODER. All projects open-source.</p>
        </div>

        <div className="footer-links">
          <div className="links-column">
            <h4>Projects</h4>
            <ul>
              <li><a href="/projects">Web Development</a></li>
              <li><a href="/projects">UI/UX Design</a></li>
              <li><a href="/projects">Mobile Apps</a></li>
              <li><a href="/projects">Experiments</a></li>
            </ul>
          </div>
          <div className="links-column">
            <h4>Connect</h4>
            <ul>
              <li><a href="/#contact">Collaborate</a></li>
              <li><a href="mailto:syifairgi@gmail.com">Contact</a></li>
              <li><a href="https://www.linkedin.com/in/syifaarizal/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://www.instagram.com/syfaarizal/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-newsletter">
          <h4>Stay Updated</h4>
          <p>Get notified about new projects</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" required />
            <button type="submit" aria-label="Subscribe">
              <i className="fas fa-paper-plane" />
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-socials">
          <a href="https://github.com/syfaarizal" target="_blank" rel="noopener noreferrer"><i className="fab fa-github" /></a>
          <a href="https://codepen.io/syfaarizal" target="_blank" rel="noopener noreferrer"><i className="fab fa-codepen" /></a>
          <a href="https://www.linkedin.com/in/syifaarizal/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin" /></a>
          <a href="https://www.instagram.com/syfaarizal/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram" /></a>
        </div>
        <p className="footer-copyright">Made with ❤️ and <code>&lt;/&gt;</code> by Syifa F.A</p>
      </div>
    </footer>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function ProjectDetail1() {
  const [isLoading, setIsLoading]       = useState(true);
  const [backToTopVisible, setBackToTopVisible] = useState(false);
  const [toast, setToast]               = useState<string | null>(null);

  // Loading screen
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  // Back to top listener
  useEffect(() => {
    const onScroll = () => setBackToTopVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sidebar card refs (manual, since aside can't use AnimatedSection easily)
  const sidebar1 = useAnimateOnScroll();
  const sidebar2 = useAnimateOnScroll();
  const sidebar3 = useAnimateOnScroll();

  // Related project refs
  const related1 = useAnimateOnScroll();
  const related2 = useAnimateOnScroll();

  const copyProjectLink = () => {
    navigator.clipboard
      .writeText('https://syfaarizal.github.io/showcase-login-page/')
      .then(() => setToast('Project link copied to clipboard!'))
      .catch(() => setToast('Failed to copy link.'));
  };

  return (
    <>
      {/* Toast */}
      {toast && <Toast message={toast} onHide={() => setToast(null)} />}

      {/* Loading Screen */}
      <div className={`${styles.loadingScreen} ${!isLoading ? styles.loaded : ''}`} aria-hidden={!isLoading}>
        <div className={styles.loadingSpinner}>
          <div className={styles.spinnerCircle} />
          <div className={styles.spinnerText}>LOADING</div>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className={`${styles.projectDetailHero} section-card`}>
        <div className={styles.achievementBadge}>
          <i className="fas fa-award" />
          <span>Creative Showcase</span>
        </div>

        <div className={styles.heroContent}>
          <a href="/projects" className={styles.backToProjects}>
            <i className="fas fa-arrow-left" />
            <span>Back to Projects</span>
          </a>

          <div className={styles.projectHeader}>
            <div className={styles.projectCategoryBadge}>WEB DEVELOPMENT</div>
            <h1 className="title reveal-text">Login Page Showcase</h1>
            <p className="subtitle fade-in">
              A collection of creative login page templates featuring modern animations,
              micro-interactions, and responsive design patterns.
            </p>

            <div className={styles.projectMetaDetail}>
              <div className={styles.metaItem}>
                <i className="fas fa-calendar-alt" />
                <span>Completed: Sep 2025</span>
              </div>
              <div className={styles.metaItem}>
                <i className="fas fa-clock" />
                <span>Duration: 5 months</span>
              </div>
              <div className={styles.metaItem}>
                <i className="fas fa-code" />
                <span>25k Lines of code</span>
              </div>
              <div className={styles.metaItem}>
                <i className="fas fa-tag" />
                <span>Front-end, UI/UX</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <main className={`container ${styles.detailPageMain}`}>
        <div className={styles.projectContentSection}>

          {/* ── Left: Detail Sections ── */}
          <div className={styles.projectDetails}>

            {/* Overview */}
            <AnimatedSection className={styles.detailSection}>
              <h2><i className="fas fa-eye" /> Project Overview</h2>
              <p>
                The Login Page Showcase is a comprehensive collection of 8 uniquely designed login
                interfaces, each demonstrating different approaches to user authentication UI. This
                project focuses on blending aesthetics with functionality while maintaining best
                practices in front-end development.
              </p>

              <div className={styles.challengeSolution}>
                <div className={styles.challenge}>
                  <h3>⚡ The Challenge</h3>
                  <p>
                    Creating diverse login interfaces that are both visually appealing and
                    user-friendly, while ensuring consistent performance across all devices.
                  </p>
                </div>
                <div className={styles.solution}>
                  <h3>💡 My Solution</h3>
                  <p>
                    Implemented modular CSS architecture with custom animations and responsive
                    design patterns to create a cohesive yet diverse collection.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Tech Stack */}
            <AnimatedSection className={styles.detailSection}>
              <h2><i className="fas fa-cogs" /> Technologies Used</h2>
              <p>Built with modern web technologies for optimal performance and user experience:</p>

              <div className={styles.techDetailGrid}>
                {[
                  { icon: 'fab fa-html5',    name: 'HTML5',      desc: 'Semantic Structure' },
                  { icon: 'fab fa-css3-alt', name: 'CSS3 + SASS', desc: 'Modern Styling' },
                  { icon: 'fab fa-js',       name: 'JavaScript', desc: 'Interactivity' },
                  { icon: 'fas fa-bolt',     name: 'GSAP',       desc: 'Animations' },
                  { icon: 'fab fa-git-alt',  name: 'Git',        desc: 'Version Control' },
                  { icon: 'fab fa-github',   name: 'GitHub',     desc: 'Deployment' },
                ].map((t) => (
                  <div key={t.name} className={styles.techCard}>
                    <i className={t.icon} />
                    <div className={styles.techName}>{t.name}</div>
                    <div className={styles.techDesc}>{t.desc}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Key Features */}
            <AnimatedSection className={styles.detailSection}>
              <h2><i className="fas fa-star" /> Key Features</h2>
              <p>The Login Page Showcase includes several innovative features:</p>

              <div className={styles.featureGrid}>
                {[
                  { icon: 'fas fa-palette',          title: '8 Unique Designs',   desc: 'Different visual themes and styles for various use cases' },
                  { icon: 'fas fa-magic',            title: 'Smooth Animations',  desc: 'CSS animations and GSAP-powered micro-interactions' },
                  { icon: 'fas fa-mobile-alt',       title: 'Fully Responsive',   desc: 'Perfect display on all device sizes and resolutions' },
                  { icon: 'fas fa-check-circle',     title: 'Form Validation',    desc: 'Real-time feedback and error handling' },
                  { icon: 'fas fa-adjust',           title: 'Dark/Light Mode',    desc: 'Theme toggle for each design variation' },
                  { icon: 'fas fa-universal-access', title: 'Accessibility',      desc: 'Keyboard navigation and screen reader support' },
                ].map((f) => (
                  <div key={f.title} className={styles.featureCard}>
                    <div className={styles.featureIcon}>
                      <i className={f.icon} />
                    </div>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Gallery */}
            <AnimatedSection className={styles.detailSection}>
              <h2><i className="fas fa-images" /> Project Gallery</h2>
              <p>Visual walkthrough of different login page designs:</p>

              <div className={styles.galleryGrid}>
                {[
                  { src: '/assets/img/img-showcase-login/login-page-basic-purple.png', alt: 'Login Design 1', title: 'Modern Purple Theme',  caption: 'Clean design with gradient effects' },
                  { src: '/assets/img/img-showcase-login/login-page-blackcat.png',     alt: 'Login Design 2', title: 'Dark Cat Theme',        caption: 'Minimalist dark mode design' },
                  { src: '/assets/img/img-showcase-login/login-page-panorama.png',     alt: 'Login Design 3', title: 'Panorama Background',   caption: 'Full-screen background image' },
                  { src: '/assets/img/img-showcase-login/review-bg-astronaut.png',     alt: 'Login Design 4', title: 'Astronaut Theme',       caption: 'Space-themed creative design' },
                ].map((g) => (
                  <div key={g.alt} className={styles.galleryItem}>
                    <img src={g.src} alt={g.alt} loading="lazy" />
                    <div className={styles.galleryCaption}>
                      <strong>{g.title}</strong>
                      <p>{g.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Lessons Learned */}
            <AnimatedSection className={styles.detailSection}>
              <h2><i className="fas fa-graduation-cap" /> Lessons Learned</h2>
              <p>
                This project taught me the importance of balancing creativity with usability.
                I learned to implement complex animations without sacrificing performance,
                and how to create a cohesive design system that allows for variety within
                consistency.
              </p>

              <div className={styles.infoBoxGradient}>
                <h4>Key Takeaways:</h4>
                <ul className={styles.lessonsList}>
                  <li><strong>Performance Optimization:</strong> Implementing lazy loading and optimizing assets significantly improved loading times.</li>
                  <li><strong>User Experience:</strong> Small design decisions can significantly impact user experience in authentication flows.</li>
                  <li><strong>Modular Architecture:</strong> Well-organized CSS structure made maintenance and updates much easier.</li>
                </ul>
              </div>
            </AnimatedSection>
          </div>

          {/* ── Sidebar ── */}
          <aside className={styles.projectSidebar}>

            {/* Project Links */}
            <div
              ref={sidebar1.ref as React.RefObject<HTMLDivElement>}
              className={`${styles.sidebarCard} ${sidebar1.animated ? styles.animated : ''}`}
            >
              <h3><i className="fas fa-external-link-alt" /> Project Links</h3>
              <div className={styles.projectLinks}>
                <a href="https://syfaarizal.github.io/showcase-login-page/" target="_blank" rel="noopener noreferrer" className={styles.projectLinkBtn}>
                  <span>Live Demo</span>
                  <i className="fas fa-external-link-alt" />
                </a>
                <a href="https://github.com/syfaarizal/showcase-login-page" target="_blank" rel="noopener noreferrer" className={styles.projectLinkBtn}>
                  <span>Source Code</span>
                  <i className="fab fa-github" />
                </a>
                <a href="#" className={styles.projectLinkBtn}>
                  <span>Case Study PDF</span>
                  <i className="fas fa-download" />
                </a>
                <a href="#" className={styles.projectLinkBtn}>
                  <span>Design Files</span>
                  <i className="fab fa-figma" />
                </a>
              </div>
            </div>

            {/* Project Stats */}
            <div
              ref={sidebar2.ref as React.RefObject<HTMLDivElement>}
              className={`${styles.sidebarCard} ${sidebar2.animated ? styles.animated : ''}`}
            >
              <h3><i className="fas fa-chart-bar" /> Project Stats</h3>
              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <div className={styles.statValue}>45</div>
                  <div className={styles.statLabel}>Forks</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statValue}>25k</div>
                  <div className={styles.statLabel}>Lines of Code</div>
                </div>
              </div>
            </div>

            {/* Share Project */}
            <div
              ref={sidebar3.ref as React.RefObject<HTMLDivElement>}
              className={`${styles.sidebarCard} ${sidebar3.animated ? styles.animated : ''}`}
            >
              <h3><i className="fas fa-share-alt" /> Share Project</h3>
              <div className={styles.shareButtons}>
                <a
                  href="https://twitter.com/intent/tweet?text=Check%20out%20this%20awesome%20Login%20Page%20Showcase%20by%20@syfaarizal!&url=https://syfaarizal.github.io/showcase-login-page/"
                  target="_blank" rel="noopener noreferrer"
                  className={`${styles.shareBtn} ${styles.twitter}`}
                >
                  <i className="fab fa-twitter" /><span>Twitter</span>
                </a>
                <a
                  href="https://www.linkedin.com/sharing/share-offsite/?url=https://syfaarizal.github.io/showcase-login-page/"
                  target="_blank" rel="noopener noreferrer"
                  className={`${styles.shareBtn} ${styles.linkedin}`}
                >
                  <i className="fab fa-linkedin" /><span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/syfaarizal/showcase-login-page"
                  target="_blank" rel="noopener noreferrer"
                  className={`${styles.shareBtn} ${styles.github}`}
                >
                  <i className="fab fa-github" /><span>GitHub</span>
                </a>
                <button onClick={copyProjectLink} className={`${styles.shareBtn} ${styles.copy}`}>
                  <i className="fas fa-copy" /><span>Copy Link</span>
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* ── Related Projects ── */}
        <section className={`${styles.relatedProjects} section-card`}>
          <h2 className="title">Related <span className="highlight">Projects</span></h2>
          <p className="subtitle">Explore similar projects from my portfolio</p>

          <div className={styles.relatedGrid}>
            <a
              href="/projects/detail/2"
              ref={related1.ref as React.RefObject<HTMLAnchorElement>}
              className={`${styles.relatedProject} ${related1.animated ? styles.animated : ''}`}
            >
              <img src="/assets/img/CVDigital.png" alt="Digital CV" loading="lazy" />
              <div className={styles.relatedProjectContent}>
                <h3>Digital CV</h3>
                <p>Modern personal branding portfolio</p>
              </div>
            </a>

            <a
              href="/projects/detail/3"
              ref={related2.ref as React.RefObject<HTMLAnchorElement>}
              className={`${styles.relatedProject} ${related2.animated ? styles.animated : ''}`}
            >
              <img src="/assets/img/CruisePoint.png" alt="CruisePoint" loading="lazy" />
              <div className={styles.relatedProjectContent}>
                <h3>CruisePoint</h3>
                <p>Travel agency landing page</p>
              </div>
            </a>
          </div>

          <div className={styles.viewAllCenter}>
            <a href="/projects" className="btn btn-primary">
              <span>View All Projects</span>
              <i className="fas fa-arrow-right" />
            </a>
          </div>
        </section>
      </main>

      <Footer />

      {/* Back to Top */}
      <button
        className={`${styles.backToTop} ${backToTopVisible ? styles.visible : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <i className="fas fa-arrow-up" />
      </button>
    </>
  );
}
