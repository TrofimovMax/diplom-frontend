import React from "react";
import {Button, Card, CardActions, CardContent, createTheme, ThemeProvider, Typography} from "@mui/material";
import NextLink from "next/link";
import CssBaseline from "@mui/material/CssBaseline";
import {Theme} from "@mui/material/styles/createTheme";

const theme: Theme = createTheme({
  palette: {
    color: "#fff",
    backgroundColor: "transparent",
    "&:hover": {
      color: "#000",
      backgroundColor: "#fff",
    }
  },
});

const GymsCard: React.FC <{image: string, title: string, text: string, link: string}> =
  ({image, title, text, link}) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Card
        style={{backgroundImage: `url(${image})`}}
        sx={
          {
            minWidth: 275,
            paddingTop: 35,
            paddingBottom: 35,
            color: "#fff",
            position: "relative",
            marginBottom: 4,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }
        }
      >
        <CardContent sx={{
          textAlign: "center"
        }}>
          <Typography variant="h4" component="h6"
                      sx={
                        {
                          fontWeight: "600",
                          color: "#fff",
                          lineHeight: "normal",
                        }
                      }
                      gutterBottom
          >
            {title}
          </Typography>

          <Typography variant="subtitle1">
            {text}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            sx={{
              mx: "auto",
              color: "color",
              padding: "15px 33px",
              borderRadius: "50px",
              borderColor: "#fff",
              backgroundColor: "backgroundColor",
              "&:hover": {
                color: "&:hover.color",
                backgroundColor: "&:hover.backgroundColor"
              },
            }}
            component="a"
            LinkComponent={NextLink}
            href={link}
          >
            Узнать больше
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
};

export default GymsCard;