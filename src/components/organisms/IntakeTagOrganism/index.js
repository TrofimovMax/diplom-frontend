import * as React from 'react';
import {Button, Grid} from "@mui/material";
import {HttpLink, useApolloClient, useQuery} from "@apollo/client";
import {FETCH_INTAKE_TAGS} from "@/components/templates/GymsTemplate/FETCH_INTAKE_TAGS";
import IsLoading from "@/components/molecules/isLoading";
import IsError from "@/components/molecules/IsError";
import {random} from "lodash";
import {useMutation} from "@apollo/client/react/hooks/useMutation";
import {INTAKE_TAG_UPDATE_MUTATION} from "@/components/organisms/IntakeTagOrganism/IntakeTagUpdate";

const CustomClientComponent = ({data}) => {

  const [updateTagMutation] = useMutation(INTAKE_TAG_UPDATE_MUTATION, {
    onError: (error) => {
      console.log(error.message)
    },
  });
  const BoomClick = (id, name) => {
    if (id) {
      updateTagMutation({
        variables: {
          name: name
        }
      })
    }
  }

  return (<Grid>
    useQuery is worked
    {
      data?.intake_tags?.nodes?.map((node) => {
        return (
          <Grid key={node.id}>
            <Grid >
              {node.name}
            </Grid>
            <Button onClick={() => BoomClick(node.id, `BOOOM ${random(10)}`)}>
              BooM
            </Button>
          </Grid>
        )
      })
    }
  </Grid>)
}

const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTU5OTE2MzMsInVzZXJfaWQiOjYsImFkbSI6bnVsbCwidWlkIjoiOWViYTMyMjAtMjg1Yi00NDdiLWEwZmQtYTMxYjhmNWM2MjgyIn0.2Fz2CVALSLgoSIMy6U8HIwLjT6NMrJciKo-tkaQQ4Uk";
export const IntakeTagOrganism = () => {

  const client = useApolloClient();

  console.log({ IntakeTagOrganism: client.link.options.uri })

  const { loading, error, data: queryData } = useQuery(FETCH_INTAKE_TAGS);

  if (loading) {
    return <IsLoading/>;
  }

  if (error) {
    return <IsError message={error.message}/>;
  }

  return (
    <CustomClientComponent
      data = {queryData}
    />
  );
};