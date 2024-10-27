import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios';
import inRange from 'lodash/inRange';
import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';

import { appConfig } from '../config/config';

import { Endpoints } from './endpoints';
import { IgnoredErrorCodes, UrlParameter } from './types';

const axiosApi = axios.create({
  baseURL: appConfig.apiUrl,
});

const requestConfig: AxiosRequestConfig = { withCredentials: true };

const getFileSuffixByMimeType = (mimeType: string) => {
  switch (mimeType) {
    case 'image/png':
      return '.png';
    case 'image/jpg':
      return '.jpg';
    case 'application/pdf':
      return '.pdf';
    default:
      return '';
  }
};

export const handleUnauthorized = () => {
  const { pathname, search } = window.location;

  if (pathname && pathname !== '/') {
    window.location.replace(`/?redirect=${encodeURIComponent(pathname + (search || ''))}`);
  }
};

const handleError = (error: AxiosError, ignoreErrorCodes?: IgnoredErrorCodes) => {
  if (error.response) {
    if (error.response?.status === 401 && !ignoreErrorCodes?.includes(401)) {
      handleUnauthorized();
    }
    if (error.response?.status === 429 && !ignoreErrorCodes?.includes(429)) {
      // TODO GLOBALNI TOAST MESSAGE
      // setToastMessage(messages.tooManyRequests);
    }
    if (error.response?.status === 500 && !ignoreErrorCodes?.includes(500)) {
      // setToastMessage(messages.unexpectedError);
    }
    if (error.response?.status && inRange(error.response.status, 501, 699)) {
      // setToastMessage(messages.serverNotAvailable);
      // TODO Logovani chyb nekam
    }
  } else {
    // setToastMessage(messages.serverNotAvailable);
    // TODO Logovani chyb nekam
  }
};
const objectToFormData = (obj: { [key: string]: object | File }, form?: FormData, namespace?: string) => {
  const fd = form || new FormData();
  let formKey;

  Object.keys(obj).forEach((property) => {
    if (Object.prototype.hasOwnProperty.call(obj, property)) {
      if (namespace) {
        formKey = namespace;
      } else {
        formKey = property;
      }

      if (!(obj[property] instanceof File) && Array.isArray(obj[property])) {
        objectToFormData(obj[property] as unknown as { [key: string]: object }, fd, property);
      } else if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
        // For BE is necessary to send type: application/json, solution taken from:
        // https://www.rhymewithgravy.com/2019/03/28/Setting-Content-Type-for-multipartform-data-values.html
        fd.append(formKey, new Blob([JSON.stringify(obj[property])], { type: 'application/json' }));
      } else {
        const file = obj[property] as File;
        if (file) {
          const fileSuffix = getFileSuffixByMimeType(file.type);
          if (file instanceof File) {
            const newFileName = file.name?.includes(fileSuffix) ? file.name : `${file.name}${fileSuffix}`;
            fd.append(formKey, file, newFileName);
          } else {
            fd.append(formKey, file);
          }
        }
      }
    }
  });

  return fd;
};

const paramEndpoint = (endpoint: Endpoints, urlParams?: UrlParameter): string => {
  const url = endpoint as string;

  const parsedUrlParams = urlParams
    ? (omitBy(urlParams, isNil) as { [key: string]: string | boolean | number })
    : undefined;

  return parsedUrlParams
    ? url.replace(/{([\w]+)}/g, (match: string, p1: string) => {
        return parsedUrlParams[p1] ? encodeURIComponent(parsedUrlParams[p1]) : match;
      })
    : url;
};

/**
 * T = Input
 * @param path
 * @param urlParams
 * @param queryParams
 * @param ignoreErrorCode
 * @param responseType
 * @param showErrorToastMessage
 */
export const get = async <T, S = {}>(
  path: Endpoints,
  urlParams?: UrlParameter,
  queryParams?: { [key: string]: string | number | boolean } | S,
  ignoreErrorCode?: IgnoredErrorCodes,
  responseType?: ResponseType,
  showErrorToastMessage = true,
) => {
  try {
    return await axiosApi.get<T>(paramEndpoint(path, urlParams), {
      params: queryParams || {},
      responseType,
      ...requestConfig,
    } as AxiosRequestConfig);
  } catch (e) {
    const { response } = e as AxiosError;
    if (showErrorToastMessage) {
      handleError(e as AxiosError, ignoreErrorCode);
    }
    throw response;
  }
};

/**
 * T = Input
 * U = Response
 * @param path
 * @param data
 * @param urlParams
 * @param queryParams
 * @param ignoreErrorCode
 * @param isMultipart
 * @param responseType
 */
export const post = async <T, U>(
  path: Endpoints,
  data: T,
  urlParams?: UrlParameter,
  ignoreErrorCode?: IgnoredErrorCodes,
  queryParams?: { [key: string]: string | number | boolean },
  isMultipart?: boolean,
  responseType?: ResponseType,
) => {
  try {
    return await axiosApi.post<T, AxiosResponse<U>>(
      paramEndpoint(path, urlParams),
      isMultipart ? objectToFormData(data as unknown as { [key: string]: object | File }) : data,
      {
        ...requestConfig,
        responseType,
        params: queryParams || {},
        headers: {
          ...(isMultipart ? { 'content-type': 'multipart/form-data' } : {}),
        },
      } as AxiosRequestConfig,
    );
  } catch (e) {
    const { response } = e as AxiosError;
    handleError(e as AxiosError, ignoreErrorCode);
    throw response;
  }
};

/**
 * T = Input
 * U = Response
 * @param path
 * @param data
 * @param urlParams
 * @param ignoreErrorCode
 * @param queryParams
 * @param isMultipart
 */
export const put = async <T, U>(
  path: Endpoints,
  data: T,
  urlParams?: UrlParameter,
  ignoreErrorCode?: IgnoredErrorCodes,
  queryParams?: { [key: string]: string | number | boolean },
  isMultipart?: boolean,
) => {
  try {
    const headers: { [key: string]: string | number | boolean } = {};

    if (isMultipart) {
      headers['content-type'] = 'multipart/form-data';
    }

    return await axiosApi.put<T, AxiosResponse<U>>(
      paramEndpoint(path, urlParams),
      isMultipart ? objectToFormData(data as unknown as { [key: string]: object | File }) : data,
      {
        ...requestConfig,
        headers,
        params: queryParams || {},
      } as AxiosRequestConfig,
    );
  } catch (e) {
    const { response } = e as AxiosError;
    handleError(e as AxiosError, ignoreErrorCode);
    throw response;
  }
};
/**
 * T = Input
 * U = Response
 * @param path
 * @param data
 * @param urlParams
 * @param ignoreErrorCode
 * @param queryParams
 * @param isMultipart
 */
export const patch = async <T, U>(
  path: Endpoints,
  data: T,
  urlParams?: UrlParameter,
  ignoreErrorCode?: IgnoredErrorCodes,
  queryParams?: { [key: string]: string | number | boolean },
  isMultipart?: boolean,
) => {
  try {
    const headers: { [key: string]: string | number | boolean } = {};

    if (isMultipart) {
      headers['content-type'] = 'multipart/form-data';
    }

    return await axiosApi.patch<T, AxiosResponse<U>>(
      paramEndpoint(path, urlParams),
      isMultipart ? objectToFormData(data as unknown as { [key: string]: object | File }) : data,
      {
        ...requestConfig,
        headers,
        params: queryParams || {},
      } as AxiosRequestConfig,
    );
  } catch (e) {
    const { response } = e as AxiosError;
    handleError(e as AxiosError, ignoreErrorCode);
    throw response;
  }
};

/**
 * U = Response
 * _ dummy which is necessary for tsx file and one generic parameter
 * @param path
 * @param urlParams
 * @param ignoreErrorCode
 */
export const del = async <U extends object>(
  path: Endpoints,
  urlParams?: UrlParameter,
  ignoreErrorCode?: IgnoredErrorCodes,
) => {
  try {
    return await axiosApi.delete<unknown, AxiosResponse<U>>(paramEndpoint(path, urlParams), requestConfig);
  } catch (e) {
    const { response } = e as AxiosError;
    handleError(e as AxiosError, ignoreErrorCode);
    throw response;
  }
};
