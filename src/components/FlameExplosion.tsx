import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FlameParticle {
  id: number;
  x: number;
  y: number;
}

let particleId = 0;

const FlameExplosion = () => {
  const [particles, setParticles] = useState<FlameParticle[]>([]);

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
    const newParticles = Array.from({ length: 18 }, () => ({
      id: particleId++,
      x,
      y,
    }));
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.includes(p)));
    }, 1200);
  }, []);

  return (
    <div
      className="absolute inset-0 z-50 cursor-pointer"
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
    >
      <AnimatePresence>
        {particles.map((p, idx) => {
          const angle = (idx % 18) * 20 + Math.random() * 15;
          const distance = 80 + Math.random() * 200;
          const rad = (angle * Math.PI) / 180;
          const size = 6 + Math.random() * 18;
          const flameHue = [0, 15, 30, 40, 50][Math.floor(Math.random() * 5)];
          return (
            <motion.div
              key={p.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: p.x,
                top: p.y,
                width: size,
                height: size,
                background: `radial-gradient(circle, hsl(${flameHue} 100% 65%), hsl(${flameHue} 90% 45%), hsl(0 80% 25%))`,
                boxShadow: `0 0 ${size}px hsl(${flameHue} 100% 55% / 0.8), 0 0 ${size * 2}px hsl(${flameHue} 90% 40% / 0.4)`,
              }}
              initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
              animate={{
                scale: [0, 1.5, 0.5, 0],
                opacity: [1, 0.9, 0.5, 0],
                x: Math.cos(rad) * distance,
                y: Math.sin(rad) * distance + 30,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.8 + Math.random() * 0.4,
                ease: [0.2, 0, 0.3, 1],
              }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default FlameExplosion;
