import { ReactNode } from "react";
import clsx from "clsx"; // Optional: Helps in managing conditional classes

export interface IButton {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const buttonVariants = {
  primary: "bg-purple-600 text-white hover:bg-purple-700",
  secondary: "bg-purple-300 text-purple-600 hover:bg-purple-400",
};

const sizeClasses = {
  sm: "py-2 px-4 text-sm",
  md: "py-3 px-6 text-md",
  lg: "py-4 px-8 text-lg",
};

export const Button = ({
  variant = "primary",
  size = "md",
  children,
  icon,
  className = "",
  onClick,
}: IButton) => {
  return (
    <button
      className={clsx(
        "rounded-md flex items-center transition-all duration-300",
        buttonVariants[variant],
        sizeClasses[size],
        className
      )}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};
