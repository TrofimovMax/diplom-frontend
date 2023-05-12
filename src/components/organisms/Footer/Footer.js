import Heading from '../../atoms/Heading';
import {Container, createTheme, Grid, Paper, ThemeProvider, Typography} from "@mui/material";
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import {Link as MUILink} from '@mui/material';
import NextLink from 'next/link';
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    links: "#fff",
    '&:hover': {
      links_hover: "#f4576c",
    }
  },
});

const Footer = () => (
  <>
    <footer>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Paper style={{backgroundImage: 'url(https://livedemo00.template-help.com/wt_58939/images/footer-01.jpg)'}}
               sx={
                 {
                   color: "#fff",
                   position: "relative",
                   marginTop: 4,
                   backgroundSize: "cover",
                   backgroundPosition: "center",
                   backgroundRepeat: "no-repeat"
                 }
               }
        >
          <Container>
            <Grid container spacing={{xs: 1, md: 2}}>
              <Grid container item xs={12} sm={6} md={3} spacing={2}
                    direction="column"
              >
                <Grid item xs={1} sx={{textTransform: 'uppercase', fontWeight: '600'}}>
                  <Heading text='О НАС' tag={"h4"}/>
                </Grid>

                <Grid item xs={1}>
                  <Typography variant='body1' component="subtitle1" gutterBottom>
                    Наш тренажерный зал - идеальное место для всех, кто занимается спортом, бодибилдингом и фитнесом.
                    С нами вы сможете достичь наилучшей физической формы!
                  </Typography>
                </Grid>
                <Grid container item>
                  <Grid item xs={1}>
                    <NextLink
                      href="https://web.telegram.org/" passHref legacyBehavior>
                      <MUILink sx={{
                        color: 'links',
                        '&:hover': {
                          color: '&:hover.links_hover'
                        },
                      }}
                      >
                        <TelegramIcon/>
                      </MUILink>
                    </NextLink>
                  </Grid>
                  <Grid item xs={1} ml={1}>
                    <NextLink
                      href="https://www.instagram.com/" passHref legacyBehavior>
                      <MUILink
                        sx={{
                          color: 'links',
                          '&:hover': {
                            color: '&:hover.links_hover'
                          },
                        }}
                      >
                        <InstagramIcon/>
                      </MUILink>
                    </NextLink>
                  </Grid>
                  <Grid item xs={1} ml={1}>
                    <NextLink
                      href="https://www.google.com/intl/ru/gmail/about/" passHref legacyBehavior>
                      <MUILink
                        sx={{
                          color: 'links',
                          '&:hover': {
                            color: '&:hover.links_hover'
                          },
                        }}
                      >
                        <EmailIcon/>
                      </MUILink>
                    </NextLink>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container item xs={12} sm={6} md={3} spacing={2}
                    direction="column"
              >
                <Grid item xs={1} sx={{textTransform: 'uppercase', fontWeight: '600'}}>
                  <Heading text='КОНТАКТЫ' tag={"h4"}/>
                </Grid>

                <Grid item xs={1}>
                  <RoomOutlinedIcon/>
                  <NextLink
                    href="/" passHref legacyBehavior>
                    <MUILink ml={1}
                             sx={{
                               color: 'links',
                               '&:hover': {
                                 color: '&:hover.links_hover'
                               },
                             }}
                    >
                      Главный офис: Петровская 51
                    </MUILink>
                  </NextLink>
                </Grid>
                <Grid container item spacing={1} direction="row"
                      justifyContent="flex-start"
                      alignItems="space-beetwen">
                  <Grid item>
                    <PhoneAndroidOutlinedIcon/>
                  </Grid>
                  <Grid item>
                    <NextLink
                      href="callto:#" ml={2} passHref legacyBehavior>
                      <MUILink
                        sx={{
                        color: 'links',
                        '&:hover': {
                          color: '&:hover.links_hover'
                        },
                      }}>
                        +1 (409) 987–5874
                      </MUILink>
                    </NextLink>
                  </Grid>
                  <Grid item ml={4}>
                    <NextLink
                      href="callto:#" passHref legacyBehavior>
                      <MUILink
                        sx={{
                          color: 'links',
                          '&:hover': {
                            color: '&:hover.links_hover'
                          },
                        }}
                      >
                        +1 (409) 987–5874
                      </MUILink>
                    </NextLink>
                  </Grid>
                </Grid>
                <Grid container item xs={2}>
                  <Grid item>
                    <MailOutlineOutlinedIcon/>
                  </Grid>
                  <Grid item ml={1}>
                    <NextLink
                      href="sport.palace@gmail.com" passHref legacyBehavior>
                      <MUILink
                        sx={{
                          color: 'links',
                          '&:hover': {
                            color: '&:hover.links_hover'
                          },
                        }}
                      >
                        sport.palace@gmail.com
                      </MUILink>
                    </NextLink>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container item xs={12} sm={6} md={3} spacing={2}
                    direction="column"
              >
                <Grid item xs={1} sx={{textTransform: 'uppercase', fontWeight: '600'}}>
                  <Heading text='Система записи' tag={"h4"}/>
                </Grid>

                <Grid item xs={1}>
                  <Typography variant='body1' component="subtitle1" gutterBottom>
                    У вас есть доступ к огромному количеству оборудования,
                    позволяющего сделать вашу рутину свежей и увлекательной.
                    Система онлайн-бронирования позволяет ВАМ легко бронировать ваши тренировки и мероприятия отдаха
                    в Интернете.
                  </Typography>
                </Grid>

              </Grid>

              <Grid container item xs={12} sm={6} md={3} spacing={2}
                    direction="column"
              >
                <Grid item xs={1} sx={{textTransform: 'uppercase', fontWeight: '600'}}>
                  <Heading text='основное направление деятельности' tag={"h4"}/>
                </Grid>

                <Grid item xs={1}>
                  <Typography variant='body1' component="subtitle1" gutterBottom>
                    ЙОГА
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant='body1' component="subtitle1" gutterBottom>
                    БОДИБИЛДИНГ
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant='body1' component="subtitle1" gutterBottom>
                    ФИТНЕСС
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </ThemeProvider>
    </footer>
  </>
);
export default Footer;