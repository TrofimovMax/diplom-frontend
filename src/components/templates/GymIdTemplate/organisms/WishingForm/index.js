import React, {useContext, useState} from 'react';
import {
  Button, createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Grid, ThemeProvider,
} from "@mui/material";
import {useMutation} from "react-query";
import axiosClient from "@/api/axiosClient";
import {createDataTimeUTC} from "@/components/templates/GymIdTemplate/utils";
import NoticeContext from "@/api/NoticeContext";

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF'
    },
    secondary: {
      main: '#e5e5e5'
    }
  },
});
const WishingForm = ({gymId, time, date, refetchBookings}) => {
  
  const [open, setOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const start_at = (time - 1) + ':00';
  const end_at = time + ':00';

  const {handleClick, setResponseMessage, setSeverity} = useContext(NoticeContext);

  const { mutateAsync } = useMutation(["create_wishes"], (params) => {
      axiosClient.post(`/gyms/${gymId}/wishes`, params)
    },
    {
      onSuccess: (response) => {
        handleClick();
        setResponseMessage("Your successfully created your wish in list!");
        setSeverity("success");
      },
      onError: (error) => {
        handleClick();
        setResponseMessage(error?.message);
        setSeverity("error");
      }
    }
  );

  const wishing = (gymId, start_at, end_at, date) => () => {
    handleDialogClose();
    mutateAsync({
      start_at: createDataTimeUTC(date, start_at),
      end_at: createDataTimeUTC(date, end_at),
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        onClick={handleDialogOpen}
        sx={{
          height: 1,
          width: 1,
          backgroundColor: 'primary.main',
          '&:hover': {
            backgroundColor: 'secondary.main',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
        spacing={0}
      >
        <Grid item xs>

        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Do you want to add in wish list from ${start_at} to ${end_at} on ${date}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Add the time when you would like to come to the lesson and we will take it into account when scheduling
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" color="success" autoFocus onClick={wishing(gymId, start_at, end_at, date)}>
            Add wish list
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default WishingForm;