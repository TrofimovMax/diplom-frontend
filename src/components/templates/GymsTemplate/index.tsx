import React from 'react';
import {
  Container,
  Grid,
  ImageList,
  ImageListItem,
} from "@mui/material";
import WelcomeMolecule from "@components/templates/GymsTemplate/molecules/WelcomeMolecule";
import GymsLinksMolecule from "@components/templates/GymsTemplate/molecules/GymsLinksMolecule";
import GymIdCardMolecule from "@components/templates/GymsTemplate/molecules/GymIdCardMolecule";
import BenefitsMolecule from "@components/templates/GymsTemplate/molecules/BenefitsMolecule";
import TitleSection from "@components/molecules/TitleSection";
import {NextRouter, useRouter} from "next/router";
import {useFetchGymsQuery} from "../../../pages/gyms/__generated__/FetchGyms.query";
import IsLoading from "@components/molecules/isLoading";
import IsError from "@components/molecules/IsError";
import Images from "@helper/images.json";
import Benefits from "@helper/benefits.json";
import gymIdCard from "@helper/GymIdCard.json";

const GymsTemplate: React.FC <{ isMobile: boolean }> = ({ isMobile }) => {
  const router: NextRouter = useRouter()
  const { pathname } = useRouter();
  const {loading, error, data} = useFetchGymsQuery()

  if (loading) return <IsLoading />
  if (error) return (<IsError message={error.message}/>)

  return (
    <Container>
  <Grid container>
    <Grid container item>
      <TitleSection title='КЛУБЫ'/>
    </Grid>
    <Grid container item>
      <GymsLinksMolecule
        data = {data['fetchGyms']}
        router = {router}
        pathname = {pathname}
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
        {Images.Images.map((item: any) => (
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