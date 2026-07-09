import '@testing-library/jest-dom';
import axios from 'axios';
jest.mock('axios');

export const mockedAxios = axios as jest.Mocked<typeof axios>;

// אם רוצים גם mock ל-import.meta.env
Object.defineProperty(globalThis, 'importMeta', {
  value: {
    env: {
      VITE_API_URL: 'https://mock-api.com'
    }
  }
});