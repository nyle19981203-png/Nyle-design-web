import React, { useState, useEffect, useRef } from 'react';
import {
  Maximize2,
  Upload,
  RotateCcw,
  Sparkles,
  Layers,
  ZoomIn,
  ZoomOut,
  X,
  Check,
  Eye,
  FileImage,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Language, Project } from '../types';
import { playClickSound, playPopSound } from '../utils/sound';
import {
  getProjectSketchImage,
  setProjectSketchImage,
  resetProjectSketchImage,
} from '../utils/projectImage';

interface DesignSketchesGridProps {
  project: Project;
  currentLang: Language;
}

interface SketchItemDef {
  titleZh: string;
  titleEn: string;
  tagZh: string;
  tagEn: string;
  defaultImg: string;
}

const getProjectDefaultSketches = (project: Project): SketchItemDef[] => {
  if (project.sketches && project.sketches.length > 0) {
    return project.sketches;
  }

  if (project.category === 'product') {
    return [
      {
        titleZh: '产品草图 · 造型语义与人机工学',
        titleEn: 'Product Sketch · Ergonomics & Form Semantics',
        tagZh: '草图 01 / 人机工学',
        tagEn: 'SKETCH 01 / ERGONOMICS',
        defaultImg: project.gallery[0] || project.heroImage,
      },
      {
        titleZh: '结构拆解 · 内部元器件与机械构造',
        titleEn: 'Internal Architecture · Mechanical & Component Spec',
        tagZh: '草图 02 / 机械结构',
        tagEn: 'SKETCH 02 / HARDWARE ARCH',
        defaultImg: project.gallery[1] || project.heroImage,
      },
      {
        titleZh: '精工渲染 · 材质质感与光泽模拟',
        titleEn: 'Precision Rendering · Materials & Optical Reflection',
        tagZh: '效果图 03 / RENDERING',
        tagEn: 'RENDER 03 / FINISH',
        defaultImg: project.gallery[2] || project.heroImage,
      },
      {
        titleZh: '细节剖面 · 倒角公差与接口装配',
        titleEn: 'Detail Section · Tolerances & Bezel Joint Anatomy',
        tagZh: '效果图 04 / DETAIL',
        tagEn: 'RENDER 04 / DETAIL',
        defaultImg: project.gallery[3] || project.heroImage,
      },
      {
        titleZh: '交互模拟 · 微触觉与反馈动态原型',
        titleEn: 'Interaction Spec · Micro-haptics & Feedback Motion',
        tagZh: '效果图 05 / INTERACTION',
        tagEn: 'RENDER 05 / MOTION',
        defaultImg: project.heroImage,
      },
      {
        titleZh: '视觉架构 · 瑞士网格与排版尺度',
        titleEn: 'Visual Hierarchy · Grid System & Scale Balance',
        tagZh: '效果图 06 / 尺度平衡',
        tagEn: 'SCALE & RATIO 06',
        defaultImg: project.gallery[0] || project.heroImage,
      },
    ];
  }

  if (project.category === 'code' || project.category === 'brand') {
    return [
      {
        titleZh: '架构草图 · 算法数据流与节点拓扑',
        titleEn: 'System Architecture · Algorithmic Dataflow & Nodes',
        tagZh: '架构 01 / 数据流图',
        tagEn: 'SPEC 01 / DATAFLOW',
        defaultImg: project.gallery[0] || project.heroImage,
      },
      {
        titleZh: '界面线框 · 无限画布与视口排版',
        titleEn: 'Wireframe · Infinite Canvas & Viewport Hierarchy',
        tagZh: '线框 02 / 视口系统',
        tagEn: 'WIREFRAME 02 / VIEWPORT',
        defaultImg: project.gallery[1] || project.heroImage,
      },
      {
        titleZh: '着色器渲染 · 动态场与视觉色彩模拟',
        titleEn: 'Shader Rendering · Dynamic Fields & Color Space',
        tagZh: '效果图 03 / RENDERING',
        tagEn: 'RENDER 03 / SHADER',
        defaultImg: project.gallery[2] || project.heroImage,
      },
      {
        titleZh: '细节规范 · 控件尺寸与无障碍对比度',
        titleEn: 'Design Tokens · Typography Scale & WCAG AA Ratios',
        tagZh: '规范 04 / DESIGN TOKEN',
        tagEn: 'SPEC 04 / TOKENS',
        defaultImg: project.gallery[3] || project.heroImage,
      },
      {
        titleZh: '协同流程 · 实时状态同步与状态机',
        titleEn: 'Collaboration Spec · State Sync & Multi-cursor HCI',
        tagZh: '流程 05 / 协同架构',
        tagEn: 'FLOW 05 / STATE SYNC',
        defaultImg: project.heroImage,
      },
      {
        titleZh: '响应式系统 · 多端视口自适应布局',
        titleEn: 'Responsive Solver · Multi-viewport Constraint Layout',
        tagZh: '响应式 06 / 视口自适应',
        tagEn: 'LAYOUT 06 / FLUID GRID',
        defaultImg: project.gallery[0] || project.heroImage,
      },
    ];
  }

  if (project.category === 'motion') {
    return [
      {
        titleZh: '舞台草图 · 声场空间与几何光束布局',
        titleEn: 'Stage Scenography · Acoustic Geometry & Spatial Beams',
        tagZh: '舞台 01 / 声学空间',
        tagEn: 'STAGE 01 / ACOUSTICS',
        defaultImg: project.gallery[0] || project.heroImage,
      },
      {
        titleZh: '频段映射 · FFT 音频响应与波形动力学',
        titleEn: 'Harmonic Mapping · FFT Response & Wave Kinetics',
        tagZh: '动力学 02 / 音频波形',
        tagEn: 'KINETICS 02 / FFT AUDIO',
        defaultImg: project.gallery[1] || project.heroImage,
      },
      {
        titleZh: '现场渲染 · 4K GLSL 片元着色器光效模拟',
        titleEn: 'Live Render · 4K GLSL Fragment Shader Wavefields',
        tagZh: '效果图 03 / RENDERING',
        tagEn: 'RENDER 03 / GLSL 4K',
        defaultImg: project.gallery[2] || project.heroImage,
      },
      {
        titleZh: '中控细节 · MIDI 控制器与调音台界面',
        titleEn: 'Control Surface · WebMIDI & Hardware Faders UI',
        tagZh: '中控 04 / MIDI 面板',
        tagEn: 'SPEC 04 / CONTROLLER',
        defaultImg: project.gallery[3] || project.heroImage,
      },
      {
        titleZh: '动态采样 · 实时声画通感动力学',
        titleEn: 'Synesthesia Dynamics · Audio-Visual Latency & Physics',
        tagZh: '通感 05 / 声画同步',
        tagEn: 'SYNESTHESIA 05 / SYNC',
        defaultImg: project.heroImage,
      },
      {
        titleZh: '空间视效 · 沉浸式舞美多重视角',
        titleEn: 'Spatial Scenography · Immersive Concert Multiview',
        tagZh: '视效 06 / 多重视角',
        tagEn: 'SCENOGRAPHY 06 / MULTIVIEW',
        defaultImg: project.gallery[0] || project.heroImage,
      },
    ];
  }

  // Default spatial / installation sketches
  return [
    {
      titleZh: '概念草图 · 人机交互与氛围结构',
      titleEn: 'Concept Sketch · HCI & Atmospheric Structure',
      tagZh: '草图 01 / 交互与氛围',
      tagEn: 'SKETCH 01 / HCI & ATMOSPHERE',
      defaultImg:
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85',
    },
    {
      titleZh: '空间结构 · 结构与细节深化',
      titleEn: 'Spatial Structure · Structure & Detail Refinement',
      tagZh: '草图 02 / 结构与细节',
      tagEn: 'SKETCH 02 / STRUCTURE & DETAILS',
      defaultImg:
        'https://images.unsplash.com/photo-1581291518655-9523c932edcf?auto=format&fit=crop&w=1200&q=85',
    },
    {
      titleZh: '效果图 · 材质质感与光影模拟',
      titleEn: 'Rendering · Material & Lighting Simulation',
      tagZh: '效果图 03 / RENDERING',
      tagEn: 'RENDER 03',
      defaultImg:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    },
    {
      titleZh: '剖面细节 · 节点构造与工程深化',
      titleEn: 'Detail Section · Engineering & Joint Anatomy',
      tagZh: '效果图 04 / DETAIL',
      tagEn: 'RENDER 04',
      defaultImg:
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85',
    },
    {
      titleZh: '交互模拟 · 机械节点与动态原型',
      titleEn: 'Interaction Spec · Kinematics & Node Prototype',
      tagZh: '效果图 05 / INTERACTION',
      tagEn: 'RENDER 05',
      defaultImg:
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
    },
    {
      titleZh: '空间尺度与造型尺度衡量',
      titleEn: 'Spatial Scale & Form Proportion Analysis',
      tagZh: '效果图 06 / 尺度衡量',
      tagEn: 'SCALE & PROPORTION 06',
      defaultImg:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85',
    },
  ];
};

export const DesignSketchesGrid: React.FC<DesignSketchesGridProps> = ({
  project,
  currentLang,
}) => {
  const sketches = getProjectDefaultSketches(project);
  const [sketchImages, setSketchImages] = useState<string[]>([]);
  const [activeZoomIdx, setActiveZoomIdx] = useState<number | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Sync images from project custom storage or defaults
  const refreshImages = () => {
    const images = sketches.map((item, idx) =>
      getProjectSketchImage(project.id, idx, item.defaultImg)
    );
    setSketchImages(images);
  };

  useEffect(() => {
    refreshImages();
  }, [project.id]);

  useEffect(() => {
    const handleUpdate = () => refreshImages();
    window.addEventListener('project_sketch_updated', handleUpdate);
    return () => window.removeEventListener('project_sketch_updated', handleUpdate);
  }, [project.id]);

  // Handle single sketch image upload
  const handleUploadSketch = (idx: number, file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast(
        currentLang === 'zh'
          ? '请上传有效的图片文件 (JPG / PNG / WebP)'
          : 'Please upload a valid image file'
      );
      return;
    }

    playPopSound(1100, 'sine', 0.05);

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setProjectSketchImage(project.id, idx, dataUrl);
        setSketchImages((prev) => {
          const next = [...prev];
          next[idx] = dataUrl;
          return next;
        });
        showToast(
          currentLang === 'zh'
            ? `✓ 第 ${idx + 1} 张图片已更新并已保存！`
            : `✓ Image #${idx + 1} updated and saved!`
        );
      }
    };
    reader.readAsDataURL(file);
  };

  // Reset single image
  const handleResetSingle = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    resetProjectSketchImage(project.id, idx);
    setSketchImages((prev) => {
      const next = [...prev];
      next[idx] = sketches[idx].defaultImg;
      return next;
    });
    showToast(
      currentLang === 'zh'
        ? `第 ${idx + 1} 张图片已恢复为默认精选图`
        : `Image #${idx + 1} reset to default`
    );
  };

  // Reset all 6 images
  const handleResetAll = () => {
    playClickSound();
    sketches.forEach((_, idx) => {
      resetProjectSketchImage(project.id, idx);
    });
    setSketchImages(sketches.map((s) => s.defaultImg));
    showToast(
      currentLang === 'zh'
        ? '所有草图与效果图已全部恢复为默认展示'
        : 'All sketches & renderings reset to default'
    );
  };

  const showToast = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3200);
  };

  const isCustomImage = (idx: number) => {
    return (
      sketchImages[idx] &&
      sketchImages[idx] !== sketches[idx]?.defaultImg
    );
  };

  return (
    <div
      id="project-video-player-window"
      className="p-6 sm:p-8 bg-[#151515] border border-[#282828] space-y-6"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Layers className="w-4 h-4 text-white" />
            <h3 className="text-sm font-bold font-mono uppercase tracking-[0.2em] text-white">
              {currentLang === 'zh'
                ? '设计草图与效果图'
                : 'DESIGN SKETCHES & RENDERINGS'}
            </h3>
            <span className="px-2 py-0.5 bg-[#222] border border-[#333] text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
              6 MODULES // HOVER ZOOM
            </span>
          </div>
          <p className="text-[11px] font-mono text-[#888]">
            {currentLang === 'zh'
              ? '从概念手绘、体量推敲到空间光影与最终渲染 · 鼠标悬停放大预览'
              : 'From conceptual ideation and massing studies to spatial lighting & final renders · Hover to expand'}
          </p>
        </div>

        {/* Global Action Toolbar */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleResetAll}
            className="px-3 py-1.5 bg-[#1f1f1f] hover:bg-white hover:text-black border border-[#333] text-[11px] font-mono text-[#AAA] flex items-center gap-1.5 uppercase tracking-wider transition-colors"
            title="Reset All to Defaults"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{currentLang === 'zh' ? '重置全部' : 'Reset All'}</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {notificationMsg && (
        <div className="p-3 bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 text-xs font-mono flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{notificationMsg}</span>
          </div>
          <button
            onClick={() => setNotificationMsg(null)}
            className="text-cyan-400 hover:text-white px-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* 6-Grid Images Showcase */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sketches.map((item, idx) => {
          const imgSrc = sketchImages[idx] || item.defaultImg;
          const isHovered = hoveredIdx === idx;
          const isCustom = isCustomImage(idx);
          const isDragging = draggingIdx === idx;

          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDraggingIdx(idx);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDraggingIdx(null);
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDraggingIdx(null);
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                  handleUploadSketch(idx, e.dataTransfer.files[0]);
                }
              }}
              className={`group/card relative bg-[#0d0d0d] border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                isDragging
                  ? 'border-cyan-400 ring-2 ring-cyan-400/50 scale-[1.02]'
                  : isHovered
                  ? 'border-white/70 shadow-2xl z-10'
                  : 'border-[#242424] hover:border-[#444]'
              }`}
            >
              {/* Card Top Label Bar */}
              <div className="p-3 bg-[#111] border-b border-[#202020] flex items-center justify-between text-[10px] font-mono">
                <div className="flex items-center gap-1.5 text-white font-bold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{currentLang === 'zh' ? item.tagZh : item.tagEn}</span>
                </div>
                {isCustom && (
                  <span className="text-cyan-400 text-[9px] uppercase tracking-widest font-bold">
                    ✓ {currentLang === 'zh' ? '自定义' : 'Custom'}
                  </span>
                )}
              </div>

              {/* Main Image Viewport with Dynamic Hover Scale (鼠标放上去变大) */}
              <div
                onClick={() => {
                  playClickSound();
                  setActiveZoomIdx(idx);
                  setZoomScale(1);
                }}
                className="relative aspect-[4/3] w-full overflow-hidden bg-black cursor-zoom-in"
              >
                <img
                  src={imgSrc}
                  alt={currentLang === 'zh' ? item.titleZh : item.titleEn}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out transform group-hover/card:scale-115 group-hover/card:brightness-105"
                  loading="lazy"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-40 group-hover/card:opacity-20 transition-opacity duration-300 pointer-events-none" />

                {/* Hover Quick Zoom Cue Badge */}
                <div className="absolute top-3 right-3 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                  <div className="px-2.5 py-1 bg-black/85 backdrop-blur-sm border border-white/30 text-[10px] font-mono text-white flex items-center gap-1.5 shadow-lg">
                    <Maximize2 className="w-3 h-3 text-cyan-400" />
                    <span>{currentLang === 'zh' ? '全屏大图' : 'Enlarge'}</span>
                  </div>
                </div>

                {/* Dragging Active Overlay */}
                {isDragging && (
                  <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center gap-2 z-30 pointer-events-none">
                    <Upload className="w-6 h-6 text-cyan-400 animate-bounce" />
                    <span className="font-mono text-xs text-white font-bold">
                      {currentLang === 'zh' ? '松开立即更新' : 'Drop Image to Update'}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Bottom Meta & Actions */}
              <div className="p-3.5 bg-[#111] border-t border-[#202020] space-y-2.5">
                <div className="text-xs font-mono font-medium text-[#EEE] line-clamp-1 group-hover/card:text-white transition-colors">
                  {currentLang === 'zh' ? item.titleZh : item.titleEn}
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-[#1a1a1a]">
                  {/* View Details Button */}
                  <button
                    onClick={() => {
                      playClickSound();
                      setActiveZoomIdx(idx);
                      setZoomScale(1);
                    }}
                    className="text-[10px] font-mono text-[#AAA] hover:text-white flex items-center gap-1 uppercase tracking-wider transition-colors"
                  >
                    <Eye className="w-3 h-3 text-cyan-400" />
                    <span>{currentLang === 'zh' ? '放大' : 'Zoom'}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {/* Reset single button */}
                    {isCustom && (
                      <button
                        onClick={(e) => handleResetSingle(idx, e)}
                        className="text-[10px] font-mono text-[#888] hover:text-white transition-colors"
                        title={currentLang === 'zh' ? '恢复默认' : 'Reset'}
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>
                    )}

                    {/* Upload button for this card */}
                    <label
                      htmlFor={`sketch-file-input-${project.id}-${idx}`}
                      className="px-2 py-1 bg-[#1a1a1a] hover:bg-white hover:text-black border border-[#333] text-[10px] font-mono text-white flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Upload className="w-2.5 h-2.5" />
                      <span>{currentLang === 'zh' ? '换图' : 'Upload'}</span>
                      <input
                        id={`sketch-file-input-${project.id}-${idx}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            handleUploadSketch(idx, e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox / Zoom Modal for Enlarge View */}
      {activeZoomIdx !== null && (
        <div
          onClick={() => setActiveZoomIdx(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          {/* Top Floating Control Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between text-white z-50"
          >
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-[#1a1a1a] border border-[#333] font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider">
                {sketches[activeZoomIdx]?.tagEn} // HIGH-RES INSPECTION
              </div>
              <span className="font-mono text-xs text-[#AAA] hidden sm:inline">
                {currentLang === 'zh'
                  ? sketches[activeZoomIdx]?.titleZh
                  : sketches[activeZoomIdx]?.titleEn}
              </span>
            </div>

            {/* Zoom & Navigation Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomScale((s) => Math.max(0.6, s - 0.25))}
                className="p-2 bg-[#1a1a1a] hover:bg-white hover:text-black border border-[#333] rounded transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-2 font-mono text-xs text-[#AAA]">
                {Math.round(zoomScale * 100)}%
              </span>
              <button
                onClick={() => setZoomScale((s) => Math.min(3.0, s + 0.25))}
                className="p-2 bg-[#1a1a1a] hover:bg-white hover:text-black border border-[#333] rounded transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomScale(1)}
                className="px-2.5 py-1.5 bg-[#1a1a1a] hover:bg-white hover:text-black border border-[#333] font-mono text-xs rounded transition-colors"
              >
                100%
              </button>
              <button
                onClick={() => setActiveZoomIdx(null)}
                className="p-2 bg-white text-black hover:bg-[#eaeaea] rounded transition-colors ml-2"
                title="Close (ESC)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Left / Right Nav Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              playClickSound();
              setActiveZoomIdx((prev) =>
                prev === null ? 0 : (prev - 1 + sketches.length) % sketches.length
              );
              setZoomScale(1);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/80 hover:bg-white hover:text-black border border-white/20 text-white rounded-full transition-colors z-40"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              playClickSound();
              setActiveZoomIdx((prev) =>
                prev === null ? 0 : (prev + 1) % sketches.length
              );
              setZoomScale(1);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/80 hover:bg-white hover:text-black border border-white/20 text-white rounded-full transition-colors z-40"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Zoomed Image Screen */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-6xl max-h-[80vh] overflow-auto flex items-center justify-center p-4 transition-transform"
          >
            <img
              src={sketchImages[activeZoomIdx] || sketches[activeZoomIdx]?.defaultImg}
              alt="Expanded Preview"
              style={{
                transform: `scale(${zoomScale})`,
                transition: 'transform 0.2s ease-out',
              }}
              className="max-h-[75vh] w-auto object-contain border border-[#333] shadow-2xl cursor-grab"
            />
          </div>

          {/* Bottom Captions & Index Dots */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-6 inset-x-0 flex flex-col items-center gap-3 z-40 pointer-events-auto"
          >
            <div className="flex items-center gap-2">
              {sketches.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => {
                    playClickSound();
                    setActiveZoomIdx(dotIdx);
                    setZoomScale(1);
                  }}
                  className={`h-1.5 transition-all rounded-full ${
                    activeZoomIdx === dotIdx ? 'w-8 bg-cyan-400' : 'w-2 bg-white/30 hover:bg-white'
                  }`}
                />
              ))}
            </div>
            <p className="font-mono text-xs text-[#CCC] bg-black/80 px-4 py-1.5 border border-[#222]">
              {currentLang === 'zh'
                ? sketches[activeZoomIdx]?.titleZh
                : sketches[activeZoomIdx]?.titleEn}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
