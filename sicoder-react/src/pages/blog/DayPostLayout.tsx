import { useEffect, useRef, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism-tomorrow.css';
import '../../styles/blog/daypost.css';

/* ─── Sub-components ────────────────────────────────────── */

interface CodeBlockProps {
  lang: string;
  langIcon: string;
  children: string;
}

export function CodeBlock({ lang, langIcon, children }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [children]);

  function handleCopy(e: React.MouseEvent<HTMLButtonElement>) {
    const btn = e.currentTarget;
    navigator.clipboard.writeText(children.trim()).then(() => {
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.innerHTML = original;
        btn.classList.remove('copied');
      }, 2000);
    });
  }

  return (
    <div className="code-block">
      <div className="code-header">
        <div className="code-title">
          <i className={langIcon}></i>
          {lang}
        </div>
        <button className="copy-button" onClick={handleCopy}>
          <i className="fas fa-copy"></i> Copy
        </button>
      </div>
      <pre>
        <code ref={codeRef} className="language-js">
          {children.trim()}
        </code>
      </pre>
    </div>
  );
}

export function Output({ children }: { children: ReactNode }) {
  return <div className="output-example">{children}</div>;
}

export function HighlightBox({ children }: { children: ReactNode }) {
  return <div className="highlight-box">{children}</div>;
}

export function QuoteBox({ children }: { children: ReactNode }) {
  return <blockquote className="quote-box">{children}</blockquote>;
}

/* ─── Scroll Progress ───────────────────────────────────── */

function useScrollProgress() {
  useEffect(() => {
    const bar = document.querySelector('.scroll-progress-bar') as HTMLElement;
    if (!bar) return;
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) bar.style.width = (scrollTop / docHeight) * 100 + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
}

/* ─── Types ─────────────────────────────────────────────── */

interface NavLink {
  path: string;
  title: string;
}

interface RelatedPost {
  path: string;
  date: string;
  title: string;
  excerpt: string;
  tags: string[];
}

interface DayPostLayoutProps {
  badge: string;
  title: string;
  date: string;
  tags: string;
  readingTime: string;
  intro: string;
  githubUrl: string;
  prev: NavLink | undefined;
  next: NavLink | undefined;
  related: RelatedPost[];
  conclusion: ReactNode;
  children: ReactNode;
}

/* ─── Main Layout ────────────────────────────────────────── */

export default function DayPostLayout({
  badge, title, date, tags, readingTime,
  intro, githubUrl, prev, next, related,
  conclusion, children,
}: DayPostLayoutProps) {
  useScrollProgress();

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className="day-post-page">
      <div className="scroll-progress">
        <div className="scroll-progress-bar" />
      </div>

      <nav className="header-nav">
        <div className="nav-container">
          <Link to="/blog" className="back-to-blog">
            <i className="fas fa-arrow-left"></i>
            Back to Blog
          </Link>
          <div className="post-meta-nav">
            <div className="reading-time">
              <i className="fas fa-clock"></i>
              <span>{readingTime}</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container">
        <article className="blog-post fade-in">
          <header className="article-header">
            <div className="challenge-badge">{badge}</div>
            <h1>{title}</h1>
            <div className="article-meta">
              <div className="meta-item">
                <i className="fas fa-calendar"></i>
                <span>{date}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-tags"></i>
                <span>{tags}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-user"></i>
                <span>Syifa Fauziyah Arizal</span>
              </div>
            </div>
            <div className="article-intro">{intro}</div>
          </header>

          {children}

          <footer className="article-footer">
            <div className="conclusion">{conclusion}</div>
            <div className="article-footer-github-wrap">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="github-link">
                <i className="fab fa-github"></i> View Source Code
              </a>
            </div>
          </footer>
        </article>

        <nav className="post-navigation">
          {prev ? (
            <Link to={prev.path} className="nav-button">
              <span className="nav-label">← Previous</span>
              <span className="nav-title">{prev.title}</span>
            </Link>
          ) : (
            <span className="nav-button disabled">
              <span className="nav-label">← Previous</span>
              <span className="nav-title">No previous post</span>
            </span>
          )}

          {next ? (
            <Link to={next.path} className="nav-button next">
              <span className="nav-label">Next →</span>
              <span className="nav-title">{next.title}</span>
            </Link>
          ) : (
            <span className="nav-button next disabled">
              <span className="nav-label">Next →</span>
              <span className="nav-title">No next post</span>
            </span>
          )}
        </nav>

        {related.length > 0 && (
          <section className="related-posts">
            <h3>📚 Related Posts</h3>
            <div className="related-grid">
              {related.map((post) => (
                <Link key={post.path} to={post.path} className="related-card">
                  <div className="related-date">{post.date}</div>
                  <div className="related-title">{post.title}</div>
                  <div className="related-excerpt">{post.excerpt}</div>
                  <div className="related-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="blog-logo-sticky">
        <button
          type="button"
          className="logo-scroll-btn"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
        >
          <img src="/assets/LIBR-logo-nobg.png" alt="Logo LIBR" />
        </button>
      </div>
    </div>
  );
}
