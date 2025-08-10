export const apiClient = (url: string, options: RequestInit) => {
  return fetch(url, {
    credentials: "include",
    ...options,
  });
};
