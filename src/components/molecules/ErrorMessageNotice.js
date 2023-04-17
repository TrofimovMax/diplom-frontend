import React from 'react';
import {Alert, AlertTitle} from "@mui/material";

const ErrorMessageNotice = ({message}) => {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {message}
    </Alert>
  );
};

export default ErrorMessageNotice;