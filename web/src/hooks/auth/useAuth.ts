import { useEffect, useState } from "react";

import { Auth } from "@services/api/auth";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = Auth.getToken()

    if (token) {
      setIsAuthenticated(true)
    }
  }, []);

  return isAuthenticated;
};
