export const clsx = (classes: (string | undefined)[]): string => {
  return classes.reduce<string>((str, className, i) => {
    if (className === undefined || typeof className !== "string") {
      return str;
    }

    if (i === 0) {
      return className || "";
    }

    const separator = i === classes.length - 1 ? " " : " ";
    

    return `${str}${separator}${className}`;
  }, "");
};
