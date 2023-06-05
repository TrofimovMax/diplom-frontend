import React from 'react';
import {Alert, AlertTitle} from "@mui/material";

const IsError = ({message}) => {
  return (
    <Alert severity="error" sx={{mt: '15vh'}}>
      <AlertTitle>ОШИБКА</AlertTitle>
      {
        message ? message : "Что-то пошло не так"
      }
    </Alert>
  );
};

export default IsError;