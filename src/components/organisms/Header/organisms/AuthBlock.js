"use client";

import React from 'react';
import {Button, Grid, Typography} from "@mui/material";
import NextLink from "next/link";
import {signOutRequest} from "@/api/sign-out";
import {useMutation} from "react-query";
import IsLoading from "@/components/molecules/isLoading";
import IsError from "@/components/molecules/IsError";


const AuthBlock = () => {
  const signOutHandler = async () => {
    const response = await signOutRequest()
    if (response?.data?.status === 200){
      localStorage.removeItem("token");
    }
    return response;
  };

  const { isError, error, isLoading, mutateAsync} = useMutation(
    "signOut",
    signOutHandler,
    {
      onSuccess: (data) => {

      },
      onError(err) {
        alert(err.message)

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
            sx={{ color: '#000' }}
            onClick={signOut}
          >
            Sign out
          </Button>
        </Grid>
        );
  } else {
    authButton = (
      <Grid item>
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
      </Grid>
    )
  }

  return (
    authButton
  );
};

export default AuthBlock;