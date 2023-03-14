import React from 'react';
import {Grid, Button, Typography} from '@mui/material'
const CarouselItem = ({item}) => {

  const styles = {
    paperContainer: {
      backgroundImage: `url(${item.image})`
    }
  };

  return (
    <Grid container spacing={3} style={styles.paperContainer} sx={
      {
        width: 1,
        minHeight: '50vw'
      }
    }>
      <Grid item xs={12} sx={{
        marginTop: '25vw',
        marginLeft: '5vw'
      }}>
        <Grid item >
          <Typography component='h4' color="common.white">
            {item.title}
          </Typography>
        </Grid>

        <Grid item >
          <Typography component='h6' sx={{maxWidth:"20vw"}} color="common.white">
            {item.text}
          </Typography>
        </Grid>

        <Grid item >
          <Button className="CheckButton"
                  style={{
                    backgroundColor: "#D22B2B",
                    padding: "18px 36px",
                    fontSize: "18px",
                    color: "#FFFFFF"
                  }}>
            GET STARTED
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CarouselItem;