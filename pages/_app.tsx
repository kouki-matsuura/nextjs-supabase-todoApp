import { AppProps } from 'next/app'
import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
});

function MyApp({ Component, pageProps } : AppProps): JSX.Element {
  return (
  <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
  </QueryClientProvider>
  )
}

export default MyApp
