import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";

const EMOTION_TAGS = [
  { label: "怒り", color: "glow-orange" },
  { label: "虚しさ", color: "glow-violet" },
  { label: "焦り", color: "glow-orange" },
  { label: "悲しみ", color: "glow-blue" },
  { label: "苛立ち", color: "glow-orange" },
  { label: "不安", color: "glow-violet" },
];

interface SparkParticle {
  id: number;
  x: number;
  y: number;
  color: string;
}

const EmotionRelease = () => {
  const { mode } = useMode();
  const isChaos = mode === "chaos";
  const [inputText, setInputText] = useState("");
  const [releasedEmotions, setReleasedEmotions] = useState<string[]>([]);
  const [sparks, setSparks] = useState<SparkParticle[]>([]);
  const [isReleasing, setIsReleasing] = useState(false);

  const addSparks = () => {
    const newSparks: SparkParticle[] = [...Array(8)].map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
      color: ["hsl(18 100% 58%)", "hsl(275 80% 74%)", "hsl(199 90% 63%)"][
        Math.floor(Math.random() * 3)
      ],
    }));
    setSparks(newSparks);
    setTimeout(() => setSparks([]), 800);
  };

  const releaseEmotion = (emotion: string) => {
    if (releasedEmotions.includes(emotion)) return;
    setIsReleasing(true);
    addSparks();
    setTimeout(() => {
      setReleasedEmotions((prev) => [...prev, emotion]);
      setIsReleasing(false);
    }, 400);
  };

  const releaseText = () => {
    if (!inputText.trim()) return;
    setIsReleasing(true);
    addSparks();
    setTimeout(() => {
      setReleasedEmotions((prev) => [...prev, inputText.trim()]);
      setInputText("");
      setIsReleasing(false);
    }, 400);
  };

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <motion.div
        className="max-w-2xl w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Section title */}
        <motion.h2
          className={`text-3xl md:text-4xl font-black text-center mb-3 mode-transition ${
            isChaos ? "text-glow-orange chaos-text" : ""
          }`}
          style={{ color: isChaos ? "hsl(18 100% 58%)" : "hsl(199 90% 63%)" }}
        >
          {isChaos ? "吐き出せ" : "感情を解放する"}
        </motion.h2>
        <p className="text-muted-foreground text-center mb-10">
          {isChaos
            ? "全力で。遠慮なく。ここは安全な場所だ。"
            : "抑え込んでいた感情に名前を付けて、外に出そう"}
        </p>

        {/* Emotion tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {EMOTION_TAGS.map((tag) => {
            const isReleased = releasedEmotions.includes(tag.label);
            return (
              <motion.button
                key={tag.label}
                onClick={() => releaseEmotion(tag.label)}
                className={`relative px-5 py-2.5 rounded-lg font-bold text-sm tracking-wider
                  border mode-transition cursor-pointer overflow-hidden
                  ${
                    isReleased
                      ? "border-primary/20 bg-primary/10 text-primary/50"
                      : "border-border bg-card/60 backdrop-blur-sm text-foreground hover:border-primary/50"
                  }`}
                whileHover={
                  !isReleased
                    ? {
                        scale: isChaos ? 1.15 : 1.05,
                        boxShadow: isChaos
                          ? "0 0 20px hsl(18 100% 58% / 0.4)"
                          : "0 0 12px hsl(199 90% 63% / 0.3)",
                      }
                    : {}
                }
                whileTap={!isReleased ? { scale: 0.9 } : {}}
                disabled={isReleased}
              >
                {isReleased ? `✦ ${tag.label}` : tag.label}
              </motion.button>
            );
          })}
        </div>

        {/* Free text input */}
        <div className="relative mb-8">
          <motion.div
            className="flex gap-3"
            animate={{
              x: isChaos && isReleasing ? [0, -3, 5, -2, 3, 0] : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && releaseText()}
              placeholder={
                isChaos
                  ? "ここに叫べ..."
                  : "今感じていることを言葉にしてみて..."
              }
              className="flex-1 px-5 py-3 rounded-lg bg-card/60 backdrop-blur-sm border border-border
                         text-foreground placeholder:text-muted-foreground/50
                         focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20
                         mode-transition"
            />
            <motion.button
              onClick={releaseText}
              className="px-6 py-3 rounded-lg font-bold text-sm tracking-wider
                         bg-primary text-primary-foreground cursor-pointer mode-transition"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px hsl(18 100% 58% / 0.4)",
              }}
              whileTap={{ scale: 0.9 }}
            >
              {isChaos ? "放て" : "解放"}
            </motion.button>
          </motion.div>

          {/* Spark particles */}
          <AnimatePresence>
            {sparks.map((spark) => (
              <motion.div
                key={spark.id}
                className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full pointer-events-none"
                style={{ backgroundColor: spark.color }}
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1.5, 0],
                  x: spark.x,
                  y: spark.y,
                  opacity: [1, 0.6, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Released emotions visualization */}
        <AnimatePresence>
          {releasedEmotions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-3"
            >
              <p className="text-xs text-muted-foreground text-center tracking-widest uppercase">
                解放された感情
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {releasedEmotions.map((emotion, i) => (
                  <motion.div
                    key={`${emotion}-${i}`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{
                      scale: 1,
                      rotate: 0,
                      y: isChaos ? [0, -3, 2, -1, 0] : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      y: {
                        duration: 2,
                        repeat: isChaos ? Infinity : 0,
                        delay: i * 0.2,
                      },
                    }}
                    className="px-4 py-2 rounded-full text-xs font-bold border mode-transition"
                    style={{
                      borderColor: isChaos
                        ? "hsl(18 100% 58% / 0.3)"
                        : "hsl(199 90% 63% / 0.2)",
                      color: isChaos
                        ? "hsl(18 100% 58%)"
                        : "hsl(199 90% 63%)",
                      backgroundColor: isChaos
                        ? "hsl(18 100% 58% / 0.1)"
                        : "hsl(199 90% 63% / 0.08)",
                    }}
                  >
                    {emotion}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default EmotionRelease;
