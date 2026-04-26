import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Crown, Building2 } from "lucide-react";
import SiteShell from "@/components/site/SiteShell";

type Cycle = "monthly" | "yearly";

const PLANS = [
  {
    name: "Free",
    icon: Sparkles,
    price: { monthly: 0, yearly: 0 },
    blurb: "For curious creators getting started.",
    credits: "200 credits / month",
    cta: "Start free",
    highlight: false,
    features: [
      "Text → 3D (low-res)",
      "Personal use only",
      "Public gallery uploads",
      "Community support",
    ],
  },
  {
    name: "Creator",
    icon: Zap,
    price: { monthly: 19, yearly: 15 },
    blurb: "For solo artists shipping projects.",
    credits: "3,000 credits / month",
    cta: "Start 14-day trial",
    highlight: true,
    features: [
      "All Free features",
      "Hi-res Text/Image → 3D",
      "AI Retopology + 4K bake",
      "Commercial license",
      "Private projects",
      "Priority queue",
    ],
  },
  {
    name: "Studio",
    icon: Crown,
    price: { monthly: 49, yearly: 39 },
    blurb: "For teams shipping at production scale.",
    credits: "10,000 credits / month",
    cta: "Upgrade to Studio",
    highlight: false,
    features: [
      "All Creator features",
      "5 seats included",
      "Shared team library",
      "Animation rigging",
      "API access (beta)",
      "Dedicated support",
    ],
  },
  {
    name: "Enterprise",
    icon: Building2,
    price: { monthly: null, yearly: null },
    blurb: "Custom deployment & SLAs.",
    credits: "Unlimited credits",
    cta: "Talk to sales",
    highlight: false,
    features: [
      "All Studio features",
      "SSO / SAML",
      "On-prem or VPC",
      "Custom model fine-tuning",
      "99.9% uptime SLA",
      "Dedicated CSM",
    ],
  },
];

const FAQ = [
  { q: "What is a credit?", a: "Credits are consumed by AI operations: text-to-3D, image-to-3D, retopology, baking, animation. See the cost reference on the homepage." },
  { q: "Do unused credits roll over?", a: "Creator and Studio plans roll over up to one month of unused credits. Free credits reset every cycle." },
  { q: "Can I cancel anytime?", a: "Yes. Cancellations take effect at the end of the current billing cycle and you keep access until then." },
  { q: "Do I own the assets I generate?", a: "On paid plans you receive a full commercial license for everything you create with CRUDE 3D." },
];

const Pricing = () => {
  const [cycle, setCycle] = useState<Cycle>("monthly");

  return (
    <SiteShell>
      {/* Hero */}
      <section className="border-b border-border/60 bg-surface-0/40 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.2),transparent_55%)]" />
        <div className="mx-auto max-w-7xl px-6 py-20 text-center relative">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs font-mono uppercase tracking-widest text-primary">/ pricing</span>
            <h1 className="mt-2 text-4xl md:text-6xl font-bold tracking-tight">Plans that scale with you</h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Start free. Upgrade when you ship. No hidden fees, no per-seat traps — just credits.
            </p>

            {/* Cycle toggle */}
            <div className="mt-8 inline-flex items-center p-1 rounded-full border border-border bg-surface-1">
              {(["monthly", "yearly"] as Cycle[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCycle(c)}
                  className={`px-5 h-9 rounded-full text-sm font-medium transition-all ${
                    cycle === c
                      ? "bg-primary text-primary-foreground shadow-[0_0_18px_hsl(var(--primary)/0.4)]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c === "monthly" ? "Monthly" : "Yearly"}
                  {c === "yearly" && <span className="ml-2 text-[10px] font-mono uppercase tracking-widest text-neon">−20%</span>}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Plans */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLANS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`relative rounded-2xl border p-6 flex flex-col ${
                p.highlight
                  ? "border-primary/60 bg-gradient-to-b from-primary/10 to-surface-1 shadow-[0_0_40px_hsl(var(--primary)/0.25)]"
                  : "border-border bg-surface-1"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] uppercase tracking-widest font-mono">
                  Most popular
                </span>
              )}
              <div className="flex items-center gap-2">
                <p.icon className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">{p.name}</h3>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{p.blurb}</p>

              <div className="mt-6 flex items-baseline gap-1">
                {p.price[cycle] === null ? (
                  <span className="text-3xl font-bold">Custom</span>
                ) : (
                  <>
                    <span className="text-4xl font-bold tabular-nums">${p.price[cycle]}</span>
                    <span className="text-sm text-muted-foreground">/ mo</span>
                  </>
                )}
              </div>
              <div className="mt-1 text-xs font-mono uppercase tracking-widest text-primary">{p.credits}</div>

              <button
                className={`mt-6 h-10 rounded-lg text-sm font-semibold transition-colors ${
                  p.highlight
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-surface-2 text-foreground hover:bg-surface-3 border border-border"
                }`}
              >
                {p.cta}
              </button>

              <ul className="mt-6 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground/85">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-10">Frequently asked questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQ.map((f) => (
            <div key={f.q} className="rounded-xl border border-border bg-surface-1 p-5">
              <div className="text-sm font-semibold text-foreground">{f.q}</div>
              <div className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
};

export default Pricing;
