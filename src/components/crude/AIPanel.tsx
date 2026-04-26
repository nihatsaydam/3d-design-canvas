import { Sparkles, Plug, Download } from "lucide-react";

export default function AIPanel() {
  return (
    <div className="h-24 flex items-center justify-center gap-3 px-4 border-t border-border bg-surface-1 shrink-0">
      <button
        className="h-16 px-5 rounded-xl flex flex-col items-center justify-center gap-0.5 border transition-all"
        style={{
          background: "var(--gradient-neon)",
          borderColor: "hsl(var(--neon) / 0.5)",
          boxShadow: "var(--shadow-glow-neon)",
        }}
      >
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-neon" />
          <span className="label-neon text-[11px] uppercase tracking-widest">AI Regenerate</span>
        </div>
        <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Mask Regenerate Area</span>
      </button>

      <div className="h-16 flex-1 max-w-2xl panel rounded-xl flex items-center px-4 gap-3">
        <input
          type="text"
          placeholder="Type regenerated prompt…"
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground/60 font-mono"
        />
        <button className="h-9 w-9 rounded-lg flex items-center justify-center bg-surface-2 border border-border hover:border-neon/60 transition-colors">
          <Plug className="h-4 w-4 text-neon" />
        </button>
        <button className="h-9 w-9 rounded-lg flex items-center justify-center bg-surface-2 border border-border hover:border-neon/60 transition-colors">
          <Download className="h-4 w-4 text-neon" />
        </button>
      </div>

      <button
        className="h-16 px-5 rounded-xl flex flex-col items-center justify-center border bg-surface-2 hover:border-neon/60 transition-all"
      >
        <span className="label-neon text-[11px] uppercase tracking-widest">Regenerated Prompt</span>
        <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Type…</span>
      </button>
    </div>
  );
}
