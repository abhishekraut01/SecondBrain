import { ReactNode } from "react";

export interface IButton {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  icon: ReactNode;
  onClick: () => void; //
}

const buttonVariants = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-300 text-purple-600",
};

const defaultStyles = "rounded-md p-4 flex";

const size = {
  sm: "py-2 px-4",
  md: "py-4 px-6",
  lg: "py-6 px-8",
};

export const Button = (props: IButton) => {
  return (
    <button
      className={`${buttonVariants[props.variant]} ${defaultStyles} ${
        size[props.size]
      }`}
      onClick={props.onClick}>

      {props.icon ? <div className="pr-4 ">{props.icon}</div> : null} {props.text}
    </button>
  );
};
