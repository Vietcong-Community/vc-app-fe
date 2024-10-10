import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

interface IProps {
  children?: React.ReactNode;
}

export const ReactQueryProvider: React.FC<IProps> = (props) => {
  const { children } = props;

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
