import React from "react";
import Heading from '/src/components/Heading';
import {
  Box, Button,
  Container, Grid,
  Typography
} from '@mui/material';
import {useQuery} from 'react-query';
import {useRouter} from "next/router";
import GymTable from "@/components/GymTable";
import NextLink from "next/link";

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
  );
  if (status === "loading") return (<Typography variant='h1'>Loading...</Typography>)
  if (error) return (<Typography variant='h1'>Error: {error}</Typography>)
  // data?.schedule?.configuration?.raw?.hours path to obj {day:{time: time}, ...}
  //JSON.stringify(data?.schedule?.configuration?.raw?.hours, null, '  ')
  return (
    <Container>
        <Box>
          <>
            <Heading text={data?.title}/>
            <Box sx = {{
              minWidth: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'}}>
              <Button
                component='button'
                LinkComponent={NextLink}
                onClick={() => router.push('/gyms')}
              >
                Back
              </Button>
              <Button
                component='button'
                LinkComponent={NextLink}
                onClick={() => router.push('/gyms/' + pageNum + '/edit')}
              >
                Edit
              </Button>
            </Box>
          </>
      {
        (() => {
          if(data?.id) {
            return (
              <Box sx={{
                marginTop:2
              }}>
                <GymTable
                  address = {data?.address}
                  raw = {data?.schedule?.configuration?.raw?.hours}
                />
              </Box>
            )
          }
        }) ()
      }
        </Box>
    </Container>
  )
}
export default Gym;