import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Wrapper from "@components/layout/Wrapper";
import { Editor } from "@components/Editor";
import LetterTitle from "@components/LetterTitle";
import { useLetterById } from "@hooks/letters/useLetterById";
import { useUpsertLetter } from "@hooks/letters/useUpsertLetter";
import { Letter } from "@type/letter";
import useFullscreen from "@hooks/useFullScreen";

const CreateEditLetter: FC = () => {
  const { letterId } = useParams<{ letterId: string }>();
  const navigate = useNavigate();

  const { letter, loading } = useLetterById(letterId as string);
  const upsertLetter = useUpsertLetter(letterId as string);

  const { isFullscreen, enterFullscreen, exitFullscreen } = useFullscreen();

  const handleUpdate = async (
    key: keyof Pick<Letter, "content" | "title">,
    value: string
  ) => {
    const letter = await upsertLetter({ [key]: value } as Partial<Letter>);

    if (letter && !letterId) {
      navigate(`/letters/${letter?.id}`, { replace: true });
    }
  };

  useEffect(() => {
    enterFullscreen();

    return () => {
      exitFullscreen();
      window.scrollTo({ top: 0 });
    };
  }, []);

  const renderEditor = (initialContent: string) => {
    return (
      <Editor
        initialContent={initialContent}
        onUpdate={({ editor }) => handleUpdate("content", editor.getHTML())}
      />
    );
  };
  return (
    <div>
      <Wrapper>
        {loading ? (
          "loading"
        ) : (
          <div>
            <LetterTitle
              title={letter?.title || ""}
              onTitleUpdate={(title) => handleUpdate("title", title)}
            />

            {letter && renderEditor(letter.content)}
            {!letterId && renderEditor("")}
          </div>
        )}
      </Wrapper>
      <div className="mb-2 flex justify-center">
        {!isFullscreen ? (
          <button onClick={enterFullscreen}>Enter Fullscreen</button>
        ) : (
          <button onClick={exitFullscreen}>Exit Fullscreen</button>
        )}
      </div>
    </div>
  );
};

export default CreateEditLetter;
