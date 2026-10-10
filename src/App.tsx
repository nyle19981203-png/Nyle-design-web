/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ShowcaseReel } from './components/ShowcaseReel';
import { ProjectGrid } from './components/ProjectGrid';
import { ProjectModal } from './components/ProjectModal';
import { AboutSection } from './components/AboutSection';
import { InteractiveLab } from './components/InteractiveLab';
import { ContactSection } from './components/ContactSection';
import { QuickSearchModal } from './components/QuickSearchModal';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';
import { projectsData } from './data/projectsData';
import { Language, Project } from './types';
import { playClickSound } from './utils/sound';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('zh'); // default to Chinese as user requested in Chinese, supports toggle to EN and JA
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero-section');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['showcase-section', 'projects-section', 'about-section', 'lab-section', 'contact-section'];
      const scrollPos = window.scrollY + 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    playClickSound();
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-[#eceff4] selection:bg-[#ccff00] selection:text-[#08090d] bg-grid-pattern relative">
      {/* Sticky Header Navigation */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 1. Hero Statement Section */}
        <HeroSection
          currentLang={currentLang}
          onExploreClick={() => scrollToSection('showcase-section')}
          onContactClick={() => scrollToSection('contact-section')}
        />

        {/* 2. Interactive Infinite Showcase Reel */}
        <ShowcaseReel
          projects={projectsData}
          currentLang={currentLang}
          onSelectProject={(p) => setSelectedProject(p)}
        />

        {/* 3. Filterable Works & Case Studies Archive */}
        <ProjectGrid
          projects={projectsData}
          currentLang={currentLang}
          onSelectProject={(p) => setSelectedProject(p)}
        />

        {/* 4. About Me, Timeline, Skills & Principles */}
        <AboutSection
          currentLang={currentLang}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* 5. Creative Interaction Lab & Physics Sandbox */}
        <InteractiveLab currentLang={currentLang} />

        {/* 6. Contact & Collaboration Section */}
        <ContactSection currentLang={currentLang} />
      </main>

      {/* Footer */}
      <Footer currentLang={currentLang} />

      {/* Deep-dive Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        allProjects={projectsData}
        currentLang={currentLang}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(p) => setSelectedProject(p)}
      />

      {/* Global Quick Search (Cmd+K) Modal */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        projects={projectsData}
        currentLang={currentLang}
        onSelectProject={(p) => setSelectedProject(p)}
        onNavigateSection={scrollToSection}
      />

      {/* Printable Resume / CV Sheet Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        currentLang={currentLang}
      />
    </div>
  );
}
