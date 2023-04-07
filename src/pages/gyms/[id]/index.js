import React from "react";
import { Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { useRouter } from "next/router";
import GymIdPage from "@/components/pages/gyms/GymIdPage";
const getGymById = async (id) => {
  if (id) {
    const res = await fetch(`http://localhost:3000/gyms/${id}`);
    return res.json();
  }
}
const Gym = () => {
  const router = useRouter();
  const idGym = router.query.id
  const { isLoading,isError, data, error} = useQuery(
    ["gyms", idGym],
    () => getGymById(idGym),
  );
  if (isLoading) return (<Typography variant='h1'>Loading...</Typography>)
  if (isError) return (<Typography variant='h1'>Error: {error}</Typography>)
  // data?.schedule?.configuration?.raw?.hours path to obj {day:{time: time}, ...}
  //JSON.stringify(data?.schedule?.configuration?.raw?.hours, null, '  ')
  return (
    <GymIdPage
    data = {data}
    router = {router}
    idGym = {idGym}
    />
  )
}
export default Gym;