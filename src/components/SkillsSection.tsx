import { useState, useEffect, useRef } from 'react';

const skills = [
  { category: 'technical', name: 'HTML5',            desc: 'Semantic & accessible structure',                      icon: 'fas fa-code',        level: 90 },
  { category: 'technical', name: 'CSS3',             desc: 'Flexbox, Grid, Animations, Styling',                  icon: 'fab fa-css3-alt',    level: 85 },
  { category: 'technical', name: 'JavaScript',       desc: 'DOM, Events, Basic Logic, Interactivity',             icon: 'fab fa-js',          level: 80 },
  { category: 'technical', name: 'Responsive Design',desc: 'Mobile-first, Flexible Layouts, Media Queries',       icon: 'fas fa-mobile-alt',  level: 88 },
  { category: 'technical', name: 'Git & GitHub',     desc: 'Version Control, Commits, Repositories',              icon: 'fab fa-git-alt',     level: 75 },
  { category: 'technical', name: 'QA Testing',       desc: 'Manual cross-device testing & issue tracking',        icon: 'fas fa-bug',         level: 70 },
  { category: 'technical', name: 'React Basics',     desc: 'Component-based architecture, JSX, State Management', icon: 'fab fa-react',       level: 50 },
  { category: 'technical', name: 'Tailwind CSS',     desc: 'Utility-first CSS Framework',                         icon: 'fas fa-wind',        level: 30 },
  { category: 'design',    name: 'UI/UX Design',     desc: 'Focus on clean layout & visual hierarchy',            icon: 'fas fa-paint-brush', level: 82 },
  { category: 'design',    name: 'Typography',       desc: 'Matching brand with aesthetic',                       icon: 'fas fa-font',        level: 78 },
  { category: 'design',    name: 'CSS Animation',    desc: 'Smooth interaction, hover, @keyframes',               icon: 'fas fa-film',        level: 85 },
  { category: 'design',    name: 'Component Design', desc: 'Reusable layout design',                              icon: 'fas fa-th',          level: 80 },
  { category: 'soft',      name: 'Problem Solving',  desc: 'Enjoys debugging and solving tricky errors',          icon: 'fas fa-lightbulb',   level: 90 },
  { category: 'soft',      name: 'Consistency',      desc: 'Steady learning routine, committed to progress',      icon: 'fas fa-calendar-check', level: 88 },
  { category: 'soft',      name: 'Collaboration',    desc: 'Communicative and open-minded team player',           icon: 'fas fa-users',       level: 85 },
  { category: 'soft',      name: 'Self-Learning',    desc: 'Actively explores tech and learns independently',     icon: 'fas fa-graduation-cap', level: 92 },
  { category: 'tools',     name: 'VS Code',          desc: 'Main code editor — clean, fast, reliable',            icon: 'fas fa-code',        level: 95 },
  { category: 'tools',     name: 'GitHub',           desc: 'For version control and project hosting',             icon: 'fab fa-github',      level: 80 },
  { category: 'tools',     name: 'Figma',            desc: 'For wireframing and UI design',                       icon: 'fab fa-figma',       level: 65 },
  { category: 'tools',     name: 'Notion',           desc: 'Used for planning and documentation',                 icon: 'fas fa-sticky-note', level: 75 },
  { category: 'tools',     name: 'ChatGPT',          desc: 'Helps refine ideas and accelerate tasks',             icon: 'fas fa-robot',       level: 85 },
];

const TABS = [
  { filter: 'all',       icon: 'fas fa-layer-group', label: 'All Skills' },
  { filter: 'technical', icon: 'fas fa-code',         label: 'Technical'  },
  { filter: 'design',    icon: 'fas fa-paint-brush',  label: 'Design'     },
  { filter: 'soft',      icon: 'fas fa-users',        label: 'Soft Skills'},
  { filter: 'tools',     icon: 'fas fa-tools',        label: 'Tools'      },
];

export default function SkillsSection() {
  const [activeFilter, setActiveFilter]   = useState('all');
  const [visibleSkills, setVisibleSkills] = useState<typeof skills>(skills);
  const [barsActive, setBarsActive]       = useState(false);
  const [gridKey, setGridKey]             = useState(0);
  const isAnimating = useRef(false);
  const sectionRef  = useRef<HTMLElement>(null);

  /* Trigger progress bars on scroll-into-view */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setBarsActive(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const applyFilter = (f: string) => {
    if (f === activeFilter || isAnimating.current) return;
    isAnimating.current = true;
    setActiveFilter(f);
    setVisibleSkills([]);

    setTimeout(() => {
      const next = f === 'all' ? skills : skills.filter(s => s.category === f);
      setVisibleSkills(next);
      setGridKey(k => k + 1);
      setBarsActive(false);
      setTimeout(() => { setBarsActive(true); isAnimating.current = false; }, 60);
    }, 280);
  };

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="skills-side-rail" aria-hidden="true">
        <span className="skills-side-line skills-side-line--top" />
        <div className="skills-side-label">SKILLS</div>
        <span className="skills-side-line skills-side-line--bottom" />
      </div>

      {/* ── Header ── */}
      <div className="skills-header">
        <div className="skills-badge">02</div>
        <h2 className="skills-title">My <span>Skills</span></h2>
        <p className="skills-subtitle">Skills I've Sharpened So Far</p>
        <div className="skills-divider" />
      </div>

      {/* ── Filter tabs ── */}
      <div className="skill-tabs">
        {TABS.map(tab => (
          <button
            key={tab.filter}
            className={`skill-tab${activeFilter === tab.filter ? ' active' : ''}`}
            onClick={() => applyFilter(tab.filter)}
          >
            <i className={tab.icon} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── Grid ── */}
      <div className="skills-grid" key={gridKey}>
        {visibleSkills.map((skill, i) => (
          <div
            key={skill.name}
            className="skill-card"
            style={{ animationDelay: `${i * 55}ms` }}
          >
            {/* Top row: icon + name/desc */}
            <div className="skill-card-top">
              <div className="skill-icon-box">
                <i className={skill.icon} />
              </div>
              <div className="skill-text">
                <h3 className="skill-name">{skill.name}</h3>
                <p className="skill-desc">{skill.desc}</p>
              </div>
            </div>

            {/* Progress row */}
            <div className="skill-progress-row">
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: barsActive ? `${skill.level}%` : '0%',
                    transitionDelay: barsActive ? `${i * 55 + 180}ms` : '0ms',
                  }}
                />
              </div>
              <span className="progress-pct">{barsActive ? `${skill.level}%` : '0%'}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Footer tagline ── */}
      <div className="skills-footer">
        <span className="footer-rocket">🚀</span>
        <p>
          Always <span className="accent">learning</span>. Always{' '}
          <span className="accent">improving</span>.
        </p>
      </div>

    </section>
  );
}
