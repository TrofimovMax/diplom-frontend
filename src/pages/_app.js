import Layout from "@/components/Layout";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

const App = ({ Component, pageProps }) => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </ThemeProvider>
);

export default App;
