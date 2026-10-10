import React, { useState, useMemo, useEffect } from 'react';
import { LayoutGrid, List, SlidersHorizontal, Search, ArrowUpRight, Check, Tag, Upload, RotateCcw } from 'lucide-react';
import { Project, ProjectCategory, Language } from '../types';
import { translations } from '../i18n/translations';
import { playClickSound, playHoverSound, playPopSound } from '../utils/sound';
import { getProjectHeroImage, setProjectHeroImage, resetProjectHeroImage } from '../utils/projectImage';
import { InteractiveHeading } from './InteractiveHeading';

interface ProjectGridProps {
  projects: Project[];
  currentLang: Language;
  onSelectProject: (project: Project) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  currentLang,
  onSelectProject,
}) => {
  const t = translations[currentLang];
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [draggingCardId, setDraggingCardId] = useState<string | null>(null);

  useEffect(() => {
    const handleUpdate = () => setRefreshKey((prev) => prev + 1);
    window.addEventListener('project_image_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('project_image_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleCardImageUpload = (projectId: string, file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setProjectHeroImage(projectId, result);
        playPopSound(980, 'sine', 0.05);
      }
    };
    reader.readAsDataURL(file);
  };

  const categories: { key: ProjectCategory; label: string }[] = [
    { key: 'all', label: t.filter.all },
    { key: 'product', label: t.filter.product },
    { key: 'spatial', label: t.filter.spatial },
    { key: 'motion', label: t.filter.motion },
    { key: 'brand', label: t.filter.brand },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const title = (p.title[currentLang] || p.title.en).toLowerCase();
      const subtitle = (p.subtitle[currentLang] || p.subtitle.en).toLowerCase();
      const client = p.client.toLowerCase();
      const tags = p.tags.join(' ').toLowerCase();
      const tech = p.techStack.join(' ').toLowerCase();

      const matchesSearch =
        title.includes(query) ||
        subtitle.includes(query) ||
        client.includes(query) ||
        tags.includes(query) ||
        tech.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery, currentLang]);

  return (
    <section id="projects-section" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#1a1a1a]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 text-[10px] font-mono text-[#888] uppercase tracking-[0.3em] mb-2">
            <div className="w-6 h-[1px] bg-white"></div>
            <span>PORTFOLIO DIRECTORY</span>
          </div>
          <InteractiveHeading
            as="h2"
            text={t.projects.sectionTitle}
            className="text-3xl sm:text-5xl font-black italic text-white tracking-tighter font-display uppercase leading-tight"
          />
          <p className="text-[#888] text-sm sm:text-base mt-2 max-w-2xl font-sans font-light leading-relaxed">
            {t.projects.sectionSubtitle}
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2">
          <button
            id="view-mode-grid"
            onClick={() => {
              playClickSound();
              setViewMode('grid');
            }}
            className={`p-2 border text-xs font-mono flex items-center gap-1.5 transition-colors uppercase tracking-wider ${
              viewMode === 'grid'
                ? 'bg-white text-black border-white font-bold'
                : 'bg-[#111] text-[#666] border-[#222] hover:text-white'
            }`}
            title={t.projects.viewMode.grid}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.projects.viewMode.grid}</span>
          </button>

          <button
            id="view-mode-list"
            onClick={() => {
              playClickSound();
              setViewMode('list');
            }}
            className={`p-2 border text-xs font-mono flex items-center gap-1.5 transition-colors uppercase tracking-wider ${
              viewMode === 'list'
                ? 'bg-white text-black border-white font-bold'
                : 'bg-[#111] text-[#666] border-[#222] hover:text-white'
            }`}
            title={t.projects.viewMode.list}
          >
            <List className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.projects.viewMode.list}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-12 pb-6 border-b border-[#1a1a1a]">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                id={`filter-cat-${cat.key}`}
                onClick={() => {
                  playClickSound();
                  setSelectedCategory(cat.key);
                }}
                className={`px-3.5 py-1.5 text-[11px] font-mono tracking-[0.15em] uppercase transition-all border ${
                  isSelected
                    ? 'bg-white text-black font-bold border-white'
                    : 'bg-[#111] text-[#888] border-[#222] hover:text-white hover:border-[#444]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full lg:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#666]" />
          <input
            id="project-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.projects.searchPlaceholder}
            className="w-full pl-9 pr-8 py-2 bg-[#111] border border-[#222] text-white placeholder-[#666] text-xs font-mono focus:outline-none focus:border-white transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] hover:text-white text-xs font-mono"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Projects Display: Grid vs List View */}
      {filteredProjects.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-[#222] bg-[#111]/30">
          <p className="text-[#666] font-mono text-xs uppercase tracking-widest">{t.projects.noResults}</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-white text-black text-xs font-mono uppercase tracking-wider font-bold hover:bg-[#E5E5E5] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Editorial High-Impact Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              onClick={() => {
                playClickSound();
                onSelectProject(project);
              }}
              onMouseEnter={() => playHoverSound()}
              onDragOver={(e) => {
                e.preventDefault();
                setDraggingCardId(project.id);
              }}
              onDragLeave={() => setDraggingCardId(null)}
              onDrop={(e) => {
                e.preventDefault();
                setDraggingCardId(null);
                const file = e.dataTransfer.files?.[0];
                if (file) handleCardImageUpload(project.id, file);
              }}
              className={`group relative bg-[#151515] border transition-all duration-500 flex flex-col justify-between cursor-pointer overflow-hidden ${
                draggingCardId === project.id ? 'border-white ring-2 ring-white/50' : 'border-[#282828] hover:border-white/50'
              }`}
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={getProjectHeroImage(project.id, project.heroImage)}
                  alt={project.title[currentLang]}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-black/30 opacity-90"></div>

                {/* Dragging Active Overlay */}
                {draggingCardId === project.id && (
                  <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center gap-2 z-30 pointer-events-none">
                    <Upload className="w-8 h-8 text-white animate-bounce" />
                    <span className="font-mono text-xs text-white font-bold tracking-widest uppercase">
                      {currentLang === 'zh' ? '松开鼠标直接替换为原图' : 'Drop to Replace Image'}
                    </span>
                  </div>
                )}

                {/* Top Labels */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-sm border border-white/20 text-[10px] font-mono font-bold tracking-widest uppercase text-white">
                  {project.category === 'spatial' ? 'art installations' : project.category === 'brand' ? 'game product' : project.category}
                </div>

                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <label
                    htmlFor={`grid-card-upload-${project.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="opacity-0 group-hover:opacity-100 px-2.5 py-1 bg-white text-black hover:bg-[#E5E5E5] text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-all shadow"
                    title={currentLang === 'zh' ? '上传并替换为你的原图' : 'Upload original image'}
                  >
                    <Upload className="w-3 h-3 text-black" />
                    <span>{currentLang === 'zh' ? '替换原图' : 'Replace'}</span>
                    <input
                      id={`grid-card-upload-${project.id}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleCardImageUpload(project.id, file);
                      }}
                    />
                  </label>

                  <div className="px-2.5 py-1 bg-black/80 backdrop-blur-sm border border-white/20 text-[10px] font-mono text-[#AAA]">
                    {project.year}
                  </div>
                </div>
              </div>

              {/* Card Meta & Typography */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono text-[#888] mb-2 uppercase tracking-[0.2em] min-h-[1rem]">
                    {[project.client, project.role[currentLang]].filter(Boolean).join(' · ')}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black italic text-white group-hover:text-white transition-colors font-display tracking-tighter uppercase leading-tight">
                    {project.title[currentLang]}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#888] mt-2 line-clamp-2 leading-relaxed font-light">
                    {project.subtitle[currentLang]}
                  </p>
                </div>

                {/* Bottom Key Metric and CTA */}
                <div className="mt-8 pt-4 border-t border-[#222] flex items-center justify-between">
                  {project.impact[0] ? (
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black italic font-mono text-white">
                        {project.impact[0].metric}
                      </span>
                      <span className="text-[10px] font-mono text-[#666] uppercase tracking-wider max-w-[140px] truncate">
                        {project.impact[0].label[currentLang]}
                      </span>
                    </div>
                  ) : (
                    <div></div>
                  )}

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#AAA] group-hover:text-white transition-colors">
                      {t.projects.clickToInspect}
                    </span>
                    <div className="w-8 h-8 border border-white/40 group-hover:border-white group-hover:bg-white group-hover:text-black text-white rounded-full flex items-center justify-center transition-all">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Minimalist Swiss List View */
        <div className="border border-[#222] divide-y divide-[#222] bg-[#111]">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              id={`project-list-row-${project.id}`}
              onClick={() => {
                playClickSound();
                onSelectProject(project);
              }}
              onMouseEnter={() => {
                playHoverSound();
                setHoveredProject(project);
              }}
              onMouseLeave={() => setHoveredProject(null)}
              className="group p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.04] transition-colors cursor-pointer"
            >
              <div className="flex items-start md:items-center gap-4">
                <span className="text-xs font-mono text-[#444] w-8">0{idx + 1}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-black italic text-white group-hover:text-white transition-colors font-display tracking-tighter uppercase">
                      {project.title[currentLang]}
                    </h3>
                  </div>
                  <p className="text-[11px] font-mono text-[#666] mt-1 md:hidden uppercase tracking-wider">
                    {project.client} · {project.year}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 text-xs font-mono text-[#888]">
                <span className="hidden md:inline text-[#AAA]">{project.client}</span>
                <span className="px-2 py-0.5 bg-[#1a1a1a] border border-[#282828] uppercase text-[10px] tracking-wider text-white">
                  {project.category}
                </span>
                <span className="text-[#666]">{project.year}</span>
                <div className="w-7 h-7 border border-white/20 group-hover:border-white group-hover:bg-white group-hover:text-black text-white rounded-full flex items-center justify-center transition-all">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
