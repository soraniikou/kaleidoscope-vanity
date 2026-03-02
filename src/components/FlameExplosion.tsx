import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Each weapon/shape type with its own clip paths, colors, and aspect ratio
const WEAPON_TYPES = [
  {
    name: "flame",
    aspectRatio: 1.5,
    clips: [
      "polygon(50% 0%, 42% 6%, 35% 16%, 28% 30%, 22% 45%, 18% 58%, 22% 72%, 30% 85%, 40% 100%, 50% 88%, 60% 100%, 70% 85%, 78% 72%, 82% 58%, 78% 45%, 72% 30%, 65% 16%, 58% 6%)",
      "polygon(50% 0%, 44% 4%, 36% 14%, 30% 25%, 24% 40%, 20% 55%, 24% 70%, 32% 82%, 42% 100%, 54% 85%, 64% 100%, 74% 80%, 80% 65%, 82% 48%, 76% 32%, 68% 18%, 60% 8%)",
    ],
    colors: [0, 18, 30, 45, -1, -2],
    glow: (hue: number) => hue < 0
      ? `0 0 20px hsl(0 0% 100% / 0.7), 0 0 40px hsl(40 40% 90% / 0.4)`
      : `0 0 18px hsl(${hue} 100% 55% / 0.8), 0 0 35px hsl(${hue} 90% 45% / 0.4)`,
  },
  {
    name: "katana",
    aspectRatio: 4,
    clips: [
      "polygon(48% 0%, 52% 0%, 54% 15%, 55% 40%, 54% 60%, 52% 80%, 60% 88%, 55% 92%, 50% 100%, 45% 92%, 40% 88%, 48% 80%, 46% 60%, 45% 40%, 46% 15%)",
      "polygon(47% 0%, 53% 0%, 56% 10%, 56% 35%, 55% 55%, 53% 75%, 62% 85%, 56% 90%, 50% 100%, 44% 90%, 38% 85%, 47% 75%, 45% 55%, 44% 35%, 44% 10%)",
    ],
    colors: [210, 220, 0, -1, -2, -3],
    glow: () => `0 0 12px hsl(210 80% 80% / 0.9), 0 0 30px hsl(220 60% 70% / 0.5), 0 0 50px hsl(0 0% 100% / 0.3)`,
  },
  {
    name: "spear",
    aspectRatio: 5,
    clips: [
      "polygon(50% 0%, 56% 8%, 54% 12%, 52% 20%, 52% 85%, 58% 90%, 54% 95%, 50% 100%, 46% 95%, 42% 90%, 48% 85%, 48% 20%, 46% 12%, 44% 8%)",
      "polygon(50% 0%, 58% 6%, 55% 10%, 53% 18%, 53% 82%, 60% 88%, 55% 94%, 50% 100%, 45% 94%, 40% 88%, 47% 82%, 47% 18%, 45% 10%, 42% 6%)",
    ],
    colors: [35, 40, 25, 0, -1],
    glow: () => `0 0 10px hsl(35 90% 60% / 0.8), 0 0 25px hsl(25 80% 50% / 0.5)`,
  },
  {
    name: "spade",
    aspectRatio: 1.2,
    clips: [
      "polygon(50% 0%, 58% 10%, 70% 25%, 82% 42%, 85% 55%, 80% 68%, 70% 75%, 58% 72%, 54% 78%, 58% 100%, 42% 100%, 46% 78%, 42% 72%, 30% 75%, 20% 68%, 15% 55%, 18% 42%, 30% 25%, 42% 10%)",
      "polygon(50% 0%, 60% 12%, 72% 28%, 84% 45%, 86% 58%, 78% 70%, 68% 76%, 56% 74%, 53% 80%, 56% 100%, 44% 100%, 47% 80%, 44% 74%, 32% 76%, 22% 70%, 14% 58%, 16% 45%, 28% 28%, 40% 12%)",
    ],
    colors: [260, 270, 280, 0, -1, -2],
    glow: () => `0 0 15px hsl(260 80% 60% / 0.8), 0 0 35px hsl(270 70% 50% / 0.5)`,
  },
  {
    name: "heart",
    aspectRatio: 1.1,
    clips: [
      "polygon(50% 18%, 58% 5%, 70% 0%, 82% 2%, 92% 12%, 98% 28%, 95% 45%, 85% 60%, 70% 75%, 50% 100%, 30% 75%, 15% 60%, 5% 45%, 2% 28%, 8% 12%, 18% 2%, 30% 0%, 42% 5%)",
      "polygon(50% 20%, 56% 8%, 68% 2%, 80% 4%, 90% 14%, 96% 30%, 92% 48%, 82% 62%, 68% 78%, 50% 100%, 32% 78%, 18% 62%, 8% 48%, 4% 30%, 10% 14%, 20% 4%, 32% 2%, 44% 8%)",
    ],
    colors: [340, 350, 0, 330, -1, -2],
    glow: () => `0 0 18px hsl(340 90% 60% / 0.9), 0 0 40px hsl(350 80% 50% / 0.5)`,
  },
];

interface Particle {
  id: number;
  x: number;
  y: number;
  hue: number;
  size: number;
  angle: number;
  distance: number;
  delay: number;
  wave: number;
  clipVariant: number;
  weaponType: number;
}

let particleId = 0;
let tapCount = 0;

const FlameExplosion = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
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

    const currentWeapon = tapCount % WEAPON_TYPES.length;
    tapCount++;
    const weapon = WEAPON_TYPES[currentWeapon];

    const makeParticle = (wave: number, offsetX = 0, offsetY = 0): Particle => ({
      id: particleId++,
      x: x + offsetX,
      y: y + offsetY,
      hue: weapon.colors[Math.floor(Math.random() * weapon.colors.length)],
      size: wave === 0 ? 22 + Math.random() * 38 : wave === 1 ? 14 + Math.random() * 28 : 10 + Math.random() * 18,
      angle: wave === 1 ? 240 + Math.random() * 60 : Math.random() * 360,
      distance: wave === 0 ? 50 + Math.random() * 160 : wave === 1 ? 100 + Math.random() * 220 : 30 + Math.random() * 120,
      delay: Math.random() * (wave === 0 ? 0.15 : wave === 1 ? 0.3 : 0.8),
      wave,
      clipVariant: Math.floor(Math.random() * weapon.clips.length),
      weaponType: currentWeapon,
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
    }, 6500);

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
          const weapon = WEAPON_TYPES[p.weaponType];
          const waveDuration = p.wave === 0 ? 3.2 : p.wave === 1 ? 4.0 : 3.0;
          const clip = weapon.clips[p.clipVariant];
          const isWhite = p.hue < 0;

          return (
            <motion.div
              key={p.id}
              className="absolute pointer-events-none"
              style={{
                left: p.x - p.size / 2,
                top: p.y - (p.size * weapon.aspectRatio) / 2,
                width: p.size,
                height: p.size * weapon.aspectRatio,
                clipPath: clip,
                background: isWhite
                  ? `linear-gradient(0deg, 
                      hsl(0 0% 100%) 0%, 
                      hsl(40 30% 92%) 30%, 
                      hsl(30 20% 80%) 60%,
                      hsl(20 15% 65% / 0.6) 100%)`
                  : `linear-gradient(0deg, 
                      hsl(${p.hue} 100% 70%) 0%, 
                      hsl(${(p.hue + 15) % 360} 95% 55%) 40%, 
                      hsl(${(p.hue + 30) % 360} 85% 40%) 70%,
                      hsl(${(p.hue + 40) % 360} 70% 25%) 100%)`,
                filter: `blur(${isWhite ? 2 : p.wave === 2 ? 1 : 0.5}px)`,
                boxShadow: weapon.glow(p.hue),
              }}
              initial={{ scale: 0, opacity: 1, x: 0, y: 0, rotate: Math.random() * 60 - 30 }}
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
                rotate: [Math.random() * 60 - 30, Math.random() * 90 - 45],
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
