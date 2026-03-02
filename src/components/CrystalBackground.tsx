import { motion } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";

const CrystalBackground = () => {
  const { mode } = useMode();

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-kaleidoscope mode-transition" />

      {/* Floating crystal shards */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute mode-transition"
          style={{
            width: `${80 + i * 40}px`,
            height: `${80 + i * 40}px`,
            left: `${10 + i * 15}%`,
            top: `${15 + (i % 3) * 25}%`,
          }}
          animate={{
            rotate: mode === "chaos" ? [0, 360] : [0, 360],
            scale: mode === "chaos" ? [1, 1.3, 0.8, 1.2, 1] : [1, 1.05, 1],
            x: mode === "chaos" ? [0, 20, -15, 10, 0] : [0, 5, 0],
            y: mode === "chaos" ? [0, -20, 15, -10, 0] : [0, -10, 0],
          }}
          transition={{
            duration: mode === "chaos" ? 3 + i * 0.5 : 12 + i * 2,
            repeat: Infinity,
            ease: mode === "chaos" ? "easeInOut" : "linear",
          }}
        >
          <div
            className="w-full h-full mode-transition"
            style={{
              background:
                mode === "chaos"
                  ? `linear-gradient(${45 + i * 30}deg, 
                      hsl(18 100% 58% / ${0.06 + i * 0.02}), 
                      hsl(275 80% 74% / ${0.04 + i * 0.01}),
                      transparent)`
                  : `linear-gradient(${45 + i * 30}deg, 
                      hsl(199 90% 63% / ${0.04 + i * 0.01}), 
                      hsl(210 40% 85% / ${0.03 + i * 0.01}),
                      transparent)`,
              clipPath:
                i % 2 === 0
                  ? "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)"
                  : "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            }}
          />
        </motion.div>
      ))}

      {/* Glow orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl mode-transition"
        style={{
          background:
            mode === "chaos"
              ? "radial-gradient(circle, hsl(18 100% 58% / 0.12), transparent)"
              : "radial-gradient(circle, hsl(199 90% 63% / 0.08), transparent)",
          left: "10%",
          top: "30%",
        }}
        animate={{
          scale: mode === "chaos" ? [1, 1.4, 0.9, 1.3, 1] : [1, 1.1, 1],
          opacity: mode === "chaos" ? [0.5, 1, 0.3, 0.8, 0.5] : [0.5, 0.7, 0.5],
        }}
        transition={{ duration: mode === "chaos" ? 2 : 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-80 h-80 rounded-full blur-3xl mode-transition"
        style={{
          background:
            mode === "chaos"
              ? "radial-gradient(circle, hsl(275 80% 74% / 0.1), transparent)"
              : "radial-gradient(circle, hsl(230 50% 30% / 0.1), transparent)",
          right: "15%",
          bottom: "20%",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </div>
  );
};

export default CrystalBackground;
