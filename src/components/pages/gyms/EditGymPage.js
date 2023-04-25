import React from 'react';
import { Container, Grid} from "@mui/material";
import EditForm from "@/components/templates/GymIdTemplate/organisms/EditForm";
import TitleSection from "@/components/molecules/TitleSection";
import BackButton from "@/components/atoms/BackButton";

const EditGymPage = ({ data, url, router, gymId }) => {
  const title = `Edit Form ${data?.title}`;
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
          { data && (
            <EditForm
              gymId = {gymId}
              data = {data}
              url = {url}
            />
          ) }
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditGymPage;