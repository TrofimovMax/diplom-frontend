import React from 'react';
import {Box, Grid, ImageList, ImageListItem, ImageListItemBar, Paper, Typography} from "@mui/material";

const GymIdCardMolecule = ({gymIdCard, isMobile}) => {
  return (
    <Grid container>
      <ImageList gap={gymIdCard?.gymIdCard?.length}
                 cols={isMobile ? 3 : 1}
      >
        {gymIdCard?.gymIdCard.map((item) => (
          <Paper key={item.img} sx={{padding:1}} variant="outlined" square>
            <ImageListItem
              sx={isMobile ? {
                mr: 3,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: 333,
              } : {
                mr: 0,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: 333,
              }

              }>
              <img
                src={`${item.img}`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={
                  <Box sx={{whiteSpace: "normal"}}>
                    <Typography variant='body2'>
                      {item.description}
                    </Typography>
                    <Typography variant='body2'>
                      <strong> Размер зала:</strong> {item.size}
                    </Typography>
                  </Box>
                }
                position="below"
              />
            </ImageListItem>
          </Paper>
        ))}
      </ImageList>
    </Grid>
  );
};

export default GymIdCardMolecule;