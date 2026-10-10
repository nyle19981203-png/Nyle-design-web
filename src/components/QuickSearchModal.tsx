import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Sparkles, Folder, Terminal, User, FileText } from 'lucide-react';
import { Project, Language } from '../types';
import { translations } from '../i18n/translations';
import { playClickSound } from '../utils/sound';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  currentLang: Language;
  onSelectProject: (project: Project) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  projects,
  currentLang,
  onSelectProject,
  onNavigateSection,
}) => {
  const [query, setQuery] = useState('');
  const t = translations[currentLang];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : undefined;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProjects = projects.filter((p) => {
    const q = query.toLowerCase();
    const title = (p.title[currentLang] || p.title.en).toLowerCase();
    const tags = p.tags.join(' ').toLowerCase();
    const client = p.client.toLowerCase();
    return title.includes(q) || tags.includes(q) || client.includes(q);
  });

  const sections = [
    { id: 'showcase-section', title: t.nav.showcase, icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'projects-section', title: t.nav.work, icon: <Folder className="w-3.5 h-3.5" /> },
    { id: 'about-section', title: t.nav.about, icon: <User className="w-3.5 h-3.5" /> },
    { id: 'lab-section', title: t.nav.lab, icon: <Terminal className="w-3.5 h-3.5" /> },
    { id: 'contact-section', title: t.nav.contact, icon: <FileText className="w-3.5 h-3.5" /> },
  ];

  return (
    <div
      id="quick-search-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-fadeIn"
    >
      <div
        id="quick-search-box"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-[#080808] border border-[#282828] shadow-2xl overflow-hidden font-mono text-xs"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#1a1a1a] flex items-center gap-3">
          <Search className="w-4 h-4 text-[#888]" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, categories, keywords..."
            className="flex-1 bg-transparent text-white placeholder-[#666] focus:outline-none text-xs font-mono"
          />
          <kbd className="px-2 py-0.5 bg-[#111] text-[#888] text-[10px] border border-[#222] uppercase tracking-wider">ESC</kbd>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-[#1a1a1a]">
          {/* Projects Results */}
          <div className="p-2">
            <span className="text-[10px] text-[#666] uppercase tracking-[0.2em] block mb-2 px-2">
              PROJECTS ({filteredProjects.length})
            </span>
            <div className="space-y-1">
              {filteredProjects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    playClickSound();
                    onSelectProject(p);
                    onClose();
                  }}
                  className="w-full p-2 text-left hover:bg-[#151515] flex items-center justify-between text-white transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white"></div>
                    <span className="font-bold uppercase tracking-wider group-hover:text-white">
                      {p.title[currentLang]}
                    </span>
                    <span className="text-[#666] text-[11px]">· {p.client}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#666] group-hover:text-white" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Jump Navigation Sections */}
          <div className="p-2">
            <span className="text-[10px] text-[#666] uppercase tracking-[0.2em] block mb-2 px-2">
              NAVIGATION SECTIONS
            </span>
            <div className="grid grid-cols-2 gap-1">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    playClickSound();
                    onNavigateSection(sec.id);
                    onClose();
                  }}
                  className="p-2 text-left hover:bg-[#151515] flex items-center gap-2 text-[#AAA] hover:text-white transition-colors uppercase tracking-wider text-[11px]"
                >
                  {sec.icon}
                  <span>{sec.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
