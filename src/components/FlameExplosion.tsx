import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FlameParticle {
  id: number;
  x: number;
  y: number;
  hue: number;
  size: number;
  angle: number;
  distance: number;
  delay: number;
  wave: number;
  flameVariant: number;
}

let particleId = 0;

const FLAME_COLORS = [0, 5, 350, 355, 18, 25, 30, 45, 55, 275, 290, 310, 330, 200, 210];

// Flame-shaped clip paths (irregular, flickering flame silhouettes)
const FLAME_CLIPS = [
  "polygon(50% 0%, 35% 12%, 20% 30%, 28% 50%, 15% 68%, 25% 82%, 38% 100%, 50% 85%, 62% 100%, 75% 82%, 85% 68%, 72% 50%, 80% 30%, 65% 12%)",
  "polygon(50% 0%, 38% 8%, 22% 25%, 30% 45%, 12% 65%, 28% 80%, 42% 100%, 55% 88%, 68% 100%, 78% 78%, 90% 60%, 75% 42%, 82% 22%, 62% 10%)",
  "polygon(50% 0%, 32% 15%, 18% 35%, 25% 55%, 10% 75%, 30% 90%, 45% 100%, 55% 92%, 65% 100%, 80% 85%, 92% 70%, 78% 48%, 85% 28%, 68% 10%)",
  "polygon(50% 0%, 40% 10%, 25% 28%, 32% 48%, 18% 70%, 32% 88%, 48% 100%, 58% 90%, 70% 100%, 82% 82%, 88% 62%, 72% 45%, 78% 25%, 60% 8%)",
];

const FlameExplosion = () => {
  const [particles, setParticles] = useState<FlameParticle[]>([]);
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

    const makeParticle = (wave: number, offsetX = 0, offsetY = 0): FlameParticle => ({
      id: particleId++,
      x: x + offsetX,
      y: y + offsetY,
      hue: FLAME_COLORS[Math.floor(Math.random() * FLAME_COLORS.length)],
      size: wave === 0 ? 20 + Math.random() * 35 : wave === 1 ? 12 + Math.random() * 25 : 8 + Math.random() * 16,
      angle: wave === 1 ? 240 + Math.random() * 60 : Math.random() * 360,
      distance: wave === 0 ? 50 + Math.random() * 160 : wave === 1 ? 100 + Math.random() * 220 : 30 + Math.random() * 120,
      delay: Math.random() * (wave === 0 ? 0.15 : wave === 1 ? 0.3 : 0.5),
      wave,
      flameVariant: Math.floor(Math.random() * FLAME_CLIPS.length),
    });

    const burst = Array.from({ length: 20 }, () => makeParticle(0));
    const embers = Array.from({ length: 14 }, () =>
      makeParticle(1, (Math.random() - 0.5) * 50, (Math.random() - 0.5) * 30)
    );
    const sparks = Array.from({ length: 10 }, () =>
      makeParticle(2, (Math.random() - 0.5) * 70, (Math.random() - 0.5) * 50)
    );

    const allParticles = [...burst, ...embers, ...sparks];

    setParticles((prev) => [...prev, ...burst]);

    const t1 = window.setTimeout(() => {
      setParticles((prev) => [...prev, ...embers]);
    }, 400);

    const t2 = window.setTimeout(() => {
      setParticles((prev) => [...prev, ...sparks]);
    }, 1000);

    const t3 = window.setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !allParticles.includes(p)));
    }, 4500);

    timerRef.current.push(t1, t2, t3);
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
          const waveDuration = p.wave === 0 ? 2.2 : p.wave === 1 ? 2.8 : 1.8;
          return (
            <motion.div
              key={p.id}
              className="absolute pointer-events-none"
              style={{
                left: p.x - p.size / 2,
                top: p.y - p.size / 2,
                width: p.size,
                height: p.size * 1.4,
                clipPath: FLAME_CLIPS[p.flameVariant],
                background: `linear-gradient(0deg, 
                  hsl(${p.hue} 100% 70%) 0%, 
                  hsl(${(p.hue + 15) % 360} 95% 55%) 40%, 
                  hsl(${(p.hue + 30) % 360} 85% 40%) 70%,
                  hsl(${(p.hue + 40) % 360} 70% 25%) 100%)`,
                filter: `blur(${p.wave === 2 ? 1 : 0.5}px)`,
                boxShadow: `0 0 ${p.size}px hsl(${p.hue} 100% 55% / 0.8), 
                             0 0 ${p.size * 2}px hsl(${p.hue} 90% 45% / 0.4)`,
              }}
              initial={{ scale: 0, opacity: 1, x: 0, y: 0, rotate: Math.random() * 30 - 15 }}
              animate={{
                scale: p.wave === 0
                  ? [0, 1.8, 1.2, 0.6, 0]
                  : p.wave === 1
                  ? [0, 1.4, 0.8, 0.3, 0]
                  : [0, 1, 0.4, 0],
                opacity: p.wave === 0
                  ? [1, 0.95, 0.6, 0.2, 0]
                  : [1, 0.7, 0.3, 0],
                x: Math.cos(rad) * p.distance,
                y: Math.sin(rad) * p.distance + (p.wave === 1 ? -60 : 15),
                rotate: [Math.random() * 30 - 15, Math.random() * 60 - 30],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: waveDuration,
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

export default FlameExplosion;
