import Viewport3D from "./Viewport3D";

export default function Viewport() {
  return (
    <div className="flex-1 relative overflow-hidden" style={{ background: "var(--gradient-viewport)" }}>
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* 3D Canvas */}
      <Viewport3D />

      {/* Top-right floating tabs */}
      <div className="absolute top-3 right-3 flex gap-1 panel rounded-lg p-1 text-[10px] uppercase tracking-wider">
        <button className="px-3 py-1.5 rounded-md bg-surface-3 text-foreground">Light Presets</button>
        <button className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground">Environment</button>
        <button className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground">Viewport</button>
      </div>

      {/* Bottom-left HUD */}
      <div className="absolute bottom-3 left-3 font-mono text-[10px] text-muted-foreground space-y-0.5 pointer-events-none">
        <div>3D VIEWPORT</div>
        <div className="text-primary/70">UI MODE — NO ENGINE LINK</div>
        <div>FPS 60 · 1.0x</div>
      </div>

      {/* Axis gizmo */}
      <div className="absolute bottom-3 right-3 panel rounded-lg p-2 font-mono text-[9px] flex items-center gap-2">
        <div className="flex flex-col items-center">
          <span className="text-primary">Y</span>
          <span className="text-neon">Z</span>
          <span className="text-blue-400">X</span>
        </div>
        <div className="w-px h-8 bg-border" />
        <div className="text-muted-foreground">
          <div>x 0.000</div>
          <div>y 0.000</div>
          <div>z 0.000</div>
        </div>
      </div>
    </div>
  );
}
