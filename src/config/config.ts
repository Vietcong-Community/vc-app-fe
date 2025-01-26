export interface IAppConfig {
  appUrl: string;
  apiUrl: string;
}

export const appConfig: IAppConfig = {
  appUrl: window.vcAppConfig.APP_URL,
  apiUrl: window.vcAppConfig.API_URL,
};
