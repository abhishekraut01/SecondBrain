import { Button } from "./components/ui/Button";
import GenericCard from "./components/ui/Card";
import { PlusIcon } from "./components/ui/PlusIcon";
import { ShareIcon } from "./components/ui/ShareIcon";

export default function App() {
  return (
    <div className="space-x-4">
      <Button variant="primary" size="sm" icon={<ShareIcon size="sm" />}>
        Share Brain
      </Button>

      <Button variant="secondary" size="sm" icon={<PlusIcon />}>
        Add Content
      </Button>

      <GenericCard
        title="Project Ideas"
        description=" • Create a habit tracker • Design a minimalist todo app"
        tags={["productivity", "ideas"]}
        date="10/03/2024"
        type="youtube"
        link = "https://www.youtube.com/watch?v=Ym4ti89tItw"
        
      />

      <GenericCard
        title="How to Build a Second Brain "
        description="The best way to learn is to build in public. Share your progress, get feedback, and help others along the way"
        tags={["productivity", "learning"]}
        date="09/03/2024"
        type="youtube"
        link = "https://www.youtube.com/watch?v=Ym4ti89tItw"
      />

      <GenericCard
        title="Productivity Tip"
        description="The best way to learn is to build in public. Share your progress, get feedback, and help others along the way."
        tags={["productivity", "learning"]}
        date="08/03/2024"
        type="twitter"
        link = "https://x.com/urstruly_ammu/status/1892194255621197876"
      />
      <GenericCard
        title="Productivity Tip"
        description="The best way to learn is to build in public. Share your progress, get feedback, and help others along the way."
        tags={["productivity", "learning"]}
        date="08/03/2024"
        type="instagram"
        link = "https://www.instagram.com/p/DGOdc17oNBw/?utm_source=ig_embed"
      />
    </div>
  );
}

