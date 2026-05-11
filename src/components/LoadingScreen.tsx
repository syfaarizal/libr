import { useEffect, useState } from 'react';

const BRAND_LETTERS = ['L', 'I', 'B', 'R'];
const MIN_LOADING_TIME = 2400;
const EXIT_DURATION = 1100;

export default function LoadingScreen() {
  const [loaded, setLoaded] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lettersVisible, setLettersVisible] = useState([false, false, false, false]);
  const [lineExpanded, setLineExpanded] = useState(false);

  useEffect(() => {
    const timers: number[] = [];
    const startedAt = performance.now();
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.classList.remove('loaded');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    BRAND_LETTERS.forEach((_, index) => {
      const timer = window.setTimeout(() => {
        setLettersVisible((prev) => {
          const next = [...prev];
          next[index] = true;
          return next;
        });
      }, 240 + index * 150);

      timers.push(timer);
    });

    timers.push(window.setTimeout(() => setLineExpanded(true), 920));

    const progressInterval = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      const normalized = Math.min(elapsed / MIN_LOADING_TIME, 1);
      const eased = 1 - Math.pow(1 - normalized, 2.4);
      const target = Math.min(96, eased * 96);

      setProgress((prev) => {
        if (prev >= target) return prev;
        return Math.min(target, prev + (prev < 65 ? 4.2 : 2.1));
      });
    }, 90);

    const finishLoading = () => {
      setProgress(100);

      timers.push(
        window.setTimeout(() => {
          setLoaded(true);
          document.body.classList.add('loaded');

          timers.push(
            window.setTimeout(() => {
              setRemoved(true);
              document.body.style.overflow = previousBodyOverflow;
              document.documentElement.style.overflow = previousHtmlOverflow;
            }, EXIT_DURATION)
          );
        }, 260)
      );
    };

    const completeWhenReady = () => {
      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(MIN_LOADING_TIME - elapsed, 0);
      timers.push(window.setTimeout(finishLoading, remaining));
    };

    if (document.readyState === 'complete') {
      completeWhenReady();
    } else {
      window.addEventListener('load', completeWhenReady, { once: true });
    }

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.clearInterval(progressInterval);
      window.removeEventListener('load', completeWhenReady);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);

  if (removed) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

        .ls-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background:
            radial-gradient(circle at 50% 38%, rgba(220, 30, 30, 0.18) 0%, rgba(220, 30, 30, 0.06) 28%, transparent 56%),
            linear-gradient(180deg, #090909 0%, #111111 55%, #050505 100%);
          opacity: 1;
          visibility: visible;
          transform: scale(1);
          filter: blur(0);
          transition:
            opacity 0.95s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.95s cubic-bezier(0.22, 1, 0.36, 1),
            filter 0.95s cubic-bezier(0.22, 1, 0.36, 1),
            visibility 0s linear 0.95s;
        }

        .ls-root.loaded {
          opacity: 0;
          visibility: hidden;
          transform: scale(1.03);
          filter: blur(12px);
          pointer-events: none;
        }

        .ls-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(circle at center, rgba(0, 0, 0, 0.95), transparent 82%);
          opacity: 0.3;
          pointer-events: none;
        }

        .ls-orb {
          position: absolute;
          width: min(52vw, 540px);
          aspect-ratio: 1;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(255, 84, 84, 0.22) 0%, rgba(180, 0, 0, 0.1) 42%, transparent 72%);
          filter: blur(10px);
          animation: ls-orbFloat 7s ease-in-out infinite;
          pointer-events: none;
        }

        .ls-orb--left {
          top: 14%;
          left: -8%;
        }

        .ls-orb--right {
          right: -10%;
          bottom: 10%;
          animation-delay: -3s;
        }

        @keyframes ls-orbFloat {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.72; }
          50% { transform: translate3d(0, 18px, 0) scale(1.04); opacity: 1; }
        }

        .ls-frame {
          position: absolute;
          inset: 26px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 22px;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.015);
          pointer-events: none;
        }

        .ls-vline {
          position: absolute;
          top: 14%;
          bottom: 14%;
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(220, 30, 30, 0.34) 20%, rgba(255, 255, 255, 0.12) 50%, rgba(220, 30, 30, 0.34) 80%, transparent);
          opacity: 0;
          transform: scaleY(0.65);
          animation: ls-vlineIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
        }

        .ls-vline--left { left: 64px; }
        .ls-vline--right { right: 64px; }

        @keyframes ls-vlineIn {
          to {
            opacity: 1;
            transform: scaleY(1);
          }
        }

        .ls-content {
          position: relative;
          z-index: 1;
          width: min(92vw, 540px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          text-align: center;
        }

        .ls-wordmark {
          display: flex;
          align-items: flex-end;
          line-height: 1;
        }

        .ls-letter {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(84px, 14vw, 132px);
          letter-spacing: 0.09em;
          color: #ffffff;
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity 0.48s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.48s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .ls-letter.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .ls-dot {
          width: 10px;
          height: 10px;
          margin-left: 6px;
          margin-bottom: 18px;
          border-radius: 999px;
          background: linear-gradient(180deg, #ff6d6d 0%, #d91c1c 100%);
          box-shadow: 0 0 18px rgba(220, 30, 30, 0.45);
          opacity: 0;
          transform: scale(0.4);
          transition:
            opacity 0.38s ease 0.1s,
            transform 0.48s cubic-bezier(0.22, 1.2, 0.36, 1) 0.1s;
        }

        .ls-dot.visible {
          opacity: 1;
          transform: scale(1);
        }

        .ls-divider {
          width: min(72vw, 340px);
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .ls-divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.28), transparent);
          opacity: 0.8;
          transform: scaleX(0);
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .ls-divider-line:first-child { transform-origin: right; }
        .ls-divider-line:last-child { transform-origin: left; }

        .ls-divider-line.expanded {
          transform: scaleX(1);
        }

        .ls-divider-diamond {
          width: 7px;
          height: 7px;
          flex-shrink: 0;
          background: #dc1e1e;
          transform: rotate(45deg) scale(0.45);
          opacity: 0;
          transition:
            transform 0.5s cubic-bezier(0.22, 1.2, 0.36, 1) 0.18s,
            opacity 0.3s ease 0.18s;
        }

        .ls-divider-diamond.expanded {
          opacity: 1;
          transform: rotate(45deg) scale(1);
        }

        .ls-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.42);
          opacity: 0;
          transform: translateY(10px);
          animation: ls-fadeUp 0.7s ease 0.95s forwards;
        }

        .ls-progressWrap {
          width: min(72vw, 280px);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .ls-progressHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          opacity: 0;
          transform: translateY(8px);
          animation: ls-fadeUp 0.65s ease 0.75s forwards;
        }

        .ls-progressLabel,
        .ls-progressHint {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.3);
        }

        .ls-progressValue {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 0.12em;
          color: #f24b4b;
        }

        .ls-progressTrack {
          position: relative;
          width: 100%;
          height: 4px;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02);
        }

        .ls-progressFill {
          position: absolute;
          inset: 0 auto 0 0;
          border-radius: inherit;
          background: linear-gradient(90deg, #7a1010 0%, #dc1e1e 55%, #ff6f6f 100%);
          transition: width 0.22s ease-out;
        }

        .ls-progressGlow {
          position: absolute;
          top: 0;
          bottom: 0;
          right: -24px;
          width: 42px;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0));
          filter: blur(8px);
          opacity: 0.8;
        }

        .ls-footnote {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.48);
          opacity: 0;
          transform: translateY(10px);
          animation: ls-fadeUp 0.7s ease 1.05s forwards;
        }

        @keyframes ls-fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 640px) {
          .ls-frame {
            inset: 14px;
            border-radius: 18px;
          }

          .ls-vline--left { left: 24px; }
          .ls-vline--right { right: 24px; }

          .ls-content {
            gap: 24px;
          }

          .ls-subtitle {
            font-size: 10px;
            letter-spacing: 0.34em;
          }

          .ls-progressLabel,
          .ls-progressHint,
          .ls-footnote {
            letter-spacing: 0.14em;
          }
        }
      `}</style>

      <div className={`ls-root${loaded ? ' loaded' : ''}`} aria-hidden={loaded}>
        <div className="ls-orb ls-orb--left" />
        <div className="ls-orb ls-orb--right" />
        <div className="ls-frame" />
        <div className="ls-vline ls-vline--left" />
        <div className="ls-vline ls-vline--right" />

        <div className="ls-content">
          <div className="ls-wordmark">
            {BRAND_LETTERS.map((letter, index) => (
              <span
                key={letter}
                className={`ls-letter${lettersVisible[index] ? ' visible' : ''}`}
              >
                {letter}
              </span>
            ))}
            <div className={`ls-dot${lettersVisible[3] ? ' visible' : ''}`} />
          </div>

          <div className="ls-divider">
            <div className={`ls-divider-line${lineExpanded ? ' expanded' : ''}`} />
            <div className={`ls-divider-diamond${lineExpanded ? ' expanded' : ''}`} />
            <div className={`ls-divider-line${lineExpanded ? ' expanded' : ''}`} />
          </div>

          <div className="ls-subtitle">Creative Frontend Portfolio</div>

          <div className="ls-progressWrap">
            <div className="ls-progressHeader">
              <span className="ls-progressLabel">Preparing Experience</span>
              <span className="ls-progressValue">{Math.round(progress)}%</span>
            </div>

            <div className="ls-progressTrack">
              <div className="ls-progressFill" style={{ width: `${progress}%` }}>
                <div className="ls-progressGlow" />
              </div>
            </div>

            <div className="ls-progressHeader">
              <span className="ls-progressHint">Smooth entry, refined motion</span>
              <span className="ls-progressHint">Please wait</span>
            </div>
          </div>

          <div className="ls-footnote">Loading the portfolio with a calmer reveal.</div>
        </div>
      </div>
    </>
  );
}
