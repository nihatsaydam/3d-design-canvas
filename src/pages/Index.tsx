import SiteShell from "@/components/site/SiteShell";
import Hero from "@/components/site/Hero";
import GallerySection from "@/components/site/GallerySection";
import BlogSection from "@/components/site/BlogSection";
import CreditsSection from "@/components/site/CreditsSection";

const Index = () => {
  return (
    <SiteShell>
      <h1 className="sr-only">CRUDE 3D — AI-native sculpting & rendering studio</h1>
      <Hero />
      <GallerySection preview />
      <BlogSection />
      <CreditsSection />
    </SiteShell>
  );
};

export default Index;
