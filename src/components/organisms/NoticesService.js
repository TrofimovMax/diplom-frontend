import React, {useState} from "react";
import {Alert, Snackbar} from "@mui/material";

const NoticesService = ({vertical, horizontal, open, handleClose, severity, responseMessage}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top",
        horizontal: "center", }}
      open={open}
      onClose={handleClose}
      key={vertical + horizontal}
    >
      <Alert severity={severity}>{responseMessage}</Alert>
    </Snackbar>
  );
};

export default NoticesService;