import React from 'react';
import { useQuery } from 'react-query';
import {Typography } from "@mui/material";
import { useRouter } from "next/router";
import Images from "@/helper/images.json";
import Benefits from "@/helper/benefits.json";
import GymsPage from "@/components/pages/gyms/GymsPage";
import IsLoading from "@/components/molecules/isLoading";
import IsError from "@/components/molecules/IsError";
import {getByQueryKey} from "@/api/getByQueryKey";
const Gyms = () => {
  const router = useRouter()
  const { pathname } = useRouter();
  const { data, isLoading, isError, error } = useQuery(["gyms"], getByQueryKey);

  if (isLoading) return <IsLoading />
  if (isError) return (<IsError message={error.message}/>)
  return (
    <GymsPage
    data = {data.data}
    Images = {Images}
    Benefits = {Benefits}
    router = {router}
    pathname ={pathname}
    >
    </GymsPage>
  );
}
export default Gyms;