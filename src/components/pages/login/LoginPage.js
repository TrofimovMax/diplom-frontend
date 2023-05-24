import React from 'react';
import {Box, Button, Checkbox, FormControlLabel, Grid, Container, TextField} from "@mui/material";
import TitleSection from "@/components/molecules/TitleSection";

const LoginPage = ({ signIn, email, setEmail, password, setPassword}) => {
  return (
    <Container sx={{
      minHeight: '80vh'
    }}
      >
      <Grid sx={{
        marginBottom: 20
      }}>
        <TitleSection title="Авторизация"/>
      </Grid>

      <Grid
        container
        spacing={3}
        direction='column'
        justify='center'
        alignItems='center'
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
              label="Пароль"
              onChange={e => setPassword(e.target.value)}
              value={password}
              required
              fullWidth
              sx={{mb: 4}}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth> ВОЙТИ </Button>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
};

export default LoginPage;