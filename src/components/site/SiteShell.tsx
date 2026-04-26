import { ReactNode, useEffect } from "react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

export default function SiteShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "auto";
    document.documentElement.classList.add("theme-site");
    document.body.classList.add("theme-site");
    return () => {
      document.body.style.overflow = prevOverflow;
      document.documentElement.classList.remove("theme-site");
      document.body.classList.remove("theme-site");
    };
  }, []);

  return (
    <div className="theme-site min-h-screen w-full bg-background text-foreground flex flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
