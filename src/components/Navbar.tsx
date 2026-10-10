import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Globe, Search, ArrowUpRight, Sparkles, Command } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { isSoundEnabled, toggleSound, playClickSound } from '../utils/sound';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenSearch: () => void;
  onOpenResume: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenSearch,
  onOpenResume,
  activeSection,
}) => {
  const t = translations[currentLang];
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [langDropdownOpen, setLangDropdownOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) playClickSound();
  };

  const handleNavClick = (id: string) => {
    playClickSound();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const navItems = [
    { id: 'showcase-section', label: t.nav.showcase },
    { id: 'projects-section', label: t.nav.work },
    { id: 'about-section', label: t.nav.about },
    { id: 'lab-section', label: t.nav.lab },
    { id: 'contact-section', label: t.nav.contact },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080808]/90 backdrop-blur-md border-b border-[#1a1a1a] shadow-2xl'
          : 'bg-[#080808]/60 backdrop-blur-sm border-b border-[#141414]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Monogram & Subtitle */}
        <div className="flex items-center gap-6">
          <button
            id="brand-logo-btn"
            onClick={() => {
              playClickSound();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex flex-col text-left focus:outline-none"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-xl sm:text-2xl font-bold tracking-tighter leading-none uppercase text-white group-hover:text-white/80 transition-colors">
                {currentLang === 'zh' ? '张博文' : 'BOWEN ZHANG'}
              </span>
            </div>
            <span className="text-[9px] tracking-[0.2em] text-[#888] uppercase mt-1 font-mono">
              Spatial Installation Designer
            </span>
          </button>

          {/* Availability Status */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 bg-[#111] border border-[#222] text-[10px] tracking-widest uppercase font-mono text-[#888]">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            <span>{t.nav.available}</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[11px] font-medium tracking-[0.2em] uppercase font-mono">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`py-1 transition-all ${
                  isActive
                    ? 'text-white border-b border-white font-bold'
                    : 'text-[#666] hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Utilities: Search, Sound, Language Inline Switcher, Contact CTA */}
        <div className="flex items-center gap-3">
          {/* Quick Search Trigger */}
          <button
            id="search-trigger-btn"
            onClick={() => {
              playClickSound();
              onOpenSearch();
            }}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#111] hover:bg-[#1a1a1a] border border-[#222] text-[#888] hover:text-white text-[11px] font-mono tracking-wider uppercase transition-colors"
            title={t.nav.search}
          >
            <Search className="w-3.5 h-3.5 text-[#666]" />
            <span className="hidden sm:inline">{t.nav.search}</span>
            <kbd className="hidden sm:inline px-1 bg-[#1a1a1a] text-[9px] text-[#888] border border-[#333]">⌘K</kbd>
          </button>

          {/* Sound Toggle */}
          <button
            id="sound-toggle-btn"
            onClick={handleSoundToggle}
            className={`p-2 border text-xs font-mono transition-colors ${
              soundOn ? 'bg-[#1a1a1a] text-white border-[#333]' : 'bg-[#111] text-[#444] border-[#222]'
            }`}
            title={soundOn ? 'Sound Muted' : 'Sound Enabled'}
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Language Selector (Inline Minimalist EN / CN with Underline Active State) */}
          <div className="flex items-center gap-2 px-2.5 py-1.5 bg-[#111] border border-[#222] text-[10px] font-bold font-mono tracking-wider">
            {[
              { code: 'en' as Language, label: 'EN' },
              { code: 'zh' as Language, label: 'CN' },
            ].map((l) => (
              <button
                key={l.code}
                id={`lang-select-${l.code}`}
                onClick={() => {
                  playClickSound();
                  onLanguageChange(l.code);
                }}
                className={`transition-colors uppercase ${
                  currentLang === l.code
                    ? 'text-white border-b border-white'
                    : 'text-[#444] hover:text-[#888]'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Primary CTA */}
          <button
            id="navbar-hire-btn"
            onClick={() => handleNavClick('contact-section')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-[#E5E5E5] text-[#080808] text-[11px] font-mono font-bold tracking-wider uppercase transition-all active:scale-95"
          >
            <span>{t.nav.hireMe}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => {
              playClickSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 text-[#888] hover:text-white border border-[#222] bg-[#111]"
          >
            <div className="w-4 flex flex-col gap-1">
              <span className={`h-0.5 w-full bg-current transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`h-0.5 w-full bg-current ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`h-0.5 w-full bg-current transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="lg:hidden bg-[#0e0e0e] border-b border-[#222] px-6 py-6 space-y-3 font-mono">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="w-full text-left py-2 text-xs tracking-[0.2em] uppercase text-[#888] hover:text-white"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-[#222] flex items-center justify-between">
            <button
              onClick={() => {
                onOpenResume();
                setMobileMenuOpen(false);
              }}
              className="text-xs uppercase tracking-widest text-[#888] hover:text-white"
            >
              {t.nav.resume}
            </button>
            <span className="text-[10px] uppercase tracking-widest text-white">{t.nav.available}</span>
          </div>
        </div>
      )}
    </header>
  );
};
