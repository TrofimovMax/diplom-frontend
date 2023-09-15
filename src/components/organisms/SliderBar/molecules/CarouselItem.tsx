import React from "react";
import {Grid, Button, Typography, createTheme, ThemeProvider} from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline";
import NextLink from "next/link";
import SliderType from "@components/organisms/SliderBar/Slider.type";
import CSS from 'csstype';
import {Theme} from "@mui/material/styles/createTheme";

type CarouselItemStyle = {
  paperContainer: CSS.Properties,
  button: CSS.Properties,
}

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#ff6479"
    },
    secondary: {
      main: "#f4576c"
    }
  },
});

const CarouselItem: React.FC <{item: SliderType}> = ({item}) => {

  const styles: CarouselItemStyle = {
    paperContainer: {
      backgroundImage: `url(${item.image})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    button: {
      color: "#FFFFFF"
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Grid container item style={styles.paperContainer} sx={
        {
          mx: "auto",
          width: 0.9,
          minHeight: "50vw"
        }
      }>
        <Grid container item>
          <Grid item xs={12} sx={{
            marginTop: "15vh",
            marginLeft: "5vw"
          }}>
            <Grid item xs={8}>
              <Typography variant="h4"
                          component="h5"
                          color="common.white"
                          sx={{
                            fontSize: {xs: 18, md: 36},
                            maxWidth: {xs: "50vw", md: "30vw"},
                            fontWeight: "600"
                          }}
              >
                {item.title}
              </Typography>
            </Grid>

            <Grid item xs={8}>
              <Typography variant="h5" component="h6"
                          sx={{
                            fontSize: {xs: 14, md: 24},
                            maxWidth: {xs: "60vw", md: "20vw"},
                            marginTop: 3,
                          }}
                          color="common.white">
                {item.text}
              </Typography>
            </Grid>

            <Grid item>
              <Button
                component="a"
                LinkComponent={NextLink}
                href={"/gyms"}
                sx={{
                  marginTop: {xs: 2, md: 10},
                  padding: {xs: "6px 12px", md: "18px 36px"},
                  fontSize: {xs: "14px", md: "20px"},
                  backgroundColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "secondary.main"
                  },
                }}
                style={styles.button}>
                НАЧАТЬ
              </Button>
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default CarouselItem;