import { Sun, Mountain, Monitor, Box, Layers, Eye } from "lucide-react";
import ToolButton from "./ToolButton";
import { useState } from "react";

const presetTabs = ["Light Presets", "Environment Settings", "Viewport Settings"];

export default function RightSidebar() {
  const [tab, setTab] = useState(0);

  return (
    <aside className="w-72 flex flex-col gap-3 p-3 border-l border-border bg-surface-1 shrink-0 overflow-y-auto scrollbar-thin">
      {/* Tabs */}
      <div className="panel rounded-lg p-1 flex text-[10px]">
        {presetTabs.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            className={`flex-1 px-2 py-1.5 rounded-md uppercase tracking-wider transition-colors ${
              tab === i ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* Presets grid */}
      <div className="panel rounded-xl p-3">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Presets</div>
        <div className="grid grid-cols-3 gap-2">
          {[Sun, Mountain, Monitor, Box, Layers, Eye].map((Icon, i) => (
            <button
              key={i}
              className="aspect-square rounded-lg bg-surface-2 hover:bg-surface-3 border border-border flex items-center justify-center transition-colors group"
            >
              <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Layers stack */}
      <div className="panel rounded-xl p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-widest label-red">Layers</span>
          <span className="text-[10px] font-mono text-muted-foreground">4</span>
        </div>
        <div className="space-y-1.5">
          {["Base Mesh", "Detail Pass", "Surface Noise", "AI Highlights"].map((name, i) => (
            <div
              key={name}
              className="flex items-center gap-2 px-2 py-2 rounded-md bg-surface-2 border border-border hover:border-primary/40 transition-colors cursor-pointer"
            >
              <Eye className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs flex-1 truncate">{name}</span>
              <span className="text-[9px] font-mono text-muted-foreground">{100 - i * 12}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick tools */}
      <div className="flex flex-col gap-1.5">
        {["Resample", "Hide", "Subtool", "Mask", "Crease", "Slice"].map((l) => (
          <ToolButton key={l} label={l} labelTone="red" size="sm" className="w-full" />
        ))}
      </div>

      {/* Morph target */}
      <div className="panel rounded-xl p-3">
        <div className="text-[10px] uppercase tracking-widest label-red mb-2">Morph Target</div>
        <div className="space-y-1.5">
          {["Neutral", "Smile", "Frown"].map((m) => (
            <div
              key={m}
              className="flex items-center justify-between px-2 py-1.5 rounded-md bg-surface-2 border border-border text-xs"
            >
              <span>{m}</span>
              <div className="h-1 w-12 bg-surface-3 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${Math.random() * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
