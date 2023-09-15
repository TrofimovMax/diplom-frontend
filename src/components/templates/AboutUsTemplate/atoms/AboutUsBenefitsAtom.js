import React from "react";
import {Grid, Typography} from "@mui/material";

const AboutUsBenefitsAtom = ({img, title, description}) => {
  return (
    <>
      <Grid container item >
        <Grid item>
          <img
            src={`${img}`}
            alt={title}
            width={50}
            height={50}
            loading="lazy"
          />
        </Grid>
        <Grid item>
          <Typography variant="h6" sx={{fontSize: "16px", ml: 1, fontWeight: "bold"}} >{title}</Typography>
        </Grid>
      </Grid>
      <Grid item sx={{ mt:1, color: "#9b9b9b", fontWeight:"14px"}}>
        <Typography variant="body2">{description}</Typography>
      </Grid>
    </>
  );
};

export default AboutUsBenefitsAtom;