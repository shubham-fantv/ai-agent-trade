import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from '../src/Layout';
import PageThemeProvider from '../src/styles/PageThemeProvider';
import { SnackbarProvider } from '@/src/context/SnackbarContext';
import SnackBar from '@/src/component/Snackbar';

import AppSeo from '../src/seo/app';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import '@/styles/globals.css';
import 'animate.css';
import '@mysten/dapp-kit/dist/index.css';
import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';

const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl('localnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork='mainnet'>
        <WalletProvider autoConnect>
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
      </SuiClientProvider>
    </QueryClientProvider>
  );
}
export default MyApp;
