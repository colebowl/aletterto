import { FC, ReactElement } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "@hooks/auth/useAuth";

type Props = {
  component: ReactElement;
};

const AuthenticatedRoute: FC<Props> = ({ component }) => {
  const { isAuthenticated, isInitialized } = useAuth();

  if (!isInitialized) {
    // TODO - I should probably do some kind of loading state here...eventually
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return component;
};

export default AuthenticatedRoute;
