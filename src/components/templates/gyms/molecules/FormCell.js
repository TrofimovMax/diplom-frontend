import {Box, ThemeProvider, createTheme} from "@mui/material";

const theme = createTheme({
  palette: {
      primary: {
        main:'#00A36C'
      },
      secondary: {
        main: '#7CFC00'
      },
  },
});

const FormCell = ({ gymId, time }) => (
  <ThemeProvider theme={theme}>
    <Box
      onClick={() => console.log(gymId, time)}
      sx={{
        height: 1,
        width: 1,
        backgroundColor: 'primary.main',
        '&:hover': {
          backgroundColor: 'secondary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
    </Box>
  </ThemeProvider>
);
export default FormCell;