import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import ModeToggle from "./ModeToggle";
import FlameExplosion from "./FlameExplosion";
import SpearBurst from "./SpearBurst";

const HeroSection = () => {
  const { mode } = useMode();
  const isChaos = mode === "chaos";
  const [chaosPhase, setChaosPhase] = useState<"kaleidoscope" | "scatter" | "vanity" | "decay">("kaleidoscope");

  useEffect(() => {
    if (!isChaos) {
      setChaosPhase("kaleidoscope");
      return;
    }
    const t1 = setTimeout(() => setChaosPhase("scatter"), 7000);
    const t2 = setTimeout(() => setChaosPhase("vanity"), 11000);
    const t3 = setTimeout(() => setChaosPhase("decay"), 16000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [isChaos]);

  // Random scatter positions for each shard (stable per mount)
  const [scatterPositions] = useState(() =>
    [...Array(18)].map(() => ({
      x: (Math.random() - 0.5) * (typeof window !== "undefined" ? window.innerWidth * 0.8 : 800),
      y: (Math.random() - 0.5) * (typeof window !== "undefined" ? window.innerHeight * 0.8 : 600),
      rot: Math.random() * 360,
      scale: 0.15 + Math.random() * 1.4,
      isWhite: Math.random() < 0.3,
    }))
  );

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Mode toggle at top */}
      <div className="absolute top-8 right-8 z-[60]">
        <ModeToggle />
      </div>

      {/* Flame explosion on touch - chaos mode only */}
      {isChaos && <FlameExplosion />}

      {/* Tap prompt - chaotic text */}
      {isChaos && chaosPhase === "kaleidoscope" && (
        <motion.div
          className="absolute bottom-12 z-[55] flex flex-wrap justify-center gap-1 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          {["画", "面", "を", "タ", "ッ", "プ", "し", "て"].map((char, i) => (
            <motion.span
              key={i}
              className="text-lg md:text-2xl font-black select-none"
              style={{
                fontFamily: ["serif", "monospace", "cursive", "sans-serif", "fantasy"][i % 5],
                color: [
                  "hsl(0 90% 65%)", "hsl(40 100% 60%)", "hsl(275 80% 70%)",
                  "hsl(0 0% 95%)", "hsl(200 85% 65%)", "hsl(330 80% 65%)",
                  "hsl(45 100% 55%)", "hsl(18 100% 58%)"
                ][i],
                textShadow: `0 0 12px ${["hsl(0 90% 65%)", "hsl(40 100% 60%)", "hsl(275 80% 70%)", "hsl(0 0% 95%)", "hsl(200 85% 65%)", "hsl(330 80% 65%)", "hsl(45 100% 55%)", "hsl(18 100% 58%)"][i].replace(")", " / 0.6)")}`,
              }}
              animate={{
                y: [0, -5 + Math.random() * 10, 0],
                rotate: [-8 + i * 3, 8 - i * 2, -8 + i * 3],
                scale: [0.9 + Math.random() * 0.3, 1.1 + Math.random() * 0.2, 0.9 + Math.random() * 0.3],
              }}
              transition={{
                duration: 1.5 + Math.random(),
                repeat: Infinity,
                delay: i * 0.12,
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      )}

      {isChaos ? (
        <div className="relative w-[80vw] h-[80vw] max-w-[500px] max-h-[500px] mb-8">
          {/* Outer explosive shards - flame colored, scatter wildly */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`outer-${i}`}
              className="absolute"
              style={{
                width: `${20 + (i * 7) % 30}%`,
                height: `${20 + ((i * 11) % 35)}%`,
                top: `${25 + (i % 5) * 5}%`,
                left: `${25 + (i % 4) * 5}%`,
                transformOrigin: "center center",
              }}
              animate={{
                rotate: 360,
                x: chaosPhase === "scatter" || chaosPhase === "vanity"
                  ? scatterPositions[i]?.x ?? 0
                  : 0,
                y: chaosPhase === "scatter" || chaosPhase === "vanity"
                  ? scatterPositions[i]?.y ?? 0
                  : 0,
                opacity: chaosPhase === "vanity" ? 0 : 1,
                scale: chaosPhase === "scatter"
                  ? scatterPositions[i]?.scale ?? 0.5
                  : chaosPhase === "vanity" ? 0.1 : 1,
              }}
              transition={{
                rotate: {
                  duration: 12 + i * 1.6,
                  repeat: Infinity,
                  ease: "linear",
                  direction: i % 2 === 0 ? "normal" : "reverse",
                },
                x: { duration: 2, ease: [0.2, 0.8, 0.3, 1] },
                y: { duration: 2, ease: [0.2, 0.8, 0.3, 1] },
                opacity: { duration: 2, ease: "easeOut" },
                scale: { duration: 2, ease: "easeInOut" },
              }}
            >
              <motion.div
                className="w-full h-full"
                style={{
                  clipPath:
                    i % 4 === 0
                      ? "polygon(50% 0%, 38% 8%, 28% 22%, 18% 38%, 8% 55%, 15% 70%, 25% 85%, 38% 100%, 50% 82%, 62% 100%, 75% 85%, 85% 70%, 92% 55%, 82% 38%, 72% 22%, 62% 8%)"
                      : i % 4 === 1
                      ? "polygon(50% 0%, 42% 5%, 30% 18%, 22% 32%, 12% 50%, 18% 68%, 28% 82%, 42% 100%, 55% 85%, 65% 100%, 78% 80%, 88% 62%, 82% 42%, 72% 25%, 65% 12%)"
                      : i % 4 === 2
                      ? "polygon(50% 0%, 40% 6%, 32% 15%, 20% 30%, 10% 48%, 16% 65%, 24% 80%, 40% 100%, 52% 78%, 60% 100%, 76% 82%, 88% 65%, 92% 48%, 78% 28%, 68% 14%, 58% 5%)"
                      : "polygon(50% 0%, 44% 4%, 35% 12%, 24% 28%, 14% 45%, 10% 60%, 18% 78%, 35% 95%, 50% 80%, 65% 95%, 82% 78%, 90% 60%, 86% 45%, 76% 28%, 65% 12%, 56% 4%)",
                  background: scatterPositions[i]?.isWhite
                    ? `linear-gradient(${i * 30}deg, 
                        hsl(0 0% 100% / 0.9), 
                        hsl(40 20% 90% / 0.7),
                        hsl(30 15% 75% / 0.4))`
                    : `linear-gradient(${i * 30}deg, 
                        hsl(${[0, 275, 25, 330, 200, 20, 290, 45, 350, 210, 18, 310][i]} ${90 + (i % 3) * 5}% ${48 + (i % 4) * 5}% / ${0.8 - (i % 4) * 0.05}), 
                        hsl(${[30, 310, 0, 200, 40, 275, 350, 15, 290, 45, 330, 8][i]} 80% ${35 + (i % 4) * 4}% / ${0.6}),
                        hsl(${[0, 260, 20, 300, 190, 10, 280, 40, 340, 200, 15, 295][i]} 60% 22% / 0.3))`,
                }}
                animate={{
                  scale: chaosPhase === "kaleidoscope" ? [1, 2, 0.6, 1.8, 1] : 1,
                  rotate: chaosPhase === "kaleidoscope" ? [0, 60, -45, 30, 0] : 0,
                }}
                transition={{
                  duration: 6 + (i % 4) * 2,
                  repeat: chaosPhase === "kaleidoscope" ? Infinity : 0,
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
              />
            </motion.div>
          ))}
          {/* Inner kaleidoscope layers - flame colors */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`inner-${i}`}
              className="absolute inset-0"
              animate={{
                rotate: 360,
                x: chaosPhase === "scatter" || chaosPhase === "vanity"
                  ? scatterPositions[12 + i]?.x ?? 0
                  : 0,
                y: chaosPhase === "scatter" || chaosPhase === "vanity"
                  ? scatterPositions[12 + i]?.y ?? 0
                  : 0,
                opacity: chaosPhase === "vanity" ? 0 : 1,
                scale: chaosPhase === "scatter"
                  ? scatterPositions[12 + i]?.scale ?? 0.5
                  : chaosPhase === "vanity" ? 0.1 : 1,
              }}
              transition={{
                rotate: {
                  duration: 10 + i * 3,
                  repeat: Infinity,
                  ease: "linear",
                  direction: i % 2 === 0 ? "normal" : "reverse",
                },
                x: { duration: 2.5, ease: [0.2, 0.8, 0.3, 1] },
                y: { duration: 2.5, ease: [0.2, 0.8, 0.3, 1] },
                opacity: { duration: 2, ease: "easeOut" },
                scale: { duration: 2, ease: "easeInOut" },
              }}
            >
              <motion.div
                className="absolute"
                style={{
                  width: `${50 - i * 5}%`,
                  height: `${50 - i * 5}%`,
                  top: `${25 + i * 2.5}%`,
                  left: `${25 + i * 2.5}%`,
                  clipPath:
                    i % 3 === 0
                      ? "polygon(50% 0%, 40% 6%, 30% 18%, 18% 35%, 12% 52%, 18% 72%, 28% 88%, 42% 100%, 50% 82%, 58% 100%, 72% 88%, 82% 72%, 88% 52%, 82% 35%, 70% 18%, 60% 6%)"
                      : i % 3 === 1
                      ? "polygon(50% 0%, 42% 5%, 32% 15%, 22% 32%, 14% 48%, 18% 68%, 26% 84%, 44% 100%, 52% 80%, 62% 100%, 78% 82%, 86% 65%, 88% 45%, 78% 28%, 68% 14%, 58% 4%)"
                      : "polygon(50% 0%, 44% 4%, 34% 12%, 24% 28%, 16% 44%, 14% 62%, 22% 78%, 38% 96%, 50% 78%, 62% 96%, 78% 78%, 86% 62%, 84% 44%, 76% 28%, 66% 12%, 56% 4%)",
                  background: `linear-gradient(${i * 60}deg, 
                    hsl(${[0, 275, 35, 200, 330, 45][i]} 90% ${45 + i * 3}% / ${0.8 - i * 0.08}), 
                    hsl(${[30, 310, 0, 210, 290, 20][i]} 75% ${35 + i * 3}% / ${0.6 - i * 0.06}),
                    hsl(${[350, 260, 20, 190, 300, 10][i]} 55% 25% / 0.3))`,
                }}
                animate={{
                  scale: chaosPhase === "kaleidoscope" ? [1, 1.8, 0.7, 1.5, 1] : 1,
                  rotate: chaosPhase === "kaleidoscope" ? [0, 70, -50, 35, 0] : 0,
                }}
                transition={{
                  duration: 5 + i,
                  repeat: chaosPhase === "kaleidoscope" ? Infinity : 0,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            </motion.div>
          ))}
          {/* Central flame glow */}
          <motion.div
            className="absolute inset-[15%] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, hsl(18 100% 50% / 0.6), hsl(0 90% 40% / 0.4), hsl(30 80% 30% / 0.2), transparent)",
            }}
            animate={{
              scale: chaosPhase === "vanity" ? 0 : [1, 1.5, 0.9, 1.3, 1],
              opacity: chaosPhase === "vanity" ? 0 : [0.6, 1, 0.4, 0.8, 0.6],
            }}
            transition={{ duration: 2.5, repeat: chaosPhase === "kaleidoscope" ? Infinity : 0 }}
          />

          {/* VANITY text emerging */}
          <AnimatePresence>
            {(chaosPhase === "vanity" || chaosPhase === "decay") && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <div className="flex gap-6 md:gap-10" style={{ transform: "rotate(-8deg)" }}>
                  {[
                    { char: "V", color: "hsl(18 100% 58%)", font: "serif" },
                    { char: "A", color: "hsl(275 80% 74%)", font: "monospace" },
                    { char: "N", color: "hsl(0 90% 55%)", font: "cursive" },
                    { char: "I", color: "hsl(40 100% 55%)", font: "sans-serif" },
                    { char: "T", color: "hsl(199 90% 63%)", font: "fantasy" },
                    { char: "Y", color: "hsl(330 80% 60%)", font: "serif" },
                  ].map((item, i) => (
                    <motion.span
                      key={i}
                      className="text-xl md:text-2xl font-black"
                      style={{
                        color: item.color,
                        fontFamily: item.font,
                        display: "inline-block",
                        textShadow: `0 0 15px ${item.color.replace(")", " / 0.5)")}, 0 0 40px ${item.color.replace(")", " / 0.25)")}`,
                      }}
                      initial={chaosPhase === "vanity" ? { opacity: 0, y: 30 } : false}
                      animate={{
                        opacity: chaosPhase === "decay" ? 0 : 1,
                        y: chaosPhase === "decay" ? 500 + i * 80 : 0,
                        filter: chaosPhase === "decay"
                          ? `blur(${6 + i * 2}px)`
                          : "blur(0.8px)",
                        scaleY: chaosPhase === "decay" ? 2.5 : 1,
                        scaleX: chaosPhase === "decay" ? 0.3 : 1,
                      }}
                      transition={chaosPhase === "decay"
                        ? {
                            duration: 5,
                            delay: i * 0.5,
                            ease: [0.4, 0, 1, 1],
                          }
                        : {
                            duration: 0.6,
                            delay: i * 0.3,
                            ease: "easeOut",
                          }
                      }
                    >
                      {item.char}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* ===== ORDER MODE - Blue tinted, slower rotation ===== */
        <>
        <SpearBurst />
        <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{
                duration: (14 + i * 3) * 2,
                repeat: Infinity,
                ease: "linear",
                direction: i % 2 === 0 ? "normal" : "reverse",
              }}
            >
              <motion.div
                className="absolute"
                style={{
                  width: `${60 - i * 6}%`,
                  height: `${60 - i * 6}%`,
                  top: `${20 + i * 3}%`,
                  left: `${20 + i * 3}%`,
                  clipPath:
                    i % 3 === 0
                      ? "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)"
                      : i % 3 === 1
                      ? "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
                      : "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                  background: `linear-gradient(${i * 60}deg, 
                    hsl(${210 + i * 8} ${75 + i * 3}% ${55 + i * 4}% / ${0.5 - i * 0.04}), 
                    hsl(${220 + i * 10} ${60 + i * 5}% ${70 + i * 3}% / ${0.35 - i * 0.03}),
                    hsl(${200 + i * 5} 50% 80% / 0.15))`,
                }}
                animate={{
                  scale: [1, 1.06, 0.97, 1],
                  rotate: [0, 12, -8, 0],
                }}
                transition={{
                  duration: (6 + i * 1.5) * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              />
            </motion.div>
          ))}
          {/* Central blue glow */}
          <motion.div
            className="absolute inset-0 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle, hsl(210 80% 60% / 0.25), hsl(220 60% 70% / 0.18), hsl(200 50% 80% / 0.1), transparent)",
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
        <motion.p
          className="mt-4 text-sm md:text-base text-muted-foreground/70 tracking-widest select-none"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          タップする
        </motion.p>
        </>
      )}
    </section>
  );
};

export default HeroSection;
