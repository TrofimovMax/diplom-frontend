import React from 'react';
import { useRouter } from "next/router";
import Images from "helper/images.json";
import Benefits from "helper/benefits.json";
import gymIdCard from "helper/GymIdCard.json";
import GymsPage from "components/pages/gyms/GymsPage";
import IsLoading from "components/molecules/isLoading";
import IsError from "components/molecules/IsError";
import {useFetchGymsQuery} from "./__generated__/FetchGyms.query";
const Gyms = () => {
  const router = useRouter()
  const { pathname } = useRouter();
  const {loading, error, data: queryData} = useFetchGymsQuery()

  if (loading) return <IsLoading />
  if (error) return (<IsError />)

  return (
    <GymsPage
    data = {queryData['fetchGyms']}
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