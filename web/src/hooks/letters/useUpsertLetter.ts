import { Letters } from "@services/api/letters";
import { Letter } from "@type/letter";
import { useCallback } from "react";

export const useUpsertLetter = (letterId: string) => {
  return useCallback(
    async (updates: Partial<Pick<Letter, "title" | "content">>) => {
      const letter = letterId
        ? await Letters.update(letterId, updates)
        : await Letters.create(updates);

      // if (!error && Array.isArray(data) && data[0]) {
      //   return data[0];
      // }

      return letter;
    },

    [letterId]
  );
};
