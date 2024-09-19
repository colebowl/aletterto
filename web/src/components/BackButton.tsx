import { FC } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "./IconButton";
import { Undo2 } from "lucide-react";

const BackButton: FC = () => {
  const navigate = useNavigate();

  return <IconButton icon={Undo2} onClick={() => navigate("/letters")} />;
};

export default BackButton;
