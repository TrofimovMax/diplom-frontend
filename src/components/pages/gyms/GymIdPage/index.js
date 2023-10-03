import React from 'react';
import {Grid, Container} from "@mui/material";
import GymTable from "@/components/templates/GymIdTemplate/organisms/GymTableTemplate";
import TitleSection from "@/components/molecules/TitleSection";
import BackButton from "@/components/atoms/BackButton";
import EditLink from "@/components/pages/gyms/GymIdPage/organisms/EditLink";
import {IntakeTagOrganism} from "@/components/organisms/IntakeTagOrganism";
import {ApolloProvider, useApolloClient} from "@apollo/client";
import {navigatorClient} from "@/apollo/client";
import IntakeTagGymOrganism from "@/components/organisms/IntakeTagGymOrganism";



const GymIdPage = ({ data, router, gymId}) => {

  const client = useApolloClient();

  const isEdit = false;

  return (
    <Container>
      <Grid container>
        <>
          <TitleSection title = { data?.title }/>
          <Grid
            container
            item
            xs={12}
            direction='row'
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <BackButton router = { router } link = '/gyms' />
            </Grid>
            <Grid item>
              <ApolloProvider client={navigatorClient}>
                <IntakeTagOrganism />
              </ApolloProvider>
            </Grid>
            <Grid item>
              <IntakeTagGymOrganism />
            </Grid>
            <Grid container item xs={1}>
              <EditLink
                router={router}
                gymId={gymId}
              />
            </Grid>
          </Grid>
        </>
        { data && (
          <Grid item xs={12} sx={{
            marginTop:2
          }}>
            <GymTable
              data = {data}
              isEdit = {isEdit}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default GymIdPage;