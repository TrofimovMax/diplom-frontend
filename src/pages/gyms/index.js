import React, { useEffect } from 'react';
import { useQuery } from 'react-query'
import Heading from "@/components/Heading";
import {Box, Button, Container, ImageList, ImageListItem, Typography} from "@mui/material";
import NextLink from "next/link";
import {useRouter} from "next/router";
import Images from "@/helper/images.json";
import Benefits from "@/helper/benefits.json";

export const fetchGymsFromAPI = async () => {
  const res = await fetch('http://localhost:3000/gyms');
  const data = await res.json();

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
  const router = useRouter()
  const {pathname} = useRouter();
  const { data,status} = useQuery("gyms", fetchGymsFromAPI);
  if (status === "loading") return (<Typography variant='h1'>Loading...</Typography>)

  return (
    <Container>
      <Box sx={{
        minHeight: '100%',
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Box sx = {{
          minWidth: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'}}>
          <Heading text='Gyms' tag={'h2'}/>
          <Button
            component='button'
            LinkComponent={NextLink}
            onClick={() => router.push('/')}
          >
            Back
          </Button>
        </Box>

        <Box>
          {data.props.gyms.map(({id, title, address}) => {
            return (
              <Button
                component='a'
                LinkComponent={NextLink}
                key={id}
                href={pathname + `/${id}`}
              >
                {title}
              </Button>
            )
          })}
        </Box>
        <ImageList sx={{width: 1200, height: 450}} cols={3} rowHeight={400}>
          {Images.Images.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=400&h=400&fit=crop&auto=format`}
                srcSet={`${item.img}?w=800&h=800&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Typography variant='h6' gutterBottom={true}>We all know that going to the gym is good for your health and we
          are all aware
          that we should be a bit more active. Joining a gym makes doing these things a lot easier but if you needed
          some more motivation
        </Typography>
        {
          Benefits.Benefits.map((block, index) => {
            return (
              <Box key={index}>
                <Typography variant='body1' gutterBottom sx={{fontWeight: 'bold'}}>
                  {block.caption}
                </Typography>
                <Typography variant='body2' gutterBottom>
                  {block.description}
                </Typography>
              </Box>
            );
          })
        }
      </Box>
    </Container>
  );
}
export default Gyms;