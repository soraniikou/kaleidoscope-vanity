import { motion } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import ModeToggle from "./ModeToggle";

const HeroSection = () => {
  const { mode } = useMode();
  const isChaos = mode === "chaos";

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
      {/* Mode toggle at top */}
      <div className="absolute top-8 right-8">
        <ModeToggle />
      </div>


      {/* Title */}
      {isChaos ? (
        /* Explosive kaleidoscope visual */
        <div className="relative w-[80vw] h-[80vw] max-w-[500px] max-h-[500px] mb-8">
          {/* Outer explosive shards */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`outer-${i}`}
              className="absolute"
              style={{
                width: "40%",
                height: "40%",
                top: "30%",
                left: "30%",
                transformOrigin: "center center",
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 12 + i * 1.6,
                repeat: Infinity,
                ease: "linear",
                direction: i % 2 === 0 ? "normal" : "reverse",
              }}
            >
              <motion.div
                className="w-full h-full"
                style={{
                  clipPath:
                    i % 4 === 0
                      ? "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
                      : i % 4 === 1
                      ? "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)"
                      : i % 4 === 2
                      ? "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"
                      : "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                  background: `linear-gradient(${i * 30}deg, 
                    hsl(${(18 + i * 30) % 360} ${85 + (i % 3) * 5}% ${50 + (i % 4) * 8}% / ${0.7 - (i % 6) * 0.05}), 
                    hsl(${(275 + i * 25) % 360} 80% 60% / ${0.5 - (i % 4) * 0.05}),
                    transparent)`,
                }}
                animate={{
                  scale: [1, 2, 0.6, 1.8, 1],
                  rotate: [0, 60, -45, 30, 0],
                  x: [0, (i % 2 ? 1 : -1) * 60, 0],
                  y: [0, (i % 3 ? 1 : -1) * 50, 0],
                }}
                transition={{
                  duration: 6 + (i % 4) * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
              />
            </motion.div>
          ))}
          {/* Inner kaleidoscope layers */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`inner-${i}`}
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{
                duration: 10 + i * 3,
                repeat: Infinity,
                ease: "linear",
                direction: i % 2 === 0 ? "normal" : "reverse",
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
                      ? "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)"
                      : i % 3 === 1
                      ? "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
                      : "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                  background: `linear-gradient(${i * 60}deg, 
                    hsl(${18 + i * 40} ${90}% ${55 + i * 5}% / ${0.8 - i * 0.08}), 
                    hsl(${275 - i * 30} 85% 65% / ${0.6 - i * 0.06}),
                    hsl(${0 + i * 20} 90% 50% / ${0.3}))`,
                }}
                animate={{
                  scale: [1, 1.8, 0.7, 1.5, 1],
                  rotate: [0, 70, -50, 35, 0],
                }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            </motion.div>
          ))}
          {/* Central explosive glow */}
          <motion.div
            className="absolute inset-[15%] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, hsl(18 100% 58% / 0.5), hsl(275 80% 74% / 0.3), hsl(0 90% 50% / 0.2), transparent)",
            }}
            animate={{
              scale: [1, 1.5, 0.9, 1.3, 1],
              opacity: [0.6, 1, 0.4, 0.8, 0.6],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </div>
      ) : (
        <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{
                duration: 14 + i * 3,
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
                    hsl(${199 + i * 10} ${70 + i * 4}% ${60 + i * 5}% / ${0.45 - i * 0.05}), 
                    hsl(${210 + i * 15} 40% 85% / ${0.3 - i * 0.03}),
                    transparent)`,
                }}
                animate={{
                  scale: [1, 1.06, 0.97, 1],
                  rotate: [0, 12, -8, 0],
                }}
                transition={{
                  duration: 6 + i * 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              />
            </motion.div>
          ))}
          {/* Central glow */}
          <motion.div
            className="absolute inset-0 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle, hsl(199 90% 63% / 0.2), hsl(210 40% 85% / 0.15), transparent)",
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          {/* Subtitle */}
          <motion.p
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm text-muted-foreground tracking-widest"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            カオスからロゴスへ。思考を軽くする統合の旅
          </motion.p>
        </div>
      )}

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <motion.div
            className="w-1 h-2 rounded-full bg-muted-foreground/50"
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
