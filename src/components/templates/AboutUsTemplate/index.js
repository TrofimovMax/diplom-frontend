import React from 'react';
import {Container, Grid, Typography} from "@mui/material";
import TitleSection from "@/components/molecules/TitleSection";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import LinkAtom from "@/components/atoms/LinkAtom";

const AboutUsTemplate = () => {
  return (
    <Container>
      <Grid container spacing={{xs: 1, md: 2}}>

        <Grid item xs={12}>
          <TitleSection title="Контакты"/>
        </Grid>

        <Grid container item>
          <Grid container item xs={12} spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center">
            <Grid item>
              <RoomOutlinedIcon/>
            </Grid>
            <Grid item>
              <Typography variant="h6" component="h3">Адресс</Typography>
              <Typography variant="body1"> Главный офис: Петровская 51 </Typography>
            </Grid>
          </Grid>
          <Grid container item
                sx={{mr: 7}}
                xs={12}
                direction="row"
                justifyContent="center"
                alignItems="center">
            <Grid item>
              <PhoneAndroidOutlinedIcon sx={{mt: 2}}/>
            </Grid>
            <Grid item xs={2} sx={{ml: 2}}>
              <Typography variant="h6" component="h3">Телефоны</Typography>
              <Typography variant="body1"> +1 (409) 987–5874 </Typography>
              <Typography variant="body1"> +1 (409) 987–5874 </Typography>
            </Grid>
          </Grid>
          <Grid container item
                sx={{mr: 8}}
                xs={12}
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center">
            <Grid item>
              <MailOutlineOutlinedIcon/>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6" component="h3">Почта</Typography>
              <Typography variant="body1"> sport.palace@gmail.com </Typography>
            </Grid>
          </Grid>
          <Grid container item
                sx={{mr: 8}}
                xs={12}
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center">
            <Grid item>
              <MessageOutlinedIcon/>
            </Grid>
            <Grid container item xs={2}>
              <Grid item>
                <Typography variant="h6" component="h3" sx={{mr: 2}}>Наши соцсети</Typography>
              </Grid>
              <Grid item>
                <LinkAtom
                  children={<TelegramIcon/>}
                  href={"https://web.telegram.org/"}
                  color={"redLinks"}
                  collor_hover={"&:hover.redLinks_hover"}
                />
              </Grid>
              <Grid item>
                <LinkAtom
                  children={<InstagramIcon/>}
                  href={"https://www.instagram.com/"}
                  color={"redLinks"}
                  color_hover={"&:hover.redLinks_hover"}
                />
              </Grid>
              <Grid item>
                <LinkAtom
                  children={<EmailIcon/>}
                  href={"https://www.google.com/intl/ru/gmail/about/"}
                  color={"redLinks"}
                  color_hover={"&:hover.redLinks_hover"}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        
      </Grid>
    </Container>
  );
};

export default AboutUsTemplate;