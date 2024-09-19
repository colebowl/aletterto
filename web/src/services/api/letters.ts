import { Letter } from "@type/letter";
import { NotFoundError } from "@utils/fetch";
import { Query } from "./query";

const getLetters = () => Query.get<Letter[]>("letters/");

const getLetterById = (letterId: string) =>
  Query.get<Letter>(`letters/${letterId}`);

const deleteLetter = (letterId: string) => Query.delete(`letters/${letterId}`);

const createLetter = async (letter: Partial<Letter>) =>
  Query.post<Letter>("letters/", letter);

const updateLetter = async (letterId: string, updates: Partial<Letter>) =>
  Query.put<Letter>(`letters/${letterId}`, updates);

const upsertLetter = async (letterId: string, updates: Partial<Letter>) => {
  try {
    await updateLetter(letterId, updates);
  } catch (error) {
    if (error instanceof NotFoundError) {
      await createLetter(updates);
    }
  }
};

const generateLetterPdf = async (letterId: string) => {
  const letter = await getLetterById(letterId);

  if (!letter) {
    throw new Error("Letter not found");
  }

  const fileName = letter.title.replaceAll(" ", "_") + ".pdf";

  return Query.downloadFile(`letters/${letterId}/pdf`, fileName);
};

export const Letters = {
  delete: deleteLetter,
  create: createLetter,
  generatePdf: generateLetterPdf,
  get: getLetters,
  getById: getLetterById,
  update: updateLetter,
  upsert: upsertLetter,
};
