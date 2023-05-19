import React from 'react';
import {Container, Grid} from "@mui/material";
import TitleSection from "@/components/molecules/TitleSection";
import Contacts from "@/components/molecules/Contacts";
import {Placemark, YMaps, Map} from "@pbe/react-yandex-maps";

const AboutUsTemplate = () => {
  const defaultState = {
    center: [47.212382, 38.933865],
    zoom: 14,
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
          {/* docs for using this map: https://pbe-react-yandex-maps.vercel.app/ */}
          <YMaps>
            <Map defaultState={defaultState} width='100%' height='100%'>
              <Placemark geometry={[47.212169, 38.933865]} />
            </Map>
          </YMaps>
        </Grid>

      </Grid>
    </Container>
  );
};

export default AboutUsTemplate;