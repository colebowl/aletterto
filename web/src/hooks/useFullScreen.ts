import { useState, useEffect } from "react";

interface UseFullscreenResult {
  isFullscreen: boolean;
  enterFullscreen: () => void;
  exitFullscreen: () => void;
}

const useFullscreen = (): UseFullscreenResult => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const enterFullscreen = () => {
    const docElement = document.documentElement; // Target the entire HTML page

    if (docElement.requestFullscreen) {
      docElement.requestFullscreen().catch((err) => console.error(err));
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => console.error(err));
    }
  };

  return { isFullscreen, enterFullscreen, exitFullscreen };
};

export default useFullscreen;
