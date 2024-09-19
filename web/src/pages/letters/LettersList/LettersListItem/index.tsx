import { FC, useState } from "react";
import { getDateInLocalTime } from "@utils/dayjs";
import { Link } from "react-router-dom";
import { FileDown, Trash2 } from "lucide-react";

import IconButton from "@components/IconButton";
import { Letter } from "@type/letter";

import DeleteLetterDialog from "./DeleteLetterDialog";
import { Letters } from "@services/api/letters";

type Props = { letter: Letter };

const LetterListItem: FC<Props> = (props) => {
  const { letter } = props;

  const [hoverActive, setHoverActive] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const handleDownloadPdf = async () => {
    await Letters.generatePdf(letter.id);
  };

  return (
    <div
      key={letter.id}
      className="flex flex-col hover:bg-slate-100 dark:hover:bg-slate-800"
      onMouseEnter={() => setHoverActive(true)}
      onMouseLeave={() => setHoverActive(false)}
    >
      <div className="flex border-solid">
        <Link
          className="text-2xl text-slate-600  dark:text-slate-200 font-semibold"
          to={`/letters/${letter.id}`}
        >
          {letter.title || "Untitled"}
        </Link>

        {hoverActive && (
          <>
            <IconButton
              className="ml-3 mr-1"
              color="primary"
              icon={FileDown}
              onClick={() => handleDownloadPdf()}
            />
            <IconButton
              color="error"
              icon={Trash2}
              onClick={() => setDeleteDialogOpen(true)}
            />
          </>
        )}
      </div>
      <div className="flex flex-row text-sm -mt-2 text-slate-400 dark:text-slate-300">
        Updated: {getDateInLocalTime(letter.createdAt)}
      </div>

      {deleteDialogOpen && (
        <DeleteLetterDialog
          letter={letter}
          onClose={() => setDeleteDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default LetterListItem;
