import { useState, useRef } from 'react';
import { projects } from '../data';
import { Project } from '../types';
import { Link } from 'react-router-dom';

type Filter = 'all' | Project['category'];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(
    new Set(projects.map(p => p.title))
  );
  const isAnimating = useRef(false);

  const applyFilter = (f: Filter) => {
    if (f === activeFilter || isAnimating.current) return;
    isAnimating.current = true;
    setActiveFilter(f);

    const nextKeys = new Set(
      projects.filter(p => f === 'all' || p.category === f).map(p => p.title)
    );

    // Fade out first, then swap to new set
    setVisibleKeys(new Set());
    setTimeout(() => {
      setVisibleKeys(nextKeys);
      setTimeout(() => { isAnimating.current = false; }, 400);
    }, 280);
  };

  // Ordered list of visible projects for stagger index
  const visibleProjects = projects.filter(p => visibleKeys.has(p.title));

  return (
    <section id="project" className="section-card section-reveal">
      <div className="section-header">
        <div className="section-title">
          <span className="title-number">04</span>
          <h2>My <span className="highlight">Projects</span></h2>
        </div>
        <p className="section-subtitle">These are the projects where I learn and grow by building</p>
      </div>

      <div className="projects-filter">
        {(['all', 'web', 'personal'] as Filter[]).map(f => (
          <button
            key={f}
            className={`filter-btn${activeFilter === f ? ' active' : ''}`}
            onClick={() => applyFilter(f)}
          >
            {f === 'all' ? 'All Projects' : f === 'web' ? 'Web Development' : 'Personal'}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {visibleProjects.map((project, i) => (
          <div
            key={project.title}
            className="project-card"
            data-category={project.category}
            style={{
              opacity: 1,
              transform: 'translateY(0) scale(1)',
              transition: 'opacity 0.35s ease, transform 0.35s ease',
              transitionDelay: `${i * 80}ms`,
              animation: `projectFadeIn 0.35s ease both`,
              animationDelay: `${i * 80}ms`,
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="project-image"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://placehold.co/600x350/1a1a2e/971313?text=' + encodeURIComponent(project.title);
              }}
            />
            <div className="project-content">
              <div className="project-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-links">
                <a href={project.demo} className="project-link project-link-primary" target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-external-link-alt"></i>
                  <span>Live Demo</span>
                </a>
                <a href={project.code} className="project-link project-link-secondary" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                  <span>Source Code</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="section-footer">
        <Link to="/projects" className="btn btn-outline">
          <span>View All Projects</span>
          <i className="fas fa-external-link-alt"></i>
        </Link>
      </div>
    </section>
  );
}