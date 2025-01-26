/// <reference types="vite/client" />
declare module '*.svg';
declare module '*.pdf';
declare module '*.png';
declare module '*.webp';

interface Window {
  vcAppConfig: {
    APP_URL: string;
    API_URL: string;
  };
}
