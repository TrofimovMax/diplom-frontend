import React from 'react';
import {Box, Grid, Container} from "@mui/material";
import GymTable from "@/components/templates/GymIdTemplate/organisms/GymTableTemplate";
import TitleSection from "@/components/molecules/TitleSection";
import BackButton from "@/components/atoms/BackButton";
import EditLink from "@/components/pages/gyms/GymIdPage/organisms/EditLink";
const GymIdPage = ({ data, router, gymId}) => {
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
            <Grid container item xs={1}>
              <EditLink
                router={router}
                gymId={gymId}
              />
            </Grid>
          </Grid>
        </>
        {
          (() => {
            if(data?.id) {
              return (
                <Grid item xs={12} sx={{
                  marginTop:2
                }}>
                  <GymTable
                    gymId={data?.id}
                    capacity={data?.capacity}
                    address={data?.address}
                    raw={data?.schedule?.configuration?.raw?.hours}
                    isEdit = {isEdit}
                  />
                </Grid>
              )
            }
          }) ()
        }
      </Grid>
    </Container>
  );
};

export default GymIdPage;