import { Button } from "./components/ui/Button";
import { ShareIcon } from "./components/ui/ShareIcon";

export default function App() {
  return (
    <div className="space-x-4">
      <Button variant="primary" size="sm" icon={<ShareIcon size="sm" />}>
        Small Button
      </Button>

      <Button variant="secondary" size="md" icon={<ShareIcon size="md" />}>
        Medium Button
      </Button>

      <Button variant="secondary" size="lg" icon={<ShareIcon size="lg" />}>
        Large Button
      </Button>
    </div>
  );
}
