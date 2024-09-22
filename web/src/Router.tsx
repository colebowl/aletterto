import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import LettersList from "./pages/letters/LettersList";
import CreateEditLetter from "./pages/letters/CreateEditLetter";
import Login from "@pages/auth/Login";
import ValidateMagicLink from "@pages/auth/ValidateMagicLink";
import Logout from "@pages/auth/Logout";
import AuthenticatedRoute from "AuthenticatedRoute";

export const router = createBrowserRouter([
  {
    path: "/auth/magic-link",
    element: <ValidateMagicLink />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "auth/login",
        element: <Login />,
      },
      {
        path: "auth/logout",
        element: <Logout />,
      },
      {
        path: "letters/",
        element: <AuthenticatedRoute component={<LettersList />} />,
      },
      {
        path: "letters/new",
        element: <AuthenticatedRoute component={<CreateEditLetter />} />,
      },
      {
        path: "letters/:letterId",
        element: <AuthenticatedRoute component={<CreateEditLetter />} />,
      },
    ],
  },
  {
    path: "*",
    element: <AuthenticatedRoute component={<Navigate to="/letters" />} />,
  },
]);
