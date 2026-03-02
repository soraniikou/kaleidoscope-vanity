import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";

const INTEGRATION_STEPS = [
  {
    id: 1,
    title: "認識する",
    description: "感情を「悪いもの」と否定せず、ただそこにあると認める",
    icon: "◇",
  },
  {
    id: 2,
    title: "解放する",
    description: "内に溜めず、安全に外へ出す。言語化し、可視化する",
    icon: "◆",
  },
  {
    id: 3,
    title: "統合する",
    description: "「それも自分だ」と受け入れ、エネルギーとして取り込む",
    icon: "✦",
  },
];

const IntegrationSection = () => {
  const { mode } = useMode();
  const isChaos = mode === "chaos";
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isPacked, setIsPacked] = useState(false);

  const handlePack = () => {
    setIsPacked(true);
  };

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <motion.div
        className="max-w-3xl w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className={`text-3xl md:text-4xl font-black text-center mb-3 mode-transition ${
            isChaos ? "text-glow-orange" : ""
          }`}
          style={{ color: "hsl(275 80% 60%)" }}
        >
          統合
        </motion.h2>
        <p className="text-muted-foreground text-center mb-16">
          バラバラだったものを、一つに
        </p>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {INTEGRATION_STEPS.map((step, i) => (
            <motion.div
              key={step.id}
              className="relative p-6 rounded-xl border border-border bg-card/40 backdrop-blur-sm
                         cursor-pointer mode-transition overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{
                scale: isChaos ? 1.08 : 1.03,
                borderColor: isChaos
                  ? "hsl(18 100% 58% / 0.5)"
                  : "hsl(199 90% 63% / 0.3)",
                boxShadow: isChaos
                  ? "0 0 30px hsl(18 100% 58% / 0.2)"
                  : "0 0 20px hsl(199 90% 63% / 0.1)",
              }}
              onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
            >
              {/* Step number line */}
              <div className="flex items-center gap-3 mb-4">
                <motion.span
                  className="text-2xl"
                  animate={{
                    rotate: isChaos && activeStep === step.id ? [0, 360] : 0,
                  }}
                  transition={{ duration: 1, repeat: isChaos ? Infinity : 0 }}
                >
                  {step.icon}
                </motion.span>
                <span className="text-xs text-muted-foreground tracking-widest uppercase">
                  Step {step.id}
                </span>
              </div>

              <h3
                className="text-lg font-bold mb-2 mode-transition"
                style={{
                  color: "hsl(275 80% 60%)",
                }}
              >
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>

              {/* Active indicator */}
              <AnimatePresence>
                {activeStep === step.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    style={{
                      background: isChaos
                        ? "linear-gradient(90deg, hsl(18 100% 58%), hsl(275 80% 74%))"
                        : "linear-gradient(90deg, hsl(199 90% 63%), hsl(210 40% 85%))",
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Pack button */}
        <div className="flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!isPacked ? (
              <motion.button
                key="pack-btn"
                onClick={handlePack}
                className="relative px-10 py-4 rounded-xl font-black text-lg tracking-wider
                           cursor-pointer overflow-hidden mode-transition"
                style={{
                  background: "hsl(230 60% 30%)",
                  color: "hsl(0 0% 100%)",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px hsl(230 60% 30% / 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                統合する
              </motion.button>
            ) : (
              <motion.div
                key="packed"
                className="text-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                {/* Crystal result */}
                <motion.div
                  className="w-32 h-32 mx-auto mb-6 relative"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      clipPath:
                        "polygon(50% 0%, 80% 10%, 100% 40%, 90% 70%, 60% 100%, 30% 90%, 0% 60%, 10% 30%)",
                      background:
                        "linear-gradient(135deg, hsl(199 90% 63%), hsl(18 100% 58%), hsl(275 80% 74%), hsl(210 40% 85%))",
                    }}
                  />
                  <div
                    className="absolute inset-3"
                    style={{
                      clipPath:
                        "polygon(50% 0%, 80% 10%, 100% 40%, 90% 70%, 60% 100%, 30% 90%, 0% 60%, 10% 30%)",
                      background: "hsl(var(--background))",
                    }}
                  />
                  <motion.div
                    className="absolute inset-6"
                    style={{
                      clipPath:
                        "polygon(50% 0%, 80% 10%, 100% 40%, 90% 70%, 60% 100%, 30% 90%, 0% 60%, 10% 30%)",
                      background:
                        "linear-gradient(135deg, hsl(199 90% 63% / 0.5), hsl(18 100% 58% / 0.5), hsl(275 80% 74% / 0.5))",
                    }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  {/* Glow */}
                  <motion.div
                    className="absolute -inset-4 blur-2xl -z-10"
                    style={{
                      background:
                        "radial-gradient(circle, hsl(199 90% 63% / 0.3), hsl(18 100% 58% / 0.2), transparent)",
                    }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>

                <motion.p
                  className="text-xl font-black mb-2"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(199 90% 63%), hsl(18 100% 58%), hsl(275 80% 74%))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  それも、あなただ。
                </motion.p>
                <motion.p
                  className="text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  全ての感情が、一つの美しい結晶になった
                </motion.p>

                {/* Reset */}
                <motion.button
                  className="mt-8 px-6 py-2 text-xs text-muted-foreground border border-border 
                             rounded-full cursor-pointer hover:border-primary/30 mode-transition"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  onClick={() => setIsPacked(false)}
                  whileHover={{ scale: 1.05 }}
                >
                  もう一度旅を始める
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default IntegrationSection;
