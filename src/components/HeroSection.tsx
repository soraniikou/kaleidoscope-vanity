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

      {/* Central crystal mark */}
      <motion.div
        className="relative mb-12"
        animate={{
          rotate: isChaos ? [0, 5, -5, 3, -3, 0] : 0,
        }}
        transition={{
          duration: isChaos ? 1.5 : 0.5,
          repeat: isChaos ? Infinity : 0,
        }}
      >
        <motion.div
          className="w-24 h-24 relative"
          animate={{
            rotate: isChaos ? 180 : 0,
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Diamond shape */}
          <div
            className="absolute inset-0 mode-transition"
            style={{
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              background: isChaos
                ? "linear-gradient(135deg, hsl(18 100% 58%), hsl(275 80% 74%))"
                : "linear-gradient(135deg, hsl(199 90% 63%), hsl(210 40% 85%))",
            }}
          />
          <div
            className="absolute inset-2 mode-transition"
            style={{
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              background: "hsl(var(--background))",
            }}
          />
          <div
            className="absolute inset-4 mode-transition"
            style={{
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              background: isChaos
                ? "linear-gradient(135deg, hsl(18 100% 58% / 0.5), hsl(275 80% 74% / 0.5))"
                : "linear-gradient(135deg, hsl(199 90% 63% / 0.3), hsl(210 40% 85% / 0.3))",
            }}
          />
        </motion.div>

        {/* Glow behind crystal */}
        <motion.div
          className="absolute inset-0 blur-xl -z-10 mode-transition"
          animate={{
            opacity: isChaos ? [0.4, 0.8, 0.4] : [0.2, 0.4, 0.2],
            scale: isChaos ? [1, 1.3, 1] : [1, 1.1, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            background: isChaos
              ? "radial-gradient(circle, hsl(18 100% 58% / 0.5), transparent)"
              : "radial-gradient(circle, hsl(199 90% 63% / 0.3), transparent)",
          }}
        />
      </motion.div>

      {/* Title */}
      {isChaos ? (
        /* Kaleidoscope 3D visual */
        <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{
                duration: 8 + i * 2,
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
                    hsl(${18 + i * 40} ${80 + i * 3}% ${50 + i * 5}% / ${0.6 - i * 0.06}), 
                    hsl(${275 - i * 30} 80% 74% / ${0.4 - i * 0.04}),
                    transparent)`,
                }}
                animate={{
                  scale: [1, 1.15, 0.95, 1.1, 1],
                  rotate: [0, 30, -20, 15, 0],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            </motion.div>
          ))}
          {/* Central glow */}
          <motion.div
            className="absolute inset-0 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle, hsl(18 100% 58% / 0.3), hsl(275 80% 74% / 0.2), transparent)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity }}
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
