import React from "react";
import { Button, Grid } from "@mui/material";
import BackButton from "@components/atoms/BackButton";
import NextLink from "next/link";
import {NextRouter} from "next/router";

type GymsName = {
  id: string,
  title: string
}
const GymsLinksMolecule: React.FC <{data: Array<GymsName>, router: NextRouter, pathname: string}> = ({data, router, pathname}) => {
  return (
    <Grid container>
      <Grid item>
        <BackButton
          router={router}
          link={"/"}
        />
        {data?.map(({id, title}) => {
          return (
            <Button
              variant="text"
              component="a"
              LinkComponent={NextLink}
              key={id}
              href={pathname + `/${id}`}
            >
              {title}
            </Button>
          )
        })}
      </Grid>
    </Grid>
  );
};

export default GymsLinksMolecule;