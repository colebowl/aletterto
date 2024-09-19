import Dialog from "@components/Dialog";
import { useDeleteLetter } from "@hooks/letters/useDeleteLetter";
import { Letter } from "@type/letter";
import React from "react";

type Props = {
  letter: Letter;
  onClose: () => void;
};

const DeleteLetterDialog: React.FC<Props> = (props) => {
  const { letter, onClose } = props;
  const deleteLetter = useDeleteLetter(letter.id);

  const handleDeleteLetter = async () => {
    await deleteLetter();

    onClose();
  };

  return (
    <Dialog
      onClose={onClose}
      actions={[
        {
          color: "error",
          onClick: handleDeleteLetter,
          label: "Delete",
          variant: "contained",
        },
        {
          color: "info",
          onClick: onClose,
          label: "Cancel",
        },
      ]}
    >
      <div className="p-4 md:p-5 text-center">
        <svg
          className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          Are you sure you want to delete this letter?
        </h3>
      </div>
    </Dialog>
  );
};

export default DeleteLetterDialog;
