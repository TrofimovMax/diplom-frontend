import React from 'react';
import {Container, Grid} from "@mui/material";
import TitleSection from "@components/molecules/TitleSection";
import Contacts from "@components/molecules/Contacts";
import {Placemark, YMaps, Map} from "@pbe/react-yandex-maps";
import aboutUsBenefits from 'helper/aboutUsBenefits.json'
import AboutUsBenefits from "@components/templates/AboutUsTemplate/molecules/AboutUsBenefits";

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

        <AboutUsBenefits benefits = {aboutUsBenefits.aboutUsBenefits}/>


        <Grid item sx={{
          mt: 5,
          height: '100vh',
          width: '100%'
        }}>
          {/* docs for using this map: https://pbe-react-yandex-maps.vercel.app/ */}
          <YMaps>
            <Map defaultState={defaultState} width='100%' height='100%'>
              <Placemark geometry={[47.212169, 38.933865]}/>
            </Map>
          </YMaps>
        </Grid>

      </Grid>
    </Container>
  );
};

export default AboutUsTemplate;