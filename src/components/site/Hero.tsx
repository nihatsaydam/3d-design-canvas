import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Diamond, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import showcase from "@/assets/hero-showcase.jpg";

const ROTATING = ["Worlds", "Creatures", "Vehicles", "Characters", "Props"];

type Mode = "hd" | "mesh";

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [mode, setMode] = useState<Mode>("hd");

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ROTATING.length), 2200);
    return () => clearInterval(t);
  }, []);

  const modeMeta = {
    hd: {
      title: "High Detail Model",
      sub: "Up to 2M polygons — for 3D printing & visual arts.",
      cta: "Generate HD Model",
    },
    mesh: {
      title: "Smart Topology Mesh",
      sub: "~2s clean retopology — for games & web apps.",
      cta: "Generate Smart Mesh",
    },
  } as const;

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Soft ambient backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--card)),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--primary-glow)/0.24),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(hsl(var(--foreground))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground))_1px,transparent_1px)] [background-size:56px_56px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 pt-8 pb-4 md:pt-10 md:pb-6">
        {/* Centered headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface-1 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Engine v2 — AI Sculpt
          </span>

          <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-foreground">
            Generate{" "}
            <span className="relative inline-block align-baseline text-primary">
              <AnimatePresence mode="wait">
                <motion.span
                  key={ROTATING[idx]}
                  initial={{ y: 24, opacity: 0, filter: "blur(8px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -24, opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="inline-block"
                >
                  {ROTATING[idx]}
                </motion.span>
              </AnimatePresence>
            </span>{" "}
            in 3D
          </h1>

          <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Your all-in-one AI 3D workspace — sculpt, retopologize and publish from one elegant studio.
          </p>
        </motion.div>

        {/* Single segmented action bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 mx-auto max-w-3xl"
        >
          <div className="relative flex items-stretch p-1.5 rounded-2xl border border-border bg-card shadow-[0_10px_30px_-12px_hsl(var(--foreground)/0.2)]">
            {/* Sliding indicator */}
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-0.375rem)] rounded-xl bg-foreground/[0.04] border border-border ${
                mode === "hd" ? "left-1.5" : "left-[calc(50%+0.0rem)]"
              }`}
            />

            {/* Segments */}
            <button
              onClick={() => setMode("hd")}
              className="relative z-10 flex-1 flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors"
            >
              <span className={`grid place-items-center h-9 w-9 rounded-lg shrink-0 transition-colors ${
                mode === "hd" ? "bg-primary text-primary-foreground" : "bg-surface-2 text-muted-foreground"
              }`}>
                <Diamond className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className={`block text-sm font-semibold ${mode === "hd" ? "text-foreground" : "text-muted-foreground"}`}>
                  HD Model
                </span>
                <span className="block text-[11px] text-muted-foreground truncate">2M polygons · printable</span>
              </span>
            </button>

            <button
              onClick={() => setMode("mesh")}
              className="relative z-10 flex-1 flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors"
            >
              <span className={`grid place-items-center h-9 w-9 rounded-lg shrink-0 transition-colors ${
                mode === "mesh" ? "bg-primary text-primary-foreground" : "bg-surface-2 text-muted-foreground"
              }`}>
                <Box className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className={`block text-sm font-semibold ${mode === "mesh" ? "text-foreground" : "text-muted-foreground"}`}>
                  Smart Mesh
                </span>
                <span className="block text-[11px] text-muted-foreground truncate">~2s clean retopo</span>
              </span>
            </button>

            {/* CTA */}
            <Link to="/edit" className="relative z-10 shrink-0 ml-1">
              <Button className="h-full px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground gap-2 font-semibold">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={mode}
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.18 }}
                    className="hidden sm:inline"
                  >
                    {modeMeta[mode].cta}
                  </motion.span>
                </AnimatePresence>
                <span className="sm:hidden">Start</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Sub line under bar */}
          <div className="mt-2 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
            <Sparkles className="h-3 w-3 text-primary" />
            <AnimatePresence mode="wait">
              <motion.span
                key={mode}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {modeMeta[mode].sub}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Showcase image — sized to remain within viewport */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 relative mx-auto max-w-6xl"
        >
          <div className="relative rounded-3xl overflow-hidden border border-border bg-card shadow-[0_30px_80px_-30px_hsl(var(--foreground)/0.34)]">
            <img
              src={showcase}
              alt="Showcase of 3D models created with CRUDE"
              width={1920}
              height={704}
              className="w-full h-[22vh] min-h-[160px] max-h-[260px] object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
