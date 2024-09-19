import React from "react";
import {
  borderColorVariants,
  PaletteColor,
  textColorVariants,
} from "../styles";
import { clsx } from "@utils/css";

type Props = {
  bordered?: boolean;
  className?: string;
  color?: PaletteColor;
  icon: React.ElementType;
  onClick: () => void;
  screenReaderDescription?: string;
  size?: "sm" | "md" | "lg";
};

const IconButton: React.FC<Props> = (props) => {
  const {
    bordered,
    className,
    color = "primary",
    icon,
    onClick,
    screenReaderDescription,
    size,
  } = props;

  const sizes = {
    sm: { hw: "w-6 h-6", icon: 15, padding: "p-1" },
    md: { hw: "w-10 h-10", icon: 20, padding: "p-2" },
    lg: { hw: "w-14 h-14", icon: 20, padding: "p-3" },
  }[size || "sm"];

  const Icon = icon;

  const baseStyles = `self-center dark:text-white  focus:ring-4 focus:outline-none  rounded-full flex items-center justify-center dark:text-white dark:hover:text-white dark:focus:ring-white-800 dark:hover:bg-slate-600`;

  const classes = [
    baseStyles,
    sizes.padding,
    sizes.hw,
    textColorVariants[color],
  ];

  if (bordered) {
    classes.push(`border ${borderColorVariants[color]} dark:border-white-500`);
  }

  if (className) {
    classes.push(className);
  }

  const buttonStyles = clsx(classes);

  return (
    <button className={buttonStyles} onClick={onClick}>
      <Icon size={sizes.icon} />

      {screenReaderDescription && (
        <span className="sr-only">{screenReaderDescription}</span>
      )}
    </button>
  );
};

export default IconButton;
