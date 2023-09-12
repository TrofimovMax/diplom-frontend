import React from 'react';
import {Grid, Typography} from "@mui/material";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import LinkAtom from "@components/atoms/LinkAtom";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";

const Contacts = () => {
  return (
    <Grid container item>
      <Grid container item xs={12} spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="center">
        <Grid item>
          <RoomOutlinedIcon />
        </Grid>
        <Grid item>
          <Typography variant="h6" component="h3">Адресс</Typography>
          <Typography variant="body1"> Главный офис: Петровская 51 </Typography>
        </Grid>
      </Grid>
      <Grid container item>
        <Grid container item xs={12} spacing={2}
              direction="row"
              justifyContent="flex-start"
              alignItems="center">
          <Grid item>
            <PhoneAndroidOutlinedIcon/>
          </Grid>
          <Grid item >
            <Typography variant="h6" component="h3">Телефоны</Typography>
            <Typography variant="body1"> +1 (409) 987–5874 </Typography>
            <Typography variant="body1"> +1 (409) 987–5874 </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item>
        <Grid container item xs={12} spacing={2}
              direction="row"
              justifyContent="flex-start"
              alignItems="center">
          <Grid item>
            <MailOutlineOutlinedIcon/>
          </Grid>
          <Grid item>
            <Typography variant="h6" component="h3">Почта</Typography>
            <Typography variant="body1"> sport.palace@gmail.com </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item>
        <Grid container item xs={12} spacing={2}
              direction="row"
              justifyContent="flex-start"
              alignItems="center">
          <Grid item>
            <MessageOutlinedIcon/>
          </Grid>
          <Grid item>
            <Typography variant="h6" component="h3" sx={{mr: 2}}>Наши соцсети</Typography>
            <LinkAtom
              children={<TelegramIcon/>}
              href={"https://web.telegram.org/"}
              color={"redLinks"}
              collor_hover={"&:hover.redLinks_hover"}
            />
            <LinkAtom
              children={<InstagramIcon/>}
              href={"https://www.instagram.com/"}
              color={"redLinks"}
              color_hover={"&:hover.redLinks_hover"}
            />
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
  );
};

export default Contacts;