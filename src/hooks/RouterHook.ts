import { useMemo } from 'react';

import { Action, Location } from 'history';
import queryString from 'qs';
import { NavigateFunction, useLocation, useNavigate, useNavigationType, useParams } from 'react-router-dom';

export interface IRouterProps<T = {}> {
  location: Location;
  navigate: NavigateFunction;
  navigationType: Action;
  pathname: string;
  query: T;
}

export function useRouter<Params extends { [K in keyof Params]?: string } = {}>(): IRouterProps<Params> {
  const location = useLocation();
  const navigationType = useNavigationType();
  const navigate = useNavigate();
  const params = useParams<Params>();
  const query = {
    ...queryString.parse(location.search.replace('?', '')),
    ...params,
  };

  return useMemo(
    () =>
      ({
        location,
        navigate,
        navigationType,
        pathname: location.pathname,
        query,
      }) as unknown as IRouterProps<Params>,
    [query, location, navigate, navigationType],
  );
}
