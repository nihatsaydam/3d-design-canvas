import TopBar from "@/components/crude/TopBar";
import CommandBar from "@/components/crude/CommandBar";
import LeftToolbar from "@/components/crude/LeftToolbar";
import RightSidebar from "@/components/crude/RightSidebar";
import Viewport from "@/components/crude/Viewport";
import AIPanel from "@/components/crude/AIPanel";

const Editor = () => {
  return (
    <main className="h-screen w-screen flex flex-col bg-background text-foreground overflow-hidden">
      <h1 className="sr-only">CRUDE 3D — Sculpting and Render Engine</h1>
      <TopBar />
      <CommandBar />
      <div className="flex-1 flex min-h-0">
        <LeftToolbar />
        <div className="flex-1 flex flex-col min-w-0">
          <Viewport />
          <AIPanel />
        </div>
        <RightSidebar />
      </div>
    </main>
  );
};

export default Editor;
