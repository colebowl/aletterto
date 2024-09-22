import { Auth } from "@services/api/auth";

export class NotFoundError extends Error {}
export class UnauthorizedError extends Error {}

export const handleFetchResponse = async <T>(response: Response) => {
  // Check if the response is OK (status 200-299)
  if (!response.ok) {
    if (response.status === 404) {
      throw new NotFoundError("Not found");
    }

    if ([401, 402, 403].includes(response.status)) {
      await Auth.logout();
      throw new UnauthorizedError("Unauthorized");
    }

    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // Parse the response as JSON
  const data = await response.json();

  return data as unknown as T;
};
