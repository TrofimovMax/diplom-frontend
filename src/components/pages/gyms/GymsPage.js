import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar, Paper, ThemeProvider,
  Typography, useMediaQuery,
  useTheme
} from "@mui/material";
import NextLink from "next/link";
import TitleSection from "@/components/molecules/TitleSection";
import BackButton from "@/components/atoms/BackButton";
import Heading from "@/components/atoms/Heading";

const GymsPage = ({data, Images, Benefits, router, pathname, gymIdCard}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.up('sm'))
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box sx={{
          minHeight: '100%',
          display: 'grid',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <TitleSection title='КЛУБЫ'/>
          <Box>
            <BackButton
              router={router}
              link={'/'}
            />
            {data?.map(({id, title, address}) => {
              return (
                <Button
                  variant="text"
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
          <Grid container spacing={1}>
            <Grid item>
              <Typography variant='h6' gutterBottom={true}>
                Добро пожаловать в спортивный комплекс "Спорткомплекс"!
                Мы рады предложить вам три зала, каждый из которых предназначен для разных видов занятий.
              </Typography>
              <Typography variant='h6' gutterBottom={true}>
                Если вы хотите улучшить свою гибкость и научиться контролировать своё тело,
                то зал для йоги идеально подходит для вас.
              </Typography>
              <Typography variant='h6' gutterBottom={true}>
                Если ваша цель - набрать мышечную массу и стать сильнее,
                то зал для бодибилдинга станет вашим надежным помощником.
              </Typography>
              <Typography variant='h6' gutterBottom={true}>
                А если вы стремитесь к стройной фигуре и хотите укрепить своё здоровье,
                то зал для фитнеса будет идеальным выбором.
              </Typography>
              <Typography variant='h6' gutterBottom={true}>
                Наши квалифицированные инструкторы всегда готовы помочь вам достичь ваших целей и привести ваше тело в
                форму.
                Начните свой путь к здоровому образу жизни вместе с нами!
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <ImageList gap={gymIdCard?.gymIdCard?.length}
                       cols={isMobile ? 3 : 1}
            >
              {gymIdCard?.gymIdCard.map((item) => (
                <Paper key={item.img} sx={{padding:1}} variant="outlined" square>
                  <ImageListItem
                     sx={isMobile ? {
                    mr: 3,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    width: 333,
                  } : {
                    mr: 0,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    width: 333,
                  }

                  }>
                    <img
                      src={`${item.img}`}
                      alt={item.title}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={item.title}
                      subtitle={
                        <Box sx={{whiteSpace: "normal"}}>
                          <Typography variant='body2'>
                            {item.description}
                          </Typography>
                          <Typography variant='body2'>
                            <strong> Размер зала:</strong> {item.size}
                          </Typography>
                        </Box>
                      }
                      position="below"
                    />
                  </ImageListItem>
                </Paper>
              ))}
            </ImageList>
          </Grid>

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

          <Grid container>
            {
              Benefits.Benefits.map((block, index) => {
                return (
                  <Grid container item key={index} spacing={0}>
                    <Grid item xs={8} md={6} sd={4} sx={{textTransform: 'uppercase', fontWeight: '600'}}>
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
    </ThemeProvider>
  );
};

export default GymsPage;