import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [loaded, setLoaded] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lettersVisible, setLettersVisible] = useState([false, false, false, false]);
  const [lineExpanded, setLineExpanded] = useState(false);

  useEffect(() => {
    ['L', 'I', 'B', 'R'].forEach((_, i) => {
      setTimeout(() => {
        setLettersVisible(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 300 + i * 130);
    });

    setTimeout(() => setLineExpanded(true), 900);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const increment = prev < 70 ? Math.random() * 8 + 4 : Math.random() * 3 + 1;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    const finishLoading = () => {
      setProgress(100);
      setTimeout(() => {
        setLoaded(true);
        document.body.classList.add('loaded');
        setTimeout(() => setRemoved(true), 800);
      }, 300);
    };

    const timer = setTimeout(finishLoading, 1800);
    if (document.readyState === 'complete') {
      clearTimeout(timer);
      setTimeout(finishLoading, 600);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  if (removed) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400&display=swap');

        .ls-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #0a0a0a;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: clip-path 0.8s cubic-bezier(0.76, 0, 0.24, 1);
          clip-path: inset(0 0 0 0);
        }

        .ls-root.loaded {
          clip-path: inset(0 0 100% 0);
        }

        /* Grain texture */
        .ls-grain {
          position: absolute;
          inset: -50%;
          width: 200%;
          height: 200%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
          animation: grain-shift 0.8s steps(2) infinite;
        }

        @keyframes grain-shift {
          0%   { transform: translate(0, 0); }
          25%  { transform: translate(-2%, -3%); }
          50%  { transform: translate(3%, 1%); }
          75%  { transform: translate(-1%, 3%); }
          100% { transform: translate(2%, -1%); }
        }

        /* Red accent blob */
        .ls-blob {
          position: absolute;
          width: 520px;
          height: 520px;
          border-radius: 50%;
          background: radial-gradient(circle at 40% 40%, rgba(220, 30, 30, 0.18) 0%, rgba(180, 0, 0, 0.06) 50%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          animation: blob-breathe 4s ease-in-out infinite;
        }

        @keyframes blob-breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          50%       { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
        }

        /* Vertical side lines */
        .ls-vline {
          position: absolute;
          top: 0;
          width: 1px;
          height: 0;
          background: linear-gradient(to bottom, transparent, rgba(220,30,30,0.5) 40%, rgba(220,30,30,0.5) 60%, transparent);
          animation: vline-grow 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards;
        }
        .ls-vline--left  { left: 60px; }
        .ls-vline--right { right: 60px; }

        @keyframes vline-grow {
          from { height: 0; opacity: 0; }
          to   { height: 100%; opacity: 1; }
        }

        /* Main content */
        .ls-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
        }

        /* Wordmark */
        .ls-wordmark {
          display: flex;
          align-items: flex-end;
          gap: 0;
          line-height: 1;
        }

        .ls-letter {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(80px, 14vw, 130px);
          color: #ffffff;
          letter-spacing: 0.08em;
          opacity: 0;
          transform: translateY(30px) skewX(-4deg);
          transition: opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .ls-letter.visible {
          opacity: 1;
          transform: translateY(0) skewX(0deg);
        }

        /* Accent dot */
        .ls-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #dc1e1e;
          margin-bottom: 18px;
          margin-left: 4px;
          flex-shrink: 0;
          opacity: 0;
          transform: scale(0);
          transition: opacity 0.3s ease 0.85s, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.85s;
        }

        .ls-dot.visible {
          opacity: 1;
          transform: scale(1);
        }

        /* Divider line */
        .ls-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 340px;
        }

        .ls-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.12);
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .ls-divider-line.expanded {
          transform: scaleX(1);
        }

        .ls-divider-line:last-child {
          transform-origin: right;
        }

        .ls-divider-diamond {
          width: 6px;
          height: 6px;
          background: #dc1e1e;
          transform: rotate(45deg) scale(0);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s;
          flex-shrink: 0;
        }

        .ls-divider-diamond.expanded {
          transform: rotate(45deg) scale(1);
        }

        /* Tagline */
        .ls-tagline {
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          font-size: 10px;
          letter-spacing: 0.5em;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
          opacity: 0;
          animation: fade-up 0.6s ease 1s forwards;
        }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Progress */
        .ls-progress-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          width: 260px;
        }

        .ls-progress-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ls-progress-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 0.4em;
          color: rgba(255,255,255,0.2);
          text-transform: uppercase;
          opacity: 0;
          animation: fade-up 0.5s ease 0.7s forwards;
        }

        .ls-progress-pct {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px;
          letter-spacing: 0.1em;
          color: #dc1e1e;
          opacity: 0;
          animation: fade-up 0.5s ease 0.7s forwards;
        }

        .ls-progress-track {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.08);
          position: relative;
          overflow: visible;
        }

        .ls-progress-fill {
          position: absolute;
          left: 0; top: 0;
          height: 100%;
          background: linear-gradient(90deg, #8b0000, #dc1e1e, #ff4444);
          transition: width 0.15s ease-out;
        }

        .ls-progress-fill::after {
          content: '';
          position: absolute;
          right: -1px;
          top: -3px;
          width: 2px;
          height: 7px;
          background: #ff6666;
          box-shadow: 0 0 8px 2px rgba(220, 30, 30, 0.8);
        }

        /* Scanning line */
        .ls-scan {
          position: absolute;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(220,30,30,0.15), rgba(220,30,30,0.4), rgba(220,30,30,0.15), transparent);
          animation: scan 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          pointer-events: none;
        }

        @keyframes scan {
          0%   { top: -2px; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 0.6; }
          100% { top: 100%; opacity: 0; }
        }

        /* Corner brackets */
        .ls-bracket {
          position: absolute;
          width: 28px;
          height: 28px;
          border-color: rgba(220, 30, 30, 0.4);
          border-style: solid;
          opacity: 0;
          animation: bracket-in 0.5s ease forwards;
        }

        .ls-bracket--tl { top: 24px; left: 24px; border-width: 1px 0 0 1px; animation-delay: 0.1s; }
        .ls-bracket--tr { top: 24px; right: 24px; border-width: 1px 1px 0 0; animation-delay: 0.2s; }
        .ls-bracket--bl { bottom: 24px; left: 24px; border-width: 0 0 1px 1px; animation-delay: 0.3s; }
        .ls-bracket--br { bottom: 24px; right: 24px; border-width: 0 1px 1px 0; animation-delay: 0.4s; }

        @keyframes bracket-in {
          from { opacity: 0; transform: scale(0.7); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div className={`ls-root${loaded ? ' loaded' : ''}`}>
        <div className="ls-grain" />
        <div className="ls-blob" />
        <div className="ls-scan" />
        <div className="ls-vline ls-vline--left" />
        <div className="ls-vline ls-vline--right" />

        <div className="ls-bracket ls-bracket--tl" />
        <div className="ls-bracket ls-bracket--tr" />
        <div className="ls-bracket ls-bracket--bl" />
        <div className="ls-bracket ls-bracket--br" />

        <div className="ls-content">
          <div>
            <div className="ls-wordmark">
              {['L', 'I', 'B', 'R'].map((letter, i) => (
                <span
                  key={i}
                  className={`ls-letter${lettersVisible[i] ? ' visible' : ''}`}
                >
                  {letter}
                </span>
              ))}
              <div className={`ls-dot${lettersVisible[3] ? ' visible' : ''}`} />
            </div>
          </div>

          <div className="ls-divider">
            <div className={`ls-divider-line${lineExpanded ? ' expanded' : ''}`} />
            <div className={`ls-divider-diamond${lineExpanded ? ' expanded' : ''}`} />
            <div className={`ls-divider-line${lineExpanded ? ' expanded' : ''}`} />
          </div>

          <div className="ls-progress-wrap">
            <div className="ls-progress-header">
              <span className="ls-progress-label">Loading</span>
              <span className="ls-progress-pct">{Math.round(progress)}</span>
            </div>
            <div className="ls-progress-track">
              <div className="ls-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}