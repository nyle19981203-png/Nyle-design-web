import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playPopSound } from '../utils/sound';

interface InteractiveHeadingProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3';
  id?: string;
  className?: string;
  enableMagnetic?: boolean;
  enableSound?: boolean;
  enableBurst?: boolean;
  subtitleHint?: string;
}

interface Spark {
  id: number;
  x: number;
  y: number;
  char: string;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

export const InteractiveHeading: React.FC<InteractiveHeadingProps> = ({
  text,
  as: Component = 'h1',
  id,
  className = '',
  enableSound = true,
  enableBurst = true,
  subtitleHint,
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isGlowing, setIsGlowing] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const nextSparkId = useRef(0);

  const displayChars = text.split('');

  // Mouse move handler for magnetic spotlight
  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
    setHoveredIdx(null);
  };

  // Spark burst on click
  const handleClick = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (!enableBurst || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    if (enableSound) {
      playPopSound(1400, 'triangle', 0.05);
    }

    setIsGlowing(true);
    setTimeout(() => setIsGlowing(false), 500);

    // Create micro artistic spark particles
    const colors = ['#00f0ff', '#ff007f', '#ffffff', '#ffd700', '#00ff88'];
    const glyphs = ['✦', '✧', '⚡', '▲', '⊕', '◇', '⌘', '●', '★'];
    const newSparks: Spark[] = [];

    for (let i = 0; i < 14; i++) {
      const angle = (Math.PI * 2 * i) / 14 + (Math.random() - 0.5);
      const speed = 2.5 + Math.random() * 4.5;
      newSparks.push({
        id: nextSparkId.current++,
        x: clickX,
        y: clickY,
        char: glyphs[Math.floor(Math.random() * glyphs.length)],
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 11 + Math.random() * 6,
      });
    }

    setSparks((prev) => [...prev, ...newSparks]);

    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => !newSparks.some((ns) => ns.id === s.id)));
    }, 750);
  };

  return (
    <div className="relative inline-block select-none group/heading max-w-full">
      {/* Interactive Title Heading */}
      <Component
        ref={containerRef}
        id={id}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className={`relative inline-flex flex-wrap items-center cursor-pointer transition-colors duration-200 ${className}`}
        style={{
          perspective: '1000px',
        }}
      >
        {/* Dynamic ambient spotlight under cursor */}
        {mousePos && (
          <div
            className="pointer-events-none absolute -inset-6 rounded-full opacity-40 blur-xl transition-opacity duration-300"
            style={{
              background: `radial-gradient(150px circle at ${mousePos.x + 24}px ${mousePos.y + 24}px, rgba(255, 255, 255, 0.28), rgba(0, 240, 255, 0.15), transparent 70%)`,
            }}
          />
        )}

        {/* Ambient Chromatic Aura on burst/click */}
        {isGlowing && (
          <span
            aria-hidden="true"
            className="absolute inset-0 text-cyan-400 opacity-70 blur-sm translate-x-[-1px] pointer-events-none select-none transition-opacity duration-300"
          >
            {text}
          </span>
        )}

        {/* Render interactive characters */}
        {displayChars.map((char, idx) => {
          const isSpace = char === ' ';
          const isHovered = hoveredIdx === idx;
          const isAdjacent = hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1;

          return (
            <motion.span
              key={`${idx}-${char}`}
              onMouseEnter={() => {
                setHoveredIdx(idx);
                if (enableSound && !isSpace) {
                  playPopSound(880 + (idx % 6) * 70, 'sine', 0.015);
                }
              }}
              className={`inline-block relative transition-colors duration-150 ${
                isSpace ? 'w-[0.3em]' : 'px-[0.02em]'
              } ${isHovered ? 'text-white' : ''}`}
              animate={{
                y: isHovered ? -8 : isAdjacent ? -3 : 0,
                scale: isHovered ? 1.15 : isAdjacent ? 1.05 : 1,
                rotateZ: isHovered ? (idx % 2 === 0 ? 3 : -3) : isAdjacent ? (idx % 2 === 0 ? 1.5 : -1.5) : 0,
                rotateX: isHovered ? 10 : 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 450,
                damping: 18,
                mass: 0.5,
              }}
              style={{
                display: 'inline-block',
                transformOrigin: 'bottom center',
                textShadow: isHovered
                  ? '0 0 16px rgba(255,255,255,0.9), 0 0 28px rgba(0,240,255,0.65)'
                  : undefined,
              }}
            >
              {char}
            </motion.span>
          );
        })}
      </Component>

      {/* Floating Burst Sparks */}
      <AnimatePresence>
        {sparks.map((spark) => (
          <motion.span
            key={spark.id}
            initial={{
              x: spark.x,
              y: spark.y,
              opacity: 1,
              scale: 0.5,
            }}
            animate={{
              x: spark.x + spark.vx * 16,
              y: spark.y + spark.vy * 16 - 20,
              opacity: 0,
              scale: 1.3,
              rotate: (Math.random() - 0.5) * 180,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="pointer-events-none absolute z-30 font-mono font-black"
            style={{
              color: spark.color,
              fontSize: `${spark.size}px`,
              textShadow: `0 0 8px ${spark.color}`,
            }}
          >
            {spark.char}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Playful Interactive Tooltip / Hint */}
      <div className="opacity-0 group-hover/heading:opacity-100 transition-opacity duration-300 pointer-events-none mt-2 flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span className="text-[9px] font-mono tracking-[0.25em] text-[#888] uppercase">
          {subtitleHint || 'HOVER FOR KINETIC WAVE · CLICK TO BURST'}
        </span>
      </div>
    </div>
  );
};

