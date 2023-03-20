import React from 'react';
import {Grid, Button, Typography, createTheme, ThemeProvider} from '@mui/material'
import CssBaseline from "@mui/material/CssBaseline";
import NextLink from "next/link";

const theme = createTheme({
  palette: {
    button: "#ff6479",
    '&:hover': {
      button_hover: "#f4576c",
    }
  },
});

const CarouselItem = ({item}) => {

  const styles = {
    paperContainer: {
      backgroundImage: `url(${item.image})`
    },
    button: {
      marginTop: 30,
      padding: "18px 36px",
      fontSize: "18px",
      color: "#FFFFFF"
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Grid container spacing={3} style={styles.paperContainer} sx={
        {
          width: 1,
          minHeight: '50vw'
        }
      }>
        <Grid container spacing={5}>
          <Grid item xs={12} sx={{
            marginTop: '15vh',
            marginLeft: '5vw'
          }}>
            <Grid item xs={4}>
              <Typography variant="h4"
                          component="h5"
                          color="common.white">
                {item.title}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h5" component="h6"
                          sx={{maxWidth: "20vw", marginTop: 3,}}
                          color="common.white">
                {item.text}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Button
                component='a'
                LinkComponent={NextLink}
                href={'/gyms'}
                sx={{
                  backgroundColor: 'button',
                  '&:hover': {
                    backgroundColor: '&:hover.button_hover'
                  },
                }}
                style={styles.button}>
                GET STARTED
              </Button>
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default CarouselItem;