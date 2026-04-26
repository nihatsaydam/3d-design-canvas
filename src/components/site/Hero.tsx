import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import charHD from "@/assets/hero-char-1.png";
import charMesh from "@/assets/hero-char-2.png";

const ROTATING = ["Worlds", "Creatures", "Vehicles", "Characters", "Props"];

export default function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ROTATING.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Soft ambient background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(220_60%_96%),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(0_80%_96%),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(hsl(var(--foreground))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground))_1px,transparent_1px)] [background-size:56px_56px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-16 md:pt-28">
        {/* Centered headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface-1 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Engine v2 — AI Sculpt
          </span>

          <h1 className="mt-6 text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-foreground">
            Generate{" "}
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
            </span>{" "}
            in 3D
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your all-in-one AI 3D workspace. Sculpt, retopologize and publish
            production-ready assets — from a single elegant studio.
          </p>
        </motion.div>

        {/* Two big showcase cards — Tripo3D style */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
          }}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Card 1 — HD Model */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="group relative overflow-hidden rounded-3xl min-h-[420px] md:min-h-[460px] shadow-[0_30px_80px_-30px_hsl(220_60%_30%/0.35)]"
            style={{
              background:
                "linear-gradient(135deg, hsl(220 80% 58%) 0%, hsl(230 70% 38%) 100%)",
            }}
          >
            <div className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:radial-gradient(circle_at_30%_20%,white,transparent_55%)]" />
            <img
              src={charHD}
              alt="High detail 3D character"
              className="absolute -bottom-2 -left-4 md:-left-8 h-[88%] md:h-[95%] w-auto object-contain pointer-events-none drop-shadow-[0_30px_30px_rgba(0,0,0,0.45)] transition-transform duration-700 group-hover:scale-[1.03]"
              loading="eager"
            />
            <div className="relative h-full flex flex-col justify-between p-7 md:p-9 ml-auto md:w-[55%]">
              <div className="flex items-center gap-2 self-end text-white/90 text-xs font-mono uppercase tracking-widest">
                <Sparkles className="h-3.5 w-3.5" />
                Featured
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  High Detail Model
                </h2>
                <p className="mt-3 text-white/80 text-sm md:text-base leading-relaxed">
                  Up to 2M polygons for 3D printing & visual arts.
                </p>
                <Link to="/edit" className="inline-block mt-6">
                  <Button
                    size="lg"
                    className="h-12 px-6 rounded-full bg-white text-[hsl(230_70%_38%)] hover:bg-white/95 gap-2 font-semibold shadow-lg"
                  >
                    Generate HD Model
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Card 2 — Smart Topology */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="group relative overflow-hidden rounded-3xl min-h-[420px] md:min-h-[460px] shadow-[0_30px_80px_-30px_hsl(20_70%_30%/0.35)]"
            style={{
              background:
                "linear-gradient(135deg, hsl(18 85% 58%) 0%, hsl(8 75% 42%) 100%)",
            }}
          >
            <div className="absolute inset-0 opacity-25 mix-blend-overlay [background-image:radial-gradient(circle_at_70%_20%,white,transparent_55%)]" />
            <img
              src={charMesh}
              alt="3D wireframe topology"
              className="absolute -bottom-2 -right-4 md:-right-8 h-[88%] md:h-[95%] w-auto object-contain pointer-events-none drop-shadow-[0_30px_30px_rgba(0,0,0,0.4)] transition-transform duration-700 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="relative h-full flex flex-col justify-between p-7 md:p-9 md:w-[55%]">
              <div className="flex items-center gap-2 text-white/90 text-xs font-mono uppercase tracking-widest">
                <Sparkles className="h-3.5 w-3.5" />
                Production Ready
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Smart Topology Mesh
                </h2>
                <p className="mt-3 text-white/85 text-sm md:text-base leading-relaxed">
                  ~2s clean retopology for games & web apps.
                </p>
                <Link to="/edit" className="inline-block mt-6">
                  <Button
                    size="lg"
                    className="h-12 px-6 rounded-full bg-white text-[hsl(8_75%_42%)] hover:bg-white/95 gap-2 font-semibold shadow-lg"
                  >
                    Generate Smart Mesh
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
