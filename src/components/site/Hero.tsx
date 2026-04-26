import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import charHD from "@/assets/hero-char-1.png";
import charMesh from "@/assets/hero-char-2.png";
import heroBg from "@/assets/hero-bg.jpg";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Dramatic backdrop with subtle concept-art bg */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-[0.18]"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,hsl(220_60%_92%),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-[1400px] px-6 pt-14 pb-28 md:pt-20">
        {/* Centered headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Generate Anything in 3D
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground">
            Your All-in-One AI 3D Workspace
          </p>
        </motion.div>

        {/* Two showcase cards — Tripo3D layout */}
        <div className="mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative">
          {/* ====== Card 1 — High Detail Model (BLUE) ====== */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="relative pb-10"
          >
            <div
              className="relative rounded-[28px] overflow-hidden h-[360px] md:h-[420px] shadow-[0_30px_70px_-30px_hsl(220_70%_30%/0.45)]"
              style={{
                background:
                  "linear-gradient(135deg, hsl(218 85% 56%) 0%, hsl(228 75% 38%) 100%)",
              }}
            >
              {/* soft light highlight */}
              <div className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:radial-gradient(circle_at_75%_15%,white,transparent_55%)]" />

              {/* Text — left aligned */}
              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-center max-w-[58%]">
                <h2 className="text-3xl md:text-[42px] font-bold text-white leading-[1.1]">
                  High Detail Model
                </h2>
                <p className="mt-4 text-white/85 text-sm md:text-[15px] leading-relaxed">
                  Up to 2 Million Polygons for 3D Printing & Visual Arts
                </p>
              </div>

              {/* Character — overflows on the right */}
              <img
                src={charHD}
                alt="High detail 3D character"
                className="pointer-events-none absolute -right-6 md:-right-10 -bottom-6 h-[115%] md:h-[125%] w-auto object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.45)]"
                loading="eager"
              />
            </div>

            {/* CTA — overlapping bottom-center */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 z-10">
              <Link to="/edit">
                <Button
                  size="lg"
                  className="h-14 px-8 rounded-full text-white gap-3 font-semibold text-base shadow-[0_18px_40px_-10px_hsl(220_80%_40%/0.6)] border-0"
                  style={{
                    background:
                      "linear-gradient(180deg, hsl(218 90% 58%), hsl(228 80% 42%))",
                  }}
                >
                  Generate HD Model
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* ====== Card 2 — Smart Topology (ORANGE) ====== */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="relative pb-10"
          >
            <div
              className="relative rounded-[28px] overflow-hidden h-[360px] md:h-[420px] shadow-[0_30px_70px_-30px_hsl(20_70%_30%/0.45)]"
              style={{
                background:
                  "linear-gradient(135deg, hsl(20 85% 55%) 0%, hsl(12 80% 38%) 100%)",
              }}
            >
              <div className="absolute inset-0 opacity-25 mix-blend-overlay [background-image:radial-gradient(circle_at_25%_15%,white,transparent_55%)]" />

              {/* Text — left aligned */}
              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-center max-w-[58%]">
                <h2 className="text-3xl md:text-[42px] font-bold text-white leading-[1.1]">
                  Smart Topology Mesh
                </h2>
                <p className="mt-4 text-white/85 text-sm md:text-[15px] leading-relaxed">
                  ~2s | Clean Topology for Games & Web Applications
                </p>
              </div>

              {/* Character — overflows on the right */}
              <img
                src={charMesh}
                alt="3D wireframe topology"
                className="pointer-events-none absolute -right-6 md:-right-10 -bottom-6 h-[115%] md:h-[125%] w-auto object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.4)]"
                loading="lazy"
              />
            </div>

            {/* CTA — overlapping bottom-center */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 z-10">
              <Link to="/edit">
                <Button
                  size="lg"
                  className="h-14 px-8 rounded-full text-white gap-3 font-semibold text-base shadow-[0_18px_40px_-10px_hsl(20_80%_40%/0.6)] border-0"
                  style={{
                    background:
                      "linear-gradient(180deg, hsl(20 90% 58%), hsl(12 85% 42%))",
                  }}
                >
                  Generate Smart Mesh
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
