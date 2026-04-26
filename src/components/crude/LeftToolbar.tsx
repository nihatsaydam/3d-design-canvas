import { useState } from "react";
import ToolButton from "./ToolButton";
import { Brush, Layers, Scissors, Move3d, RotateCw, Maximize } from "lucide-react";

const tools = [
  { id: "brush", label: "Brush", icon: <Brush className="h-5 w-5" /> },
  { id: "material", label: "Material", icon: <Layers className="h-5 w-5" /> },
  { id: "mask", label: "Mask", icon: <Scissors className="h-5 w-5" /> },
  { id: "move", label: "Move", icon: <Move3d className="h-5 w-5" /> },
  { id: "rotate", label: "Rotate", icon: <RotateCw className="h-5 w-5" /> },
  { id: "scale", label: "Scale", icon: <Maximize className="h-5 w-5" /> },
];

export default function LeftToolbar() {
  const [active, setActive] = useState("brush");
  return (
    <aside className="w-20 flex flex-col items-center gap-2 px-2 py-3 border-r border-border bg-surface-1 shrink-0">
      {tools.map((t) => (
        <ToolButton
          key={t.id}
          active={active === t.id}
          onClick={() => setActive(t.id)}
          icon={t.icon}
          label={t.label}
          size="square"
          className="w-16 h-16"
        />
      ))}
    </aside>
  );
}
