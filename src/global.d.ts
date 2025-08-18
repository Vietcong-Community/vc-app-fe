declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    dataLayer: {
      push: (params: object) => void;
    };
  }
}
