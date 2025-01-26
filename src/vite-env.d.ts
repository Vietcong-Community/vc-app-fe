/// <reference types="vite/client" />
declare module '*.svg';
declare module '*.pdf';
declare module '*.png';

interface Window {
  vcAppConfig: {
    APP_URL: string;
    API_URL: string;
  };
}
