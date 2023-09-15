import {Container, Grid, Paper, Typography} from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import React from "react";
import LinkAtom from "@components/atoms/LinkAtom";

const Footer = () => (
  <>
    <footer>
        <Paper style={{backgroundImage: "url(https://livedemo00.template-help.com/wt_58939/images/footer-01.jpg)"}}
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
                <Grid item xs={1}>
                  <Typography
                    fontWeight={600}
                    variant="h6"
                  >
                    О НАС
                  </Typography>
                </Grid>

                <Grid item xs={1}>
                  <Typography variant="body1" component="subtitle1" gutterBottom>
                    Наш тренажерный зал - идеальное место для всех, кто занимается спортом, бодибилдингом и фитнесом.
                    С нами вы сможете достичь наилучшей физической формы!
                  </Typography>
                </Grid>
                <Grid container item>
                  <Grid item xs={1}>
                    <LinkAtom
                      href={"https://web.telegram.org/"}
                    >
                      <TelegramIcon/>
                    </LinkAtom>
                  </Grid>
                  <Grid item xs={1} ml={1}>
                    <LinkAtom
                    href={"https://www.instagram.com/"}
                    >
                      <InstagramIcon/>
                    </LinkAtom>
                  </Grid>
                  <Grid item xs={1} ml={1}>
                    <LinkAtom
                      href={"https://www.google.com/intl/ru/gmail/about/"}
                    >
                      <EmailIcon/>
                    </LinkAtom>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container item xs={12} sm={6} md={3} spacing={2}
                    direction="column"
              >
                <Grid item>
                  <Typography
                    fontWeight={600}
                    variant="h6"
                  >
                    КОНТАКТЫ
                  </Typography>
                </Grid>

                <Grid item>
                  <RoomOutlinedIcon/>
                  <LinkAtom
                    children={"Главный офис: Петровская 51"}
                    href={"/"}
                  />
                </Grid>
                <Grid container item spacing={1} direction="row"
                      justifyContent="flex-start"
                      alignItems="space-beetwen">
                  <Grid item>
                    <PhoneAndroidOutlinedIcon/>
                  </Grid>
                  <Grid item>
                    <LinkAtom
                      children={"+1 (409) 987–5874"}
                      href={"callto:#"}
                    />
                  </Grid>
                  <Grid item ml={4}>
                    <LinkAtom
                      children={"+1 (409) 987–5874"}
                      href={"callto:#"}
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={2}>
                  <Grid item>
                    <MailOutlineOutlinedIcon/>
                  </Grid>
                  <Grid item ml={1}>
                    <LinkAtom
                      href={"sport.palace@gmail.com"}
                    >
                      <Typography>sport.palace@gmail.com</Typography>
                    </LinkAtom>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container item xs={12} sm={6} md={3} spacing={2}
                    direction="column"
              >
                <Grid item>
                  <Typography
                    sx={{textTransform: "uppercase"}}
                    fontWeight={600}
                    variant="h6"
                  >
                    Система записи
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography variant="body1" component="subtitle1" gutterBottom>
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
                <Grid item xs={1}>
                  <Typography
                    sx={{textTransform: "uppercase"}}
                    fontWeight={600}
                    variant="h6"
                  >
                    основное направление деятельности
                  </Typography>
                </Grid>

                <Grid item >
                  <Typography variant="body1" component="subtitle1" gutterBottom>
                    ЙОГА
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" component="subtitle1" gutterBottom>
                    БОДИБИЛДИНГ
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" component="subtitle1" gutterBottom>
                    ФИТНЕСС
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Paper>
    </footer>
  </>
);
export default Footer;