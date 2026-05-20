import { useState, useEffect, useRef } from 'react';

const skills = [
  { category: 'technical', name: 'HTML5',             desc: 'Semantic & accessible structure',                      icon: 'fas fa-code',           level: 90 },
  { category: 'technical', name: 'CSS3',              desc: 'Flexbox, Grid, Animations, Styling',                  icon: 'fab fa-css3-alt',       level: 85 },
  { category: 'technical', name: 'JavaScript',        desc: 'DOM, Events, Basic Logic, Interactivity',             icon: 'fab fa-js',             level: 80 },
  { category: 'technical', name: 'Responsive Design', desc: 'Mobile-first, Flexible Layouts, Media Queries',       icon: 'fas fa-mobile-alt',     level: 88 },
  { category: 'technical', name: 'Git & GitHub',      desc: 'Version Control, Commits, Repositories',              icon: 'fab fa-git-alt',        level: 75 },
  { category: 'technical', name: 'QA Testing',        desc: 'Manual cross-device testing & issue tracking',        icon: 'fas fa-bug',            level: 70 },
  { category: 'technical', name: 'React Basics',      desc: 'Component-based architecture, JSX, State Management', icon: 'fab fa-react',          level: 50 },
  { category: 'technical', name: 'Tailwind CSS',      desc: 'Utility-first CSS Framework',                         icon: 'fas fa-wind',           level: 30 },
  { category: 'design',    name: 'UI/UX Design',      desc: 'Focus on clean layout & visual hierarchy',            icon: 'fas fa-paint-brush',    level: 82 },
  { category: 'design',    name: 'Typography',        desc: 'Matching brand with aesthetic',                       icon: 'fas fa-font',           level: 78 },
  { category: 'design',    name: 'CSS Animation',     desc: 'Smooth interaction, hover, @keyframes',               icon: 'fas fa-film',           level: 85 },
  { category: 'design',    name: 'Component Design',  desc: 'Reusable layout design',                              icon: 'fas fa-th',             level: 80 },
  { category: 'soft',      name: 'Problem Solving',   desc: 'Enjoys debugging and solving tricky errors',          icon: 'fas fa-lightbulb',      level: 90 },
  { category: 'soft',      name: 'Consistency',       desc: 'Steady learning routine, committed to progress',      icon: 'fas fa-calendar-check', level: 88 },
  { category: 'soft',      name: 'Collaboration',     desc: 'Communicative and open-minded team player',           icon: 'fas fa-users',          level: 85 },
  { category: 'soft',      name: 'Self-Learning',     desc: 'Actively explores tech and learns independently',     icon: 'fas fa-graduation-cap', level: 92 },
  { category: 'tools',     name: 'VS Code',           desc: 'Main code editor — clean, fast, reliable',            icon: 'fas fa-code',           level: 95 },
  { category: 'tools',     name: 'GitHub',            desc: 'For version control and project hosting',             icon: 'fab fa-github',         level: 80 },
  { category: 'tools',     name: 'Figma',             desc: 'For wireframing and UI design',                       icon: 'fab fa-figma',          level: 65 },
  { category: 'tools',     name: 'Notion',            desc: 'Used for planning and documentation',                 icon: 'fas fa-sticky-note',    level: 75 },
  { category: 'tools',     name: 'ChatGPT',           desc: 'Helps refine ideas and accelerate tasks',             icon: 'fas fa-robot',          level: 85 },
];

type SkillCategory = 'technical' | 'design' | 'soft' | 'tools';

const TABS: Array<{ filter: SkillCategory; icon: string; label: string }> = [
  { filter: 'technical', icon: 'fas fa-code',        label: 'Technical'   },
  { filter: 'design',    icon: 'fas fa-paint-brush', label: 'Design'      },
  { filter: 'soft',      icon: 'fas fa-users',       label: 'Soft Skills' },
  { filter: 'tools',     icon: 'fas fa-tools',       label: 'Tools'       },
];

export default function SkillsSection() {
  const defaultCategory: SkillCategory = 'technical';
  const [activeFilter, setActiveFilter]   = useState<SkillCategory>(defaultCategory);
  const [visibleSkills, setVisibleSkills] = useState<typeof skills>(
    skills.filter(skill => skill.category === defaultCategory)
  );
  const [barsActive, setBarsActive]       = useState(false);
  const [gridKey, setGridKey]             = useState(0);
  const isAnimating = useRef(false);
  const sectionRef  = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setBarsActive(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const applyFilter = (f: SkillCategory) => {
    if (f === activeFilter || isAnimating.current) return;
    isAnimating.current = true;
    setActiveFilter(f);
    setVisibleSkills([]);
    setTimeout(() => {
      const next = skills.filter(s => s.category === f);
      setVisibleSkills(next);
      setGridKey(k => k + 1);
      setBarsActive(false);
      setTimeout(() => { setBarsActive(true); isAnimating.current = false; }, 60);
    }, 280);
  };

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="skills-layout">

        <aside className="skills-sidebar" aria-hidden="true">
          <div className="sidebar-line" />
          <span className="sidebar-label">SKILLS</span>
          <div className="sidebar-line" />
        </aside>

        <div className="skills-main">
          <div className="skills-header">
            <div className="skills-badge"><span>02</span></div>
            <h2 className="skills-title">My <span>Skills</span></h2>
            <p className="skills-subtitle">Skills I've Sharpened So Far</p>
            <div className="skills-divider" />
          </div>
          <div className="skill-tabs">
            {TABS.map(tab => (
              <button
                key={tab.filter}
                type="button"
                className={`skill-tab${activeFilter === tab.filter ? ' active' : ''}`}
                onClick={() => applyFilter(tab.filter)}
              >
                <i className={tab.icon} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="skills-grid" key={gridKey}>
            {visibleSkills.map((skill, i) => (
              <div
                key={skill.name}
                className="skill-card"
                style={{ animationDelay: `${i * 55}ms` }}
              >
                <span className="card-corner tl" aria-hidden="true" />
                <span className="card-corner tr" aria-hidden="true" />
                <span className="card-corner bl" aria-hidden="true" />
                <span className="card-corner br" aria-hidden="true" />

                <div className="skill-card-top">
                  <div className="skill-icon-box">
                    <i className={skill.icon} />
                  </div>
                  <div className="skill-text">
                    <h3 className="skill-name">{skill.name}</h3>
                    <p className="skill-desc">{skill.desc}</p>
                  </div>
                </div>

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
                  <span className="progress-pct">
                    {barsActive ? `${skill.level}%` : '0%'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="skills-footer">
            <span className="footer-rocket">🚀</span>
            <p>
              Always <span className="accent">learning</span>. Always{' '}
              <span className="accent">improving</span>.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
