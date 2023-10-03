import React from "react";
import {Grid, Paper} from "@mui/material";
import { AboutUsBenefit } from "../AboutUsBenefitType"
import AboutUsBenefitsAtom from "@components/templates/AboutUsTemplate/atoms/AboutUsBenefitsAtom";

const AboutUsBenefits: React.FC <{ benefits: Array<AboutUsBenefit> }> = ({ benefits }) => {
  return (
    <Paper sx={{
      mt: 5,
      backgroundColor: "#f4f4f4",
      fill: "#f4f4f4"
    }}>
      <Grid container spacing={2} direction="row"
            justifyContent="flex-start"
            alignItems="stretch">
        {
          benefits.map(({img, title, description}) => {
            return (
              <Grid key={img} container item xs={12} md={3}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center">
                <AboutUsBenefitsAtom
                  title={title}
                  description={description}
                  img={img}
                />
              </Grid>
            )
          })
        }
      </Grid>
    </Paper>
  );
};

export default AboutUsBenefits;