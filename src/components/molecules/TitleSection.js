import React from 'react';
import {Container, Grid, Paper} from "@mui/material";
import Heading from "components/atoms/Heading";

const TitleSection = ({title}) => {
  return (
    <Paper style={{backgroundImage: 'url(https://livedemo00.template-help.com/wt_58939/images/header-bg-02.jpg)'}}
           sx={
             {
               padding: 1,
               color: "#fff",
               position: "relative",
               marginBottom: 4,
               marginTop: '15vh',
               width: '100%',
               backgroundSize: "cover",
               backgroundPosition: "center",
               backgroundRepeat: "no-repeat"
             }
           }
    >

        <Grid container >
          <Grid item md={12} sx={{ ml: 4, fontWeight: '600', textTransform: 'uppercase',}}>
            <Heading text={title} tag="h2"/>
          </Grid>
        </Grid>
    </Paper>
  );
};

export default TitleSection;