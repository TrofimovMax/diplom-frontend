import React from 'react';
import {Grid, Typography} from "@mui/material";
import Heading from "@/components/atoms/Heading";

const BenefitsMolecule = ({Benefits}) => {
  return (
    <Grid container justifyContent='center'>
      <Grid item> <Typography variant='h4' sx={{fontWeight: '600'}}> 10 причин пойти в зал</Typography></Grid>
      {
        Benefits.Benefits.map((block, index) => {
          return (
            <Grid container item key={index} spacing={0}>
              <Grid item xs={8} md={6} sd={4} sx={{textTransform: 'uppercase', fontWeight: '600'}}>
                <Heading text={block?.caption} tag={"h4"}/>
              </Grid>
              <Grid item xs={8}>
                <Typography variant='body2' gutterBottom>
                  {block.description}
                </Typography>
              </Grid>
            </Grid>
          );
        })
      }
    </Grid>
  );
};

export default BenefitsMolecule;