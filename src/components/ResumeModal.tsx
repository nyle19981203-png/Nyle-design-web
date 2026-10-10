import React, { useEffect } from 'react';
import { X, Download, Printer, ExternalLink, Mail, MapPin, Globe, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { experienceData, skillCategories, awardsData } from '../data/profileData';
import { playClickSound } from '../utils/sound';
import { InteractiveHeading } from './InteractiveHeading';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, currentLang }) => {
  const t = translations[currentLang];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  return (
    <div
      id="resume-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md overflow-y-auto flex items-center justify-center p-2 sm:p-6 animate-fadeIn"
    >
      <div
        id="resume-sheet"
        className="w-full max-w-4xl bg-[#080808] border border-[#282828] text-[#F5F5F5] shadow-2xl p-6 sm:p-12 space-y-10 my-auto relative print:bg-white print:text-black"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-6 print:hidden">
          <div className="flex items-center gap-3 text-[10px] font-mono text-[#888] uppercase tracking-[0.3em]">
            <div className="w-6 h-[1px] bg-white"></div>
            <span>CURRICULUM VITAE // VERIFIED ARCHIVE</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#111] hover:bg-white hover:text-black text-white text-xs font-mono uppercase tracking-wider border border-[#222] transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="p-1.5 bg-[#111] hover:bg-white hover:text-black text-white border border-[#222] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Resume Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#1a1a1a] pb-8">
          <div>
            <InteractiveHeading
              as="h1"
              text={currentLang === 'zh' ? '张博文' : 'BOWEN ZHANG'}
              className="text-3xl sm:text-5xl font-black italic font-display uppercase tracking-tighter text-white"
            />
            <p className="text-xs font-mono text-[#888] mt-1 uppercase tracking-widest font-bold">
              STAFF PRODUCT DESIGNER & CREATIVE ENGINEER
            </p>
            <p className="text-xs text-[#888] font-sans font-light mt-2 max-w-xl leading-relaxed">
              Specialized in flat design architectures, spatial computing (VisionOS/WebXR), and high-performance design systems.
            </p>
          </div>

          <div className="text-xs font-mono text-[#AAA] space-y-1 sm:text-right">
            <div>775879800@qq.com</div>
            <div>微信: NYLELYW · 电话: 17857326814</div>
            <div>Hangzhou / Shanghai</div>
          </div>
        </div>

        {/* Experience Section */}
        <div>
          <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-white mb-6 border-b border-[#1a1a1a] pb-2 flex items-center gap-2">
            <div className="w-4 h-[1px] bg-white"></div>
            <span>WORK EXPERIENCE & LEADERSHIP</span>
          </h2>
          <div className="space-y-6">
            {experienceData.map((exp, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between font-mono text-xs">
                  <span className="font-bold text-white text-sm uppercase">{exp.role[currentLang]}</span>
                  <span className="text-[#666]">{exp.period}</span>
                </div>
                <div className="text-xs font-mono text-[#888]">
                  {exp.company} — {exp.location}
                </div>
                <p className="text-xs text-[#888] leading-relaxed font-sans font-light">
                  {exp.description[currentLang]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Accolades Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#1a1a1a] pt-8">
          {/* Skills */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-white mb-4 border-b border-[#1a1a1a] pb-2 flex items-center gap-2">
              <div className="w-4 h-[1px] bg-white"></div>
              <span>DOMAIN MASTERY & STACK</span>
            </h2>
            <div className="space-y-3 font-mono text-xs text-[#AAA]">
              <div>
                <span className="text-[#666] block text-[10px] uppercase tracking-wider">DESIGN & XR:</span>
                <span>Figma (Tokens/Variables), Spatial UX, WebXR, Micro-interactions</span>
              </div>
              <div>
                <span className="text-[#666] block text-[10px] uppercase tracking-wider">ENGINEERING:</span>
                <span>TypeScript, React 19, Tailwind CSS, Three.js, WebGL, Web Audio API</span>
              </div>
            </div>
          </div>

          {/* Awards */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-white mb-4 border-b border-[#1a1a1a] pb-2 flex items-center gap-2">
              <div className="w-4 h-[1px] bg-white"></div>
              <span>SELECT HONORS</span>
            </h2>
            <div className="space-y-2 font-mono text-xs">
              {awardsData.slice(0, 4).map((a, idx) => (
                <div key={idx} className="flex items-center justify-between text-[#AAA]">
                  <span>{a.title} ({a.organization.split(' ')[0]})</span>
                  <span className="text-[#666]">{a.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
