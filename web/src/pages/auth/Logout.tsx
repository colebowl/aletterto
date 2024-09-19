import { Auth } from "@services/api/auth";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function Logout() {
  useEffect(() => {
    Auth.logout();
  });

  return <Navigate to="/auth/login" />;
}
