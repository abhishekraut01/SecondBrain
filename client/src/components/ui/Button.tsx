export interface IButton {
  varient: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  icon?: string;
  onclick: () => void;
}

const buttonVarients = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-400 text-purple-600",
};

export const Button = (props: IButton) => {
  return <button className={buttonVarients[props.varient]}></button>;
};
