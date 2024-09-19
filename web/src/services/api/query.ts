import { handleFetchResponse } from "@utils/fetch";
import { Auth } from "./auth";
import { basePath } from "./api";

export const authenticatedFetch = (path: string, params: RequestInit = {}) => {
  const token = Auth.getToken();

  if (path.startsWith("/")) {
    throw new Error("path must not start with /");
  }

  return fetch(`${basePath}/${path}`, {
    ...params,
    headers: {
      "Content-Type": "application/json",
      ...params.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const get = async <T>(path: string): Promise<T> => {
  const response = await authenticatedFetch(path, { method: "GET" });
  return handleFetchResponse<T>(response);
};

export const deleteCall = async (path: string) => {
  const response = await authenticatedFetch(path, { method: "DELETE" });
  return handleFetchResponse(response);
};

export const downloadFile = async (path: string, fileName: string) => {
  // Make the fetch request to the /letters endpoint
  const response = await authenticatedFetch(path, { method: "GET" });

  if (response.ok) {
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
};

export const post = async <T>(
  path: string,
  body: Record<string, unknown>
): Promise<T> => {
  const response = await authenticatedFetch(path, {
    method: "POST",
    body: JSON.stringify(body),
  });

  return handleFetchResponse<T>(response);
};

export const put = async <T>(
  path: string,
  body: Record<string, unknown>
): Promise<T> => {
  const response = await authenticatedFetch(path, {
    method: "PUT",
    body: JSON.stringify(body),
  });

  return handleFetchResponse<T>(response);
};

export const Query = {
  delete: deleteCall,
  downloadFile,
  get,
  post,
  put,
};
