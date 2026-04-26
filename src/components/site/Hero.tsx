import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Wand2, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.18),transparent_55%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-24 pb-32 md:pt-32 md:pb-40">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-xs font-mono uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            New — Engine v2 with AI Sculpt
          </span>

          <h1 className="mt-6 text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            Sculpt <span className="text-primary">worlds</span>,
            <br /> not just <span className="italic font-serif font-normal">meshes.</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            CRUDE 3D is an AI-native sculpting & rendering studio. Generate concept-ready
            assets in seconds, refine them with a real-time engine, and publish your gallery
            — all from one elegant workspace.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
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
          </div>

          {/* Feature chips */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
            {[
              { icon: Wand2, label: "Text → 3D", sub: "Prompt to mesh in <30s" },
              { icon: Layers, label: "Live Sculpt", sub: "Real-time PBR engine" },
              { icon: Sparkles, label: "AI Retopology", sub: "Production-ready geo" },
            ].map((f) => (
              <div
                key={f.label}
                className="rounded-xl border border-border bg-surface-1/70 backdrop-blur-sm p-4 hover:border-primary/40 transition-colors"
              >
                <f.icon className="h-5 w-5 text-primary" />
                <div className="mt-2 text-sm font-semibold text-foreground">{f.label}</div>
                <div className="text-xs text-muted-foreground">{f.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
