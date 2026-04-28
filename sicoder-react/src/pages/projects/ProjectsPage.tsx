// src/pages/projects/ProjectsPage.tsx

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  projectsData,
  timelineData,
  CATEGORY_FILTERS,
  TECH_FILTERS,
  SORT_OPTIONS,
  type Project,
  type ProjectTech,
  type SortOption,
} from '../../data/projectsData';
import styles from '../../styles/projects/projects.module.css';
import { Link } from 'react-router-dom';

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

function sortProjects(projects: Project[], sortType: SortOption): Project[] {
  return [...projects].sort((a, b) => {
    switch (sortType) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'difficulty':
        return b.tech.length - a.tech.length;
      default:
        return 0;
    }
  });
}

// ── Sub-components ────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [visible, setVisible] = useState(false);
  const [imgError, setImgError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the animation based on card index
          setTimeout(() => setVisible(true), index * 80);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`${styles.projectCard} ${visible ? styles.visible : ''}`}
      data-category={project.category}
      data-tech={project.tech.join(' ')}
    >
      {project.featured && (
        <span className={styles.projectBadge}>Featured</span>
      )}

      {imgError ? (
        <div className={styles.projectImagePlaceholder}>
          <i className="fas fa-code" />
        </div>
      ) : (
        <img
          src={project.image}
          alt={project.title}
          className={styles.projectImage}
          loading="lazy"
          onError={() => setImgError(true)}
        />
      )}

      <div className={styles.projectContent}>
        <div className={styles.projectMeta}>
          <span className={styles.projectDate}>{formatDate(project.date)}</span>
          <span className={styles.projectCategory}>
            {project.category.toUpperCase()}
          </span>
        </div>

        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectDescription}>{project.description}</p>

        <div className={styles.projectTech}>
          {project.tech.map((t) => (
            <span key={t}>{t.toUpperCase()}</span>
          ))}
        </div>

        <div className={styles.projectActions}>
          <a href={project.detail} className="btn btn-outline">
            <span>View Details</span>
            <i className="fas fa-info-circle" />
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <span>Live Demo</span>
            <i className="fas fa-external-link-alt" />
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  // ── State
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeTechs, setActiveTechs] = useState<ProjectTech[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState<SortOption>('newest');
  const [sortLabel, setSortLabel] = useState('Newest First');
  const [showAll, setShowAll] = useState(false);
  const [backToTopVisible, setBackToTopVisible] = useState(false);

  const INITIAL_COUNT = 6;
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Loading screen
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  // ── Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setBackToTopVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Filtered + sorted projects (memoized)
  const filteredProjects = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    const filtered = projectsData.filter((p) => {
      const categoryMatch =
        activeCategory === 'all' || p.category === activeCategory;

      const techMatch =
        activeTechs.length === 0 ||
        activeTechs.some((t) => p.tech.includes(t));

      const searchMatch =
        term === '' ||
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.includes(term) ||
        p.tech.join(' ').includes(term);

      return categoryMatch && techMatch && searchMatch;
    });

    return sortProjects(filtered, sortType);
  }, [activeCategory, activeTechs, searchTerm, sortType]);

  const visibleProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_COUNT);

  const hasMore = filteredProjects.length > INITIAL_COUNT && !showAll;

  // ── Handlers
  const handleCategoryFilter = (value: string) => {
    setActiveCategory(value);
    setShowAll(false);
  };

  const handleTechToggle = (tech: ProjectTech) => {
    setActiveTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
    setShowAll(false);
  };

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = setTimeout(() => {
        setSearchTerm(value);
        setShowAll(false);
      }, 300);
    },
    []
  );

  const handleSort = (value: SortOption, label: string) => {
    setSortType(value);
    setSortLabel(label);
  };

  const handleScrollDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('projects-grid');
    if (target) {
      const offset = target.offsetTop - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Featured project (always the one marked featured)
  const featuredProject = projectsData.find((p) => p.featured);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Loading Screen */}
      <div
        className={`${styles.loadingScreen} ${!isLoading ? styles.loaded : ''}`}
        aria-hidden={!isLoading ? 'true' : 'false'}
      >
        <div className={styles.loadingSpinner}>
          <div className={styles.spinnerCircle} />
          <div className={styles.spinnerText}>PROJECTS</div>
        </div>
      </div>

      {/* Header */}
      <header className={`header ${styles.headerDark}`}>
        <Link to="/" className="logo">
          SICO<span>DER</span> .
        </Link>
      </header>

      {/* ── Hero Section ── */}
      <section className={`${styles.projectsHero} ${styles.sectionCardProjects}`}>
        <div className={styles.heroContent}>
          <Link to="/#project" className={styles.backToPortfolio}>
            <i className="fas fa-arrow-left" />
            <span>Back to Portfolio</span>
          </Link>

          <div className={styles.heroText}>
            <h1 className="title reveal-text">
              My <span className="gradient-text">Projects</span>
            </h1>
            <p className={`${styles.subtitle} fade-in`}>
              Where ideas meet code. Each project tells a story of learning,
              problem-solving, and pushing boundaries.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>
                  {projectsData.length}
                </span>
                <span className={styles.statLabel}>Projects</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>5</span>
                <span className={styles.statLabel}>Categories</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>Passion</span>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.codeIllustration}>
              <div className={styles.codeLine} />
              <div className={styles.codeLine} />
              <div className={styles.codeLine} />
              <div className={styles.codeLine} />
              <div className={styles.floatingElement}>
                <i className="fas fa-code" />
              </div>
            </div>
          </div>
        </div>

        <a href="#projects-grid" className="scroll-down" onClick={handleScrollDown}>
          <div className="scroll-animation">
            <span />
            <span />
            <span />
          </div>
          <span className="scroll-text">Explore Projects</span>
        </a>
      </section>

      {/* ── Main Content ── */}
      <main className="projects-main">

        {/* ── Filter Section ── */}
        <section className={`${styles.projectsFilterSection} ${styles.sectionCardProjects}`}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className="title">
                Filter <span className="highlight">Projects</span>
              </h2>
              <p className={styles.subtitle}>
                Browse projects by category or tech stack
              </p>
            </div>
          </div>

          <div className={styles.filterContainer}>
            {/* Category */}
            <div className={styles.filterGroup}>
              <h3>By Category</h3>
              <div className={styles.filterTags}>
                {CATEGORY_FILTERS.map((f) => (
                  <button
                    key={f.value}
                    className={`${styles.filterTag} ${
                      activeCategory === f.value ? styles.active : ''
                    }`}
                    onClick={() => handleCategoryFilter(f.value)}
                    data-filter={f.value}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className={styles.filterGroup}>
              <h3>By Tech Stack</h3>
              <div className={styles.techTags}>
                {TECH_FILTERS.map((t) => (
                  <button
                    key={t.value}
                    className={`${styles.techTag} ${
                      activeTechs.includes(t.value) ? styles.active : ''
                    }`}
                    onClick={() => handleTechToggle(t.value)}
                    data-tech={t.value}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className={styles.searchBox}>
              <i className="fas fa-search" />
              <input
                type="text"
                id="project-search"
                placeholder="Search projects..."
                onChange={handleSearch}
                aria-label="Search projects"
              />
            </div>
          </div>
        </section>

        {/* ── Projects Grid ── */}
        <section id="projects-grid" className={styles.sectionCardProjects}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerLeft}>
              <h2 className="title">
                Project <span className="highlight">Showcase</span>
              </h2>
              <p className={styles.subtitle}>
                Showing{' '}
                <strong>{filteredProjects.length}</strong>{' '}
                project{filteredProjects.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className={styles.sortDropdown}>
              <button className={styles.sortBtn}>
                <span>Sort by: {sortLabel}</span>
                <i className="fas fa-chevron-down" />
              </button>
              <div className={styles.sortDropdownContent}>
                {SORT_OPTIONS.map((opt) => (
                  <a
                    key={opt.value}
                    href="#"
                    data-sort={opt.value}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSort(opt.value, opt.label);
                    }}
                  >
                    {opt.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.projectsGridContainer}>
            {visibleProjects.length > 0 ? (
              visibleProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))
            ) : (
              <div className={styles.noResults}>
                <i className="fas fa-search" />
                <p>No projects match your search. Try different filters!</p>
              </div>
            )}
          </div>

          {hasMore && (
            <div className={styles.loadMoreContainer}>
              <button
                className={`btn btn-outline ${styles.loadMoreBtn}`}
                onClick={() => setShowAll(true)}
              >
                <span>Load More Projects</span>
                <i className="fas fa-sync-alt" />
              </button>
            </div>
          )}
        </section>

        {/* ── Featured Project ── */}
        {featuredProject && (
          <section className={`${styles.featuredProject} ${styles.sectionCardProjects}`}>
            <div className={styles.featuredBadge}>
              <i className="fas fa-star" />
              <span>Featured Project</span>
            </div>

            <div className={styles.featuredContent}>
              <div className={styles.featuredInfo}>
                <h2 className="title">{featuredProject.title}</h2>
                <p className={styles.subtitle}>
                  A collection of creative login page templates with modern
                  animations
                </p>

                <div className={styles.techStack}>
                  {featuredProject.tech.map((t) => (
                    <span key={t} className={styles.tech}>
                      {t.toUpperCase()}
                    </span>
                  ))}
                </div>

                <p className="description">
                  This project showcases a journey in mastering front-end
                  animations and interactive components. Each login page features
                  unique micro-interactions, smooth transitions, and responsive
                  design patterns.
                </p>

                <div className="action-buttons">
                  <a href={featuredProject.detail} className="btn btn-primary">
                    <span>View Case Study</span>
                    <i className="fas fa-arrow-right" />
                  </a>
                  <a
                    href={featuredProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    <span>Live Demo</span>
                    <i className="fas fa-external-link-alt" />
                  </a>
                </div>
              </div>

              <div className={styles.featuredPreview}>
                <div className={styles.previewContainer}>
                  <img
                    src={featuredProject.image}
                    alt={featuredProject.title}
                    className={styles.previewImage}
                  />
                  <div className={styles.previewOverlay}>
                    <a
                      href={featuredProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.previewBtn}
                    >
                      <i className="fas fa-play" />
                      <span>View Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Timeline Section ── */}
        <section className={`${styles.timelineSection} ${styles.sectionCardProjects}`}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className="title">
                Project <span className="highlight">Timeline</span>
              </h2>
              <p className={styles.subtitle}>
                My journey through projects over time
              </p>
            </div>
          </div>

          <div className={styles.timeline}>
            <div className={styles.timelineLine} />

            {timelineData.map((entry, i) => (
              <div key={i} className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <span className={styles.timelineDate}>{entry.date}</span>
                  <h3>{entry.title}</h3>
                  <p>{entry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/assets/sicoder-logo.png" alt="SICODER Logo" />
              <div className="logo-glow" />
            </div>
            <p className="footer-tagline">
              Building the web, one project at a time
            </p>
            <p className="footer-credit">
              © 2026 SICODER. All projects open-source.
            </p>
          </div>

          <div className="footer-links">
            <div className="links-column">
              <h4>Projects</h4>
              <ul>
                <li>
                  <a href="#projects-grid">Web Development</a>
                </li>
                <li>
                  <a href="#projects-grid">UI/UX Design</a>
                </li>
                <li>
                  <a href="#projects-grid">Mobile Apps</a>
                </li>
                <li>
                  <a href="#projects-grid">Experiments</a>
                </li>
              </ul>
            </div>

            <div className="links-column">
              <h4>Connect</h4>
              <ul>
                <li>
                  <Link to="/#contact">Collaborate</Link>
                </li>
                <li>
                  <a href="mailto:syifairgi@gmail.com">Contact</a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/syifaarizal/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/syfaarizal/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-newsletter">
            <h4>Stay Updated</h4>
            <p>Get notified about new projects</p>
            <form
              className="newsletter-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input type="email" placeholder="your@email.com" required />
              <button type="submit" title="Subscribe" aria-label="Subscribe to newsletter">
         
                <i className="fas fa-paper-plane" />
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-socials">
            <a
              href="https://github.com/syfaarizal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github" />
            </a>
            <a
              href="https://www.linkedin.com/in/syifaarizal/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin" />
            </a>
            <a
              href="https://www.instagram.com/syfaarizal/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram" />
            </a>
          </div>
          <p className="footer-copyright">
            Made with ❤️ and <code>&lt;/&gt;</code> by Syifa F.A
          </p>
        </div>
      </footer>

      {/* Back to Top */}
      <button
        className={`${styles.backToTop} ${backToTopVisible ? styles.visible : ''}`}
        onClick={handleBackToTop}
        aria-label="Back to top"
      >
        <i className="fas fa-arrow-up" />
      </button>
    </>
  );
}
