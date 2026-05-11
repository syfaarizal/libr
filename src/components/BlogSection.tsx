import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data';

export default function BlogSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const trackRef = useRef<HTMLDivElement>(null);

  function getSpv() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1200) return 2;
    return 3;
  }

  useEffect(() => {
    setSlidesPerView(getSpv());
  }, []);

  const totalSlides = Math.ceil(blogPosts.length / slidesPerView);

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.blog-card') as HTMLElement;
    if (!card) return;
    const gap = 24; // 1.5rem gap
    const cardWidth = card.offsetWidth;
    const offset = index * (slidesPerView * (cardWidth + gap));
    track.style.transform = `translateX(-${offset}px)`;
    track.style.transition = 'transform 0.5s ease';
    setCurrentSlide(index);
  }, [slidesPerView]);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => {
      const next = prev < totalSlides - 1 ? prev + 1 : 0;
      goTo(next);
      return next;
    });
  }, [totalSlides, goTo]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => {
      const next = prev > 0 ? prev - 1 : totalSlides - 1;
      goTo(next);
      return next;
    });
  }, [totalSlides, goTo]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => {
        const next = prev < totalSlides - 1 ? prev + 1 : 0;
        goTo(next);
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [prevSlide, nextSlide]);

  useEffect(() => {
    const handler = () => {
      setSlidesPerView(getSpv());
      setCurrentSlide(0);
      if (trackRef.current) {
        trackRef.current.style.transform = 'translateX(0)';
      }
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const cardStyle: React.CSSProperties = {
    flex: `0 0 calc(${100 / slidesPerView}% - ${(slidesPerView > 1 ? 24 * (slidesPerView - 1) / slidesPerView : 0)}px)`,
  };

  return (
    <section id="blog" className="section-card section-reveal">
      <div className="section-header">
        <div className="section-title">
          <span className="title-number">03</span>
          <h2>My <span className="highlight">Blog</span></h2>
        </div>
        <p className="section-subtitle">My blog in learning, building and growing</p>
      </div>

      <div className="blog-header">
        <h3 className="blog-section-title">Challenges <span className="gradient-text">Day-By-Day</span></h3>
        <div className="decorative-line"></div>
      </div>

      <div className="blog-carousel-container">
        <div className="blog-carousel">
          <div ref={trackRef} className="blog-track">
            {blogPosts.map((post, i) => (
              <div key={i} className="blog-card animate-on-scroll" style={cardStyle}>
                <div className="blog-content">
                  <span className="blog-date">{post.date}</span>
                  <h4 className="blog-title">{post.title}</h4>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <Link to={`/blog/days-challenge/${post.link.split('/').pop()?.replace('.html','') || 'day1'}`} className="read-more">
                    <span>Read More</span>
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="carousel-controls">
          <button className="carousel-btn prev-btn" onClick={prevSlide} aria-label="Previous slide">
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="carousel-dots">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <div
                key={i}
                className={`carousel-dot${i === currentSlide ? ' active' : ''}`}
                onClick={() => { goTo(i); }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button className="carousel-btn next-btn" onClick={nextSlide} aria-label="Next slide">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <div className="section-footer">
        <Link to="/blog" className="btn btn-outline">
          <span>View All Blog Posts</span>
          <i className="fas fa-external-link-alt"></i>
        </Link>
      </div>
    </section>
  );
}
