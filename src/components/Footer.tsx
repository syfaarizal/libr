export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id) as HTMLElement;
    if (el) {
      const headerH = document.querySelector('.header')?.clientHeight || 0;
      window.scrollTo({ top: el.offsetTop - headerH - 20, behavior: 'smooth' });
    }
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if ((window as any).showToast) (window as any).showToast('Subscribed successfully!', 'success');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-text">LIBR</span>
            <div className="logo-glow"></div>
          </div>
          <p className="footer-tagline">Transforming ideas into digital experiences</p>
          <p className="footer-credit">© 2026 LIBR All rights reserved.</p>
        </div>

        <div className="footer-links">
          <div className="links-column">
            <h4>Quick Links</h4>
            <ul>
              {[['#home','Home'],['#about','About'],['#skills','Skills'],['#blog','Blog'],['#project','Projects'],['#contact','Contact']].map(([href, label]) => (
                <li key={href}><a href={href} onClick={e=>{e.preventDefault();scrollTo(href)}}>{label}</a></li>
              ))}
            </ul>
          </div>
          <div className="links-column">
            <h4>Resources</h4>
            <ul>
              <li><a href="./assets/CV/CV-FrontEnd-Eng.pdf" download>Download CV</a></li>
              <li><a href="#blog" onClick={e=>{e.preventDefault();scrollTo('#blog')}}>Latest Posts</a></li>
              <li><a href="#project" onClick={e=>{e.preventDefault();scrollTo('#project')}}>Projects</a></li>
              <li><a href="#contact" onClick={e=>{e.preventDefault();scrollTo('#contact')}}>Hire Me</a></li>
            </ul>
          </div>
          <div className="links-column">
            <h4>Connect</h4>
            <ul>
              <li><a href="mailto:syifairgi@gmail.com">Email</a></li>
              <li><a href="tel:+6285864864931">Phone</a></li>
              <li><a href="#contact" onClick={e=>{e.preventDefault();scrollTo('#contact')}}>Contact Form</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-newsletter">
          <h4>Stay Updated</h4>
          <p>Subscribe to my newsletter for updates</p>
          <form action="https://formsubmit.co/syifairgi@gmail.com" method="POST" className="newsletter-form" onSubmit={handleNewsletter}>
            <input type="hidden" name="_subject" value="New Subscriber for SICODER!" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="email" name="email" placeholder="Your email address" required />
            <button type="submit"><i className="fas fa-paper-plane"></i></button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-socials">
          <a href="https://www.linkedin.com/in/syifaarizal/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>
          <a href="https://github.com/syfaarizal" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
          <a href="https://www.instagram.com/syfaarizal/" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
        </div>
        <p className="footer-copyright">Made with ❤️ and <code>&lt;/&gt;</code> by Syifa F.A</p>
      </div>
    </footer>
  );
}
