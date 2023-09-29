import React from 'react'
import Layout from "@/components/Layout";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import client from '/src/apollo/client'
import {ApolloProvider} from "@apollo/client";

export const queryClient = new QueryClient();


const theme = createTheme({
  typography: {fontFamily:
      ["Open Sans", "Helvetica", "Arial", "sans-serif"].join(',')
  }
});

// if (typeof window !== 'undefined') {
//   window.client = client
//   console.log({ originURL: client.link.options.uri })
// }


const App = ({ Component, pageProps }) => {

  return(
      <ApolloProvider client={client}>
          <QueryClientProvider client={queryClient}>
              <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <Layout>
                      <Component {...pageProps} />
                  </Layout>
              </ThemeProvider>
              <ReactQueryDevtools />
          </QueryClientProvider>
      </ApolloProvider>
  );
}




export default App;
