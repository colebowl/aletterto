import { useEffect, useState } from "react";

import { Letter } from "@type/letter";
import { Letters } from "@services/api/letters";

export const useLetterById = (letterId: string) => {
  const [letter, setLetter] = useState<Letter>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);

        const letter = await Letters.getById(letterId);

        if (letter) {
          setLetter(letter);
        }
      } catch (error) {
        console.error("FAILED TO FETCH LETTERS:", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [letterId]);

  return {
    letter,
    loading,
  };
};
