import { handleFetchResponse } from "@utils/fetch";
import { basePath } from "./api";

async function requestOtp(emailAddress: string): Promise<boolean> {
  // Make the fetch request to the /letters endpoint
  const response = await fetch(
    `${basePath}/auth/send-magic-link?email=${emailAddress}`,
    {}
  );

  return response.status === 201;
}

async function validateMagicLink(token: string) {
  // Make the fetch request to the /letters endpoint
  const response = await fetch(`${basePath}/auth/magic-link`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await handleFetchResponse<{authToken: string}>(response);

  setToken(res.authToken)
}

const getToken = () => localStorage.getItem("letters-api-token");

const setToken = (token: string) =>
  localStorage.setItem("letters-api-token", token);

const logout = () => {
  console.log("logging out!");
  localStorage.removeItem("letters-api-token");
};

export const Auth = {
  getToken,
  setToken,
  logout,
  requestOtp,
  validateMagicLink,
};
