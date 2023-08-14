import React from 'react';
import { useQuery } from 'react-query';
import { useRouter } from "next/router";
import Images from "@/helper/images.json";
import Benefits from "@/helper/benefits.json";
import gymIdCard from "@/helper/GymIdCard.json";
import GymsPage from "@/components/pages/gyms/GymsPage";
import IsLoading from "@/components/molecules/isLoading";
import IsError from "@/components/molecules/IsError";
import {getByQueryKey} from "@/api/getByQueryKey";
import {FETCH_GYMS} from "@/pages/gyms/FetchGymsQuery";
import {useQuery as useApolloQuery} from "@apollo/client";
const Gyms = () => {
  const router = useRouter()
  const { pathname } = useRouter();
  const { data, isLoading, isError, error:rqError } = useQuery(["gyms"], getByQueryKey);
  const {loading, error, data: queryData} = useApolloQuery(FETCH_GYMS)

  if (isLoading || loading) return <IsLoading />
  if (isError || error) return (<IsError />)
  
  return (
    <GymsPage
    data = {data.data}
    Images = {Images}
    Benefits = {Benefits}
    gymIdCard = {gymIdCard}
    router = {router}
    pathname ={pathname}
    >
    </GymsPage>
  );
}
export default Gyms;