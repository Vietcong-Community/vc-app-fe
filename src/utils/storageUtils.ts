export const USER_AUTHENTICATION_STORAGE_KEY = 'vc-app-authentication';

export const setUserAuthenticationToken = (accessToken: string) => {
  const token = window.btoa(`Bearer ${accessToken}`);
  localStorage.setItem(USER_AUTHENTICATION_STORAGE_KEY, token);
};
