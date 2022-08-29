import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { Layout } from "../components/Layout";
import { useLocalStorge } from "./../utils/hooks/useLocalStorge";
import GlobalContext from "../utils/context/GlobalsContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const local = useLocalStorge();
  // console.log("local state ==== ",local?.state)

  // console.log("initial value in local storage ==== ", value);

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContext.Provider
        value={{ value: local?.state, updateValue: local?.dispatch }}
      >
        <Layout local={local}>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </Layout>
      </GlobalContext.Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
