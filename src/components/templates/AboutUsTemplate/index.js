import React from 'react';
import {Container, Grid} from "@mui/material";
import TitleSection from "@/components/molecules/TitleSection";
import Contacts from "@/components/molecules/Contacts";
import {Placemark, YMaps, Map} from "@pbe/react-yandex-maps";
import aboutUsBenefits from '@/helper/aboutUsBenefits.json'
import AboutUsBenefits from "@/components/templates/AboutUsTemplate/molecules/AboutUsBenefits";
import {ApolloClient, HttpLink, InMemoryCache, useApolloClient} from "@apollo/client";
import {Query} from "@apollo/client/react/components";
import {FETCH_INTAKE_TAGS} from "@/components/templates/GymsTemplate/FETCH_INTAKE_TAGS";
import IsLoading from "@/components/molecules/isLoading";
import IsError from "@/components/molecules/IsError";
import { useQuery } from '@apollo/client';
import {useQuery as useApolloQuery} from "@apollo/client/react/hooks/useQuery";
import {FETCH_GYMS} from "@/pages/gyms/FetchGymsQuery";

const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTU5OTE2MzMsInVzZXJfaWQiOjYsImFkbSI6bnVsbCwidWlkIjoiOWViYTMyMjAtMjg1Yi00NDdiLWEwZmQtYTMxYjhmNWM2MjgyIn0.2Fz2CVALSLgoSIMy6U8HIwLjT6NMrJciKo-tkaQQ4Uk";

const customClient = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:3000/graphql",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Rightway-Consumer-Version": "Advocate WEB Application",
    }
  }),
  cache: new InMemoryCache(),
})

const IntakeTagQuery = () => {
  return (
    <Query query={FETCH_INTAKE_TAGS} client={customClient}>
      {({ error, loading, data }) => {
        if (error) return "Error!";
        if (loading) return "Loading!";

        if (data) {
          return (
            <Grid item>Win!</Grid>
          );
        }
      }}
    </Query>
  )
}

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

        <Grid item xs={12}>
          <IntakeTagQuery />
        </Grid>

        <Contacts />

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