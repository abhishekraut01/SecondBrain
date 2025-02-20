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

      <Button variant="secondary" size="sm" icon={<PlusIcon/>}>
        Add Content
      </Button>

      <GenericCard
        title="Project Ideas" 
        description="• Build a personal knowledge base • Create a habit tracker • Design a minimalist todo app"
        tags={["productivity", "ideas"]}
        date="10/03/2024"
        type="idea"
      />


<GenericCard 
        title="How to Build a Second Brain " 
        description="The best way to learn is to build in public. Share your progress, get feedback, and help others along the way"
        tags={["productivity", "learning"]}
        date="09/03/2024"
        type="article"
      />

      <GenericCard 
        title="Productivity Tip" 
        description="The best way to learn is to build in public. Share your progress, get feedback, and help others along the way."
        tags={["productivity", "learning"]}
        date="08/03/2024"
        type="tip"
      />


    </div>
  );
}
