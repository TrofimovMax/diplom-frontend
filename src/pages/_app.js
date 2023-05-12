import React from 'react'
import Layout from "@/components/Layout";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

export const queryClient = new QueryClient();


const theme = createTheme({
  typography: {fontFamily:
      ["Open Sans", "Helvetica", "Arial", "sans-serif"].join(',')
  }
});

const App = ({ Component, pageProps }) => {

  return(
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}




export default App;
