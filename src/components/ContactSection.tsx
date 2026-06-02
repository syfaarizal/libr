import { useState, useRef } from 'react';

export default function ContactSection() {
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const showToast = (message: string, type: string) => {
    if ((window as any).showToast) {
      (window as any).showToast(message, type);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const inputs = formRef.current.querySelectorAll('input[required], textarea[required]');
    let valid = true;
    inputs.forEach((input: Element) => {
      const el = input as HTMLInputElement;
      if (!el.value.trim()) { el.classList.add('error'); valid = false; }
      else el.classList.remove('error');
    });

    if (!valid) { showToast('Please fix the errors in the form', 'error'); return; }

    const submitBtn = formRef.current.querySelector('.submit-btn') as HTMLButtonElement;
    const original = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    setSubmitting(true);

    try {
      await new Promise(r => setTimeout(r, 1500));
      showToast("Message sent successfully! I'll get back to you soon.", 'success');
      formRef.current.reset();
    } catch {
      showToast('Oops! Something went wrong. Please try again.', 'error');
    } finally {
      submitBtn.innerHTML = original;
      submitBtn.disabled = false;
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-card-contact">
        <div className="contact-container">

          {/* LEFT: Info */}
          <div className="contact-info-container">
            <div className="contact-left-header">
              <div className="contact-badge"><span>05</span></div>
              <h2 className="contact-heading">
                Let's <br />
                <span className="highlight">Connect</span>
              </h2>
              <div className="contact-title-line"></div>
              <p className="contact-subtitle">
                Have a project, idea, or just want to say hi?<br />
                I'd love to hear from you!
              </p>
            </div>

            <div className="contact-details">
              <div className="contact-card">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-content">
                  <span className="contact-label">Email</span>
                  <p>syifairgi@gmail.com</p>
                </div>
                <div className="contact-arrow">
                  <i className="fas fa-arrow-up-right-from-square"></i>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="contact-content">
                  <span className="contact-label">Phone</span>
                  <p>+62 858-6486-4931</p>
                </div>
                <div className="contact-arrow">
                  <i className="fas fa-arrow-up-right-from-square"></i>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-content">
                  <span className="contact-label">Location</span>
                  <p>Indonesia</p>
                </div>
                <div className="contact-arrow">
                  <i className="fas fa-arrow-up-right-from-square"></i>
                </div>
              </div>
            </div>

            <div className="contact-socials">
              <h4>Follow Me</h4>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/syifaarizal/" className="social-link" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/syfaarizal" className="social-link" target="_blank" rel="noopener noreferrer" title="GitHub">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://www.instagram.com/syfaarizal/" className="social-link" target="_blank" rel="noopener noreferrer" title="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="contact-form-container">
            <div className="form-header">
              <div className="form-header-icon">
                <i className="fas fa-paper-plane"></i>
              </div>
              <div className="form-header-text">
                <h3>Send Me <span className="highlight">a Message</span></h3>
                <p>I'll get back to you as soon as possible.</p>
              </div>
            </div>

            <form
              ref={formRef}
              action="https://formsubmit.co/syifairgi@gmail.com"
              method="POST"
              className="contact-form"
              onSubmit={handleSubmit}
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">
                    <i className="fas fa-user"></i>
                    <span>Your Name</span>
                  </label>
                  <input type="text" id="name" name="name" placeholder="Enter your name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="fas fa-envelope"></i>
                    <span>Email Address</span>
                  </label>
                  <input type="email" id="email" name="email" placeholder="Enter your email" required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">
                  <i className="fas fa-tag"></i>
                  <span>Subject</span>
                </label>
                <input type="text" id="subject" name="subject" placeholder="What's this about?" required />
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  <i className="fas fa-comment-dots"></i>
                  <span>Your Message</span>
                </label>
                <textarea id="message" name="message" rows={5} placeholder="Tell me about your project or idea..." required></textarea>
              </div>

              <input type="hidden" name="_captcha" value="false" />

              <button type="submit" className="submit-btn">
                <span>Send Message</span>
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Vertical side text */}
      <div className="vertical-text-wrapper">
        <span className="vertical-text">LET'S WORK TOGETHER</span>
        <div className="vertical-line"></div>
      </div>
    </section>
  );
}
