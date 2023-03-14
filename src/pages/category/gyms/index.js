import React, { useEffect } from 'react';
import { useQuery } from 'react-query'
import Heading from "@/components/Heading";
import {Box, Button, Container, Typography} from "@mui/material";
import NextLink from "next/link";
import {useRouter} from "next/router";


export const fetchGymsFromAPI = async () => {
  const res = await fetch('http://localhost:3000/gyms');
  const data = await res.json();
  //return  res.json();

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { gyms: data },
  }

}

const Gyms = () => {
  const {pathname} = useRouter();
  const { data,status} = useQuery("gyms", fetchGymsFromAPI);
  // console.log("title:",data);
  // console.log("status",status)

  if (status === "loading") return (<Typography variant='h1'>Loading...</Typography>)

  return (
    <Container>
      <Box sx={{
        minHeight: '100%',
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Heading text='Gyms' tag={'h2'}/>
        <Box>
          {data.props.gyms.map(({id, title, address}) => {
            return (
              <Button
                component='a'
                LinkComponent={NextLink}
                //active={pathname === path ? "true" : null}
                key={id}
                href={pathname + `/${id}`}
              >
                {title}
              </Button>
            )
          })}
        </Box>
      </Box>
    </Container>
  );
}
export default Gyms;