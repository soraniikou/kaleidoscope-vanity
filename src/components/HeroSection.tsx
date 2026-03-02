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
      <motion.div
        className="text-center mb-8"
        animate={{
          x: isChaos ? [0, -2, 3, -1, 2, 0] : 0,
        }}
        transition={{
          duration: 0.8,
          repeat: isChaos ? Infinity : 0,
          repeatType: "reverse",
        }}
      >
        <motion.h1
          className={`text-5xl md:text-7xl font-black tracking-tight mb-4 mode-transition ${
            isChaos ? "text-glow-orange" : "text-glow-blue"
          }`}
          animate={{
            color: isChaos ? "hsl(18 100% 58%)" : "hsl(199 90% 63%)",
          }}
        >
          {isChaos ? "解き放て" : "ALICE"}
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mode-transition"
          animate={{
            letterSpacing: isChaos ? "0.15em" : "0.05em",
          }}
        >
          {isChaos
            ? "怒りも虚しさも、全てはあなたのエネルギー"
            : "カオスからロゴスへ。思考を軽くする統合の旅"}
        </motion.p>
      </motion.div>

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
