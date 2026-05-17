import { useState, useRef } from 'react';
import { projects } from '../data';
import { Project } from '../types';
import { Link } from 'react-router-dom';

type Filter = 'all' | Project['category'];

const FILTER_CONFIG: { key: Filter; label: string; icon: string }[] = [
  { key: 'all',      label: 'All Projects',     icon: 'fas fa-th-large' },
  { key: 'web',      label: 'Web Development',   icon: 'fas fa-desktop' },
  { key: 'personal', label: 'Personal',          icon: 'fas fa-user' },
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(
    new Set(projects.map(p => p.title))
  );
  const [fading, setFading] = useState(false);
  const isAnimating = useRef(false);

  const applyFilter = (f: Filter) => {
    if (f === activeFilter || isAnimating.current) return;
    isAnimating.current = true;
    setFading(true);
    setActiveFilter(f);

    const nextKeys = new Set(
      projects.filter(p => f === 'all' || p.category === f).map(p => p.title)
    );

    setVisibleKeys(new Set());
    setTimeout(() => {
      setFading(false);
      setVisibleKeys(nextKeys);
      setTimeout(() => { isAnimating.current = false; }, 450);
    }, 300);
  };

  const visibleProjects = projects.filter(p => visibleKeys.has(p.title));

  return (
    <section id="project" className="section-reveal projects-section">

      {/* ── Left decorative sidebar ── */}
      <div className="projects-sidebar">
        <div className="sidebar-dots">
          <span className="sidebar-dot" />
          <span className="sidebar-dot" />
          <span className="sidebar-dot" />
        </div>
        <div className="sidebar-line" />
        <span className="sidebar-label">PROJECTS</span>
        <div className="sidebar-line" />
      </div>

      {/* ── Section header ── */}
      <div className="section-header">
        <div className="section-title">
          <span className="title-number">04</span>
          <h2>My <span className="highlight">Projects</span></h2>
        </div>
        <p className="section-subtitle">
          These are the projects where I{' '}
          <span className="subtitle-accent">learn</span> and{' '}
          <span className="subtitle-accent">grow</span> by building
        </p>
      </div>

      {/* ── Filter buttons ── */}
      <div className="projects-filter">
        {FILTER_CONFIG.map(({ key, label, icon }) => (
          <button
            key={key}
            className={`filter-btn${activeFilter === key ? ' active' : ''}`}
            onClick={() => applyFilter(key)}
          >
            <i className={icon} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* ── Projects grid ── */}
      <div className={`projects-grid${fading ? ' grid-fading' : ''}`}>
        {visibleProjects.map((project, i) => (
          <div
            key={project.title}
            className="project-card"
            data-category={project.category}
            style={{ animationDelay: `${i * 90}ms` }}
          >
            {/* Thumbnail */}
            <div className="project-image-wrapper">
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://placehold.co/600x350/0d0d0d/971313?text=' +
                    encodeURIComponent(project.title);
                }}
              />
              <div className="project-image-overlay" />
            </div>

            {/* Content */}
            <div className="project-content">
              <div className="project-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
                {project.category === 'personal' && (
                  <span className="project-tag project-tag-accent">Personal Branding</span>
                )}
              </div>

              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-links">
                <a
                  href={project.demo}
                  className="project-link project-link-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Live Demo</span>
                  <i className="fas fa-external-link-alt" />
                </a>
                <a
                  href={project.code}
                  className="project-link project-link-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github" />
                  <span>Source Code</span>
                </a>
              </div>

              {/* Card number — bottom left inside content */}
              <span className="project-number">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Bottom glow */}
            <div className="project-glow" />
          </div>
        ))}
      </div>

      {/* ── Footer CTA ── */}
      <div className="section-footer">
        <Link to="/projects" className="btn btn-outline">
          <span>View All Projects</span>
          <i className="fas fa-external-link-alt" />
        </Link>
      </div>
    </section>
  );
}