import React from 'react';
import {
  Box,
  Container,
  Grid,
  ImageList,
  ImageListItem,
} from "@mui/material";
import WelcomeMolecule from "@/components/templates/GymsTemplate/molecules/WelcomeMolecule";
import GymsLinksMolecule from "@/components/templates/GymsTemplate/molecules/GymsLinksMolecule";
import GymIdCardMolecule from "@/components/templates/GymsTemplate/molecules/GymIdCardMolecule";
import BenefitsMolecule from "@/components/templates/GymsTemplate/molecules/BenefitsMolecule";
import TitleSection from "@/components/molecules/TitleSection";
import {HttpLink, useApolloClient, useQuery} from "@apollo/client";
import {FETCH_INTAKE_TAGS} from "@/components/templates/GymsTemplate/FETCH_INTAKE_TAGS";
import IsLoading from "@/components/molecules/isLoading";
import IsError from "@/components/molecules/IsError";

const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTU5OTE2MzMsInVzZXJfaWQiOjYsImFkbSI6bnVsbCwidWlkIjoiOWViYTMyMjAtMjg1Yi00NDdiLWEwZmQtYTMxYjhmNWM2MjgyIn0.2Fz2CVALSLgoSIMy6U8HIwLjT6NMrJciKo-tkaQQ4Uk";

const CustomClientComponent = (data) => {
  console.log(data)
  if (data){
    return (<Grid>
      useQuery is worked
    </Grid>)
  }
}

const GymsTemplate = ({data, Images, Benefits, router, pathname, gymIdCard, isMobile}) => {

  const customClient = useApolloClient();

  customClient.setLink(new HttpLink({
    uri: 'http://localhost:3000/graphql',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Rightway-Consumer-Version': 'Advocate WEB Application',
    },
  }));

  const { loading, error, data: queryData } = useQuery(FETCH_INTAKE_TAGS);

  if (loading) {
    return <IsLoading/>;
  }

  if (error) {
    return <IsError message={b.message}/>;
  }

  return (
    <Container>
  <Grid container>
    <Grid container item>
      <TitleSection title='КЛУБЫ'/>
    </Grid>
    <Grid container item>
      <GymsLinksMolecule
        data = {data}
        router = {router}
        pathname = {pathname}
      />
    </Grid>
    <Grid item xs={12}>
      <CustomClientComponent
      data = {queryData}
      />
    </Grid>
    <Grid container item>
      <WelcomeMolecule />
    </Grid>
    <Grid container item>
      <GymIdCardMolecule
        gymIdCard = {gymIdCard}
        isMobile = {isMobile}
      />
    </Grid>
    <Grid container item>
      <ImageList
        gap={12}
        cols={3}
        sx={{
          mb: 8,
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))!important',
        }}
      >
        {Images.Images.map((item) => (
          <ImageListItem key={item.img} sx={{height: '100% !important'}}>
            <img
              src={`${item.img}?w=400&h=400&fit=crop&auto=format`}
              srcSet={`${item.img}?w=800&h=800&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Grid>
    <Grid container item>
      <BenefitsMolecule
        Benefits = {Benefits}
      />
    </Grid>
  </Grid>
    </Container>
  );
};
export default GymsTemplate;