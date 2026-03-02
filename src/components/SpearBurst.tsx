import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SpearParticle {
  id: number;
  x: number;
  y: number;
  angle: number;
  size: number;
  distance: number;
  delay: number;
  variant: number;
  hueShift: number;
}

let spearId = 0;

const SPEAR_CLIPS = [
  "polygon(50% 0%, 56% 8%, 54% 12%, 52% 20%, 52% 85%, 58% 90%, 54% 95%, 50% 100%, 46% 95%, 42% 90%, 48% 85%, 48% 20%, 46% 12%, 44% 8%)",
  "polygon(50% 0%, 58% 6%, 55% 10%, 53% 18%, 53% 82%, 60% 88%, 55% 94%, 50% 100%, 45% 94%, 40% 88%, 47% 82%, 47% 18%, 45% 10%, 42% 6%)",
  "polygon(50% 0%, 57% 7%, 54% 11%, 52.5% 22%, 52.5% 80%, 59% 87%, 54% 93%, 50% 100%, 46% 93%, 41% 87%, 47.5% 80%, 47.5% 22%, 46% 11%, 43% 7%)",
];

const SpearBurst = () => {
  const [particles, setParticles] = useState<SpearParticle[]>([]);
  const timerRef = useRef<number[]>([]);

  const handleInteraction = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    let clientX: number, clientY: number;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Spears radiate outward from tap point
    const newParticles: SpearParticle[] = Array.from({ length: 16 }, (_, i) => ({
      id: spearId++,
      x,
      y,
      angle: (i * 360) / 16 + (Math.random() - 0.5) * 15,
      size: 18 + Math.random() * 30,
      distance: 80 + Math.random() * 200,
      delay: Math.random() * 0.25,
      variant: Math.floor(Math.random() * SPEAR_CLIPS.length),
      hueShift: Math.random() * 30,
    }));

    // Secondary scattered wave
    const scattered: SpearParticle[] = Array.from({ length: 10 }, () => ({
      id: spearId++,
      x: x + (Math.random() - 0.5) * 60,
      y: y + (Math.random() - 0.5) * 40,
      angle: Math.random() * 360,
      size: 12 + Math.random() * 20,
      distance: 120 + Math.random() * 180,
      delay: 0.3 + Math.random() * 0.4,
      variant: Math.floor(Math.random() * SPEAR_CLIPS.length),
      hueShift: Math.random() * 30,
    }));

    const all = [...newParticles, ...scattered];

    setParticles((prev) => [...prev, ...newParticles]);

    const t1 = window.setTimeout(() => {
      setParticles((prev) => [...prev, ...scattered]);
    }, 350);

    const t2 = window.setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !all.includes(p)));
    }, 5000);

    timerRef.current.push(t1, t2);
  }, []);

  return (
    <div
      className="absolute inset-0 z-50 cursor-pointer"
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
    >
      <AnimatePresence>
        {particles.map((p) => {
          const rad = (p.angle * Math.PI) / 180;
          // Each spear points in its travel direction
          const rotDeg = p.angle + 90;
          return (
            <motion.div
              key={p.id}
              className="absolute pointer-events-none"
              style={{
                left: p.x - p.size / 2,
                top: p.y - (p.size * 4.5) / 2,
                width: p.size,
                height: p.size * 4.5,
                clipPath: SPEAR_CLIPS[p.variant],
                background: `linear-gradient(0deg, 
                  hsl(${210 + p.hueShift} 80% 70%) 0%, 
                  hsl(${220 + p.hueShift} 70% 55%) 35%, 
                  hsl(${200 + p.hueShift} 60% 45%) 65%,
                  hsl(${215 + p.hueShift} 50% 35%) 100%)`,
                filter: "blur(0.4px)",
                boxShadow: `0 0 12px hsl(${210 + p.hueShift} 80% 65% / 0.7), 0 0 28px hsl(${220 + p.hueShift} 60% 55% / 0.35)`,
                transformOrigin: "center center",
              }}
              initial={{
                scale: 0,
                opacity: 0.9,
                x: 0,
                y: 0,
                rotate: rotDeg,
              }}
              animate={{
                scale: [0, 1.5, 1, 0.5, 0],
                opacity: [0.9, 0.85, 0.5, 0.15, 0],
                x: Math.cos(rad) * p.distance,
                y: Math.sin(rad) * p.distance,
                rotate: rotDeg,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 3.5,
                delay: p.delay,
                ease: [0.15, 0, 0.25, 1],
              }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default SpearBurst;
