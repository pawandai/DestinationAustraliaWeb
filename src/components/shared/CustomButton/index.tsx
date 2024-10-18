import React from "react";
import styles from "./customButton.module.css";

type CustomButtonProps = {
  title: string;
  icon: React.JSX.Element;
  className?: string;
  type?: "submit";
  onClick?: () => void;
  disabled?: boolean;
};

const CustomButton = ({
  title,
  type,
  icon,
  className,
  onClick,
  disabled,
}: CustomButtonProps) => {
  return (
    <button
      type={type}
      className={`bg-secondary ${styles.button} ${className} disabled:pointer-events-none disabled:bg-secondary disabled:text-muted-foreground`}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{title}</span>{" "}
      <div className={`bg-primary ${styles.icon}`}>{icon}</div>
    </button>
  );
};

export default CustomButton;
