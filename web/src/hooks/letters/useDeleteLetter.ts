import { Letters } from "@services/api/letters";
import { useCallback } from "react";

export const useDeleteLetter = (letterId: string) => {
  return useCallback(async () => {
    Letters.delete(letterId);
  }, [letterId]);
};
