import {Button, Checkbox, Grid, Paper, FormControlLabel, TextField, Typography} from "@mui/material";

import React, {useState} from "react";
import { useCookies } from "react-cookie";
import { useMutation } from "react-query";
import { useRouter } from 'next/router';

import { actionTypes, useStateValue } from "@/store";
import { login } from "../../networkCalls/index";



const LoginPage = () => {
  const [checked, setChecked] = React.useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function FormHandler (e){
    e.preventDefault();
    fetch("http://localhost:3000/login.json", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password,
      })
    }).then(res =>{
      if(res.ok) return res.json()
      throw Error();
    }, console.log)
      .then(console.log)
  }

  const router = useRouter()
  const url = `http://localhost:3000/login.json`;
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const [, setCookie] = useCookies(["jwt"]);
  const [{ token }, dispatch] = useStateValue();
  console.log(token);
  const { isError, error, isLoading, mutateAsync } = useMutation(
    "login",
    login,
    {
      onSuccess: (data) => {
        dispatch({ type: actionTypes.SET_TOKEN, value: data.token });
        setCookie("jwt", data.token);
        router.push("/");
      },
      onError(err, variables, onMutateValue) {
        alert(err)
      }
    }
  );

  const signIn = () => {
    mutateAsync({
      email: {email},
      password: {password}
    })
  };

  if (isLoading) return (<Typography variant='h1'>Loading...</Typography>);
  if (isError) return (<Typography variant='h1'>Error: {error}</Typography>);

  return (
      <Paper sx={{
        paddingTop:"25vh",
        paddingBottom:"25vh"
      }}>
        <Grid
          container
          spacing={3}
          direction={'column'}
          justify={'center'}
          alignItems={'center'}
        >
          <form id="authentication" onSubmit={FormHandler}>
          <Grid item xs={12}>
            <TextField
              type="email"
              variant='outlined'
              color='secondary'
              label="Email"
              onChange={e => setEmail(e.target.value)}
              value={email}
              fullWidth
              required
              sx={{mb: 4}}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              variant='outlined'
              color='secondary'
              label="Password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              required
              fullWidth
              sx={{mb: 4}}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  label={'Keep me logged in'}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              }
              label="Keep me logged in"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth> Login </Button>
          </Grid>
          </form>
        </Grid>
      </Paper>
  );
};

export default LoginPage;