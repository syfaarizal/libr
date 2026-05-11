import { useState, useEffect, useRef } from 'react';

const skills = [
  { category: 'technical', name: 'HTML5', desc: 'Semantic & accessible structure', icon: 'fas fa-code', level: 90 },
  { category: 'technical', name: 'CSS3', desc: 'Flexbox, Grid, Animations, Styling', icon: 'fab fa-css3-alt', level: 85 },
  { category: 'technical', name: 'JavaScript', desc: 'DOM, Events, Basic Logic, Interactivity', icon: 'fab fa-js', level: 80 },
  { category: 'technical', name: 'Responsive Design', desc: 'Mobile-first, Flexible Layouts, Media Queries', icon: 'fas fa-mobile-alt', level: 88 },
  { category: 'technical', name: 'Git & GitHub', desc: 'Version Control, Commits, Repositories', icon: 'fab fa-git-alt', level: 75 },
  { category: 'technical', name: 'QA Testing', desc: 'Manual cross-device testing & issue tracking', icon: 'fas fa-bug', level: 70 },
  { category: 'technical', name: 'React Basics', desc: 'Component-based architecture, JSX, State Management', icon: 'fab fa-react', level: 50 },
  { category: 'technical', name: 'Tailwind CSS', desc: 'Utility-first CSS Framework', icon: 'fas fa-wind', level: 30 },
  { category: 'design', name: 'UI/UX Design', desc: 'Focus on clean layout & visual hierarchy', icon: 'fas fa-paint-brush', level: 82 },
  { category: 'design', name: 'Typography', desc: 'Matching brand with aesthetic', icon: 'fas fa-font', level: 78 },
  { category: 'design', name: 'CSS Animation', desc: 'Smooth interaction, hover, @keyframes', icon: 'fas fa-film', level: 85 },
  { category: 'design', name: 'Component Design', desc: 'Reusable layout design', icon: 'fas fa-th', level: 80 },
  { category: 'soft', name: 'Problem Solving', desc: 'Enjoys debugging and solving tricky errors', icon: 'fas fa-lightbulb', level: 90 },
  { category: 'soft', name: 'Consistency', desc: 'Steady learning routine, committed to progress', icon: 'fas fa-calendar-check', level: 88 },
  { category: 'soft', name: 'Collaboration', desc: 'Communicative and open-minded team player', icon: 'fas fa-users', level: 85 },
  { category: 'soft', name: 'Self-Learning', desc: 'Actively explores tech and learns independently', icon: 'fas fa-graduation-cap', level: 92 },
  { category: 'tools', name: 'VS Code', desc: 'Main code editor — clean, fast, reliable', icon: 'fas fa-code', level: 95 },
  { category: 'tools', name: 'GitHub', desc: 'For version control and project hosting', icon: 'fab fa-github', level: 80 },
  { category: 'tools', name: 'Figma', desc: 'For wireframing and UI design', icon: 'fab fa-figma', level: 65 },
  { category: 'tools', name: 'Notion', desc: 'Used for planning and documentation', icon: 'fas fa-sticky-note', level: 75 },
  { category: 'tools', name: 'ChatGPT', desc: 'Helps refine ideas and accelerate tasks', icon: 'fas fa-robot', level: 85 },
];

const TABS = [
  { filter: 'all',       icon: 'fas fa-layer-group', label: 'All Skills' },
  { filter: 'technical', icon: 'fas fa-code',         label: 'Technical' },
  { filter: 'design',    icon: 'fas fa-paint-brush',  label: 'Design' },
  { filter: 'soft',      icon: 'fas fa-users',        label: 'Soft Skills' },
  { filter: 'tools',     icon: 'fas fa-tools',        label: 'Tools' },
];

export default function SkillsSection() {
  const [activeFilter, setActiveFilter]   = useState('all');
  const [visibleSkills, setVisibleSkills] = useState<typeof skills>(skills);
  const [barsActive, setBarsActive]       = useState(false);
  const [gridKey, setGridKey]             = useState(0); // forces re-animation
  const isAnimating = useRef(false);
  const sectionRef  = useRef<HTMLElement>(null);

  // Animate progress bars when section scrolls into view (first time)
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setBarsActive(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const applyFilter = (f: string) => {
    if (f === activeFilter || isAnimating.current) return;
    isAnimating.current = true;
    setActiveFilter(f);

    // Step 1 — clear grid (triggers CSS fade-out via gridKey change)
    setVisibleSkills([]);

    // Step 2 — after fade-out, inject new skills → triggers fade-in
    setTimeout(() => {
      const next = f === 'all' ? skills : skills.filter(s => s.category === f);
      setVisibleSkills(next);
      setGridKey(k => k + 1); // new key = new animation cycle
      // Re-run progress bars after cards appear
      setBarsActive(false);
      setTimeout(() => {
        setBarsActive(true);
        isAnimating.current = false;
      }, 50);
    }, 260);
  };

  return (
    <section id="skills" className="section-card" ref={sectionRef}>
      <div className="section-header">
        <div className="section-title">
          <span className="title-number">02</span>
          <h2>My <span className="highlight">Skills</span></h2>
        </div>
        <p className="section-subtitle">Skills I've Sharpened So Far</p>
      </div>

      {/* Filter tabs */}
      <div className="skill-tabs">
        {TABS.map(tab => (
          <button
            key={tab.filter}
            className={`skill-tab${activeFilter === tab.filter ? ' active' : ''}`}
            onClick={() => applyFilter(tab.filter)}
          >
            <i className={tab.icon}></i>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Skills grid */}
      <div className="skills-grid" key={gridKey}>
        {visibleSkills.map((skill, i) => (
          <div
            key={skill.name}
            className="skill-item"
            data-category={skill.category}
            style={{
              animation: 'skillFadeIn 0.35s ease both',
              animationDelay: `${i * 60}ms`,
            }}
          >
            <div className="skill-header">
              <div className="skill-icon">
                <i className={skill.icon}></i>
              </div>
              <div className="skill-info">
                <h3 className="skill-name">{skill.name}</h3>
                <p className="skill-desc">{skill.desc}</p>
              </div>
            </div>
            <div className="skill-level">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: barsActive ? `${skill.level}%` : '0%',
                    transition: barsActive
                      ? `width 0.9s cubic-bezier(0.4,0,0.2,1) ${i * 60 + 200}ms`
                      : 'none',
                  }}
                  data-width={skill.level}
                />
              </div>
              <div className="progress-text">
                <span className="progress-value">{barsActive ? `${skill.level}%` : '0%'}</span>
                <span className="progress-label">Proficiency</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}