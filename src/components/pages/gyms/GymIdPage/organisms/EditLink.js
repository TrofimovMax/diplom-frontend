import React from 'react';
import NextLink from "next/link";
import { Button, Grid } from "@mui/material";
import {useQuery} from "react-query";
import {getByQueryKey} from "@api/getByQueryKey";
import IsLoading from "@components/molecules/isLoading";

const EditLink = ({router, gymId}) => {
  const { isLoading, data: adminData } = useQuery(["admin"], getByQueryKey, {retry: 1,});
  if (isLoading) return (<IsLoading/>)
  if (adminData?.data?.status === 'ok') {
    return (
      <Button
        component = 'button'
        LinkComponent = { NextLink }
        onClick={() => router.push('/gyms/' + gymId + '/edit')}
      >
        Изменить
      </Button>
    )
  }
  return <Grid item/>
};

export default EditLink;