import React from 'react';
import {
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

const GymsTemplate = ({data, Images, Benefits, router, pathname, gymIdCard, isMobile}) => {
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