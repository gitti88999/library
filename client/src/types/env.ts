export const getApiUrl = (): string => {
  // Vite (browser)
  const viteUrl = (import.meta as any)?.env?.VITE_API_URL;
  if (viteUrl) return viteUrl;

  // Jest / Node
  if (typeof process !== "undefined" && process.env?.VITE_API_URL) {
    return process.env.VITE_API_URL;
  }

  return "";
};