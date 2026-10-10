import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Play, RotateCcw, Volume2, Type, Sparkles, Sliders } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { playClickSound, playPopSound } from '../utils/sound';
import { InteractiveHeading } from './InteractiveHeading';

interface InteractiveLabProps {
  currentLang: Language;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  shape: 'circle' | 'square';
}

export const InteractiveLab: React.FC<InteractiveLabProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [labMode, setLabMode] = useState<'physics' | 'typography' | 'synth'>('physics');

  // Physics Canvas State
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Typography Playground State
  const [typeSample, setTypeSample] = useState<string>('NEXUS SPATIAL COMPUTING // 2026');
  const [fontSize, setFontSize] = useState<number>(36);
  const [letterSpacing, setLetterSpacing] = useState<number>(2);
  const [fontWeight, setFontWeight] = useState<number>(700);

  // Audio Synth State
  const [activeHarmonic, setActiveHarmonic] = useState<number | null>(null);

  const colors = ['#CCFF00', '#00F0FF', '#FF5533', '#A855F7', '#3B82F6', '#FFFFFF'];

  // Initialize and run Canvas Physics
  useEffect(() => {
    if (labMode !== 'physics') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      if (canvas) {
        canvas.width = canvas.parentElement?.clientWidth || 800;
        canvas.height = 360;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    // Initial seed particles
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < 24; i++) {
        particlesRef.current.push({
          x: Math.random() * (canvas.width - 40) + 20,
          y: Math.random() * (canvas.height - 40) + 20,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          radius: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: Math.random() > 0.5 ? 'circle' : 'square',
        });
      }
    }

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update and draw particles
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce walls
        if (p.x - p.radius <= 0 || p.x + p.radius >= canvas.width) {
          p.vx *= -0.92;
          p.x = Math.max(p.radius, Math.min(canvas.width - p.radius, p.x));
        }
        if (p.y - p.radius <= 0 || p.y + p.radius >= canvas.height) {
          p.vy *= -0.92;
          p.y = Math.max(p.radius, Math.min(canvas.height - p.radius, p.y));
        }

        // Draw connections if close
        particlesRef.current.forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - dist / 80)})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });

        // Draw particle
        ctx.fillStyle = p.color;
        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(p.x - p.radius, p.y - p.radius, p.radius * 2, p.radius * 2);
        }
      });

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [labMode]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    playPopSound(600 + Math.random() * 400, 'triangle', 0.04);

    for (let i = 0; i < 4; i++) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        radius: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: Math.random() > 0.5 ? 'circle' : 'square',
      });
    }

    if (particlesRef.current.length > 80) {
      particlesRef.current.splice(0, 4);
    }
  };

  const handleClearParticles = () => {
    playClickSound();
    particlesRef.current = [];
  };

  const handlePlaySynthNote = (harmonicFreq: number, index: number) => {
    playPopSound(harmonicFreq, 'sine', 0.2);
    setActiveHarmonic(index);
    setTimeout(() => setActiveHarmonic(null), 300);
  };

  const harmonicPads = [
    { freq: 220, label: 'A3 (220Hz)' },
    { freq: 277.18, label: 'C#4 (277Hz)' },
    { freq: 329.63, label: 'E4 (330Hz)' },
    { freq: 440, label: 'A4 (440Hz)' },
    { freq: 554.37, label: 'C#5 (554Hz)' },
    { freq: 659.25, label: 'E5 (659Hz)' },
    { freq: 880, label: 'A5 (880Hz)' },
    { freq: 1108.73, label: 'C#6 (1108Hz)' },
  ];

  return (
    <section id="lab-section" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#1a1a1a]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 text-[10px] font-mono text-[#888] uppercase tracking-[0.3em] mb-2">
            <div className="w-6 h-[1px] bg-white"></div>
            <span>{t.lab.badge}</span>
          </div>
          <InteractiveHeading
            as="h2"
            text={t.lab.title}
            className="text-3xl sm:text-5xl font-black italic text-white tracking-tighter font-display uppercase leading-tight"
          />
          <p className="text-[#888] text-sm sm:text-base mt-2 max-w-2xl font-sans font-light leading-relaxed">
            {t.lab.subtitle}
          </p>
        </div>

        {/* Experiment Selector Tabs */}
        <div className="flex items-center gap-2">
          {[
            { key: 'physics' as const, label: '01 // Physics', icon: <Sparkles className="w-3.5 h-3.5" /> },
            { key: 'typography' as const, label: '02 // Type Tester', icon: <Type className="w-3.5 h-3.5" /> },
            { key: 'synth' as const, label: '03 // Sound Synth', icon: <Volume2 className="w-3.5 h-3.5" /> },
          ].map((mode) => (
            <button
              key={mode.key}
              id={`lab-tab-${mode.key}`}
              onClick={() => {
                playClickSound();
                setLabMode(mode.key);
              }}
              className={`px-3.5 py-2 text-xs font-mono uppercase tracking-[0.15em] flex items-center gap-2 transition-colors border ${
                labMode === mode.key
                  ? 'bg-white text-black font-bold border-white'
                  : 'bg-[#111] text-[#888] border-[#222] hover:text-white hover:border-[#444]'
              }`}
            >
              {mode.icon}
              <span>{mode.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Experiment Sandbox Container */}
      <div className="bg-[#151515] border border-[#282828] p-6 sm:p-8">
        {/* Mode 1: Physics Canvas */}
        {labMode === 'physics' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between font-mono text-xs text-[#888]">
              <span className="flex items-center gap-2 text-white font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                {t.lab.gravityExperiment}
              </span>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline">{t.lab.gravityDesc}</span>
                <button
                  onClick={handleClearParticles}
                  className="px-3 py-1 bg-[#111] hover:bg-[#222] border border-[#333] text-white flex items-center gap-1.5 uppercase text-[11px] tracking-wider transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{t.lab.resetCanvas}</span>
                </button>
              </div>
            </div>

            <div className="relative border border-[#222] bg-[#080808] overflow-hidden cursor-crosshair">
              <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                className="w-full block"
                height={360}
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 border border-[#282828] text-[10px] font-mono text-[#888] pointer-events-none uppercase tracking-widest">
                CLICK OR DRAG TO EMIT MATTER
              </div>
            </div>
          </div>
        )}

        {/* Mode 2: Typography Specimen Tester */}
        {labMode === 'typography' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between font-mono text-xs text-[#888] border-b border-[#222] pb-3">
              <span className="text-white font-bold uppercase tracking-wider">{t.lab.typeTester}</span>
              <span>{t.lab.typeDesc}</span>
            </div>

            {/* Editable Text Sample Input */}
            <input
              type="text"
              value={typeSample}
              onChange={(e) => setTypeSample(e.target.value)}
              className="w-full px-4 py-3 bg-[#111] border border-[#222] text-white font-mono text-sm focus:outline-none focus:border-white uppercase transition-colors"
              placeholder="Type custom specimen..."
            />

            {/* Controls: Size, Tracking, Weight */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4 bg-[#111] border border-[#222] font-mono text-xs">
              <div>
                <label className="text-[#888] block mb-2 uppercase tracking-wider">SIZE: {fontSize}px</label>
                <input
                  type="range"
                  min={18}
                  max={72}
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full accent-white"
                />
              </div>

              <div>
                <label className="text-[#888] block mb-2 uppercase tracking-wider">TRACKING: {letterSpacing}px</label>
                <input
                  type="range"
                  min={-2}
                  max={12}
                  value={letterSpacing}
                  onChange={(e) => setLetterSpacing(Number(e.target.value))}
                  className="w-full accent-white"
                />
              </div>

              <div>
                <label className="text-[#888] block mb-2 uppercase tracking-wider">WEIGHT: {fontWeight}</label>
                <input
                  type="range"
                  min={300}
                  max={900}
                  step={100}
                  value={fontWeight}
                  onChange={(e) => setFontWeight(Number(e.target.value))}
                  className="w-full accent-white"
                />
              </div>
            </div>

            {/* Live Visual Specimen Display */}
            <div className="p-8 border border-[#222] bg-[#080808] min-h-[160px] flex items-center justify-center overflow-x-auto">
              <span
                style={{
                  fontSize: `${fontSize}px`,
                  letterSpacing: `${letterSpacing}px`,
                  fontWeight,
                }}
                className="text-white font-display italic text-center leading-tight transition-all uppercase tracking-tighter"
              >
                {typeSample || 'SWISS TYPOGRAPHY // 2026'}
              </span>
            </div>
          </div>
        )}

        {/* Mode 3: Audio Harmonic Synth */}
        {labMode === 'synth' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between font-mono text-xs text-[#888] border-b border-[#222] pb-3">
              <span className="text-white font-bold uppercase tracking-wider">{t.lab.soundTester}</span>
              <span>{t.lab.soundDesc}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {harmonicPads.map((pad, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePlaySynthNote(pad.freq, idx)}
                  className={`p-6 border text-left transition-all group flex flex-col justify-between h-32 ${
                    activeHarmonic === idx
                      ? 'bg-white text-black border-white scale-95'
                      : 'bg-[#111] hover:bg-[#1a1a1a] border-[#222] text-white'
                  }`}
                >
                  <span className="text-xs font-mono text-[#666] group-hover:text-[#AAA]">
                    CH_{idx + 1}
                  </span>
                  <div>
                    <span className="text-lg font-black italic font-mono block tracking-tight">{pad.label}</span>
                    <span className="text-[10px] font-mono uppercase text-[#666] tracking-wider">PURE SINE OSC</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
