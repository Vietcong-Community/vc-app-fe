export interface IAppConfig {
  apiUrl: string;
}

export const appConfig: IAppConfig = {
  apiUrl: window.vcAppConfig.API_URL,
};
