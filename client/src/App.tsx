import { Button } from "./components/ui/Button";

export default function App() {
  return (
    <>
      <Button
        varient={"primary"}
        size="sm"
        text="MainBTN"
        icon="+"
        onclick={() => {
          console.log("hello");
        }}
      />
    </>
  );
}
