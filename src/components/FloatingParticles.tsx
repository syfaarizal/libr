import { useEffect, useRef } from 'react';

export default function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';
    const styleEl = document.createElement('style');
    document.head.appendChild(styleEl);

    const count = Math.min(30, Math.floor(window.innerWidth / 30));

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 4 + 1;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 15 + 10;
      const opacity = Math.random() * 0.4 + 0.1;

      p.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${posX}%; top: ${posY}%;
        opacity: ${opacity};
        background-color: var(--primary-color);
        border-radius: 50%; position: absolute; pointer-events: none;
      `;

      const mx1 = Math.random() * 100 - 50;
      const my1 = Math.random() * 100 - 50;
      const mx2 = Math.random() * 100 - 50;
      const my2 = Math.random() * 100 - 50;
      const name = `fp-${i}`;

      styleEl.textContent += `
        @keyframes ${name} {
          0% { transform: translate(0,0) rotate(0deg); }
          25% { transform: translate(${mx1}px,${my1}px) rotate(90deg); }
          50% { transform: translate(${mx2}px,${my2}px) rotate(180deg); }
          75% { transform: translate(${mx1 * 0.5}px,${my1 * 0.5}px) rotate(270deg); }
          100% { transform: translate(0,0) rotate(360deg); }
        }
      `;
      p.style.animation = `${name} ${duration}s linear ${delay}s infinite`;
      container.appendChild(p);
    }

    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  return <div ref={containerRef} className="floating-particles" id="floating-particles"></div>;
}
