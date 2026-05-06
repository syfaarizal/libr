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
              <li><a href="/projects">Commercial Projects</a></li>
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
export default function ProjectDetail5() {
  const [isLoading, setIsLoading]             = useState(true);
  const [backToTopVisible, setBackToTopVisible] = useState(false);
  const [toast, setToast]                     = useState<string | null>(null);

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

  // Sidebar card refs
  const sidebar1 = useAnimateOnScroll();
  const sidebar2 = useAnimateOnScroll();
  const sidebar3 = useAnimateOnScroll();

  // Related project refs
  const related1 = useAnimateOnScroll();
  const related2 = useAnimateOnScroll();
  const related3 = useAnimateOnScroll();

  const copyProjectLink = () => {
    navigator.clipboard
      .writeText('https://bisik-bisik.vercel.app/')
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

      {/* Header */}
      <header className="header header-dark">
        <a href="/" className="logo">LIBR</a>
      </header>

      {/* ── Hero ── */}
      <section className={`${styles.projectDetailHero} section-card`}>
        <div className={styles.achievementBadge}>
          <i className="fas fa-comment-dots" />
          <span>Featured Project</span>
        </div>

        <div className={styles.heroContent}>
          <a href="/projects" className={styles.backToProjects}>
            <i className="fas fa-arrow-left" />
            <span>Back to Projects</span>
          </a>

          <div className={styles.projectHeader}>
            <div className={styles.projectCategoryBadge}>WEB DEVELOPMENT</div>
            <h1 className="title reveal-text">Bisik-Bisik | Anonymous Chat</h1>
            <p className="subtitle fade-in">
              An anonymous chat application with real-time messaging and privacy features —
              communicate freely without revealing your identity.
            </p>

            <div className={styles.projectMetaDetail}>
              <div className={styles.metaItem}>
                <i className="fas fa-calendar-alt" />
                <span>Completed: Jan 2026</span>
              </div>
              <div className={styles.metaItem}>
                <i className="fas fa-clock" />
                <span>Duration: ~1 month</span>
              </div>
              <div className={styles.metaItem}>
                <i className="fas fa-layer-group" />
                <span>5 Core Modules</span>
              </div>
              <div className={styles.metaItem}>
                <i className="fas fa-shield-alt" />
                <span>Privacy-First Design</span>
              </div>
              <div className={styles.metaItem}>
                <i className="fas fa-mobile-alt" />
                <span>Fully Responsive</span>
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
                Bisik-Bisik is a real-time anonymous chat application built with React and powered
                by a backend API. The platform allows users to chat with others without signing up
                or disclosing personal information — inspired by the Indonesian word{' '}
                <em>"bisik"</em> (whisper), emphasizing the discreet, private nature of communication.
              </p>
              <p style={{ marginTop: 'var(--spacing-sm)' }}>
                The app focuses on a clean, minimal UI with smooth GSAP-powered animations and a
                privacy-first architecture where no persistent user data is stored beyond the session.
              </p>

              <div className={styles.challengeSolution}>
                <div className={styles.challenge}>
                  <h3>🔒 The Challenge</h3>
                  <p>
                    Building a real-time communication platform that keeps users completely
                    anonymous while still providing a smooth, reliable messaging experience
                    with live updates and intuitive interactions.
                  </p>
                </div>
                <div className={styles.solution}>
                  <h3>💬 My Solution</h3>
                  <p>
                    Implemented a session-based anonymous identity system paired with a real-time
                    API, delivering instant message delivery and a polished UI — all without any
                    user registration or data retention.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Tech Stack */}
            <AnimatedSection className={styles.detailSection}>
              <h2><i className="fas fa-cogs" /> Tech Stack</h2>
              <p>Built with modern web technologies for optimal performance and user experience:</p>

              <div className={styles.techDetailGrid}>
                {[
                  { icon: 'fab fa-react',      name: 'React',          desc: 'UI Framework' },
                  { icon: 'fas fa-wind',        name: 'Tailwind CSS',   desc: 'Utility Styling' },
                  { icon: 'fas fa-plug',        name: 'REST API',       desc: 'Real-time Messaging' },
                  { icon: 'fas fa-magic',       name: 'GSAP',           desc: 'Smooth Animations' },
                  { icon: 'fas fa-shield-alt',  name: 'Anonymous Auth', desc: 'Session-based ID' },
                  { icon: 'fas fa-rocket',      name: 'Vercel',         desc: 'Deployment' },
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
              <p>Bisik-Bisik is packed with features designed to make anonymous chatting seamless and safe:</p>

              <div className={styles.featureGrid}>
                {[
                  { icon: 'fas fa-user-secret', title: 'Zero-Identity Chat',    desc: 'No sign-up required — users are assigned a temporary anonymous identity per session' },
                  { icon: 'fas fa-bolt',        title: 'Real-Time Messaging',   desc: 'Instant message delivery powered by a live API with no page reload needed' },
                  { icon: 'fas fa-comments',    title: 'Chat Rooms',            desc: 'Join or create topic-based chat rooms for focused anonymous conversations' },
                  { icon: 'fas fa-paint-brush', title: 'GSAP Animations',       desc: 'Fluid message transitions and UI animations for a polished experience' },
                  { icon: 'fas fa-lock',        title: 'Privacy Controls',      desc: 'Session expires automatically; no message logs stored after the session ends' },
                  { icon: 'fas fa-mobile-alt',  title: 'Responsive Design',     desc: 'Fully optimized for desktop, tablet, and mobile with a consistent UI' },
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

            {/* Design Process */}
            <AnimatedSection className={styles.detailSection}>
              <h2><i className="fas fa-pencil-ruler" /> Design Process</h2>
              <p>The design follows a minimalist, privacy-focused aesthetic with strong attention to UX:</p>

              <div className={styles.infoBox}>
                <h4>Design Principles:</h4>
                <ul className={styles.principlesList}>
                  {[
                    'Minimalist Dark Theme',
                    'Privacy-First UX',
                    'Instant Feedback',
                    'Mobile-First Approach',
                    'Accessible Typography',
                    'Smooth Micro-interactions',
                  ].map((p) => (
                    <li key={p}>
                      <i className="fas fa-check-circle" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p style={{ marginTop: 'var(--spacing-md)', fontSize: '1.4rem', color: 'var(--text-secondary)' }}>
                The interface uses a bold{' '}
                <strong style={{ color: '#e74c3c' }}>red (#e74c3c)</strong> as the primary accent
                against a <strong style={{ color: '#888' }}>dark background</strong>, creating a
                sleek, modern aesthetic that reinforces the secretive, whisper-like theme.
              </p>
            </AnimatedSection>

            {/* Screenshots */}
            <AnimatedSection className={styles.detailSection}>
              <h2><i className="fas fa-images" /> Project Screenshots</h2>
              <p>Visual walkthrough of Bisik-Bisik's key sections:</p>

              <div className={styles.galleryGrid}>
                {[
                  { src: '/assets/img-bisik/chat-room.png',    alt: 'Chat Room',   title: 'Chat Room',    caption: 'Real-time anonymous messaging interface' },
                  { src: '/assets/img-bisik/lobby-room.png',   alt: 'Lobby',       title: 'Lobby',        caption: 'Browse and join available chat rooms' },
                  { src: '/assets/img-bisik/landing-page.png', alt: 'Landing Page',title: 'Landing Page', caption: 'One-click entry — no registration needed' },
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

              <p style={{ marginTop: 'var(--spacing-sm)', fontSize: '1.3rem', color: 'var(--text-secondary)' }}>
                <i className="fas fa-info-circle" style={{ color: 'var(--primary-color)' }} />{' '}
                Visit the{' '}
                <a href="https://bisik-bisik.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)' }}>
                  Live Demo
                </a>{' '}
                to see the app in action.
              </p>
            </AnimatedSection>

            {/* Lessons Learned */}
            <AnimatedSection className={styles.detailSection}>
              <h2><i className="fas fa-graduation-cap" /> Lessons Learned</h2>
              <p>Building Bisik-Bisik deepened my understanding of real-time systems and privacy-aware design:</p>

              <div className={styles.infoBox}>
                <h4>Key Takeaways:</h4>
                <ul className={styles.lessonsList}>
                  <li><strong>Real-Time Architecture:</strong> Managing live API connections taught me how to handle connection states, reconnections, and message queuing gracefully.</li>
                  <li><strong>Anonymous Identity Design:</strong> Designing a system where anonymity is a feature — not a gap — requires careful thought about session handling and temporary data lifecycle.</li>
                  <li><strong>GSAP Integration with React:</strong> Combining GSAP's imperative animation model with React's declarative rendering required using refs and lifecycle hooks strategically.</li>
                  <li><strong>UX for Communication Apps:</strong> Small details like message timestamps, read indicators, and typing states have a massive impact on perceived app quality.</li>
                  <li><strong>Tailwind Efficiency:</strong> Utility-first CSS accelerated styling significantly, letting me focus on building features rather than writing custom CSS for every component.</li>
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
                <a href="https://bisik-bisik.vercel.app/" target="_blank" rel="noopener noreferrer" className={styles.projectLinkBtn}>
                  <span>Live Demo</span>
                  <i className="fas fa-external-link-alt" />
                </a>
                <a href="https://github.com/syfaarizal/bisik-bisik" target="_blank" rel="noopener noreferrer" className={styles.projectLinkBtn}>
                  <span>Source Code</span>
                  <i className="fab fa-github" />
                </a>
                <a href="/" className={styles.projectLinkBtn}>
                  <span>Main Portfolio</span>
                  <i className="fas fa-home" />
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
                {[
                  { value: '4',    label: 'Tech Stack'   },
                  { value: '5',    label: 'Core Modules' },
                  { value: '100%', label: 'Anonymous'    },
                  { value: 'RT',   label: 'Real-Time'    },
                  { value: '0',    label: 'Data Stored'  },
                  { value: 'A',    label: 'Accessibility' },
                ].map((s) => (
                  <div key={s.label} className={styles.statItem}>
                    <div className={styles.statValue}>{s.value}</div>
                    <div className={styles.statLabel}>{s.label}</div>
                  </div>
                ))}
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
                  href="https://twitter.com/intent/tweet?text=Check%20out%20Bisik-Bisik%20by%20%40syfaarizal%20-%20anonymous%20real-time%20chat!&url=https://bisik-bisik.vercel.app/"
                  target="_blank" rel="noopener noreferrer"
                  className={`${styles.shareBtn} ${styles.twitter}`}
                >
                  <i className="fab fa-twitter" /><span>Twitter</span>
                </a>
                <a
                  href="https://www.linkedin.com/sharing/share-offsite/?url=https://bisik-bisik.vercel.app/"
                  target="_blank" rel="noopener noreferrer"
                  className={`${styles.shareBtn} ${styles.linkedin}`}
                >
                  <i className="fab fa-linkedin" /><span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/syfaarizal/bisik-bisik"
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
              <img src="/assets/CVDigital.png" alt="Digital CV Portfolio" loading="lazy" />
              <div className={styles.relatedProjectContent}>
                <h3>Digital CV Portfolio</h3>
                <p>Personal branding website</p>
              </div>
            </a>

            <a
              href="/projects/detail/3"
              ref={related3.ref as React.RefObject<HTMLAnchorElement>}
              className={`${styles.relatedProject} ${related3.animated ? styles.animated : ''}`}
            >
              <img src="/assets/CruisePoint.png" alt="CruisePoint Indonesia" loading="lazy" />
              <div className={styles.relatedProjectContent}>
                <h3>CruisePoint Indonesia</h3>
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
