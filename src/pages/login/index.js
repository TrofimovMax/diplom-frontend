import {Button, Checkbox, Grid, Paper, FormControlLabel, TextField, Typography, Box} from "@mui/material";

import React, {useState} from "react";
import { useRouter } from "next/router";
import {useMutation, useQueryClient} from "react-query";
import TitleSection from "@/components/TitleSection";
import { loginRequest } from "@/api/login";
import useLocalStorage from "@/store/useLocalStorage";


const LoginPage = () => {
  const router = useRouter();
  const [checked, setChecked] = React.useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const userData = {
    user: {
      email: email,
      password: password,
    }
  }

  const [user, setUser] = useLocalStorage("user", "");

  const loginHandler = async () => {
    const response = await loginRequest(userData)
    if (response.status !== 201) {
      throw new Error(await response.json());
    }
    else {
      setUser(await response.json())
      return user;
    }
  };

  const { isError, error, isLoading, mutateAsync} = useMutation(
    "login",
    loginHandler,
    {
      onSuccess: (data) => {
        router.push("/");
      },
      onError(err, variables, onMutateValue) {
        alert(err)
      }
    }
  );

  const signIn = () => {
    mutateAsync(userData)
  };

  if (isLoading) return (<Typography variant='h1'>Loading...</Typography>);
  if (isError) return (<Typography variant='h1'>Error: {error}</Typography>);

  return (
      <Paper sx={{
        paddingTop:"5vh",
        paddingBottom:"25vh"
      }}>
        <Box sx={{
          marginBottom: 20
        }}>
          <TitleSection title="Login Form">

          </TitleSection>
        </Box>

        <Grid
          container
          spacing={3}
          direction={'column'}
          justify={'center'}
          alignItems={'center'}
        >
          <form id="authentication" onSubmit={signIn}>
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