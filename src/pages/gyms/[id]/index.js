import React from "react";
import Heading from '/src/components/Heading';
import {
  Box,
  Container,
  Typography
} from '@mui/material';
import {useQuery} from 'react-query';
import {useRouter} from "next/router";
import GymTable from "@/components/GymTable";

const getGymById = async (id) => {
  if (id) {
    const res = await fetch(`http://localhost:3000/gyms/${id}`);
    return res.json();
  }
}

const Gym = () => {
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
    <Container>
        <Box>
          <Heading text={data?.title}/>
      {
        (() => {
          if(schObj) {
            return (
              <GymTable
                address = {data?.address}
                raw = {schObj}
              />
            )
          }
        }) ()
      }
        </Box>
    </Container>
  )
}
export default Gym;