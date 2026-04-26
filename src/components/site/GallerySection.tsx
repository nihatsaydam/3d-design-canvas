import { useMemo, useState } from "react";
import { Heart, Eye, Download } from "lucide-react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import g7 from "@/assets/gallery-7.jpg";
import g8 from "@/assets/gallery-8.jpg";

type Category = "All" | "Characters" | "Creatures" | "Vehicles" | "Props" | "Objects";

interface Item {
  id: number;
  title: string;
  author: string;
  category: Exclude<Category, "All">;
  img: string;
  likes: number;
  views: string;
  tag?: string;
}

const ITEMS: Item[] = [
  { id: 1, title: "Oni Samurai Helmet", author: "kaito.r", category: "Characters", img: g1, likes: 1240, views: "12.4k", tag: "Featured" },
  { id: 2, title: "Crimson Wyrm",       author: "vex.studio", category: "Creatures", img: g2, likes: 982, views: "9.1k" },
  { id: 3, title: "GT-X Concept",       author: "northpaw", category: "Vehicles", img: g3, likes: 1573, views: "18.7k", tag: "Trending" },
  { id: 4, title: "Mochi Bot Mk.II",    author: "yuna.io", category: "Characters", img: g4, likes: 712, views: "5.8k" },
  { id: 5, title: "Runeblade Aether",   author: "forge.lab", category: "Props", img: g5, likes: 1102, views: "10.2k" },
  { id: 6, title: "Voyager Helm",       author: "drift.fx", category: "Characters", img: g6, likes: 845, views: "7.4k" },
  { id: 7, title: "Loot Crate Stylized",author: "pix.guild", category: "Props", img: g7, likes: 433, views: "3.1k" },
  { id: 8, title: "Shell Lounge Chair", author: "nori.lab", category: "Objects", img: g8, likes: 661, views: "4.9k", tag: "Editor's Pick" },
];

const CATEGORIES: Category[] = ["All", "Characters", "Creatures", "Vehicles", "Props", "Objects"];

export default function GallerySection() {
  const [active, setActive] = useState<Category>("All");

  const filtered = useMemo(
    () => (active === "All" ? ITEMS : ITEMS.filter((i) => i.category === active)),
    [active],
  );

  return (
    <section id="gallery" className="relative">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-primary">/ community</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
              Made in CRUDE 3D
            </h2>
            <p className="mt-2 text-muted-foreground max-w-xl">
              A curated showcase of recent works from our community of artists, sculptors and tinkerers.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const isActive = c === active;
              return (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-[0_0_18px_hsl(var(--primary)/0.4)]"
                      : "bg-surface-1 border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((item, idx) => (
            <article
              key={item.id}
              className={`group relative rounded-xl overflow-hidden border border-border bg-surface-1 hover:border-primary/40 transition-all hover:-translate-y-1 ${
                idx === 0 ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
            >
              <div className={`relative ${idx === 0 ? "aspect-square sm:aspect-auto sm:h-full" : "aspect-square"} overflow-hidden`}>
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  width={768}
                  height={768}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-90" />

                {item.tag && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-widest font-mono bg-primary/90 text-primary-foreground backdrop-blur-sm">
                    {item.tag}
                  </span>
                )}

                <span className="absolute top-3 right-3 px-2 py-1 rounded-md text-[10px] uppercase tracking-widest font-mono bg-black/60 text-foreground/90 backdrop-blur-sm border border-white/10">
                  {item.category}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-sm md:text-base font-semibold text-foreground truncate">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">@{item.author}</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-foreground/80">
                      <span className="inline-flex items-center gap-1"><Heart className="h-3.5 w-3.5 text-primary" /> {item.likes}</span>
                      <span className="inline-flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {item.views}</span>
                    </div>
                  </div>
                </div>

                {/* Hover action */}
                <button
                  className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 inline-flex items-center justify-center gap-2 h-9 rounded-md bg-foreground/95 text-background text-xs font-semibold backdrop-blur-sm hover:bg-foreground"
                  aria-label={`Download ${item.title}`}
                >
                  <Download className="h-3.5 w-3.5" /> Download .glb
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
