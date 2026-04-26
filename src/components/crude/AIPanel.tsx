import { useState, useRef, useEffect } from "react";
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

export default function AIPanel() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(INITIAL_MSGS);
  const [input, setInput] = useState("");
  const [activeId, setActiveId] = useState("1");
  const [recording, setRecording] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Msg = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    // mock assistant reply
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

  return (
    <>
      {/* Floating trigger — sits over the viewport, transparent backdrop */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
        <button
          onClick={() => setOpen(true)}
          className="pointer-events-auto group h-10 px-5 rounded-full flex items-center gap-2.5 backdrop-blur-xl border border-neon/40 bg-background/30 hover:bg-background/45 hover:border-neon/70 hover:scale-[1.03] transition-all shadow-[0_8px_32px_hsl(var(--neon)/0.25)]"
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

      {/* Glassmorphism floating panel — not full-screen */}
      {open && (
        <div
          className="absolute inset-0 z-50 flex items-end justify-center pointer-events-none animate-fade-in"
        >
          {/* click-catcher (transparent, no dim) */}
          <div
            className="absolute inset-0 pointer-events-auto"
            onClick={() => setOpen(false)}
          />
          <div
            onClick={(e) => e.stopPropagation()}
            className="pointer-events-auto relative w-[min(960px,calc(100%-2rem))] h-[min(560px,75%)] mb-5 rounded-2xl border border-white/10 bg-background/40 backdrop-blur-2xl flex flex-col overflow-hidden animate-scale-in"
            style={{
              boxShadow:
                "0 0 0 1px hsl(var(--neon) / 0.08), 0 0 80px hsl(var(--neon) / 0.18), 0 25px 60px hsl(0 0% 0% / 0.55)",
            }}
          >
            {/* Header */}
            <div className="h-14 px-5 flex items-center justify-between border-b border-white/10 bg-white/5 shrink-0">
              <div className="flex items-center gap-3">
                <div
                  className="h-8 w-8 rounded-lg flex items-center justify-center"
                  style={{ background: "var(--gradient-neon)" }}
                >
                  <Sparkles className="h-4 w-4 text-neon" />
                </div>
                <div>
                  <div className="text-sm font-semibold tracking-tight">AI Director</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Online · GPT-Sculpt v2
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="h-9 w-9 rounded-lg flex items-center justify-center border border-border bg-surface-1 hover:border-neon/60 transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body: history | chat */}
            <div className="flex-1 flex min-h-0">
              {/* History sidebar */}
              <aside className="w-72 border-r border-border bg-surface-0/40 flex flex-col shrink-0">
                <div className="p-3 border-b border-border space-y-2">
                  <button className="w-full h-9 rounded-lg flex items-center justify-center gap-2 bg-primary/90 hover:bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider transition-colors">
                    <Plus className="h-3.5 w-3.5" />
                    New chat
                  </button>
                  <div className="relative">
                    <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      placeholder="Search history…"
                      className="w-full h-8 pl-8 pr-3 rounded-md bg-surface-2 border border-border text-xs outline-none focus:border-neon/50 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                  <div className="px-2 py-1 text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                    Recent
                  </div>
                  {MOCK_HISTORY.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setActiveId(c.id)}
                      className={cn(
                        "w-full text-left p-2.5 rounded-lg border transition-all group",
                        activeId === c.id
                          ? "bg-surface-2 border-neon/40"
                          : "border-transparent hover:bg-surface-2/60 hover:border-border"
                      )}
                    >
                      <div className="flex items-center gap-2 mb-0.5">
                        <MessageSquare className="h-3 w-3 text-muted-foreground shrink-0" />
                        <span className="text-xs font-semibold truncate flex-1">{c.title}</span>
                        <span className="text-[10px] text-muted-foreground shrink-0">{c.time}</span>
                      </div>
                      <div className="text-[11px] text-muted-foreground truncate pl-5">
                        {c.preview}
                      </div>
                    </button>
                  ))}
                </div>
              </aside>

              {/* Chat area */}
              <section className="flex-1 flex flex-col min-w-0">
                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-5">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={cn(
                        "flex gap-3 max-w-[85%]",
                        m.role === "user" ? "ml-auto flex-row-reverse" : ""
                      )}
                    >
                      <div
                        className={cn(
                          "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border",
                          m.role === "user"
                            ? "bg-primary/15 border-primary/30 text-primary"
                            : "bg-surface-2 border-border text-neon"
                        )}
                      >
                        {m.role === "user" ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </div>
                      <div
                        className={cn(
                          "rounded-2xl px-4 py-3 text-sm leading-relaxed",
                          m.role === "user"
                            ? "bg-primary/15 border border-primary/25 text-foreground rounded-tr-sm"
                            : "bg-surface-2 border border-border text-foreground/90 rounded-tl-sm"
                        )}
                      >
                        {m.content}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Composer */}
                <div className="p-4 border-t border-border bg-surface-2/40 shrink-0">
                  <div className="flex items-end gap-2 p-2 rounded-xl bg-surface-1 border border-border focus-within:border-neon/50 transition-colors">
                    <button
                      title="Upload image"
                      className="h-9 w-9 shrink-0 rounded-lg flex items-center justify-center hover:bg-surface-2 text-muted-foreground hover:text-neon transition-colors"
                    >
                      <ImagePlus className="h-4 w-4" />
                    </button>
                    <button
                      title="Voice"
                      onClick={() => setRecording((r) => !r)}
                      className={cn(
                        "h-9 w-9 shrink-0 rounded-lg flex items-center justify-center transition-colors",
                        recording
                          ? "bg-primary/20 text-primary animate-pulse"
                          : "hover:bg-surface-2 text-muted-foreground hover:text-neon"
                      )}
                    >
                      <Mic className="h-4 w-4" />
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
                      placeholder="Ask the AI Director anything…"
                      className="flex-1 bg-transparent outline-none text-sm resize-none py-2 px-1 max-h-32 placeholder:text-muted-foreground/60"
                    />
                    <button
                      onClick={send}
                      disabled={!input.trim()}
                      className="h-9 px-4 shrink-0 rounded-lg flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-primary-foreground text-xs font-semibold uppercase tracking-wider transition-all"
                    >
                      <Send className="h-3.5 w-3.5" />
                      Send
                    </button>
                  </div>
                  <div className="mt-2 px-1 text-[10px] uppercase tracking-widest text-muted-foreground/70 font-mono">
                    Enter to send · Shift+Enter for newline
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
