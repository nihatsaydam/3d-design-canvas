import { useState, useRef, useEffect, useCallback } from "react";
import {
  Sparkles,
  Send,
  ImagePlus,
  Mic,
  X,
  Plus,
  MessageSquare,
  Search,
  Bot,
  User,
  GripVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = { id: string; role: "user" | "assistant"; content: string };
type Conversation = { id: string; title: string; preview: string; time: string };

const MOCK_HISTORY: Conversation[] = [
  { id: "1", title: "Sci-fi helmet concept", preview: "Make the visor more reflective…", time: "2m" },
  { id: "2", title: "Dragon scale material", preview: "Try iridescent shader pass", time: "1h" },
  { id: "3", title: "Hero character base", preview: "Retopology pass at 12k tris", time: "Yesterday" },
  { id: "4", title: "Stylized rock pack", preview: "8 variations, low poly", time: "2d" },
  { id: "5", title: "Vehicle blockout", preview: "Hover bike silhouette study", time: "3d" },
];

const INITIAL_MSGS: Msg[] = [
  {
    id: "m1",
    role: "assistant",
    content:
      "Hi — I'm your AI Director. Describe what you want to sculpt, refine, or regenerate. I can also analyze reference images you upload.",
  },
];

const MIN_W = 380;
const MIN_H = 320;
const DEFAULT_W = 520;
const DEFAULT_H = 560;

export default function AIPanel() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(INITIAL_MSGS);
  const [input, setInput] = useState("");
  const [activeId, setActiveId] = useState("1");
  const [recording, setRecording] = useState(false);

  // Floating panel position + size (right-anchored by default)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [size, setSize] = useState({ w: DEFAULT_W, h: DEFAULT_H });
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize position to right side when opening
  useEffect(() => {
    if (open && pos === null && panelRef.current?.parentElement) {
      const parent = panelRef.current.parentElement.getBoundingClientRect();
      setPos({
        x: Math.max(8, parent.width - size.w - 16),
        y: Math.max(8, parent.height - size.h - 80),
      });
    }
  }, [open, pos, size.w, size.h]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Msg = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: Date.now().toString() + "a",
          role: "assistant",
          content:
            "Got it. I'll prepare a regeneration pass with those parameters and surface variants in the viewport shortly.",
        },
      ]);
    }, 700);
  };

  // ---- Drag ----
  const startDrag = useCallback(
    (e: React.PointerEvent) => {
      if (!pos) return;
      e.preventDefault();
      const startX = e.clientX;
      const startY = e.clientY;
      const origin = { ...pos };
      const parent = panelRef.current?.parentElement?.getBoundingClientRect();

      const onMove = (ev: PointerEvent) => {
        const nx = origin.x + (ev.clientX - startX);
        const ny = origin.y + (ev.clientY - startY);
        const maxX = parent ? parent.width - size.w - 4 : 9999;
        const maxY = parent ? parent.height - size.h - 4 : 9999;
        setPos({
          x: Math.max(4, Math.min(nx, maxX)),
          y: Math.max(4, Math.min(ny, maxY)),
        });
      };
      const onUp = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [pos, size.w, size.h]
  );

  // ---- Resize (bottom-left corner so right anchor feels natural) ----
  const startResize = useCallback(
    (e: React.PointerEvent, dir: "se" | "sw" | "ne" | "nw") => {
      if (!pos) return;
      e.preventDefault();
      e.stopPropagation();
      const startX = e.clientX;
      const startY = e.clientY;
      const startW = size.w;
      const startH = size.h;
      const startPos = { ...pos };
      const parent = panelRef.current?.parentElement?.getBoundingClientRect();

      const onMove = (ev: PointerEvent) => {
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;
        let w = startW;
        let h = startH;
        let x = startPos.x;
        let y = startPos.y;

        if (dir.includes("e")) w = startW + dx;
        if (dir.includes("s")) h = startH + dy;
        if (dir.includes("w")) {
          w = startW - dx;
          x = startPos.x + dx;
        }
        if (dir.includes("n")) {
          h = startH - dy;
          y = startPos.y + dy;
        }

        if (w < MIN_W) {
          if (dir.includes("w")) x -= MIN_W - w;
          w = MIN_W;
        }
        if (h < MIN_H) {
          if (dir.includes("n")) y -= MIN_H - h;
          h = MIN_H;
        }
        if (parent) {
          w = Math.min(w, parent.width - 8);
          h = Math.min(h, parent.height - 8);
          x = Math.max(4, Math.min(x, parent.width - w - 4));
          y = Math.max(4, Math.min(y, parent.height - h - 4));
        }
        setSize({ w, h });
        setPos({ x, y });
      };
      const onUp = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [pos, size.w, size.h]
  );

  return (
    <>
      {/* Floating trigger — sits over the viewport, transparent backdrop */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
        <button
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "pointer-events-auto group h-10 px-5 rounded-full flex items-center gap-2.5 backdrop-blur-xl border transition-all shadow-[0_8px_32px_hsl(var(--neon)/0.25)]",
            open
              ? "bg-neon/20 border-neon/70"
              : "border-neon/40 bg-background/30 hover:bg-background/45 hover:border-neon/70 hover:scale-[1.03]"
          )}
        >
          <Sparkles className="h-3.5 w-3.5 text-neon" />
          <span className="label-neon text-[11px] uppercase tracking-[0.2em] font-semibold">
            Ask AI Director
          </span>
          <span className="px-1.5 py-0.5 rounded-md bg-background/40 text-[9px] uppercase tracking-widest text-muted-foreground border border-border/40">
            ⌘K
          </span>
        </button>
      </div>

      {/* Floating, draggable, resizable glassmorphism panel — does NOT cover viewport */}
      {open && pos && (
        <div
          ref={panelRef}
          className="absolute z-50 rounded-2xl border border-white/10 bg-background/40 backdrop-blur-2xl flex flex-col overflow-hidden animate-scale-in"
          style={{
            left: pos.x,
            top: pos.y,
            width: size.w,
            height: size.h,
            boxShadow:
              "0 0 0 1px hsl(var(--neon) / 0.08), 0 0 60px hsl(var(--neon) / 0.18), 0 25px 60px hsl(0 0% 0% / 0.5)",
          }}
        >
          {/* Header / drag handle */}
          <div
            onPointerDown={startDrag}
            className="h-12 px-3 flex items-center justify-between border-b border-white/10 bg-white/5 shrink-0 cursor-grab active:cursor-grabbing select-none"
          >
            <div className="flex items-center gap-2.5">
              <GripVertical className="h-4 w-4 text-muted-foreground/60" />
              <div
                className="h-7 w-7 rounded-lg flex items-center justify-center"
                style={{ background: "var(--gradient-neon)" }}
              >
                <Sparkles className="h-3.5 w-3.5 text-neon" />
              </div>
              <div className="leading-tight">
                <div className="text-xs font-semibold tracking-tight">AI Director</div>
                <div className="text-[9px] uppercase tracking-widest text-muted-foreground">
                  Online · GPT-Sculpt v2
                </div>
              </div>
            </div>
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => setOpen(false)}
              className="h-8 w-8 rounded-lg flex items-center justify-center border border-white/10 bg-white/5 hover:border-neon/60 transition-colors"
              aria-label="Close"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Body: history | chat (history collapses on narrow widths) */}
          <div className="flex-1 flex min-h-0">
            {size.w >= 560 && (
              <aside className="w-52 border-r border-white/10 bg-white/[0.03] flex flex-col shrink-0">
                <div className="p-2.5 border-b border-white/10 space-y-2">
                  <button className="w-full h-8 rounded-md flex items-center justify-center gap-1.5 bg-primary/90 hover:bg-primary text-primary-foreground text-[11px] font-semibold uppercase tracking-wider transition-colors">
                    <Plus className="h-3 w-3" />
                    New chat
                  </button>
                  <div className="relative">
                    <Search className="h-3 w-3 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      placeholder="Search…"
                      className="w-full h-7 pl-7 pr-2 rounded-md bg-white/5 border border-white/10 text-[11px] outline-none focus:border-neon/50 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-1.5 space-y-0.5">
                  <div className="px-1.5 py-1 text-[9px] uppercase tracking-widest text-muted-foreground font-mono">
                    Recent
                  </div>
                  {MOCK_HISTORY.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setActiveId(c.id)}
                      className={cn(
                        "w-full text-left p-2 rounded-md border transition-all",
                        activeId === c.id
                          ? "bg-white/10 border-neon/40"
                          : "border-transparent hover:bg-white/5 hover:border-white/10"
                      )}
                    >
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <MessageSquare className="h-2.5 w-2.5 text-muted-foreground shrink-0" />
                        <span className="text-[11px] font-semibold truncate flex-1">{c.title}</span>
                        <span className="text-[9px] text-muted-foreground shrink-0">{c.time}</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground truncate pl-4">
                        {c.preview}
                      </div>
                    </button>
                  ))}
                </div>
              </aside>
            )}

            {/* Chat area */}
            <section className="flex-1 flex flex-col min-w-0">
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={cn(
                      "flex gap-2 max-w-[90%]",
                      m.role === "user" ? "ml-auto flex-row-reverse" : ""
                    )}
                  >
                    <div
                      className={cn(
                        "h-7 w-7 rounded-md flex items-center justify-center shrink-0 border",
                        m.role === "user"
                          ? "bg-primary/15 border-primary/30 text-primary"
                          : "bg-white/5 border-white/10 text-neon"
                      )}
                    >
                      {m.role === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                    </div>
                    <div
                      className={cn(
                        "rounded-xl px-3 py-2 text-[12.5px] leading-relaxed",
                        m.role === "user"
                          ? "bg-primary/15 border border-primary/25 text-foreground rounded-tr-sm"
                          : "bg-white/5 border border-white/10 text-foreground/90 rounded-tl-sm"
                      )}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Composer */}
              <div className="p-2.5 border-t border-white/10 bg-white/[0.03] shrink-0">
                <div className="flex items-end gap-1.5 p-1.5 rounded-xl bg-white/5 border border-white/10 focus-within:border-neon/50 transition-colors">
                  <button
                    title="Upload image"
                    className="h-8 w-8 shrink-0 rounded-md flex items-center justify-center hover:bg-white/10 text-muted-foreground hover:text-neon transition-colors"
                  >
                    <ImagePlus className="h-3.5 w-3.5" />
                  </button>
                  <button
                    title="Voice"
                    onClick={() => setRecording((r) => !r)}
                    className={cn(
                      "h-8 w-8 shrink-0 rounded-md flex items-center justify-center transition-colors",
                      recording
                        ? "bg-primary/20 text-primary animate-pulse"
                        : "hover:bg-white/10 text-muted-foreground hover:text-neon"
                    )}
                  >
                    <Mic className="h-3.5 w-3.5" />
                  </button>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        send();
                      }
                    }}
                    rows={1}
                    placeholder="Ask the AI Director…"
                    className="flex-1 bg-transparent outline-none text-[12.5px] resize-none py-1.5 px-1 max-h-28 placeholder:text-muted-foreground/60"
                  />
                  <button
                    onClick={send}
                    disabled={!input.trim()}
                    className="h-8 px-3 shrink-0 rounded-md flex items-center gap-1.5 bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-primary-foreground text-[11px] font-semibold uppercase tracking-wider transition-all"
                  >
                    <Send className="h-3 w-3" />
                    Send
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Resize handles */}
          <div
            onPointerDown={(e) => startResize(e, "nw")}
            className="absolute top-0 left-0 w-3 h-3 cursor-nwse-resize z-10"
          />
          <div
            onPointerDown={(e) => startResize(e, "ne")}
            className="absolute top-0 right-0 w-3 h-3 cursor-nesw-resize z-10"
          />
          <div
            onPointerDown={(e) => startResize(e, "sw")}
            className="absolute bottom-0 left-0 w-3 h-3 cursor-nesw-resize z-10"
          />
          <div
            onPointerDown={(e) => startResize(e, "se")}
            className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-10 flex items-end justify-end p-0.5"
          >
            <div className="w-2 h-2 border-r-2 border-b-2 border-white/30 rounded-sm" />
          </div>
          {/* edge handles */}
          <div
            onPointerDown={(e) => startResize(e, "ne")}
            className="absolute top-0 left-3 right-3 h-1 cursor-ns-resize"
          />
          <div
            onPointerDown={(e) => startResize(e, "se")}
            className="absolute bottom-0 left-3 right-3 h-1 cursor-ns-resize"
          />
          <div
            onPointerDown={(e) => startResize(e, "sw")}
            className="absolute left-0 top-3 bottom-3 w-1 cursor-ew-resize"
          />
          <div
            onPointerDown={(e) => startResize(e, "se")}
            className="absolute right-0 top-3 bottom-3 w-1 cursor-ew-resize"
          />
        </div>
      )}
    </>
  );
}
