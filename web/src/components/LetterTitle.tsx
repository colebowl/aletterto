import React, { KeyboardEvent, useEffect, useState } from "react";
import BackButton from "./BackButton";
import { clsx } from "@utils/css";

type Props = {
  onTitleUpdate: (title: string) => void;
  title: string;
};

const LetterTitle: React.FC<Props> = (props) => {
  const { title: initialTitle, onTitleUpdate } = props;

  const [hoverActive, setHoverActive] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(initialTitle);

  useEffect(() => {
    if (!editing) {
      setTitle(initialTitle);
    }
  }, [editing, initialTitle]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onTitleUpdate(title);
      setEditing(false);
    }
    if (event.key === "Escape") {
      onTitleUpdate(initialTitle);
      setEditing(false);
    }
  };

  const handleOnBlur = () => {
    onTitleUpdate(title);
    setEditing(false);
  };

  const textColorStyle =
    title === ""
      ? "text-slate-300 dark:text-slate-500"
      : "text-slate-900 dark:text-slate-300";

  return (
    <div className="w-100 flex mb-4 border-b-1 align-middle border-b-2 pb-2 border-slate-500">
      <div className="mr-2 self-center">
        <BackButton />
      </div>

      <div
        className="flex"
        onMouseEnter={() => setHoverActive(true)}
        onMouseLeave={() => setHoverActive(false)}
      >
        {editing ? (
          <input
            autoFocus
            className={`text-3xl italic w-fit${
              editing ? " bg-transparent" : ""
            }`}
            onBlur={handleOnBlur}
            onChange={(event) => setTitle(event?.target.value)}
            onKeyDown={handleKeyDown}
            style={{ width: `${(title.length + 1) * 20}px` }}
            type="text"
            value={title}
          />
        ) : (
          <div className={clsx(["text-4xl italic", textColorStyle])}
          onDoubleClick={() => setEditing(true)}>
            {title || "Untitled"}
          </div>
        )}
        {hoverActive && !editing && (
          <button
            className="ml-3 hover:underline pt-1"
            onClick={() => setEditing(true)}
          >
            edit
          </button>
        )}
      </div>
    </div>
  );
};

export default LetterTitle;
