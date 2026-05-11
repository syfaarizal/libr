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
    <section id="contact" className="section-card">
      <div className="section-header">
        <div className="section-title">
          <span className="title-number">05</span>
          <h2>Let's <span className="highlight">Connect</span></h2>
        </div>
        <p className="section-subtitle">Have a project, idea, or just want to say hi? Reach me here</p>
      </div>

      <div className="contact-container">
        {/* Form */}
        <div className="contact-form-container">
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
                <input type="text" name="name" placeholder="Enter your name" required />
                <div className="form-line"></div>
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  <i className="fas fa-envelope"></i>
                  <span>Email Address</span>
                </label>
                <input type="email" name="email" placeholder="your@email.com" required />
                <div className="form-line"></div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">
                <i className="fas fa-tag"></i>
                <span>Subject</span>
              </label>
              <input type="text" name="subject" placeholder="What's this about?" required />
              <div className="form-line"></div>
            </div>

            <div className="form-group">
              <label htmlFor="message">
                <i className="fas fa-comment-dots"></i>
                <span>Your Message</span>
              </label>
              <textarea name="message" rows={5} placeholder="Tell me about your project or idea..." required></textarea>
              <div className="form-line"></div>
            </div>

            <input type="hidden" name="_captcha" value="false" />

            <button type="submit" className="btn btn-primary submit-btn">
              <span>Send Message</span>
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>

        {/* Info */}
        <div className="contact-info-container">
          <div className="contact-quote">
            <div className="quote-icon">
              <i className="fas fa-quote-left"></i>
            </div>
            <p className="quote-text">Great things in business are never done by one person. They're done by a team of people.</p>
            <p className="quote-author">- Steve Jobs</p>
          </div>

          <div className="contact-details">
            <div className="contact-card animate-on-scroll">
              <div className="contact-icon"><i className="fas fa-envelope"></i></div>
              <div className="contact-content">
                <h4>Email</h4>
                <p>syifairgi@gmail.com</p>
              </div>
            </div>
            <div className="contact-card animate-on-scroll">
              <div className="contact-icon"><i className="fas fa-phone"></i></div>
              <div className="contact-content">
                <h4>Phone</h4>
                <p>+62 858-6486-4931</p>
              </div>
            </div>
            <div className="contact-card animate-on-scroll">
              <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
              <div className="contact-content">
                <h4>Location</h4>
                <p>Indonesia</p>
              </div>
            </div>
          </div>

          <div className="contact-socials">
            <h4>Follow Me</h4>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/syifaarizal/" className="social-link" target="_blank" rel="noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://github.com/syfaarizal" className="social-link" target="_blank" rel="noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.instagram.com/syfaarizal/" className="social-link" target="_blank" rel="noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
