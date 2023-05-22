"use client";

import React, {useContext} from 'react';
import {Button, Grid, Typography} from "@mui/material";
import NextLink from "next/link";
import {signOutRequest} from "@/api/sign-out";
import {useMutation} from "react-query";
import IsLoading from "@/components/molecules/isLoading";
import IsError from "@/components/molecules/IsError";
import NoticeContext from "@/api/NoticeContext";

const buttonStyle = { color: '#000', fontSize: {xs: 10, md: 14}}

const AuthBlock = () => {
  const { handleClick } = useContext(NoticeContext);
  const signOutHandler = async () => {
    return await signOutRequest()
  };

  const { isError, error, isLoading, mutateAsync} = useMutation(
    "signOut",
    signOutHandler,
    {
      onSuccess: (data) => {
        if (data?.status === 200){
          localStorage.removeItem("token");
        }
      },
      onError(err) {
        localStorage.removeItem("token");
        handleClick();
      }
    }
  );

  if (isLoading) return (<IsLoading/>);
  if (isError) return (<IsError message={error}/>);
  const signOut = () => {
    mutateAsync()
  };

  let authButton;

  if (localStorage.getItem("token")) {
    authButton =
      (
        <Grid>
          <Button
            sx={buttonStyle}
            onClick={signOut}
          >
            ВЫЙТИ
          </Button>
        </Grid>
        );
  } else {
    authButton = (
      <Grid item>
        <Button
          sx={buttonStyle}
          component='a'
          href="/login"
          LinkComponent={NextLink}
        >
          ВОЙТИ
        </Button>
        <Button
          sx={buttonStyle}
          component='a'
          href="/signup"
          LinkComponent={NextLink}
        >
          ЗАРЕГИСТРИРОВАТЬСЯ
        </Button>
      </Grid>
    )
  }

  return (
    authButton
  );
};

export default AuthBlock;