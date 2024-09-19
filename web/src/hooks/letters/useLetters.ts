import { useEffect, useState } from "react";

import { Letters } from "@services/api/letters";
import { Letter } from "@type/letter";

export const useLetters = () => {
  const [letters, setLetters] = useState<Letter[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const letters = await Letters.get();

        if (letters) {
          setLetters(letters as Letter[]);
        }
      } catch (error) {
        console.error("FAILED TO FETCH LETTERS:", error);
      }
    };

    fetch();
  }, []);

  return letters;
};
