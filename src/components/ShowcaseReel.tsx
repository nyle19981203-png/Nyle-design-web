import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, ArrowUpRight, Gauge, Sparkles } from 'lucide-react';
import { Project, Language } from '../types';
import { translations } from '../i18n/translations';
import { playClickSound, playHoverSound } from '../utils/sound';
import { getProjectHeroImage } from '../utils/projectImage';
import { InteractiveHeading } from './InteractiveHeading';

interface ShowcaseReelProps {
  projects: Project[];
  currentLang: Language;
  onSelectProject: (project: Project) => void;
}

export const ShowcaseReel: React.FC<ShowcaseReelProps> = ({
  projects,
  currentLang,
  onSelectProject,
}) => {
  const t = translations[currentLang];
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1); // 0.5, 1, 2
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleUpdate = () => setRefreshKey((prev) => prev + 1);
    window.addEventListener('project_image_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('project_image_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Triple the list for smooth infinite reel looping
  const displayProjects = [...projects, ...projects, ...projects];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let lastTime = performance.now();
    const baseSpeed = 0.6; // pixels per ms

    const step = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      if (isPlaying && !isHovered && container) {
        container.scrollLeft += baseSpeed * speedMultiplier * (delta / 16.6);

        // Infinite loop reset logic: when scroll reaches 2/3, loop back to 1/3 seamlessly
        const maxScroll = container.scrollWidth / 3;
        if (container.scrollLeft >= maxScroll * 2) {
          container.scrollLeft -= maxScroll;
        } else if (container.scrollLeft <= 0) {
          container.scrollLeft += maxScroll;
        }
      }

      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, isHovered, speedMultiplier]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    playClickSound();
    if (scrollContainerRef.current) {
      const scrollAmount = 480;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleSpeedChange = (mult: number) => {
    playClickSound();
    setSpeedMultiplier(mult);
  };

  return (
    <section id="showcase-section" className="py-20 border-b border-[#1a1a1a] bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 text-[10px] font-mono text-[#888] uppercase tracking-[0.3em] mb-2">
              <div className="w-6 h-[1px] bg-white"></div>
              <span>{t.showcase.badge}</span>
            </div>
            <InteractiveHeading
              as="h2"
              text={t.showcase.title}
              className="text-3xl sm:text-5xl font-black italic text-white tracking-tighter font-display uppercase leading-tight"
            />
            <p className="text-[#888] text-sm mt-2 max-w-xl font-sans font-light leading-relaxed">
              {t.showcase.subtitle}
            </p>
          </div>

          {/* Interactive Reel Controls: Play/Pause, Speed, Manual Navigation */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Speed pills */}
            <div className="flex items-center bg-[#111] border border-[#222] p-1 text-[11px] font-mono">
              <span className="px-2 text-[#666] hidden sm:inline uppercase tracking-wider">{t.showcase.speedControl}:</span>
              {[0.5, 1, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => handleSpeedChange(s)}
                  className={`px-2 py-0.5 transition-colors ${
                    speedMultiplier === s
                      ? 'bg-white text-black font-bold'
                      : 'text-[#888] hover:text-white'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>

            {/* Play/Pause Button */}
            <button
              id="showcase-play-pause-btn"
              onClick={() => {
                playClickSound();
                setIsPlaying(!isPlaying);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 border text-xs font-mono tracking-wider uppercase transition-colors ${
                isPlaying ? 'bg-[#111] text-white border-[#333]' : 'bg-white text-black border-white font-bold'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>{t.showcase.pause}</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>{t.showcase.resume}</span>
                </>
              )}
            </button>

            {/* Left / Right Step Buttons */}
            <div className="flex items-center gap-1">
              <button
                id="showcase-prev-btn"
                onClick={() => handleManualScroll('left')}
                className="p-2 bg-[#111] hover:bg-[#1a1a1a] border border-[#222] text-[#888] hover:text-white transition-colors"
                title="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                id="showcase-next-btn"
                onClick={() => handleManualScroll('right')}
                className="p-2 bg-[#111] hover:bg-[#1a1a1a] border border-[#222] text-[#888] hover:text-white transition-colors"
                title="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling Interactive Reel Container */}
      <div
        id="interactive-showcase-reel"
        ref={scrollContainerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-6 lg:px-8 py-4 cursor-grab active:cursor-grabbing select-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {displayProjects.map((project, idx) => (
          <div
            key={`${project.id}-${idx}`}
            id={`showcase-card-${project.id}-${idx}`}
            onClick={() => {
              playClickSound();
              onSelectProject(project);
            }}
            onMouseEnter={() => playHoverSound()}
            className="group relative flex-shrink-0 w-[340px] sm:w-[420px] md:w-[480px] bg-[#151515] border border-[#282828] hover:border-white/50 transition-all duration-500 overflow-hidden cursor-pointer flex flex-col justify-between"
          >
            {/* Top Bar: Minimalist Case Number & Client */}
            <div className="p-4 flex items-center justify-between border-b border-[#222] bg-[#111]/90 z-10 font-mono">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#888]">
                  CASE STUDY — 0{((idx % projects.length) + 1)}
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#666] group-hover:text-white transition-colors flex items-center gap-1">
                {project.category === 'spatial' ? 'art installations' : project.category === 'brand' ? 'game product' : project.category} // {project.year}
              </span>
            </div>

            {/* High-res Image Preview Frame */}
            <div className="relative aspect-[16/10] overflow-hidden bg-black">
              <img
                src={getProjectHeroImage(project.id, project.heroImage)}
                alt={project.title[currentLang]}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-black/30 opacity-90"></div>

              {/* Client Tag */}
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 backdrop-blur-sm border border-white/20 text-[10px] font-mono tracking-wider text-white uppercase">
                {project.client}
              </div>
            </div>

            {/* Card Content Footer */}
            <div className="p-6 flex-1 flex flex-col justify-between bg-[#151515]">
              <div>
                <h3 className="text-xl sm:text-2xl font-black italic text-white group-hover:text-white transition-colors font-display tracking-tighter uppercase leading-tight">
                  {project.title[currentLang]}
                </h3>
                <p className="text-xs text-[#888] mt-2 line-clamp-2 leading-relaxed font-light">
                  {project.tagline[currentLang]}
                </p>
              </div>

              {/* Tag Badges & View Arrow Circle */}
              <div className="mt-5 pt-4 border-t border-[#222] flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 2).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 bg-[#111] text-[10px] font-mono text-[#888] border border-[#282828] uppercase tracking-wider"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-[#AAA] group-hover:text-white">
                  <span className="hidden sm:inline text-[10px]">{t.showcase.viewCaseStudy}</span>
                  <div className="w-8 h-8 border border-white/40 group-hover:border-white group-hover:bg-white group-hover:text-black rounded-full flex items-center justify-center transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Drag & Hover Hint Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 flex items-center justify-between text-xs font-mono text-[#666]">
        <span className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 bg-white"></span>
          {t.showcase.dragHint}
        </span>
        <span className="tracking-widest uppercase">{projects.length} ARCHIVAL SPECIMENS</span>
      </div>
    </section>
  );
};
