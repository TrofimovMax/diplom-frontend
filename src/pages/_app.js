import React from 'react'
import Layout from "@/components/Layout";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

export const queryClient = new QueryClient();


const theme = createTheme();

const App = ({ Component, pageProps }) => {

  return(
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}




export default App;
