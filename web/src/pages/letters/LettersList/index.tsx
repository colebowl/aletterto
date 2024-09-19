import Wrapper from "@components/layout/Wrapper";
import { useLetters } from "@hooks/letters/useLetters";
import LetterListItem from "./LettersListItem";
import { Link } from "react-router-dom";

const LettersList: React.FC = () => {
  const letters = useLetters();

  return (
    <Wrapper>
      <h1 className="font-bold mb-2 underline">My Letters</h1>

      {Array.isArray(letters) && letters.length === 0 && (
        <p>
          You do not have any letters.{" "}
          <Link to="/letters/new" className="underline">
            Want to write one now?
          </Link>
        </p>
      )}

      {letters?.map((letter) => (
        <LetterListItem key={letter.id} letter={letter} />
      ))}
    </Wrapper>
  );
};

export default LettersList;
