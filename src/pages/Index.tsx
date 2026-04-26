import { useEffect } from "react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import Hero from "@/components/site/Hero";
import GallerySection from "@/components/site/GallerySection";
import BlogSection from "@/components/site/BlogSection";
import CreditsSection from "@/components/site/CreditsSection";

const Index = () => {
  // Body has overflow:hidden globally (editor needs it). Re-enable scroll on the landing.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <SiteHeader />
      <main>
        <h1 className="sr-only">CRUDE 3D — AI-native sculpting & rendering studio</h1>
        <Hero />
        <GallerySection />
        <BlogSection />
        <CreditsSection />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
