import { useState } from "react";

interface SliderRowProps {
  label: string;
  defaultValue?: number;
  min?: number;
  max?: number;
}

export default function SliderRow({ label, defaultValue = 50, min = 0, max = 100 }: SliderRowProps) {
  const [value, setValue] = useState(defaultValue);
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex items-center gap-3">
      <span className="label-red text-[10px] uppercase tracking-wider w-20 shrink-0">{label}</span>
      <div className="relative flex-1 h-4 flex items-center">
        <div className="absolute inset-x-0 h-[2px] bg-surface-3 rounded-full" />
        <div
          className="absolute h-[2px] bg-primary/70 rounded-full"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.7)] -translate-x-1/2 pointer-events-none"
          style={{ left: `${pct}%` }}
        />
      </div>
      <span className="text-[10px] font-mono text-muted-foreground w-8 text-right">{value}</span>
    </div>
  );
}
