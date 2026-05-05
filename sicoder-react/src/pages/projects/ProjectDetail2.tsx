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
              <li><a href="/projects">Personal Projects</a></li>
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
        <p className="footer-copyright">Made with ❤ and <code>&lt;/&gt;</code> by Syifa F.A</p>
      </div>
    </footer>
  );
}

export default function ProjectDetail2() {
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
  const related1 = useAnimateOnScroll();
  const related2 = useAnimateOnScroll();
  const related3 = useAnimateOnScroll();

  const copyProjectLink = () => {
    navigator.clipboard
      .writeText('https://syfaarizal.github.io/landing-page-sicoder/')
      .then(() => setToast('Project link copied to clipboard!'))
      .catch(() => setToast('Failed to copy link.'));
  };

  return (
    <>
      {toast && <Toast message={toast} onHide={() => setToast(null)} />}

      <div className={`${styles.loadingScreen} ${!isLoading ? styles.loaded : ''}`} aria-hidden={!isLoading}>
        <div className={styles.loadingSpinner}>
          <div className={styles.spinnerCircle} />
          <div className={styles.spinnerText}>LOADING</div>
        </div>
      </div>

      <section className={`${styles.projectDetailHero} section-card`}>
        <div className={styles.achievementBadge}>
          <i className="fas fa-id-card" />
          <span>Personal Branding</span>
        </div>

        <div className={styles.heroContent}>
          <a href="/projects" className={styles.backToProjects}>
            <i className="fas fa-arrow-left" />
            <span>Back to Projects</span>
          </a>

          <div className={styles.projectHeader}>
            <div className={styles.projectCategoryBadge}>PERSONAL BRANDING</div>
            <h1 className="title reveal-text">Digital CV Portfolio</h1>
            <p className="subtitle fade-in">
              A modern, interactive digital CV that transforms a traditional resume into
              an engaging web experience. My personal brand, coded with passion.
            </p>

            <div className={styles.projectMetaDetail}>
              <div className={styles.metaItem}>
                <i className="fas fa-calendar-alt" />
                <span>Completed: Aug 2025</span>
              </div>
              <div className={styles.metaItem}>
                <i className="fas fa-clock" />
                <span>Duration: 1 month</span>
              </div>
              <div className={styles.metaItem}>
                <i className="fas fa-code" />
                <span>50k Lines of code</span>
              </div>
              <div className={styles.metaItem}>
                <i className="fas fa-layer-group" />
                <span>Portfolio, CV, Front-end</span>
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
                The Digital CV Portfolio is more than just an online resume. It is a
                complete representation of my journey as a front-end developer, built
                from scratch to showcase my skills, projects, and personality through an
                interactive web experience.
              </p>

              <div className={styles.challengeSolution}>
                <div className={styles.challenge}>
                  <h3>The Challenge</h3>
                  <p>
                    Create a digital CV that stands out from generic templates while
                    staying professional and easy to scan for recruiters and collaborators.
                  </p>
                </div>
                <div className={styles.solution}>
                  <h3>My Solution</h3>
                  <p>
                    I designed a clean, animated, and responsive portfolio that balances
                    personality with clarity, making the content memorable without
                    sacrificing readability.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection className={styles.detailSection}>
              <h2><i className="fas fa-cogs" /> Tech Stack</h2>
              <p>Built with modern web technologies for optimal performance and user experience:</p>

              <div className={styles.techDetailGrid}>
                {[
                  { icon: 'fab fa-html5', name: 'HTML5', desc: 'Semantic Structure' },
                  { icon: 'fab fa-css3-alt', name: 'CSS3', desc: 'Responsive Styling' },
                  { icon: 'fab fa-js', name: 'JavaScript', desc: 'Dynamic Interactions' },
                  { icon: 'fas fa-bolt', name: 'GSAP', desc: 'Smooth Animations' },
                  { icon: 'fab fa-git-alt', name: 'Git', desc: 'Version Control' },
                  { icon: 'fab fa-github', name: 'GitHub Pages', desc: 'Deployment' },
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
              <p>The Digital CV includes several innovative features that enhance user experience:</p>

              <div className={styles.featureGrid}>
                {[
                  { icon: 'fas fa-user', title: 'Personal Brand Identity', desc: 'A cohesive visual language that reflects my developer profile.' },
                  { icon: 'fas fa-magic', title: 'Interactive Animations', desc: 'Subtle transitions and reveals that keep the page engaging.' },
                  { icon: 'fas fa-mobile-alt', title: 'Fully Responsive', desc: 'Built to work smoothly across desktop, tablet, and mobile.' },
                  { icon: 'fas fa-folder-open', title: 'Project Showcase', desc: 'Curated portfolio section highlighting practical work and growth.' },
                  { icon: 'fas fa-universal-access', title: 'Accessible Structure', desc: 'Semantic content and keyboard-friendly navigation patterns.' },
                  { icon: 'fas fa-tachometer-alt', title: 'Optimized Performance', desc: 'Careful asset handling and lightweight interactions for fast loading.' },
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
              <h2><i className="fas fa-pencil-ruler" /> Design Process</h2>
              <p>The design followed a user-centered approach with careful attention to detail:</p>

              <div className={styles.infoBox}>
                <h4>Design Principles:</h4>
                <ul className={styles.principlesList}>
                  {[
                    'Readable Information Hierarchy',
                    'Strong Personal Branding',
                    'Smooth Motion and Micro-interactions',
                    'Mobile-First Approach',
                    'Accessibility Focus',
                    'Performance Optimization',
                  ].map((item) => (
                    <li key={item}>
                      <i className="fas fa-check-circle" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p style={{ marginTop: 'var(--spacing-md)' }}>
                The color scheme centers around <strong style={{ color: 'var(--primary-color)' }}>#971313</strong> as the
                primary color, creating a bold yet professional impression that aligns
                with my personal brand identity.
              </p>
            </AnimatedSection>

            <AnimatedSection className={styles.detailSection}>
              <h2><i className="fas fa-images" /> Project Screenshots</h2>
              <p>Visual walkthrough of the Digital CV&apos;s key sections:</p>

              <div className={styles.galleryGrid}>
                {[
                  { src: '/assets/img-cv-digital/skills.png', alt: 'Digital CV Hero Section', title: 'Hero Section', caption: 'Introduction with typing animation' },
                  { src: '/assets/img-cv-digital/hero.png', alt: 'Skills Section', title: 'Skills Showcase', caption: 'Interactive skill visualization' },
                  { src: '/assets/img-cv-digital/projects.png', alt: 'Projects Section', title: 'Projects Grid', caption: 'Filterable project portfolio' },
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
              <h2><i className="fas fa-graduation-cap" /> Lessons Learned</h2>
              <p>This project was a significant milestone in my front-end development journey:</p>

              <div className={styles.infoBoxGradient}>
                <h4>Key Takeaways:</h4>
                <ul className={styles.lessonsList}>
                  <li><strong>Personal Branding Matters:</strong> A well-designed personal website creates stronger connections with viewers and potential collaborators.</li>
                  <li><strong>Performance is Crucial:</strong> Optimizing assets and implementing lazy loading significantly improved loading times.</li>
                  <li><strong>Accessibility is Non-Negotiable:</strong> Proper labels and keyboard navigation make the site more usable for everyone.</li>
                  <li><strong>Mobile Experience is Paramount:</strong> A mobile-first approach helped keep the experience seamless across devices.</li>
                  <li><strong>Documentation Saves Time:</strong> Organized code structure makes future updates much easier.</li>
                </ul>
              </div>
            </AnimatedSection>
          </div>

          <aside className={styles.projectSidebar}>
            <div
              ref={sidebar1.ref as React.RefObject<HTMLDivElement>}
              className={`${styles.sidebarCard} ${sidebar1.animated ? styles.animated : ''}`}
            >
              <h3><i className="fas fa-external-link-alt" /> Project Links</h3>
              <div className={styles.projectLinks}>
                <a href="https://syfaarizal.github.io/landing-page-sicoder/" target="_blank" rel="noopener noreferrer" className={styles.projectLinkBtn}>
                  <span>Live Demo</span>
                  <i className="fas fa-external-link-alt" />
                </a>
                <a href="https://github.com/syfaarizal/landing-page-sicoder" target="_blank" rel="noopener noreferrer" className={styles.projectLinkBtn}>
                  <span>Source Code</span>
                  <i className="fab fa-github" />
                </a>
                <a href="/assets/CV/CV-FrontEnd-Eng.pdf" target="_blank" rel="noopener noreferrer" className={styles.projectLinkBtn}>
                  <span>PDF Version</span>
                  <i className="fas fa-file-pdf" />
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
                  { value: '50k', label: 'Lines of Code' },
                  { value: '5', label: 'Main Sections' },
                  { value: '15+', label: 'Components' },
                  { value: '98%', label: 'Performance' },
                  { value: '2.1s', label: 'Load Time' },
                  { value: 'A+', label: 'Accessibility' },
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
                  href="https://twitter.com/intent/tweet?text=Check%20out%20this%20awesome%20Digital%20CV%20by%20@syfaarizal%20-%20a%20modern%20portfolio%20built%20with%20pure%20front-end%20skills!&url=https://syfaarizal.github.io/landing-page-sicoder/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.shareBtn} ${styles.twitter}`}
                >
                  <i className="fab fa-twitter" /><span>Twitter</span>
                </a>
                <a
                  href="https://www.linkedin.com/sharing/share-offsite/?url=https://syfaarizal.github.io/landing-page-sicoder/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.shareBtn} ${styles.linkedin}`}
                >
                  <i className="fab fa-linkedin" /><span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/syfaarizal/landing-page-sicoder"
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
                <p>Collection of creative login interfaces with animations</p>
              </div>
            </a>

            <a
              href="/projects/detail/3"
              ref={related2.ref as React.RefObject<HTMLAnchorElement>}
              className={`${styles.relatedProject} ${related2.animated ? styles.animated : ''}`}
            >
              <img src="/assets/CruisePoint.png" alt="CruisePoint Indonesia" loading="lazy" />
              <div className={styles.relatedProjectContent}>
                <h3>CruisePoint Indonesia</h3>
                <p>Professional travel agency landing page</p>
              </div>
            </a>

            <a
              href="/projects/detail/4"
              ref={related3.ref as React.RefObject<HTMLAnchorElement>}
              className={`${styles.relatedProject} ${related3.animated ? styles.animated : ''}`}
            >
              <img src="/assets/review-pomodoro-focusflow.png" alt="FocusFlow" loading="lazy" />
              <div className={styles.relatedProjectContent}>
                <h3>FocusFlow Pomodoro</h3>
                <p>Productivity timer application</p>
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
