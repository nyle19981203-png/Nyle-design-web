import React, { useState, useEffect } from 'react';
import { FileText, ArrowUpRight, Upload } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { playClickSound } from '../utils/sound';
import { InteractiveHeading } from './InteractiveHeading';
import { PdfViewerSection } from './PdfViewerSection';
import heroPortraitImg from '../assets/images/bowen_zhang_photo_1788084533646.jpg';

interface AboutSectionProps {
  currentLang: Language;
  onOpenResume: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ currentLang, onOpenResume }) => {
  const t = translations[currentLang];
  const [customImage, setCustomImage] = useState<string | null>(() => {
    try {
      return localStorage.getItem('bowen_custom_portrait') || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const handleStorage = () => {
      try {
        setCustomImage(localStorage.getItem('bowen_custom_portrait') || null);
      } catch {}
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setCustomImage(result);
          try {
            localStorage.setItem('bowen_custom_portrait', result);
          } catch {}
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="about-section" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#1a1a1a]">
      {/* Section Top Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 text-[10px] font-mono text-[#888] uppercase tracking-[0.3em] mb-2">
          <div className="w-6 h-[1px] bg-white"></div>
          <span>{t.about.badge}</span>
        </div>
        <InteractiveHeading
          as="h2"
          text={t.about.title}
          className="text-3xl sm:text-5xl font-black italic text-white tracking-tighter font-display uppercase leading-tight"
        />
        <p className="text-[#888] text-sm sm:text-base mt-2 max-w-2xl font-sans font-light leading-relaxed">
          {t.about.subtitle}
        </p>
      </div>

      {/* Main Grid: Left Portrait & Bio, Right Tabbed Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Portrait & Personal Manifesto */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative aspect-[4/5] bg-[#151515] border border-[#282828] overflow-hidden group">
            <img
              src={customImage || heroPortraitImg}
              alt="张博文 Bowen Zhang"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-[center_25%] transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-90"></div>

            {/* Direct Local Image Upload Overlay */}
            <label
              htmlFor="about-image-upload"
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 cursor-pointer transition-opacity duration-300 backdrop-blur-[2px] z-30"
              title="点击直接选择并替换为您的本地原图（100%无AI修改）"
            >
              <div className="p-3 bg-white text-black rounded-full shadow-lg transform group-hover:scale-105 transition-transform">
                <Upload className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs text-white font-bold bg-black/70 px-3 py-1.5 rounded border border-white/30 tracking-wider">
                {currentLang === 'zh' ? '点击选择本地原图' : 'Upload Original Photo'}
              </span>
              <input
                id="about-image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>

            <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#080808]/90 backdrop-blur-md border border-[#222] z-20">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-white font-bold">{currentLang === 'zh' ? '张博文 // ZHANG' : 'BOWEN ZHANG // 张'}</span>
                <span className="text-white font-bold tracking-wider">HANGZHOU / SHANGHAI</span>
              </div>
              <span className="text-[11px] font-mono text-[#888] block mt-0.5 uppercase tracking-wider">
                {currentLang === 'zh' ? '空间装置与商业美陈设计师' : 'Spatial & Installation Art Designer'}
              </span>
            </div>
          </div>

          {/* Bio Paragraphs */}
          <div className="p-6 sm:p-8 bg-[#151515] border border-[#282828] space-y-4 text-xs sm:text-sm text-[#BBB] leading-relaxed font-light">
            <p>{t.about.bioP1}</p>
            <p>{t.about.bioP2}</p>
            <p>{t.about.bioP3}</p>
            <div className="pt-3 border-t border-[#222] flex items-center justify-between text-xs font-mono">
              <span className="text-[#888] uppercase tracking-wider">{t.about.currentStatus}</span>
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            </div>
          </div>

          {/* Resume Download CTA */}
          <button
            id="about-download-resume-btn"
            onClick={() => {
              playClickSound();
              onOpenResume();
            }}
            className="w-full py-4 px-6 bg-[#111] hover:bg-[#1a1a1a] border border-[#333] hover:border-white text-white text-xs font-mono font-bold tracking-[0.2em] uppercase flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-white" />
              <span>{t.about.downloadCV}</span>
            </div>
            <div className="w-7 h-7 border border-white/40 group-hover:border-white rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </div>
          </button>
        </div>

        {/* Right Column: Experience Timeline */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-4">
            <div className="flex items-center gap-2 px-3.5 py-2 text-xs font-mono uppercase tracking-[0.15em] bg-white text-black font-bold border border-white">
              <FileText className="w-3.5 h-3.5" />
              <span>{currentLang === 'zh' ? '作品集与简历 PDF' : 'Portfolio & Resume PDF'}</span>
            </div>
            <div className="text-[11px] font-mono text-[#888] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="hidden sm:inline">{currentLang === 'zh' ? '支持上传与在线预览' : 'Upload & Preview'}</span>
            </div>
          </div>

          {/* PDF Upload & Live Preview Container */}
          <div>
            <PdfViewerSection currentLang={currentLang} />
          </div>
        </div>
      </div>
    </section>
  );
};
