import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  scheme?: "primary" | "secondary";
}

export const Button = ({
  asChild,
  className,
  scheme = "primary",
  ...props
}: ButtonProps) => {
  const Component = asChild ? Slot : "button";

  return (
    <>
      <Component
        className={clsx(
          "uppercase py-4 font-bold rounded transition-all duration-200 border-2 border-transparent",
          scheme === "primary"
            ? "bg-sky-600 text-white hover:bg-white hover:text-sky-600 hover:border-sky-600"
            : "bg-white text-sky-600 hover:bg-sky-600 hover:text-white hover:border-white",
          className
        )}
        {...props}
      />
    </>
  );
};
