"use client";

import React, {useContext} from 'react';
import {Button, Grid} from "@mui/material";
import NextLink from "next/link";
import {useMutation} from "react-query";
import IsLoading from "@/components/molecules/isLoading";
import IsError from "@/components/molecules/IsError";
import NoticeContext from "@/api/NoticeContext";
import axiosClient from "@/api/axiosClient";

const buttonStyle = { color: '#000', fontSize: {xs: 10, md: 14}}

const AuthBlock = () => {
  const { handleClick } = useContext(NoticeContext);

  const { isError, error, isLoading, mutateAsync} = useMutation(
    "signOut",
    () => {
        axiosClient.delete(`/logout`);
    },
    {
      onSuccess: (data) => {
          localStorage.removeItem("token");
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