import React from 'react';
import {Button, Grid} from "@mui/material";
import NextLink from "next/link";
import useLocalStorage from "@/store/useLocalStorage";
import {signOutRequest} from "@/api/sign-out";
import {useMutation} from "react-query";


const AuthBlock = () => {
  const [user, setUser] = useLocalStorage("user", "");
  const [token, setToken] = useLocalStorage("token", "");
  const signOutHandler = async () => {
    const response = await signOutRequest(token)
    if (response?.data?.status === 200){
      setUser("");
      setToken("");
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
        console.log(err.message)
      }
    }
  );

  const signOut = () => {
    mutateAsync()
  };

  let authButton;

  if (user !== '' && token !== '') {
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