import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Github, ArrowLeft, ArrowRight, Check, Sparkles, Layers, Upload, RotateCcw } from 'lucide-react';
import { Project, Language } from '../types';
import { translations } from '../i18n/translations';
import { playClickSound, playPopSound } from '../utils/sound';
import { InteractiveHeading } from './InteractiveHeading';
import { DesignSketchesGrid } from './DesignSketchesGrid';
import {
  getProjectHeroImage,
  setProjectHeroImage,
  resetProjectHeroImage,
  getProjectGalleryImage,
  setProjectGalleryImage,
  resetProjectGalleryImage,
} from '../utils/projectImage';

interface ProjectModalProps {
  project: Project | null;
  allProjects: Project[];
  currentLang: Language;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  allProjects,
  currentLang,
  onClose,
  onSelectProject,
}) => {
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const [customHeroImg, setCustomHeroImg] = useState<string | null>(null);
  const [customGalleryImgs, setCustomGalleryImgs] = useState<Record<number, string>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [draggingGalleryIdx, setDraggingGalleryIdx] = useState<number | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [galleryUploadSuccessIdx, setGalleryUploadSuccessIdx] = useState<number | null>(null);

  useEffect(() => {
    const updateImages = () => {
      if (project) {
        const stored = getProjectHeroImage(project.id, project.heroImage);
        setCustomHeroImg(stored !== project.heroImage ? stored : null);

        if (project.gallery) {
          const loaded: Record<number, string> = {};
          project.gallery.forEach((defaultImg, idx) => {
            const custom = getProjectGalleryImage(project.id, idx, defaultImg);
            if (custom !== defaultImg) {
              loaded[idx] = custom;
            }
          });
          setCustomGalleryImgs(loaded);
        } else {
          setCustomGalleryImgs({});
        }
      }
    };

    updateImages();

    window.addEventListener('project_image_updated', updateImages);
    window.addEventListener('storage', updateImages);
    return () => {
      window.removeEventListener('project_image_updated', updateImages);
      window.removeEventListener('storage', updateImages);
    };
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const t = translations[currentLang];
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  const currentDisplayImage = customHeroImg || project.heroImage;

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result && project) {
        setCustomHeroImg(result);
        setProjectHeroImage(project.id, result);
        playPopSound(980, 'sine', 0.05);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 2500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile(file);
    }
  };

  const handleResetImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project) {
      resetProjectHeroImage(project.id);
      setCustomHeroImg(null);
      playClickSound();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageFile(file);
    }
  };

  const handleGalleryImageFile = (index: number, file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result && project) {
        setCustomGalleryImgs((prev) => ({ ...prev, [index]: result }));
        setProjectGalleryImage(project.id, index, result);
        playPopSound(980, 'sine', 0.05);
        setGalleryUploadSuccessIdx(index);
        setTimeout(() => setGalleryUploadSuccessIdx(null), 2500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGalleryFileInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleGalleryImageFile(index, file);
    }
  };

  const handleResetGalleryImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (project) {
      resetProjectGalleryImage(project.id, index);
      setCustomGalleryImgs((prev) => {
        const next = { ...prev };
        delete next[index];
        return next;
      });
      playClickSound();
    }
  };

  const handleGalleryDragOver = (index: number, e: React.DragEvent) => {
    e.preventDefault();
    setDraggingGalleryIdx(index);
  };

  const handleGalleryDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggingGalleryIdx(null);
  };

  const handleGalleryDrop = (index: number, e: React.DragEvent) => {
    e.preventDefault();
    setDraggingGalleryIdx(null);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleGalleryImageFile(index, file);
    }
  };

  return (
    <div
      id="project-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex justify-center p-0 sm:p-4 md:p-6 animate-fadeIn"
    >
      <div
        id="project-modal-container"
        className="relative w-full max-w-5xl bg-[#080808] border border-[#282828] text-[#F5F5F5] shadow-2xl min-h-screen sm:min-h-0 sm:my-auto flex flex-col overflow-hidden"
      >
        {/* Sticky Top Header Bar */}
        <div className="sticky top-0 z-30 bg-[#080808]/95 backdrop-blur-md border-b border-[#1a1a1a] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-[1px] bg-white"></div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-white">
              {project.category === 'spatial' ? 'art installations' : project.category === 'brand' ? 'game product' : project.category} // {project.year}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => playClickSound()}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-[#111] hover:bg-white hover:text-black border border-[#222] text-white text-xs font-mono uppercase tracking-wider transition-colors"
              >
                <span>{t.modal.liveDemo}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => playClickSound()}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-[#111] hover:bg-white hover:text-black border border-[#222] text-white text-xs font-mono uppercase tracking-wider transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>
            )}

            <button
              id="modal-close-btn"
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="p-2 bg-[#111] hover:bg-white hover:text-black text-white border border-[#222] transition-colors"
              title={t.modal.close}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Main Scrollable Body */}
        <div className="p-6 sm:p-10 space-y-12">
          {/* Title & Headline */}
          <div>
            {[project.client, project.role[currentLang]].filter(Boolean).length > 0 && (
              <div className="text-[10px] font-mono text-[#888] mb-2 uppercase tracking-[0.3em]">
                {[project.client, project.role[currentLang]].filter(Boolean).join(' · ')}
              </div>
            )}
            <InteractiveHeading
              as="h1"
              text={project.title[currentLang]}
              className="text-3xl sm:text-5xl font-black italic text-white tracking-tighter font-display uppercase leading-tight"
            />
            <p className="text-base sm:text-xl text-[#AAA] mt-3 font-light leading-relaxed max-w-3xl">
              {project.subtitle[currentLang]}
            </p>
          </div>

          {/* Project Meta Spec Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[#111] border border-[#222] font-mono text-xs">
            <div>
              <span className="text-[#666] block mb-1 uppercase tracking-wider text-[10px]">{t.modal.client}</span>
              <span className="text-white font-semibold">{project.client}</span>
            </div>
            <div>
              <span className="text-[#666] block mb-1 uppercase tracking-wider text-[10px]">{t.modal.timeline}</span>
              <span className="text-white font-semibold">{project.duration[currentLang]}</span>
            </div>
            <div>
              <span className="text-[#666] block mb-1 uppercase tracking-wider text-[10px]">{t.modal.role}</span>
              <span className="text-white font-semibold">{project.role[currentLang]}</span>
            </div>
            <div>
              <span className="text-[#666] block mb-1 uppercase tracking-wider text-[10px]">{t.modal.category}</span>
              <span className="text-white font-semibold uppercase">
                {project.categoryLabel?.[currentLang] || t.filter[project.category] || project.category}
              </span>
            </div>
          </div>

          {/* Hero Image Showcase */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border overflow-hidden bg-black relative group aspect-[16/9] transition-all duration-300 ${
              isDragging ? 'border-white ring-2 ring-white/50' : 'border-[#282828] hover:border-white/40'
            }`}
          >
            <img
              src={currentDisplayImage}
              alt={project.title[currentLang]}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
            />

            {/* Dragging Active Overlay */}
            {isDragging && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-30 pointer-events-none">
                <Upload className="w-10 h-10 text-white animate-bounce" />
                <span className="font-mono text-sm text-white font-bold tracking-widest uppercase">
                  {currentLang === 'zh' ? '松开鼠标立即替换图片' : 'Drop to Replace Image'}
                </span>
              </div>
            )}

            {/* Hover Action Bar & Upload Trigger */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-20">
              {/* Top Bar inside image */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {customHeroImg ? (
                    <span className="px-2.5 py-1 bg-white text-black text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow">
                      <Check className="w-3 h-3" />
                      {currentLang === 'zh' ? '自定义图片生效中' : 'Custom Image Active'}
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white uppercase tracking-wider">
                      {currentLang === 'zh' ? '官方渲染原图' : 'Official Specimen'}
                    </span>
                  )}
                </div>

                {customHeroImg && (
                  <button
                    onClick={handleResetImage}
                    className="px-3 py-1.5 bg-black/80 hover:bg-white hover:text-black border border-white/30 text-xs font-mono text-white flex items-center gap-1.5 uppercase tracking-wider transition-colors shadow"
                    title={currentLang === 'zh' ? '恢复默认原图' : 'Reset to Default Image'}
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{currentLang === 'zh' ? '恢复默认' : 'Reset'}</span>
                  </button>
                )}
              </div>

              {/* Center Upload CTA */}
              <label
                htmlFor={`project-modal-image-upload-${project.id}`}
                className="self-center px-4 py-2.5 bg-white text-black hover:bg-[#E5E5E5] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-2xl transform group-hover:scale-105 transition-all"
              >
                <Upload className="w-4 h-4 text-black" />
                <span>{currentLang === 'zh' ? '点击或拖拽上传替换图片' : 'Upload / Replace Image'}</span>
                <input
                  id={`project-modal-image-upload-${project.id}`}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileInputChange}
                />
              </label>

              {/* Bottom spec label */}
              <div className="flex items-center justify-between text-[11px] font-mono text-[#AAA]">
                <span>{uploadSuccess ? '✓ ' + (currentLang === 'zh' ? '图片已保存并更新' : 'Image Updated & Saved') : (currentLang === 'zh' ? '支持 JPG / PNG / WEBP' : 'Supports JPG / PNG / WEBP')}</span>
                <span className="uppercase tracking-wider">HERO SPECIMEN // 4K RENDER</span>
              </div>
            </div>

            {/* Non-hover indicator */}
            {!isDragging && (
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-md border border-[#333] text-xs font-mono text-[#AAA] uppercase tracking-wider group-hover:opacity-0 transition-opacity">
                {customHeroImg ? (currentLang === 'zh' ? '自定义图 // 4K' : 'CUSTOM // 4K') : 'HERO SPECIMEN // 4K RENDER'}
              </div>
            )}
          </div>

          {/* Project Overview */}
          {Boolean(project.overview?.[currentLang]?.trim()) && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4">
                <h3 className="text-base font-bold font-mono text-white uppercase tracking-[0.2em] flex items-center gap-2">
                  {currentLang === 'zh' ? '——项目概述' : '—— PROJECT OVERVIEW'}
                </h3>
              </div>
              <div className="lg:col-span-8">
                <p className="text-base sm:text-lg text-white leading-relaxed font-sans font-light whitespace-pre-line">
                  {project.overview[currentLang]}
                </p>
              </div>
            </div>
          )}

          {/* Gallery Showcase Grid */}
          {project.gallery && project.gallery.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold font-mono text-white uppercase tracking-[0.2em] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-white" />
                  <span>{currentLang === 'zh' ? '现场照片 ON-SITE PHOTOS' : 'ON-SITE PHOTOS / 现场照片'}</span>
                </h3>
                <span className="text-[11px] font-mono text-[#888] uppercase tracking-wider hidden sm:inline">
                  {currentLang === 'zh' ? '支持点击或拖拽替换任意图片' : 'Click or drop to replace images'}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.gallery.map((imgUrl, gIdx) => {
                  const displayImg = customGalleryImgs[gIdx] || imgUrl;
                  const isCustom = Boolean(customGalleryImgs[gIdx]);
                  const isItemDragging = draggingGalleryIdx === gIdx;

                  return (
                    <div
                      key={gIdx}
                      onDragOver={(e) => handleGalleryDragOver(gIdx, e)}
                      onDragLeave={handleGalleryDragLeave}
                      onDrop={(e) => handleGalleryDrop(gIdx, e)}
                      className={`aspect-[16/10] bg-black border overflow-hidden group relative transition-all duration-300 ${
                        isItemDragging
                          ? 'border-white ring-2 ring-white/50'
                          : 'border-[#282828] hover:border-white/40'
                      }`}
                    >
                      <img
                        src={displayImg}
                        alt={`Gallery artifact ${gIdx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />

                      {/* Dragging Active Overlay */}
                      {isItemDragging && (
                        <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center gap-2 z-30 pointer-events-none">
                          <Upload className="w-8 h-8 text-white animate-bounce" />
                          <span className="font-mono text-xs text-white font-bold tracking-widest uppercase">
                            {currentLang === 'zh' ? '松开鼠标替换此图' : 'Drop to Replace'}
                          </span>
                        </div>
                      )}

                      {/* Hover Action Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 z-20">
                        {/* Top info badge & reset */}
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white uppercase tracking-wider">
                            {isCustom
                              ? (currentLang === 'zh' ? `自定义图 0${gIdx + 1}` : `CUSTOM 0${gIdx + 1}`)
                              : `SPECIMEN 0${gIdx + 1}`}
                          </span>

                          {isCustom && (
                            <button
                              onClick={(e) => handleResetGalleryImage(gIdx, e)}
                              className="px-2 py-1 bg-black/80 hover:bg-white hover:text-black border border-white/30 text-[10px] font-mono text-white flex items-center gap-1 uppercase tracking-wider transition-colors shadow"
                              title={currentLang === 'zh' ? '恢复默认图片' : 'Reset to Default Image'}
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>{currentLang === 'zh' ? '重置' : 'Reset'}</span>
                            </button>
                          )}
                        </div>

                        {/* Center Action Buttons */}
                        <div className="flex items-center justify-center gap-2">
                          <label
                            htmlFor={`gallery-upload-${project.id}-${gIdx}`}
                            onClick={(e) => e.stopPropagation()}
                            className="px-3 py-1.5 bg-white text-black hover:bg-[#E5E5E5] font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-lg transform hover:scale-105 transition-all"
                          >
                            <Upload className="w-3.5 h-3.5 text-black" />
                            <span>{currentLang === 'zh' ? '替换图片' : 'Replace'}</span>
                            <input
                              id={`gallery-upload-${project.id}-${gIdx}`}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleGalleryFileInputChange(gIdx, e)}
                            />
                          </label>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              playClickSound();
                              setSelectedGalleryImg(displayImg);
                            }}
                            className="px-3 py-1.5 bg-black/80 hover:bg-white hover:text-black text-white border border-white/40 font-mono text-[11px] uppercase tracking-wider transition-colors"
                          >
                            {currentLang === 'zh' ? '查看大图' : 'View'}
                          </button>
                        </div>

                        {/* Bottom spec label */}
                        <div className="flex items-center justify-between text-[10px] font-mono text-[#AAA]">
                          <span>
                            {galleryUploadSuccessIdx === gIdx
                              ? '✓ ' + (currentLang === 'zh' ? '已更新' : 'Updated')
                              : (currentLang === 'zh' ? '支持拖拽上传' : 'Drag & drop supported')}
                          </span>
                          <span className="uppercase tracking-wider">HI-RES // SPECIMEN</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Design Sketches & Renderings 6-Grid Showcase with Hover Zoom */}
          <DesignSketchesGrid project={project} currentLang={currentLang} />
        </div>

        {/* Bottom Continuous Navigation: Prev / Next Case Study */}
        <div className="mt-auto border-t border-[#1a1a1a] bg-[#080808] grid grid-cols-2 divide-x divide-[#1a1a1a]">
          <button
            id="modal-prev-project-btn"
            onClick={() => {
              playClickSound();
              onSelectProject(prevProject);
            }}
            className="p-6 text-left hover:bg-white/[0.04] transition-colors group flex items-center justify-between"
          >
            <div>
              <span className="text-[10px] font-mono text-[#666] uppercase block mb-1 tracking-widest">
                ← {t.modal.prevProject}
              </span>
              <span className="text-sm sm:text-base font-black italic text-white group-hover:text-white transition-colors font-display uppercase tracking-tight line-clamp-1">
                {prevProject.title[currentLang]}
              </span>
            </div>
            <ArrowLeft className="w-4 h-4 text-[#666] group-hover:text-white transition-colors" />
          </button>

          <button
            id="modal-next-project-btn"
            onClick={() => {
              playClickSound();
              onSelectProject(nextProject);
            }}
            className="p-6 text-right hover:bg-white/[0.04] transition-colors group flex items-center justify-between"
          >
            <ArrowRight className="w-4 h-4 text-[#666] group-hover:text-white transition-colors" />
            <div>
              <span className="text-[10px] font-mono text-[#666] uppercase block mb-1 tracking-widest">
                {t.modal.nextProject} →
              </span>
              <span className="text-sm sm:text-base font-black italic text-white group-hover:text-white transition-colors font-display uppercase tracking-tight line-clamp-1">
                {nextProject.title[currentLang]}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Lightbox for High-Res Gallery Image Preview */}
      {selectedGalleryImg && (
        <div
          id="gallery-lightbox"
          onClick={() => setSelectedGalleryImg(null)}
          className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <img
            src={selectedGalleryImg}
            alt="Full size preview"
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[90vh] object-contain border border-white/20"
          />
          <button
            onClick={() => setSelectedGalleryImg(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
