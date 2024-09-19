import { FC } from "react";
import { Moon, Sun } from "lucide-react";

import useMode from "@hooks/useMode";

import IconButton from "./IconButton";

const ModeToggleButton: FC = () => {
  const { mode, toggleMode } = useMode();

  return (
    <IconButton
      className="-mt-1 ml-4"
      icon={mode === "light" ? Sun : Moon}
      onClick={toggleMode}
    />
  );
};

export default ModeToggleButton;
