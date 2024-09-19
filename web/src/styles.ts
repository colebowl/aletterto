export const palette = {
  primary: "slate",
  secondary: "purple",
  info: "blue",
  error: "red",
};

export type PaletteColor = keyof typeof palette;

export const textColorVariants: Record<PaletteColor, string> = {
  error: "text-red-400 hover:text-red-600",
  primary: "text-slate-400 hover:text-slate-600",
  secondary: "text-purple-400 hover:text-purple-600",
  info: "text-blue-400 hover:text-blue-600",
};

export const borderColorVariants: Record<PaletteColor, string> = {
  error: `border border-red-400 hover:border-red-600`,
  primary: `border border-slate-400 hover:border-slate-600`,
  secondary: `border border-purple-400 hover:border-purple-600`,
  info: `border border-blue-400 hover:border-blue-600`,
};

export const backgroundColorVariants: Record<PaletteColor, string> = {
  error: `bg-red-400 hover:bg-red-600`,
  primary: `bg-slate-400 hover:bg-slate-600`,
  secondary: `bg-purple-400 hover:bg-purple-600`,
  info: `bg-blue-400 hover:bg-blue-600`,
};
