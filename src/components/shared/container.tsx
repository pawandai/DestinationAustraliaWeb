import { type ReactNode, forwardRef } from "react";

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children }, ref) => {
    return (
      <div
        ref={ref}
        className={`mx-auto my-2 flex max-w-7xl flex-col gap-8 ${className}`}
      >
        {children}
      </div>
    );
  },
);

Container.displayName = "Container";

export default Container;
