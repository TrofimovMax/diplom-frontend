import React from 'react';
import {Box, Button, Container, Grid, ImageList, ImageListItem, Typography} from "@mui/material";
import NextLink from "next/link";
import TitleSection from "@/components/molecules/TitleSection";
import BackButton from "@/components/atoms/BackButton";
import Heading from "@/components/atoms/Heading";
const GymsPage = ({ data, Images, Benefits, router, pathname }) => {
  return (
    <Container>
      <Box sx = {{
        minHeight: '100%',
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <TitleSection title = 'КЛУБЫ'/>
        <Box>
          <BackButton
            router={router}
            link={'/'}
          />
          {data?.map(({id, title, address}) => {
            return (
              <Button
                variant = "text"
                component = 'a'
                LinkComponent = {NextLink}
                key = {id}
                href = {pathname + `/${id}`}
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
        <Typography variant='h6' gutterBottom={true}>
          Поход в спортзал - такая странная штука, когда человек на полчаса застревает в пробке ради того,
          чтобы покататься на велотренажере.
          Спортзал имеет ряд преимуществ и способен привести в равновесие тело, разум и душу.
        </Typography>
        <Grid container>
        {
          Benefits.Benefits.map((block, index) => {
            return (
              <Grid container item key = {index} spacing={0}>
                <Grid item xs={8} md={6} sd={4} sx={{textTransform: 'uppercase'}}>
                  <Heading text={block?.caption} tag={"h4"}/>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant='body2' gutterBottom>
                    {block.description}
                  </Typography>
                </Grid>
              </Grid>
            );
          })
        }
        </Grid>
      </Box>
    </Container>
  );
};

export default GymsPage;