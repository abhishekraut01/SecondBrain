import { ReactNode } from "react";

export interface IButton{
    varient:"primary" | "secondary";
    size:"sm" | "md" | "lg";
    text:"string",
    icon:ReactNode
    onclick : () => void
} 

export const Button = (props:IButton) => {
  return <button>

  </button>;
};
