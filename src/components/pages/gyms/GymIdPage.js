import React from 'react';
import {Box, Button, Container} from "@mui/material";
import NextLink from "next/link";
import GymTable from "@/components/templates/gyms/organisms/GymTable";
import TitleSection from "@/components/molecules/TitleSection";
import BackButton from "@/components/atoms/BackButton";

const GymIdPage = ({ data, router, idGym }) => {
  return (
    <Container>
      <Box>
        <>
          <TitleSection title = { data?.title }/>
          <Box sx = {{
            minWidth: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'}}>
            <BackButton router = { router } link = '/gyms' />
            <Button
              component = 'button'
              LinkComponent = { NextLink }
              onClick={() => router.push('/gyms/' + idGym + '/edit')}
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
                    capacity = {data?.capacity}
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
  );
};

export default GymIdPage;