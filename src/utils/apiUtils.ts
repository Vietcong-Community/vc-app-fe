import { AxiosResponse } from 'axios';
import map from 'lodash/map';

export const getErrorsFromResponse = (response?: AxiosResponse) =>
  response?.data?.errors?.length > 0 ? map(response?.data?.errors, (e) => e.errorCode) : [];

export const getSingleErrorFromResponse = (response?: AxiosResponse) => response?.data?.error;
