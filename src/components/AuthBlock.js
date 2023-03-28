import React, {useEffect, useState} from 'react';
import {Button, Grid} from "@mui/material";
import NextLink from "next/link";
import useLocalStorage from "@/store/useLocalStorage";

const AuthBlock = () => {
  const [user, setUser] = useLocalStorage("user", "");

  let authButton;

  if (user !== '') {
    authButton =
      (
        <Button
          sx={{ color: '#000' }}
          component='a'
          href="/login"
          LinkComponent={NextLink}
        >
          Sign out
        </Button>);
  } else {
    authButton = (
      <>
        <Button
          sx={{ color: '#000' }}
          component='a'
          href="/login"
          LinkComponent={NextLink}
        >
          Sign in
        </Button>
        <Button
          sx={{ color: '#000' }}
          component='a'
          href="/signup"
          LinkComponent={NextLink}
        >
          Sign up
        </Button>
      </>
    )
  }

return (
  authButton
);
};

export default AuthBlock;