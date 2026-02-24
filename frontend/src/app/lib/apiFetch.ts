import { getCookie } from "./getCookie";
import { refreshToken } from "./refreshToken";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const isBrowser = typeof document !== "undefined";

  const xsrfToken = isBrowser ? getCookie("XSRF-TOKEN") : null;

  const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
    ...options,
    credentials: "include", 
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      ...(xsrfToken && { "X-XSRF-TOKEN": xsrfToken }),
    },
  });


  if (res.status === 401) {
    const refreshed = await refreshToken();

    if (refreshed) {
      return apiFetch(endpoint, options); // retry
    }

    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}