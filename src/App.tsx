import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Main portfolio components
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import FloatingParticles from './components/FloatingParticles';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import BlogSection from './components/BlogSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ToastContainer from './components/ToastContainer';
import ScrollToTop from './components/ScrollToTop';
import "./styles/blog/blog.css"

// Blog pages
import BlogIndexPage from './pages/blog/BlogIndexPage';
import { Day1Page, Day2Page, Day3Page, Day4Page, Day5Page, Day6Page } from './pages/blog/days-challenge';
import { HtmlIntroPage, HtmlIntro2Page } from './pages/blog/html-modul';
import { Css1Page, Css2Page, Css3Page, Css4Page } from './pages/blog/css-modul';
import ProjectsPage from './pages/projects/ProjectsPage';
import ProjectDetail1 from './pages/projects/ProjectDetail1';
import ProjectDetail2 from './pages/projects/ProjectDetail2';
import ProjectDetail3 from './pages/projects/ProjectDetail3';
import ProjectDetail4 from './pages/projects/ProjectDetail4';
import ProjectDetail5 from './pages/projects/ProjectDetail5';
import {
  Js1Page,
  Js2Page,
  Js2SolutionPage,
  Js3Page,
  Js3SolutionPage,
  Js4Page,
  Js4SolutionPage,
  Js5Page,
  Js5SolutionPage,
  Js6Page,
  Js6SolutionPage,
  Js7Page,
} from './pages/blog/js-modul';

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const els = document.querySelectorAll('.animate-on-scroll');
    els.forEach(el => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(20px)';
      (el as HTMLElement).style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    return () => observer.disconnect();
  });
}

function useRevealText() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );

    const els = document.querySelectorAll('.reveal-text, .section-reveal');
    els.forEach(el => observer.observe(el));

    // Fallback: reveal elements already in viewport
    const timer = setTimeout(() => {
      els.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('revealed');
        }
      });
    }, 300);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  });
}

function PortfolioHome() {
  useScrollReveal();
  useRevealText();

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <FloatingParticles />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <BlogSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
      <ToastContainer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Portfolio home */}
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/detail/1" element={<ProjectDetail1 />} />
        <Route path="/projects/detail/2" element={<ProjectDetail2 />} />
        <Route path="/projects/detail/3" element={<ProjectDetail3 />} />
        <Route path="/projects/detail/4" element={<ProjectDetail4 />} />
        <Route path="/projects/detail/5" element={<ProjectDetail5 />} />

        {/* Blog index */}
        <Route path="/blog" element={<BlogIndexPage />} />

        {/* Days challenge posts */}
        <Route path="/blog/days-challenge/day1" element={<Day1Page />} />
        <Route path="/blog/days-challenge/day2" element={<Day2Page />} />
        <Route path="/blog/days-challenge/day3" element={<Day3Page />} />
        <Route path="/blog/days-challenge/day4" element={<Day4Page />} />
        <Route path="/blog/days-challenge/day5" element={<Day5Page />} />
        <Route path="/blog/days-challenge/day6" element={<Day6Page />} />

        {/* HTML module posts */}
        <Route path="/blog/html-modul/html1" element={<HtmlIntroPage />} />
        <Route path="/blog/html-modul/html2" element={<HtmlIntro2Page />} />

        {/* CSS module posts */}
        <Route path="/blog/css-modul/css1" element={<Css1Page />} />
        <Route path="/blog/css-modul/css2" element={<Css2Page />} />
        <Route path="/blog/css-modul/css3" element={<Css3Page />} />
        <Route path="/blog/css-modul/css4" element={<Css4Page />} />

        {/* JavaScript module posts */}
        <Route path="/blog/js-modul/js1" element={<Js1Page />} />
        <Route path="/blog/js-modul/js2" element={<Js2Page />} />
        <Route path="/blog/js-modul/js2-solutions" element={<Js2SolutionPage />} />
        <Route path="/blog/js-modul/js3" element={<Js3Page />} />
        <Route path="/blog/js-modul/js3-solutions" element={<Js3SolutionPage />} />
        <Route path="/blog/js-modul/js4" element={<Js4Page />} />
        <Route path="/blog/js-modul/js4-solutions" element={<Js4SolutionPage />} />
        <Route path="/blog/js-modul/js5" element={<Js5Page />} />
        <Route path="/blog/js-modul/js5-solutions" element={<Js5SolutionPage />} />
        <Route path="/blog/js-modul/js6" element={<Js6Page />} />
        <Route path="/blog/js-modul/js6-solutions" element={<Js6SolutionPage />} />
        <Route path="/blog/js-modul/js7" element={<Js7Page />} />
      </Routes>
    </BrowserRouter>
  );
}
