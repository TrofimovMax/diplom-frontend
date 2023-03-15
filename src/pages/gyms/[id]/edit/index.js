import React from 'react';
import {Button, Grid, Typography} from "@mui/material";
import EditForm from "@/components/EditForm";
import {useRouter} from "next/router";
import {useQuery} from "react-query";

const getGymById = async (id) => {
  if (id) {
    const res = await fetch(`http://localhost:3000/gyms/${id}`);
    return res.json();
  }
}



const Edit = () => {

  const router = useRouter();
  const pageNum = router.query.id
  const { status, data, error} = useQuery(
    ["gyms", pageNum],
    () => getGymById(pageNum),
    {
      keepPreviousData: true,
      staleTime: 80000
    }
  );
  if (status === "loading") return (<Typography variant='h1'>Loading...</Typography>)
  if (error) return (<Typography variant='h1'>Error: {error}</Typography>)
  const schObj = data?.schedule.configuration.raw.hours;

  return (
    <Grid container spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '100vh' , minWidth: '50wh'}}
    >
      <Grid item xs={12}>
        <Typography variant="h4" component="h6">Edit Form</Typography>
      </Grid>
      <Grid item xs={12} marginTop={3}>
        { schObj && (
          <EditForm
            raw = {schObj}
          />
        ) }

      </Grid>
      <Grid item xs={4} marginTop={3}>
        <Button variant="contained" color="success">
          Edit
        </Button>
      </Grid>
    </Grid>
  );
};

export default Edit;