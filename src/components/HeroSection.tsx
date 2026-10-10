import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUpRight, Sparkles, MapPin, Clock, Layers, Flame, Award, MoveRight, Upload } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { playClickSound } from '../utils/sound';
import { InteractiveHeading } from './InteractiveHeading';
import heroPortraitImg from '../assets/images/bowen_zhang_photo_1788084533646.jpg';

interface HeroSectionProps {
  currentLang: Language;
  onExploreClick: () => void;
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLang,
  onExploreClick,
  onContactClick,
}) => {
  const t = translations[currentLang];
  const [customImage, setCustomImage] = useState<string | null>(() => {
    try {
      return localStorage.getItem('bowen_custom_portrait') || null;
    } catch {
      return null;
    }
  });

  const [beijingDateTime, setBeijingDateTime] = useState({
    date: '--.--.--',
    time: '--:--:--',
    weekday: '',
  });

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
          } catch {
            // storage limit fallback
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      try {
        const dateFormatter = new Intl.DateTimeFormat(currentLang === 'zh' ? 'zh-CN' : 'en-US', {
          timeZone: 'Asia/Shanghai',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
        const timeFormatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Shanghai',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        const weekdayFormatter = new Intl.DateTimeFormat(currentLang === 'zh' ? 'zh-CN' : 'en-US', {
          timeZone: 'Asia/Shanghai',
          weekday: 'short',
        });

        setBeijingDateTime({
          date: dateFormatter.format(now),
          time: timeFormatter.format(now),
          weekday: weekdayFormatter.format(now),
        });
      } catch {
        setBeijingDateTime({
          date: now.toLocaleDateString(),
          time: now.toLocaleTimeString(),
          weekday: '',
        });
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [currentLang]);

  return (
    <section
      id="hero-section"
      className="relative min-h-[92vh] pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between border-b border-[#1a1a1a]"
    >
      {/* Top Meta Bar: Status, Geo Hubs, Live Global Clocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 border-b border-[#1a1a1a] text-[11px] font-mono tracking-wider">
        {/* Availability / Position */}
        <div className="flex items-center gap-2.5 text-[#AAA]">
          <span className="w-2 h-2 bg-white inline-block animate-pulse"></span>
          <span className="text-white font-medium uppercase">{t.hero.greeting}</span>
        </div>

        {/* Global Hubs */}
        <div className="flex items-center gap-2 text-[#888]">
          <span className="text-white font-bold tracking-wider">{currentLang === 'zh' ? '常驻' : 'BASED IN'}</span>
          <span className="uppercase">{t.hero.location}</span>
        </div>

        {/* Beijing Live Time and Date */}
        <div className="flex items-center justify-start md:justify-end gap-2 text-[#AAA] text-[11px] font-mono">
          <Clock className="w-3.5 h-3.5 text-white shrink-0" />
          <span className="text-white font-bold tracking-wider">{currentLang === 'zh' ? '北京时间' : 'BEIJING'}:</span>
          <span className="text-[#888]">{beijingDateTime.date}</span>
          <span className="text-[#555]">/</span>
          <span className="text-white font-bold tracking-widest bg-[#151515] px-1.5 py-0.5 border border-[#282828] rounded-sm">{beijingDateTime.time}</span>
        </div>
      </div>

      {/* Main Impact Hero Content Grid */}
      <div className="py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headlines & Editorial Copy */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-[1px] bg-white"></div>
            <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-[#888]">
              ARCHIVE // 2026 EDITION
            </span>
          </div>

          <div className="pt-1">
            <InteractiveHeading
              id="hero-title"
              as="h1"
              text={t.hero.name}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black italic tracking-tighter text-white uppercase leading-[0.92] font-display"
              subtitleHint={currentLang === 'zh' ? '悬停字符交互 · 点击迸发灵感' : 'HOVER TO DECRYPT · CLICK TO BURST'}
            />
          </div>

          <p className="text-lg sm:text-xl md:text-2xl font-light text-[#BBB] leading-relaxed font-sans max-w-2xl">
            {t.hero.tagline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              id="hero-explore-works-btn"
              onClick={() => {
                playClickSound();
                onExploreClick();
              }}
              className="py-4 px-7 bg-white hover:bg-[#E5E5E5] text-[#080808] font-mono font-bold text-xs tracking-[0.2em] uppercase flex items-center justify-between gap-4 transition-all hover:translate-x-1"
            >
              <span>{t.hero.viewAllWorks}</span>
              <div className="w-6 h-6 border border-[#080808] rounded-full flex items-center justify-center">
                <ArrowDown className="w-3 h-3 text-[#080808]" />
              </div>
            </button>

            <button
              id="hero-contact-btn"
              onClick={() => {
                playClickSound();
                onContactClick();
              }}
              className="py-4 px-7 bg-[#111] hover:bg-[#1a1a1a] text-white border border-[#333] hover:border-white font-mono text-xs tracking-[0.2em] uppercase flex items-center justify-between gap-4 transition-all hover:translate-x-1"
            >
              <span>{t.hero.contactMe}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#888] group-hover:text-white" />
            </button>
          </div>
        </div>

        {/* Right Column: Profile Showcase Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div
            className="relative w-full max-w-[460px] aspect-[4/3] sm:aspect-[16/11] bg-[#151515] border border-[#333] hover:border-white/50 shadow-2xl shrink-0 group overflow-hidden transition-all duration-500 rounded-sm flex items-center justify-center"
          >
            {/* User Portrait Image */}
            <img
              id="hero-profile-image"
              src={customImage || heroPortraitImg}
              alt="张博文 Bowen Zhang"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-all duration-300 select-none"
            />

            {/* Direct Local Image Upload Overlay */}
            <label
              htmlFor="hero-image-upload"
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 cursor-pointer transition-opacity duration-300 backdrop-blur-[2px] z-30"
              title="点击直接选择并替换为您的本地原图（100%无AI修改）"
            >
              <div className="p-3 bg-white text-black rounded-full shadow-lg transform group-hover:scale-105 transition-transform">
                <Upload className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs text-white font-bold bg-black/70 px-3 py-1.5 rounded border border-white/30 tracking-wider">
                {currentLang === 'zh' ? '点击选择本地原图（原画质无AI处理）' : 'Click to Upload Original Photo (100% Raw)'}
              </span>
              <input
                id="hero-image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar: Large Sculptural Index, Indicators, & Stats */}
      <div className="border-t border-[#1a1a1a] pt-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        {/* Left: Line and Sculptural Index 01 */}
        <div className="flex gap-3 items-end">
          <div className="w-12 h-[1px] bg-white mb-3"></div>
          <span className="text-[48px] sm:text-[60px] font-black italic text-[#1a1a1a] leading-none select-none font-display">
            01
          </span>
          <div className="flex gap-2 mb-3 ml-4">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-[#222]"></div>
            <div className="w-2 h-2 rounded-full bg-[#222]"></div>
            <div className="w-2 h-2 rounded-full bg-[#222]"></div>
          </div>
        </div>

        {/* Center: Minimalist Stat Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono">
          {[
            { value: t.hero.stats.experience, label: t.hero.stats.experienceLabel },
            { value: t.hero.stats.projects, label: t.hero.stats.projectsLabel },
            { value: t.hero.stats.awards, label: t.hero.stats.awardsLabel },
            { value: t.hero.stats.satisfaction, label: t.hero.stats.satisfactionLabel },
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black italic text-white leading-none font-display">
                {stat.value}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#666] mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Right: Vertical Scroll Indicator Track */}
        <div className="hidden lg:flex flex-col items-end">
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#666] mb-1.5 font-mono">
            Scroll to explore
          </span>
          <div className="w-1 h-8 bg-[#222] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
