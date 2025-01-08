/// <reference types="vite/client" />
declare module '*.svg';
declare module '*.pdf';
declare module '*.png';

interface Window {
  vcAppConfig: {
    API_URL: string;
  };
}
