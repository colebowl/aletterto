import { FC } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ModeToggleButton from "./ModeToggleButton";
import IconButton from "./IconButton";
import { LogOut } from "lucide-react";
import { useAuth } from "@hooks/auth/useAuth";

const HeaderNavigation: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { isAuthenticated } = useAuth();

  if (pathname.startsWith("/letters/")) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-row justify-between">
        <Link to={`letters`} className="mr-2 text-xl font-bold">
          A Letter To __________ .
        </Link>
        {isAuthenticated && (
          <div className="flex">
            <Link to={`letters/new`} className="mx-2 hover:underline">
              Write a Letter
            </Link>

            <>
              <ModeToggleButton />

              <IconButton
                className="-mt-1 ml-2"
                icon={LogOut}
                onClick={() => navigate("/auth/logout")}
              />
            </>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderNavigation;
