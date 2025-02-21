import { useState } from "react";
import { Button } from "./components/ui/Button";
import GenericCard from "./components/ui/Card";
import { CreateContentModel } from "./components/ui/CreateContentModel";
import { PlusIcon } from "./components/ui/PlusIcon";
import { ShareIcon } from "./components/ui/ShareIcon";

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <div className="">
      <CreateContentModel
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
      <div className="bg-slate-600 flex gap-2 justify-end pr-5 pt-3">
        <Button
          variant="primary"
          size="sm"
          icon={<PlusIcon />}
          onClick={() => {
            setOpen(true);
          }}
        >
          Add Content
        </Button>

        <Button variant="secondary" size="sm" icon={<ShareIcon size="sm" />}>
          Share Brain
        </Button>
      </div>

      <div className="parent bg-yellow-300 w-full h-screen flex">
        {/* Left sidebar - Fixed width */}
        <div className="w-48 h-full bg-cyan-900"></div>

        {/* Right content area - Takes remaining space */}
        <div className="bg-cyan-200 flex-1 h-full">
          <GenericCard
            title="Project Ideas"
            description=" • Create a habit tracker • Design a minimalist todo app"
            tags={["productivity", "ideas"]}
            date="10/03/2024"
            type="youtube"
            link="https://www.youtube.com/watch?v=Ym4ti89tItw"
          />
          <GenericCard
            title="How to Build a Second Brain "
            description="The best way to learn is to build in public. Share your progress, get feedback, and help others along the way"
            tags={["productivity", "learning"]}
            date="09/03/2024"
            type="youtube"
            link="https://www.youtube.com/watch?v=Ym4ti89tItw"
          />
        </div>
      </div>
    </div>
  );
}
