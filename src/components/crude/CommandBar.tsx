import ToolButton from "./ToolButton";
import SliderRow from "./SliderRow";
import { File, FolderOpen, Save, Undo2, Redo2, Camera, Download } from "lucide-react";

export default function CommandBar() {
  return (
    <div className="h-20 flex items-center gap-3 px-4 border-b border-border bg-surface-1 shrink-0">
      <div className="flex gap-2">
        <ToolButton icon={<File className="h-4 w-4" />} label="New" labelTone="muted" size="square" />
        <ToolButton icon={<FolderOpen className="h-4 w-4" />} label="Open" labelTone="muted" size="square" />
        <ToolButton icon={<Save className="h-4 w-4" />} label="Save" labelTone="muted" size="square" />
      </div>
      <div className="h-10 w-px bg-border" />
      <div className="flex gap-2">
        <ToolButton icon={<Undo2 className="h-4 w-4" />} label="Undo" labelTone="red" size="square" />
        <ToolButton icon={<Redo2 className="h-4 w-4" />} label="Redo" labelTone="red" size="square" />
        <ToolButton icon={<Camera className="h-4 w-4" />} label="View" labelTone="red" size="square" />
      </div>
      <div className="h-10 w-px bg-border" />
      <div className="px-3 py-2 panel rounded-lg font-mono text-[11px]">
        <div className="text-[9px] uppercase tracking-widest text-muted-foreground">Poly Count</div>
        <div className="text-foreground font-semibold">12,654</div>
      </div>
      <div className="flex-1 max-w-md panel rounded-lg px-4 py-2 flex flex-col gap-1.5">
        <SliderRow label="Focal Shift" defaultValue={45} />
        <SliderRow label="Draw Size" defaultValue={62} />
        <SliderRow label="Intensity" defaultValue={78} />
      </div>
      <div className="ml-auto flex gap-2">
        <ToolButton
          icon={<Download className="h-4 w-4" />}
          label="Save And Turn /"
          labelTone="red"
          size="lg"
          className="px-5"
        />
      </div>
    </div>
  );
}
