import React from 'react';
import { Container, Grid} from "@mui/material";
import { EditForm } from "@components/templates/GymIdTemplate/organisms/EditForm";
import TitleSection from "@components/molecules/TitleSection";
import BackButton from "@components/atoms/BackButton";
import IsLoading from "@components/molecules/isLoading";
export const EditGymPage = ({ data, router, gymId }) => {
  const title = `Изменение клуба \"${data?.title}\"`;
  return (
    <Container>
      <Grid container spacing={1}
            direction="column"
            alignItems="center"
            justifyContent="center"
      >
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <TitleSection title={title} />
          </Grid>
        </Grid>

        <Grid container item xs={12}>
          <Grid item xs={2} md={1}>
            <BackButton router={router} link={'/gyms/' + gymId}/>
          </Grid>
          <Grid item xs="auto">

          </Grid>
        </Grid>

        <Grid container item xs={12} marginTop={3}>
          {
            gymId !== undefined ?
            <EditForm
              gymId = {gymId}
              data = {data}
            /> :
              <IsLoading />
           }
        </Grid>
      </Grid>
    </Container>
  );
};
