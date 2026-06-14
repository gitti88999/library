// src/config.ts
export const  = (): string => {
  // בסביבת פיתוח / build רגיל (Vite)
  if (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // ב־Jest / Node, אפשר להגדיר env דרך process
  return process.env.VITE_API_URL || "http://localhost:5217";
};