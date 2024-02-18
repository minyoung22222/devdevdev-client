import { useState } from 'react';

import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import useSetAxiosConfig from '@/api/useSetAxiosConfig';
import Layout from '@/components/layout';
import '@/styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  useSetAxiosConfig();
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
    const MockServer = () => import('@/_tests_/mocks/Index');
    MockServer();
  }

  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider enableSystem={false} attribute='class'>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
