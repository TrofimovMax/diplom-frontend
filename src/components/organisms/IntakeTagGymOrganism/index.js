import React from 'react';
import { Grid } from "@mui/material";
import { useQuery } from "@apollo/client";
import {FETCH_INTAKE_TAG_GYM} from "@/components/organisms/IntakeTagGymOrganism/FETCH_INTAKE_TAG_GYM";
import IsLoading from "@/components/molecules/isLoading";
import IsError from "@/components/molecules/IsError";

const IntakeTagGymOrganism = () => {

  const { loading, error, data: queryData } = useQuery(FETCH_INTAKE_TAG_GYM, {
    variables: {
      limit:10,
      page: 1,
    },
    pollInterval: 1_000,
    notifyOnNetworkStatusChange: false, // if true, poolInterval is worked
    onCompleted: (data) => {
      // to do something
    }
  });

  if (loading) {
    return <IsLoading/>;
  }

  if (error) {
    return <IsError message={error.message}/>;
  }

  return (
    <Grid item>
      I am Gym IntakeTag
      {
        queryData?.fetchIntakeTags?.map((node) => {
          return (
            <Grid key={node.id}>
              <Grid >
                {node.name}
              </Grid>
            </Grid>
          )
        })
      }
    </Grid>
  );
};

export default IntakeTagGymOrganism;