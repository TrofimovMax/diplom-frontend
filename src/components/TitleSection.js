import React from 'react';
import {Container, Grid, Paper} from "@mui/material";
import Heading from "@/components/Heading";

const TitleSection = ({title}) => {
  return (
    <Paper style={{backgroundImage: 'url(https://livedemo00.template-help.com/wt_58939/images/header-bg-02.jpg)'}}
           sx={
             {
               color: "#fff",
               position: "relative",
               marginBottom: 4,
               backgroundSize: "cover",
               backgroundPosition: "center",
               backgroundRepeat: "no-repeat"
             }
           }
    >
      <Container fixed>
        <Grid container>
          <Grid item md={6}>
            <Heading text={title} tag="h2"/>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default TitleSection;