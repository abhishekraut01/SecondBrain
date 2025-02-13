import { Button } from "./components/ui/Button";
import { ShareIcon } from "./components/ui/ShareIcon";

export default function App() {
  return (
    <>
      <Button
        variant="primary"
        size="sm"
        text="MainBTN"
        icon={<ShareIcon size="lg"/>}
        onClick={() => {
          console.log("hello");
        }}
      />

      <Button
        variant="primary"
        size="md"
        text="MainBTN"
        icon="+"
        onClick={() => {
          console.log("hello");
        }}
      />

      <Button
        variant="secondary"
        size="lg"
        text="MainBTN"
        icon="+"
        onClick={() => {
          console.log("hello");
        }}
      />
    </>
  );
}
