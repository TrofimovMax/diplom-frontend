import React from 'react';
import {Button, Grid, Typography} from "@mui/material";
import EditForm from "@/components/templates/gyms/organisms/EditForm";
import NextLink from "next/link";
import TitleSection from "@/components/molecules/TitleSection";
import BackButton from "@/components/atoms/BackButton";

const EditGymPage = ({ data, url, router, gymId }) => {
  return (
    <Grid container spacing={1}
          direction="column"
          alignItems="center"
          justifyContent="center"
    >
      <Grid container item xs={12}>
        <Grid item xs={12}>
          <TitleSection title='Edit Form' />
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
            data = {data}
            url = {url}
          />
        ) }
      </Grid>
    </Grid>
  );
};

export default EditGymPage;