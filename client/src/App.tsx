import { useState } from "react";
import { Button } from "./components/ui/Button";
import GenericCard from "./components/ui/Card";
import { CreateContentModel } from "./components/ui/CreateContentModel";
import { PlusIcon } from "./components/ui/PlusIcon";
import { ShareIcon } from "./components/ui/ShareIcon";
import { SideBar } from "./components/ui/Sidebar";

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
      <div className="body flex h-screen w-screen  overflow-y-hidden overflow-x-hidden">
        <SideBar/>

        <div className="parent bg-gray-50 w-full h-screen flex flex-col">
          {/* upper navbar - Fixed width */}
          <div className=" flex justify-between items-center">

            <h1 className="pl-8 text-gray-800 text-3xl font-bold">All Notes</h1>

            <div className="flex gap-2 justify-end pr-20 pt-4">
              <Button
                variant="primary"
                size="md"
                icon={<PlusIcon />}
                onClick={() => {
                  setOpen(true);
                }}
              >
                Add Content
              </Button>

              <Button
                variant="secondary"
                size="md"
                icon={<ShareIcon size="sm" />}
              >
                Share Brain
              </Button>
            </div>

          </div>

          {/* lower content area - Takes remaining space */}
          <div className=" flex-1 h-screen flex flex-wrap gap-2 p-2 overflow-y-scroll">
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
              type="twitter"
              link="https://twitter.com/urstruly_ammu/status/1892194255621197876"
            />

            <GenericCard
              title="How to Build a Second Brain "
              description="The best way to learn is to build in public. Share your progress, get feedback, and help others along the way"
              tags={["productivity", "learning"]}
              date="09/03/2024"
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

            <GenericCard
              title="How to Build a Second Brain "
              description="The best way to learn is to build in public. Share your progress, get feedback, and help others along the way"
              tags={["productivity", "learning"]}
              date="09/03/2024"
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

            <GenericCard
              title="How to Build a Second Brain "
              description="The best way to learn is to build in public. Share your progress, get feedback, and help others along the way"
              tags={["productivity", "learning"]}
              date="09/03/2024"
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
    </div>
  );
}
