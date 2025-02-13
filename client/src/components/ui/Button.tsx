export interface IButton {
    variant: "primary" | "secondary"; // ✅ Fixed spelling
    size: "sm" | "md" | "lg";
    text: string;
    icon?: string;
    onClick: () => void; // ✅ Fixed `onclick` to `onClick`
  }
  
  const buttonVariants = {
    primary: "bg-purple-600 text-white",
    secondary: "bg-purple-400 text-purple-600",
  };
  
  export const Button = (props: IButton) => {
    return (
      <button className={buttonVariants[props.variant]} onClick={props.onClick}>
        {props.icon} {props.text}
      </button>
    );
  };
  