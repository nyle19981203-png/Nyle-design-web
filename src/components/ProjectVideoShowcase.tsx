import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  Upload,
  Film,
  Check,
  Link,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { Language, Project } from '../types';
import { translations } from '../i18n/translations';
import { playClickSound, playPopSound } from '../utils/sound';
import {
  getProjectVideo,
  setProjectVideo,
  resetProjectVideo,
} from '../utils/projectImage';

interface ProjectVideoShowcaseProps {
  project: Project;
  currentLang: Language;
}

// Curated default high-quality creative motion sample videos per category
const DEFAULT_SPECIMEN_VIDEOS: Record<string, string> = {
  product: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  brand: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
  code: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  motion: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  spatial: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  default: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
};

export const ProjectVideoShowcase: React.FC<ProjectVideoShowcaseProps> = ({
  project,
  currentLang,
}) => {
  const t = translations[currentLang];
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultVideoSrc =
    DEFAULT_SPECIMEN_VIDEOS[project.category] || DEFAULT_SPECIMEN_VIDEOS.default;

  const [currentVideoSrc, setCurrentVideoSrc] = useState<string>(() =>
    getProjectVideo(project.id, defaultVideoSrc)
  );
  const [isCustomVideo, setIsCustomVideo] = useState<boolean>(() => {
    const custom = getProjectVideo(project.id, '');
    return Boolean(custom && custom !== defaultVideoSrc);
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.8);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isLooping, setIsLooping] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false);
  const [urlInputValue, setUrlInputValue] = useState<string>('');
  const [uploadToast, setUploadToast] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Sync state when project changes
  useEffect(() => {
    const custom = getProjectVideo(project.id, '');
    if (custom) {
      setCurrentVideoSrc(custom);
      setIsCustomVideo(true);
    } else {
      setCurrentVideoSrc(defaultVideoSrc);
      setIsCustomVideo(false);
    }
    setIsPlaying(false);
    setCurrentTime(0);
  }, [project.id, defaultVideoSrc]);

  // Listen for storage updates
  useEffect(() => {
    const handleUpdate = () => {
      const custom = getProjectVideo(project.id, '');
      if (custom) {
        setCurrentVideoSrc(custom);
        setIsCustomVideo(true);
      } else {
        setCurrentVideoSrc(defaultVideoSrc);
        setIsCustomVideo(false);
      }
    };
    window.addEventListener('project_video_updated', handleUpdate);
    return () => window.removeEventListener('project_video_updated', handleUpdate);
  }, [project.id, defaultVideoSrc]);

  // Video time formatting (MM:SS or HH:MM:SS)
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Play / Pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    playClickSound();
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Mute toggle
  const toggleMute = () => {
    if (!videoRef.current) return;
    playClickSound();
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && videoRef.current.volume === 0) {
      videoRef.current.volume = 0.8;
      setVolume(0.8);
    }
  };

  // Volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      const shouldMute = newVol === 0;
      videoRef.current.muted = shouldMute;
      setIsMuted(shouldMute);
    }
  };

  // Seek time
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  // Speed change cycle (0.75x -> 1.0x -> 1.25x -> 1.5x -> 2.0x)
  const cycleSpeed = () => {
    playClickSound();
    const speeds = [0.75, 1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackSpeed(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    playClickSound();
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // File Upload processing
  const handleProcessVideoFile = (file: File) => {
    if (!file.type.startsWith('video/')) {
      showToast(
        currentLang === 'zh'
          ? '请上传有效的视频格式文件 (.mp4, .webm, .mov)'
          : 'Please upload a valid video file (.mp4, .webm, .mov)'
      );
      return;
    }

    playPopSound(1200, 'sine', 0.08);

    // Read video as Data URL for IndexedDB persistence
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setProjectVideo(project.id, result);
        setCurrentVideoSrc(result);
        setIsCustomVideo(true);
        showToast(
          currentLang === 'zh'
            ? '✓ 自定义视频已成功上传并已本地持久化保存！'
            : '✓ Video successfully uploaded & saved to project!'
        );
        if (videoRef.current) {
          videoRef.current.load();
          videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      }
    };
    reader.onerror = () => {
      // Fallback to object URL if file is ultra large
      const objectUrl = URL.createObjectURL(file);
      setProjectVideo(project.id, objectUrl);
      setCurrentVideoSrc(objectUrl);
      setIsCustomVideo(true);
      showToast(
        currentLang === 'zh'
          ? '✓ 视频已加载就绪！'
          : '✓ Video loaded successfully!'
      );
    };
    reader.readAsDataURL(file);
  };

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessVideoFile(e.dataTransfer.files[0]);
    }
  };

  // File input change
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleProcessVideoFile(e.target.files[0]);
    }
  };

  // Reset to default specimen video
  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    resetProjectVideo(project.id);
    setCurrentVideoSrc(defaultVideoSrc);
    setIsCustomVideo(false);
    showToast(
      currentLang === 'zh' ? '已恢复为官方精选演示视频' : 'Reset to default specimen video'
    );
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // URL input submit
  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInputValue.trim()) return;
    playClickSound();
    const url = urlInputValue.trim();
    setProjectVideo(project.id, url);
    setCurrentVideoSrc(url);
    setIsCustomVideo(true);
    setShowUrlInput(false);
    setUrlInputValue('');
    showToast(
      currentLang === 'zh' ? '✓ 外部视频直链已成功加载！' : '✓ Video URL loaded successfully!'
    );
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const showToast = (msg: string) => {
    setUploadToast(msg);
    setTimeout(() => {
      setUploadToast(null);
    }, 3800);
  };

  return (
    <div
      id="project-video-player-window"
      className="p-6 sm:p-8 bg-[#151515] border border-[#282828] space-y-6"
    >
      {/* Video Window Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222] pb-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-white text-black flex items-center justify-center font-bold">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold font-mono uppercase tracking-[0.2em] text-white">
                {currentLang === 'zh' ? '交互视频演示窗口' : 'MOTION INTERACTION REEL'}
              </h3>
              <span className="px-2 py-0.5 bg-[#222] border border-[#333] text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                4K 60FPS
              </span>
            </div>
            <p className="text-[11px] font-mono text-[#888] mt-0.5">
              {currentLang === 'zh'
                ? '高帧率动态交互录屏、空间视觉呈现与真实运行体验'
                : 'High-fidelity motion recording and spatial interaction preview'}
            </p>
          </div>
        </div>

        {/* Video Actions & Status Tags */}
        <div className="flex items-center flex-wrap gap-2.5">
          {isCustomVideo ? (
            <span className="px-2.5 py-1 bg-white text-black text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow">
              <Check className="w-3 h-3 text-black" />
              {currentLang === 'zh' ? '自定义视频已生效' : 'Custom Video Active'}
            </span>
          ) : (
            <span className="px-2.5 py-1 bg-[#1c1c1c] border border-[#333] text-[10px] font-mono text-[#AAA] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              {currentLang === 'zh' ? '官方精选演示' : 'Specimen Demo'}
            </span>
          )}

          {/* Reset Button */}
          {isCustomVideo && (
            <button
              onClick={handleReset}
              className="px-2.5 py-1 bg-black/80 hover:bg-white hover:text-black border border-white/20 text-[10px] font-mono text-white flex items-center gap-1.5 uppercase tracking-wider transition-colors"
              title={currentLang === 'zh' ? '恢复默认演示视频' : 'Reset to Default Video'}
            >
              <RotateCcw className="w-3 h-3" />
              <span>{currentLang === 'zh' ? '重置' : 'Reset'}</span>
            </button>
          )}

          {/* URL Input Button */}
          <button
            onClick={() => {
              playClickSound();
              setShowUrlInput(!showUrlInput);
            }}
            className="px-2.5 py-1 bg-[#1e1e1e] hover:bg-[#2a2a2a] border border-[#333] text-[10px] font-mono text-[#CCC] flex items-center gap-1.5 uppercase tracking-wider transition-colors"
            title={currentLang === 'zh' ? '输入视频直链 URL' : 'Paste Video URL'}
          >
            <Link className="w-3 h-3" />
            <span>{currentLang === 'zh' ? '视频直链' : 'URL Link'}</span>
          </button>

          {/* Upload Video CTA */}
          <label
            htmlFor={`project-video-upload-input-${project.id}`}
            className="px-3.5 py-1.5 bg-white text-black hover:bg-[#E5E5E5] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md transform hover:scale-[1.02] transition-all"
          >
            <Upload className="w-3.5 h-3.5 text-black" />
            <span>{currentLang === 'zh' ? '上传我的视频' : 'Upload Video'}</span>
            <input
              id={`project-video-upload-input-${project.id}`}
              ref={fileInputRef}
              type="file"
              accept="video/mp4,video/webm,video/quicktime,video/x-m4v,video/*"
              className="hidden"
              onChange={handleFileInput}
            />
          </label>
        </div>
      </div>

      {/* URL Link Input Dropdown */}
      {showUrlInput && (
        <form
          onSubmit={handleApplyUrl}
          className="p-4 bg-[#0e0e0e] border border-[#2a2a2a] flex flex-col sm:flex-row items-stretch sm:items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex-1 flex items-center gap-2 bg-[#151515] border border-[#333] px-3 py-2">
            <Link className="w-4 h-4 text-[#777]" />
            <input
              type="url"
              placeholder={
                currentLang === 'zh'
                  ? '粘贴视频直链 (例如: https://.../video.mp4)'
                  : 'Paste direct video URL (e.g. https://.../video.mp4)'
              }
              value={urlInputValue}
              onChange={(e) => setUrlInputValue(e.target.value)}
              className="w-full bg-transparent text-xs font-mono text-white placeholder-[#555] outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-white text-black text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#eaeaea] transition-colors"
            >
              {currentLang === 'zh' ? '加载视频' : 'Load Video'}
            </button>
            <button
              type="button"
              onClick={() => setShowUrlInput(false)}
              className="px-3 py-2 bg-[#222] text-[#888] hover:text-white text-xs font-mono uppercase tracking-wider transition-colors"
            >
              {currentLang === 'zh' ? '取消' : 'Cancel'}
            </button>
          </div>
        </form>
      )}

      {/* Main Video Viewport & Player Screen */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={togglePlay}
        className={`relative aspect-[16/9] w-full bg-black border overflow-hidden cursor-pointer group transition-all duration-300 ${
          isDragging
            ? 'border-cyan-400 ring-4 ring-cyan-400/40'
            : 'border-[#282828] hover:border-white/50'
        }`}
      >
        <video
          ref={videoRef}
          src={currentVideoSrc}
          loop={isLooping}
          muted={isMuted}
          playsInline
          onTimeUpdate={() => {
            if (videoRef.current) {
              setCurrentTime(videoRef.current.currentTime);
            }
          }}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              setDuration(videoRef.current.duration);
              videoRef.current.playbackRate = playbackSpeed;
            }
          }}
          onEnded={() => setIsPlaying(false)}
          className="w-full h-full object-cover object-center"
        />

        {/* Subtle Scanline Overlay for Cyber Aesthetic */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-15" />

        {/* Dragging Active Overlay */}
        {isDragging && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center gap-4 z-40 pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-cyan-400/10 border-2 border-cyan-400 flex items-center justify-center animate-pulse">
              <Upload className="w-8 h-8 text-cyan-400 animate-bounce" />
            </div>
            <div className="text-center">
              <p className="font-mono text-base font-black text-white uppercase tracking-widest">
                {currentLang === 'zh' ? '松开鼠标立即载入视频' : 'Drop Video to Replace & Save'}
              </p>
              <p className="font-mono text-xs text-cyan-400 mt-1 uppercase">
                {currentLang === 'zh' ? '支持 MP4 / WEBM / MOV 格式' : 'Supports MP4 / WEBM / MOV'}
              </p>
            </div>
          </div>
        )}

        {/* Big Center Play Button Overlay (when paused and not dragging) */}
        {!isPlaying && !isDragging && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-20 pointer-events-none transition-all">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transform scale-100 group-hover:scale-110 transition-transform">
              <Play className="w-7 h-7 sm:w-8 sm:h-8 text-black fill-current translate-x-0.5" />
            </div>
          </div>
        )}

        {/* Top Status & Timestamp Header inside video */}
        <div
          className={`absolute top-0 inset-x-0 p-4 bg-gradient-to-b from-black/80 via-black/30 to-transparent z-20 flex items-center justify-between pointer-events-none transition-opacity duration-300 ${
            isHovered || !isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[10px] font-mono text-white/90 font-bold uppercase tracking-widest">
              {project.title[currentLang]} // MOTION REEL
            </span>
          </div>
          <div className="text-[11px] font-mono text-white/80 tracking-wider">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        {/* Bottom Custom Playback Controls Bar */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent z-30 flex flex-col gap-2 transition-opacity duration-300 ${
            isHovered || !isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Progress Slider Track */}
          <div className="relative flex items-center group/scrubber cursor-pointer">
            <input
              type="range"
              min="0"
              max={duration || 100}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-white/20 hover:bg-white/40 appearance-none rounded-none accent-white cursor-pointer transition-all"
            />
            {/* Played progress fill */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-cyan-400 pointer-events-none"
              style={{
                width: duration ? `${(currentTime / duration) * 100}%` : '0%',
              }}
            />
          </div>

          {/* Controls Lower Bar */}
          <div className="flex items-center justify-between text-white text-xs font-mono">
            {/* Left controls: Play/Pause, Volume, Time */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-1.5 hover:bg-white hover:text-black transition-colors rounded"
                title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              <div className="flex items-center gap-1.5 group/volume">
                <button
                  onClick={toggleMute}
                  className="p-1.5 hover:bg-white hover:text-black transition-colors rounded"
                  title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-red-400" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-white/30 accent-cyan-400 appearance-none cursor-pointer"
                />
              </div>

              <span className="text-[11px] text-[#AAA] hidden sm:inline">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Right controls: Speed, Loop, Replace, Fullscreen */}
            <div className="flex items-center gap-2">
              <button
                onClick={cycleSpeed}
                className="px-2 py-0.5 bg-white/10 hover:bg-white hover:text-black text-[10px] font-bold transition-colors uppercase rounded"
                title="Cycle Playback Speed"
              >
                {playbackSpeed}x
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  setIsLooping(!isLooping);
                }}
                className={`p-1.5 transition-colors rounded ${
                  isLooping ? 'text-cyan-400 hover:text-cyan-300' : 'text-[#777] hover:text-white'
                }`}
                title={isLooping ? 'Loop Enabled' : 'Loop Disabled'}
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={toggleFullscreen}
                className="p-1.5 hover:bg-white hover:text-black transition-colors rounded"
                title="Fullscreen (F)"
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upload & Spec Notification Toast */}
      {uploadToast && (
        <div className="p-3.5 bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 text-xs font-mono flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{uploadToast}</span>
          </div>
          <button
            onClick={() => setUploadToast(null)}
            className="text-cyan-400 hover:text-white px-1.5 py-0.5"
          >
            ✕
          </button>
        </div>
      )}

      {/* Bottom Features & Video Metadata Specs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px] font-mono text-[#888]">
        <div className="p-3 bg-[#101010] border border-[#222] flex items-center gap-2.5">
          <Upload className="w-3.5 h-3.5 text-white shrink-0" />
          <span>{currentLang === 'zh' ? '支持拖拽/点击上传本地视频' : 'Drag & drop or browse local files'}</span>
        </div>
        <div className="p-3 bg-[#101010] border border-[#222] flex items-center gap-2.5">
          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>{currentLang === 'zh' ? '本地数据库永久保存记录' : 'IndexedDB persistent state'}</span>
        </div>
        <div className="p-3 bg-[#101010] border border-[#222] flex items-center gap-2.5">
          <Film className="w-3.5 h-3.5 text-white shrink-0" />
          <span>{currentLang === 'zh' ? '支持 4K 原生视频与倍速播放' : '4K Ultra-HD playback engine'}</span>
        </div>
      </div>
    </div>
  );
};
