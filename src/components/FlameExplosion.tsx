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
  wave: number; // 0=initial burst, 1=rising embers, 2=sparks
}

let particleId = 0;

const FLAME_COLORS = [
  // reds
  0, 5, 350, 355,
  // oranges
  18, 25, 30,
  // yellows
  45, 55,
  // violet/magenta sparks
  275, 290, 310, 330,
  // blue-white hot core
  200, 210,
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

    // Wave 0: initial burst (instant)
    const burst = Array.from({ length: 24 }, (_, i) => ({
      id: particleId++,
      x, y,
      hue: FLAME_COLORS[Math.floor(Math.random() * FLAME_COLORS.length)],
      size: 8 + Math.random() * 20,
      angle: (i * 15) + Math.random() * 10,
      distance: 60 + Math.random() * 180,
      delay: Math.random() * 0.2,
      wave: 0,
    }));

    // Wave 1: rising embers (0.5s later)
    const embers = Array.from({ length: 16 }, () => ({
      id: particleId++,
      x: x + (Math.random() - 0.5) * 60,
      y: y + (Math.random() - 0.5) * 40,
      hue: FLAME_COLORS[Math.floor(Math.random() * FLAME_COLORS.length)],
      size: 4 + Math.random() * 12,
      angle: 250 + Math.random() * 40, // mostly upward
      distance: 120 + Math.random() * 250,
      delay: Math.random() * 0.4,
      wave: 1,
    }));

    // Wave 2: lingering sparks (1.2s later)
    const sparks = Array.from({ length: 12 }, () => ({
      id: particleId++,
      x: x + (Math.random() - 0.5) * 80,
      y: y + (Math.random() - 0.5) * 60,
      hue: [275, 290, 45, 55, 200, 350][Math.floor(Math.random() * 6)],
      size: 3 + Math.random() * 8,
      angle: Math.random() * 360,
      distance: 40 + Math.random() * 150,
      delay: Math.random() * 0.6,
      wave: 2,
    }));

    const allParticles = [...burst, ...embers, ...sparks];

    setParticles((prev) => [...prev, ...burst]);

    const t1 = window.setTimeout(() => {
      setParticles((prev) => [...prev, ...embers]);
    }, 500);

    const t2 = window.setTimeout(() => {
      setParticles((prev) => [...prev, ...sparks]);
    }, 1200);

    const t3 = window.setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !allParticles.includes(p)));
    }, 4000);

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
          const waveDuration = p.wave === 0 ? 1.8 : p.wave === 1 ? 2.5 : 1.5;
          const totalDuration = waveDuration + p.delay;
          return (
            <motion.div
              key={p.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size,
                background: `radial-gradient(circle, 
                  hsl(${p.hue} 100% 70%), 
                  hsl(${p.hue} 90% 50%), 
                  hsl(${(p.hue + 20) % 360} 80% 30%))`,
                boxShadow: `0 0 ${p.size * 1.5}px hsl(${p.hue} 100% 55% / 0.9), 
                             0 0 ${p.size * 3}px hsl(${p.hue} 90% 45% / 0.5),
                             0 0 ${p.size * 5}px hsl(${p.hue} 80% 35% / 0.2)`,
              }}
              initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
              animate={{
                scale: p.wave === 0
                  ? [0, 2, 1.2, 0.6, 0]
                  : p.wave === 1
                  ? [0, 1.5, 1, 0.3, 0]
                  : [0, 1, 0.5, 0],
                opacity: p.wave === 0
                  ? [1, 0.95, 0.7, 0.3, 0]
                  : [1, 0.8, 0.4, 0],
                x: Math.cos(rad) * p.distance,
                y: Math.sin(rad) * p.distance + (p.wave === 1 ? -80 : 20),
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: totalDuration,
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
