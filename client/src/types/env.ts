// src/utils/env.ts
export const getApiUrl = (): string => {
  if (typeof process !== 'undefined' && process.env?.VITE_API_URL) {
    return process.env.VITE_API_URL;
  }

  return '';
};