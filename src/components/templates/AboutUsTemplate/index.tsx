import React from "react";
import {Container, Grid} from "@mui/material";
import TitleSection from "@components/molecules/TitleSection";
import Contacts from "@components/molecules/Contacts";
import {Placemark, YMaps, Map} from "@pbe/react-yandex-maps";
import aboutUsBenefits from "@helper/aboutUsBenefits.json"
import { AboutUsBenefit } from "./AboutUsBenefitType"
import AboutUsBenefits from "@components/templates/AboutUsTemplate/molecules/AboutUsBenefits";

type StateMap = {
  center: Array<number>,
  zoom: number
}
const AboutUsTemplate: React.FC = () => {

  const defaultState: StateMap = {
    center: [47.212382, 38.933865],
    zoom: 14,
  };

  const benefits: Array<AboutUsBenefit> = aboutUsBenefits.Benefits || [];

  return (
    <Container>
      <Grid container spacing={{xs: 1, md: 2}}>

        <Grid item xs={12}>
          <TitleSection title="Контакты"/>
        </Grid>

        <Contacts/>

        <AboutUsBenefits benefits ={benefits}/>

        <Grid item sx={{
          mt: 5,
          height: "100vh",
          width: "100%"
        }}>
          {/* docs for using this map: https://pbe-react-yandex-maps.vercel.app/ */}
          <YMaps>
            <Map defaultState={defaultState} width="100%" height="100%">
              <Placemark geometry={defaultState.center}/>
            </Map>
          </YMaps>
        </Grid>

      </Grid>
    </Container>
  );
};

export default AboutUsTemplate;