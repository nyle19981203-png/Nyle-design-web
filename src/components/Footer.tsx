import React, { useState, useEffect } from 'react';
import { ArrowUp, Sparkles, ShieldCheck, Heart } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { playClickSound } from '../utils/sound';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [localTime, setLocalTime] = useState<string>('--:--:--');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#1a1a1a] bg-[#080808] py-16 px-4 sm:px-6 lg:px-8 font-mono text-xs">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Upper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-[11px] uppercase tracking-[0.15em]">
          {/* Col 1: Bio */}
          <div className="md:col-span-5 space-y-2">
            <span className="block text-[#444] font-bold">BIOGRAPHY</span>
            <p className="max-w-sm text-[#888] font-light leading-relaxed normal-case font-sans text-xs">
              Staff Designer and Creative Technologist specializing in flat UI architectures, generative experiments, and spatial computing interfaces.
            </p>
          </div>

          {/* Col 2: Social Systems */}
          <div className="md:col-span-4 space-y-2">
            <span className="block text-[#444] font-bold">SOCIAL SYSTEMS</span>
            <div className="flex flex-col gap-1.5 text-[#AAA]">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                Twitter / X ↗
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                GitHub ↗
              </a>
              <a href="https://figma.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                Figma Community ↗
              </a>
            </div>
          </div>

          {/* Col 3: Direct Connect */}
          <div className="md:col-span-3 space-y-2 md:text-right">
            <span className="block text-[#444] font-bold">DIRECT CONNECT</span>
            <a
              href="mailto:775879800@qq.com"
              className="text-white hover:underline lowercase tracking-normal font-mono block text-xs"
            >
              775879800@qq.com
            </a>
            <span className="text-[10px] text-[#666] block pt-1">
              微信: NYLELYW // 17857326814
            </span>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-[#141414] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#666] uppercase tracking-widest">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-white text-black font-bold flex items-center justify-center text-[9px]">
              ZW
            </div>
            <span>{t.footer.copyright}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              <span>{t.footer.status}</span>
            </div>
            <span>//</span>
            <span>UTC {localTime}</span>
          </div>

          <button
            id="footer-back-to-top-btn"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#111] hover:bg-white hover:text-black border border-[#222] text-white transition-colors uppercase"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
