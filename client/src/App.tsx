import { Button } from "./components/ui/Button";

export default function App() {
  return (
    <>
      <Button
        variant="primary" // ✅ Fixed spelling
        size="sm"
        text="MainBTN"
        icon="+"
        onClick={() => {
          console.log("hello");
        }} // ✅ Fixed `onclick` to `onClick`
      />
    </>
  );
}
