import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/projects/project-detail.module.css';

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

function Toast({ message, onHide }: { message: string; onHide: () => void }) {
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHiding(true), 2000);
    const t2 = setTimeout(onHide, 2350);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onHide]);

  return <div className={`${styles.toast} ${hiding ? styles.hide : ''}`}>{message}</div>;
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-text">LIBR</span>
            <div className="logo-glow" />
          </div>
          <p className="footer-tagline">Building the web, one project at a time</p>
          <p className="footer-credit">© 2026 LIBR All projects open-source.</p>
        </div>

        <div className="footer-links">
          <div className="links-column">
            <h4>Projects</h4>
            <ul>
              <li><a href="/projects">Web Development</a></li>
              <li><a href="/projects">Productivity Apps</a></li>
              <li><a href="/projects">UI/UX Design</a></li>
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
          <a href="https://github.com/syfaarizal" target="_blank" rel="noopener noreferrer" title="GitHub"><i className="fab fa-github" /></a>
          <a href="https://codepen.io/syfaarizal" target="_blank" rel="noopener noreferrer" title="CodePen"><i className="fab fa-codepen" /></a>
          <a href="https://www.linkedin.com/in/syifaarizal/" target="_blank" rel="noopener noreferrer" title="LinkedIn"><i className="fab fa-linkedin" /></a>
          <a href="https://www.instagram.com/syfaarizal/" target="_blank" rel="noopener noreferrer" title="Instagram"><i className="fab fa-instagram" /></a>
        </div>
        <p className="footer-copyright">Made with ❤ and <code>&lt;/&gt;</code> by Syifa F.A</p>
      </div>
    </footer>
  );
}

export default function ProjectDetail4() {
  const [isLoading, setIsLoading] = useState(true);
  const [backToTopVisible, setBackToTopVisible] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setBackToTopVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const sidebar1 = useAnimateOnScroll();
  const sidebar2 = useAnimateOnScroll();
  const sidebar3 = useAnimateOnScroll();
  const sidebar4 = useAnimateOnScroll();
  const related1 = useAnimateOnScroll();
  const related2 = useAnimateOnScroll();
  const related3 = useAnimateOnScroll();

  const copyProjectLink = () => {
    navigator.clipboard
      .writeText('https://pomodoro-focusflow.vercel.app/')
      .then(() => setToast('Project link copied to clipboard!'))
      .catch(() => setToast('Failed to copy link.'));
  };

  return (
    <>
      {toast && <Toast message={toast} onHide={() => setToast(null)} />}

      <div className={`${styles.loadingScreen} ${!isLoading ? styles.loaded : ''}`}>
        <div className={styles.loadingSpinner}>
          <div className={styles.spinnerCircle} />
          <div className={styles.spinnerText}>LOADING</div>
        </div>
      </div>

      {/* Header */}
      <header className="header header-dark">
        <a href="/" className="logo">LIBR</a>
      </header>

      <section className={`${styles.projectDetailHero} section-card`}>
        <div className={styles.achievementBadge}>
          <i className="fas fa-stopwatch" />
          <span>In Progress</span>
        </div>

        <div className={styles.heroContent}>
          <a href="/projects" className={styles.backToProjects}>
            <i className="fas fa-arrow-left" />
            <span>Back to Projects</span>
          </a>

          <div className={styles.projectHeader}>
            <div className={styles.projectCategoryBadge}>PRODUCTIVITY APP</div>
            <h1 className="title reveal-text">
              FocusFlow Pomodoro Timer
              <span className={styles.projectStatusBadge}>
                <i className="fas fa-tools" />
                In Development
              </span>
            </h1>
            <p className="subtitle fade-in">
              A modern productivity timer focused on deep work sessions, clear session
              management, and a calm interface that supports sustainable focus.
            </p>

            <div className={styles.projectMetaDetail}>
              <div className={styles.metaItem}>
                <i className="fas fa-calendar-alt" />
                <span>Started: Jan 2026</span>
              </div>
              <div className={styles.metaItem}>
                <i className="fas fa-code" />
                <span>5k Lines of code</span>
              </div>
              <div className={styles.metaItem}>
                <i className="fas fa-mobile-alt" />
                <span>Responsive UI</span>
              </div>
              <div className={styles.metaItem}>
                <i className="fas fa-battery-three-quarters" />
                <span>Completion: 60%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className={`container ${styles.detailPageMain}`}>
        <div className={styles.projectContentSection}>
          <div className={styles.projectDetails}>
            <AnimatedSection className={styles.detailSection}>
              <h2><i className="fas fa-eye" /> Project Overview</h2>
              <p>
                FocusFlow is an advanced Pomodoro timer application that helps users maintain
                productivity through the proven Pomodoro Technique. The app combines timer
                functionality with productivity features to create an optimal work environment.
              </p>

              <div className={styles.challengeSolution}>
                <div className={styles.challenge}>
                  <h3>The Challenge</h3>
                  <p>
                    Build a timer app that feels minimal and calming while still handling the
                    practical needs of work sessions, breaks, settings, and future productivity insights.
                  </p>
                </div>
                <div className={styles.solution}>
                  <h3>My Solution</h3>
                  <p>
                    I focused on a clean interface, modular feature planning, and responsive
                    interactions so the product can grow without losing clarity or ease of use.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection className={styles.detailSection}>
              <h2><i className="fas fa-sync-alt" /> Project Status</h2>
              <p>
                FocusFlow is currently in active development. The core timer functionality is
                complete and working, while several advanced features are still being implemented
                and refined.
              </p>

              <div className={styles.roadmap}>
                <div className={`${styles.roadmapItem} ${styles.roadmapCompleted}`}>
                  <div className={styles.roadmapStatus}>
                    <i className="fas fa-check-circle" />
                    Completed
                  </div>
                  <h4>Core Timer Engine</h4>
                  <p>Work session, short break, and reset logic are already functional.</p>
                </div>

                <div className={`${styles.roadmapItem} ${styles.roadmapInProgress}`}>
                  <div className={styles.roadmapStatus}>
                    <i className="fas fa-spinner fa-spin" />
                    In Progress
                  </div>
                  <h4>Settings and Session Flow</h4>
                  <p>Custom duration controls, better session transitions, and feedback polish.</p>
                </div>

                <div className={`${styles.roadmapItem} ${styles.roadmapPlanned}`}>
                  <div className={styles.roadmapStatus}>
                    <i className="fas fa-clock" />
                    Planned
                  </div>
                  <h4>Statistics and Notifications</h4>
                  <p>Session history, usage insights, audio cues, and saved preferences.</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection className={styles.detailSection}>
              <h2><i className="fas fa-cogs" /> Tech Stack</h2>
              <p>Built with modern web technologies for optimal performance and user experience:</p>

              <div className={styles.techDetailGrid}>
                {[
                  { icon: 'fab fa-react', name: 'React', desc: 'UI Framework' },
                  { icon: 'fas fa-wind', name: 'Tailwind CSS', desc: 'Utility Styling' },
                  { icon: 'fas fa-stopwatch', name: 'Timer Logic', desc: 'Session Control' },
                  { icon: 'fas fa-mobile-alt', name: 'Responsive UI', desc: 'Cross-device Layout' },
                  { icon: 'fas fa-save', name: 'Local Storage', desc: 'Planned Persistence' },
                  { icon: 'fas fa-rocket', name: 'Vercel', desc: 'Deployment' },
                ].map((t) => (
                  <div key={t.name} className={styles.techCard}>
                    <i className={t.icon} />
                    <div className={styles.techName}>{t.name}</div>
                    <div className={styles.techDesc}>{t.desc}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection className={styles.detailSection}>
              <h2><i className="fas fa-star" /> Key Features</h2>
              <p>FocusFlow includes several productivity-enhancing features:</p>

              <div className={styles.featureGrid}>
                {[
                  { icon: 'fas fa-play-circle', title: 'Pomodoro Sessions', desc: 'Core work and break timing with intuitive controls.' },
                  { icon: 'fas fa-sliders-h', title: 'Custom Durations', desc: 'Adjust session lengths to fit different working styles.' },
                  { icon: 'fas fa-adjust', title: 'Dark/Light Mode', desc: 'Theme flexibility for different environments and preferences.' },
                  { icon: 'fas fa-chart-line', title: 'Session Tracking', desc: 'Planned statistics to help visualize consistency and output.' },
                  { icon: 'fas fa-volume-up', title: 'Audio Cues', desc: 'Planned notification feedback for smoother transitions.' },
                  { icon: 'fas fa-bell', title: 'Notifications', desc: 'Upcoming session alerts and reminders to keep momentum going.' },
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

            <AnimatedSection className={styles.detailSection}>
              <h2><i className="fas fa-images" /> Application Preview</h2>
              <p>Current interface and design of the FocusFlow timer:</p>

              <div className={styles.galleryGrid}>
                {[
                  { src: '/assets/img-focusflow/timer-interface.png', alt: 'Timer Interface', title: 'Main Timer', caption: 'Clean interface with session controls' },
                  { src: '/assets/img-focusflow/settings-panel.png', alt: 'Settings Panel', title: 'Settings', caption: 'Customizable timer durations' },
                  { src: '/assets/img-focusflow/mobile-view.png', alt: 'Mobile View', title: 'Mobile View', caption: 'Responsive design for all devices' },
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

            <AnimatedSection className={styles.detailSection}>
              <h2><i className="fas fa-code" /> Development Notes</h2>
              <p>Technical insights and current development focus:</p>

              <div className={styles.infoBox}>
                <h4>Current Development Focus:</h4>
                <ul className={styles.lessonsList}>
                  <li><strong>Session Statistics:</strong> Tracking completed pomodoros and session history.</li>
                  <li><strong>Audio Integration:</strong> Ambient sounds and notification audio with volume control.</li>
                  <li><strong>Long Break Logic:</strong> Improving the automatic long-break flow after multiple sessions.</li>
                  <li><strong>Local Storage:</strong> Saving preferences and session data on-device.</li>
                  <li><strong>UI Polish:</strong> Enhancing animation and feedback details for a smoother experience.</li>
                </ul>
              </div>

              <p style={{ marginTop: 'var(--spacing-md)' }}>
                The project follows an iterative development approach, with regular updates
                and feature additions based on user feedback and productivity research.
              </p>
            </AnimatedSection>
          </div>

          <aside className={styles.projectSidebar}>
            <div
              ref={sidebar1.ref as React.RefObject<HTMLDivElement>}
              className={`${styles.sidebarCard} ${sidebar1.animated ? styles.animated : ''}`}
            >
              <h3><i className="fas fa-external-link-alt" /> Project Links</h3>
              <div className={styles.projectLinks}>
                <a href="https://pomodoro-focusflow.vercel.app/" target="_blank" rel="noopener noreferrer" className={styles.projectLinkBtn}>
                  <span>Live Demo</span>
                  <i className="fas fa-external-link-alt" />
                </a>
                <a href="https://github.com/syfaarizal/pomodoro-focusflow" target="_blank" rel="noopener noreferrer" className={styles.projectLinkBtn}>
                  <span>Source Code</span>
                  <i className="fab fa-github" />
                </a>
                <a href="https://github.com/syfaarizal/pomodoro-focusflow" target="_blank" rel="noopener noreferrer" className={styles.projectLinkBtn}>
                  <span>Roadmap</span>
                  <i className="fas fa-map" />
                </a>
                <a href="/" className={styles.projectLinkBtn}>
                  <span>Main Portfolio</span>
                  <i className="fas fa-home" />
                </a>
              </div>
            </div>

            <div
              ref={sidebar2.ref as React.RefObject<HTMLDivElement>}
              className={`${styles.sidebarCard} ${sidebar2.animated ? styles.animated : ''}`}
            >
              <h3><i className="fas fa-chart-bar" /> Project Stats</h3>
              <div className={styles.statsGrid}>
                {[
                  { value: '5k', label: 'Lines of Code' },
                  { value: '60%', label: 'Completion' },
                  { value: '8', label: 'Features' },
                  { value: '70%', label: 'Performance' },
                  { value: '1.5s', label: 'Load Time' },
                  { value: 'B', label: 'Accessibility' },
                ].map((s) => (
                  <div key={s.label} className={styles.statItem}>
                    <div className={styles.statValue}>{s.value}</div>
                    <div className={styles.statLabel}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              ref={sidebar3.ref as React.RefObject<HTMLDivElement>}
              className={`${styles.sidebarCard} ${sidebar3.animated ? styles.animated : ''}`}
            >
              <h3><i className="fas fa-share-alt" /> Share Project</h3>
              <div className={styles.shareButtons}>
                <a
                  href="https://twitter.com/intent/tweet?text=Check%20out%20FocusFlow%20Pomodoro%20Timer%20by%20@syfaarizal%20-%20a%20modern%20productivity%20app%20for%20focused%20work%20sessions!&url=https://pomodoro-focusflow.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.shareBtn} ${styles.twitter}`}
                >
                  <i className="fab fa-twitter" /><span>Twitter</span>
                </a>
                <a
                  href="https://www.linkedin.com/sharing/share-offsite/?url=https://pomodoro-focusflow.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.shareBtn} ${styles.linkedin}`}
                >
                  <i className="fab fa-linkedin" /><span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/syfaarizal/pomodoro-focusflow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.shareBtn} ${styles.github}`}
                >
                  <i className="fab fa-github" /><span>GitHub</span>
                </a>
                <button onClick={copyProjectLink} className={`${styles.shareBtn} ${styles.copy}`}>
                  <i className="fas fa-copy" /><span>Copy Link</span>
                </button>
              </div>
            </div>

            <div
              ref={sidebar4.ref as React.RefObject<HTMLDivElement>}
              className={`${styles.sidebarCard} ${sidebar4.animated ? styles.animated : ''}`}
            >
              <h3><i className="fas fa-comment-dots" /> Feedback Welcome!</h3>
              <p className={styles.sidebarNote}>
                This project is actively developed. Feedback on features and UX is very welcome.
              </p>
              <a href="https://github.com/syfaarizal/pomodoro-focusflow/issues" target="_blank" rel="noopener noreferrer" className={styles.projectLinkBtn}>
                <span>Report Issues</span>
                <i className="fas fa-bug" />
              </a>
            </div>
          </aside>
        </div>

        <section className={`${styles.relatedProjects} section-card`}>
          <h2 className="title">Explore More <span className="highlight">Projects</span></h2>
          <p className="subtitle">Check out other projects from my portfolio</p>

          <div className={styles.relatedGrid}>
            <a
              href="/projects/detail/1"
              ref={related1.ref as React.RefObject<HTMLAnchorElement>}
              className={`${styles.relatedProject} ${related1.animated ? styles.animated : ''}`}
            >
              <img src="/assets/showcase-review.png" alt="Login Page Showcase" loading="lazy" />
              <div className={styles.relatedProjectContent}>
                <h3>Login Page Showcase</h3>
                <p>Collection of creative login interfaces</p>
              </div>
            </a>

            <a
              href="/projects/detail/2"
              ref={related2.ref as React.RefObject<HTMLAnchorElement>}
              className={`${styles.relatedProject} ${related2.animated ? styles.animated : ''}`}
            >
              <img src="/assets/CVDigital.png" alt="Digital CV" loading="lazy" />
              <div className={styles.relatedProjectContent}>
                <h3>Digital CV Portfolio</h3>
                <p>Personal branding website</p>
              </div>
            </a>

            <a
              href="/projects/detail/5"
              ref={related3.ref as React.RefObject<HTMLAnchorElement>}
              className={`${styles.relatedProject} ${related3.animated ? styles.animated : ''}`}
            >
              <img src="/assets/bisik-bisik-preview.png" alt="Bisik Bisik" loading="lazy" />
              <div className={styles.relatedProjectContent}>
                <h3>Bisik Bisik</h3>
                <p>Interactive storytelling platform</p>
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
