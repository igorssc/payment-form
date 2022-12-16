import clsx from "clsx";
import { HTMLAttributes, ReactNode } from "react";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Box = ({ children, className, ...props }: BoxProps) => {
  return (
    <>
      <div
        className={clsx("container mx-auto shadow-xl p-10", className)}
        {...props}
      >
        {children}
      </div>
    </>
  );
};
