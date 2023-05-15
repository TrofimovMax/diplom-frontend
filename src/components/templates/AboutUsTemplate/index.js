import React from 'react';
import {Container, Grid} from "@mui/material";
import TitleSection from "@/components/molecules/TitleSection";
import Contacts from "@/components/molecules/Contacts";
import GoogleMapReact from 'google-map-react';
import PlaceIcon from '@mui/icons-material/Place';
import {red} from "@mui/material/colors";
const AboutUsTemplate = () => {
  const defaultProps = {
    center: {
      lat: 47.21908057615701,
      lng: 38.91923206870906
    },
    zoom: 15
  };

  return (
    <Container>
      <Grid container spacing={{xs: 1, md: 2}}>

        <Grid item xs={12}>
          <TitleSection title="Контакты"/>
        </Grid>

        <Contacts/>

        <Grid item sx={{
          height:'100vh',
          width: '100%'
        }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <PlaceIcon
              sx={{color: red[500]}}
              lat={47.21232421421452}
              lng={38.93384416870883}
            />
          </GoogleMapReact>
        </Grid>

      </Grid>
    </Container>
  );
};

export default AboutUsTemplate;