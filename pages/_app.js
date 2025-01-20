import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "../src/Layout";
import PageThemeProvider from "../src/styles/PageThemeProvider";
import { SnackbarProvider } from "@/src/context/SnackbarContext";
import SnackBar from "@/src/component/Snackbar";

import AppSeo from "../src/seo/app";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import "@/styles/globals.css";
import "animate.css";
import { WalletProvider, SuiWallet } from "@suiet/wallet-kit";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, refetchOnMount: false },
  },
});

function MyApp({ Component, pageProps }) {
  // console.log = () => {};
  // console.error = () => {};
  // console.debug = () => {};

  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider defaultWallets={[SuiWallet]}>
        <Provider store={store}>
          <PageThemeProvider {...pageProps}>
            <AppSeo />
            <SnackbarProvider>
              <SnackBar />
              <Layout {...pageProps}>
                <Component {...pageProps} />
              </Layout>
            </SnackbarProvider>
          </PageThemeProvider>
        </Provider>
      </WalletProvider>
    </QueryClientProvider>
  );
}
export default MyApp;
