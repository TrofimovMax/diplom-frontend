import React from 'react';
import {Alert, AlertTitle} from "@mui/material";

const IsError = ({message}) => {
  return (
    <Alert severity="error" sx={{mt: '15vh'}}>
      <AlertTitle>Error</AlertTitle>
      {
        message ? message : "Something has gone wrong"
      }
    </Alert>
  );
};

export default IsError;