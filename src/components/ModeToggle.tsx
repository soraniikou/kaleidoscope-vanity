import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";

const ModeToggle = () => {
  const { mode, toggleMode } = useMode();
  const isChaos = mode === "chaos";

  return (
    <motion.button
      onClick={toggleMode}
      className="relative flex items-center gap-3 px-6 py-3 rounded-full border border-border 
                 bg-card/50 backdrop-blur-md cursor-pointer select-none mode-transition
                 hover:border-primary/50"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Toggle indicator */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-20"
        animate={{
          background: isChaos
            ? "linear-gradient(135deg, hsl(18 100% 58% / 0.3), hsl(275 80% 74% / 0.3))"
            : "linear-gradient(135deg, hsl(199 90% 63% / 0.2), hsl(210 40% 85% / 0.2))",
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Order label */}
      <motion.span
        className="relative z-10 text-sm font-bold tracking-wider"
        animate={{
          color: isChaos ? "hsl(220 15% 55%)" : "hsl(199 90% 63%)",
        }}
      >
        秩序
      </motion.span>

      {/* Toggle pill */}
      <div className="relative w-12 h-6 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="absolute top-1 w-4 h-4 rounded-full overflow-hidden"
          animate={{
            left: isChaos ? "28px" : "4px",
            boxShadow: isChaos
              ? "0 0 12px hsl(18 100% 58% / 0.6)"
              : "0 0 8px hsl(199 90% 63% / 0.4)",
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {/* Paranoia pattern - chaotic concentric rings */}
          <div
            className="w-full h-full relative"
            style={{
              background: isChaos
                ? `conic-gradient(
                    hsl(18 100% 58%), hsl(275 80% 74%), hsl(0 90% 50%), 
                    hsl(40 100% 55%), hsl(18 100% 58%)
                  )`
                : "hsl(199 90% 63%)",
            }}
          >
            {isChaos && (
              <>
                <div className="absolute inset-[2px] rounded-full" style={{ background: "hsl(230 60% 6%)" }} />
                <div className="absolute inset-[3px] rounded-full" style={{
                  background: "conic-gradient(hsl(0 90% 50%), hsl(275 80% 74%), hsl(18 100% 58%), hsl(0 90% 50%))",
                }} />
                <div className="absolute inset-[5px] rounded-full" style={{ background: "hsl(230 60% 6%)" }} />
                <div className="absolute inset-[6px] rounded-full" style={{
                  background: "radial-gradient(circle, hsl(18 100% 58%), hsl(0 80% 40%))",
                }} />
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Chaos label */}
      <motion.span
        className={`relative z-10 text-sm font-bold tracking-wider ${isChaos ? "chaos-text" : ""}`}
        animate={{
          color: isChaos ? "hsl(18 100% 58%)" : "hsl(220 15% 55%)",
        }}
      >
        解放
      </motion.span>

      {/* Spark particles on chaos */}
      <AnimatePresence>
        {isChaos && (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary"
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1, 0],
                  x: [0, (i % 2 ? 1 : -1) * (20 + i * 10)],
                  y: [0, (i < 2 ? -1 : 1) * (15 + i * 8)],
                  opacity: [1, 0.8, 0],
                }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ModeToggle;
