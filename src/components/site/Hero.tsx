import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Wand2, Layers, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const ROTATING = ["worlds", "creatures", "vehicles", "characters", "props"];

export default function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ROTATING.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        {/* Cinematic gradient overlays for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background)/0.35)_70%,hsl(var(--background)/0.85)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.18),transparent_55%)]" />

        {/* Floating animated orbs */}
        <motion.div
          aria-hidden
          className="absolute top-1/3 left-[15%] h-72 w-72 rounded-full bg-primary/20 blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute bottom-1/4 right-[15%] h-80 w-80 rounded-full bg-neon/10 blur-3xl"
          animate={{ y: [0, -40, 0], x: [0, -25, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Subtle grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(hsl(var(--foreground))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground))_1px,transparent_1px)] [background-size:48px_48px]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-10 pb-16 md:pt-14 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            Sculpt{" "}
            <span className="relative inline-block align-baseline text-primary">
              <AnimatePresence mode="wait">
                <motion.span
                  key={ROTATING[idx]}
                  initial={{ y: 30, opacity: 0, filter: "blur(8px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -30, opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="inline-block"
                >
                  {ROTATING[idx]}
                </motion.span>
              </AnimatePresence>
            </span>
            ,
            <br /> not just <span className="italic font-serif font-normal">meshes.</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed mx-auto"
          >
            CRUDE 3D is an AI-native sculpting & rendering studio. Generate concept-ready
            assets in seconds, refine them with a real-time engine, and publish your gallery
            — all from one elegant workspace.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link to="/edit">
              <Button
                size="lg"
                className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shadow-[0_0_30px_hsl(var(--primary)/0.45)]"
              >
                Launch Editor
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/gallery">
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-6 bg-surface-1/60 border-border text-foreground hover:bg-surface-2"
              >
                Browse Gallery
              </Button>
            </Link>
            <button className="h-12 inline-flex items-center gap-2 px-3 text-sm text-muted-foreground hover:text-foreground transition-colors group">
              <span className="grid place-items-center h-9 w-9 rounded-full border border-border bg-surface-1 group-hover:bg-surface-2">
                <Play className="h-3.5 w-3.5 fill-foreground" />
              </span>
              Watch the 90s tour
            </button>
          </motion.div>

          {/* Feature chips */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
            }}
            className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full"
          >
            {[
              { icon: Wand2, label: "Text → 3D", sub: "Prompt to mesh in <30s" },
              { icon: Layers, label: "Live Sculpt", sub: "Real-time PBR engine" },
              { icon: Sparkles, label: "AI Retopology", sub: "Production-ready geo" },
            ].map((f) => (
              <motion.div
                key={f.label}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -4 }}
                className="rounded-xl border border-border bg-surface-1/70 backdrop-blur-sm p-4 text-left hover:border-primary/40 transition-colors"
              >
                <f.icon className="h-5 w-5 text-primary" />
                <div className="mt-2 text-sm font-semibold text-foreground">{f.label}</div>
                <div className="text-xs text-muted-foreground">{f.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
