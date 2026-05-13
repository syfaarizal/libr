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
            <span className="ls-progressLabel">Initializing</span>
            <span className="ls-progressValue">{Math.round(progress)}%</span>
          </div>

          <div className="ls-progressTrack">
            <div className="ls-progressFill" style={{ width: `${progress}%` }}>
              <div className="ls-progressGlow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}