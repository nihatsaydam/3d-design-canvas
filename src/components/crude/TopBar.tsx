import { ChevronRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <header
      className="h-10 flex items-center px-3 gap-3 border-b border-border shrink-0"
      style={{ background: "var(--gradient-topbar)" }}
    >
      <Link
        to="/"
        className="group inline-flex items-center gap-1.5 h-7 pl-1.5 pr-2.5 rounded-md border border-border bg-surface-1 hover:bg-surface-2 hover:border-primary/40 text-xs text-muted-foreground hover:text-foreground transition-all"
        title="Back to studio"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        Back
      </Link>

      <div className="h-5 w-px bg-border" />

      <Link to="/" className="flex items-baseline gap-1">
        <span className="text-primary font-bold text-lg tracking-tight">CRUDE</span>
        <span className="text-foreground font-bold text-lg tracking-tight">3D</span>
      </Link>
      <div className="h-5 w-px bg-border" />
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <span>Evecrude Edit Mode</span>
        <ChevronRight className="h-3 w-3 opacity-60" />
        <span>Art directability</span>
        <ChevronRight className="h-3 w-3 opacity-60" />
        <span className="text-foreground">Control</span>
      </nav>
      <div className="ml-auto flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-neon shadow-[0_0_8px_hsl(var(--neon)/0.8)]" />
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Engine Online</span>
      </div>
    </header>
  );
}
