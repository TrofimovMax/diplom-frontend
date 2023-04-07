import React from 'react';
import TitleSection from "@/components/molecules/TitleSection";
import NextLink from "next/link";
import {Button, Link as MUILink, Stack, TextField, Container} from "@mui/material";

const SignupPage = ({ handleSubmit,
                      nickname,
                      setNickname,
                      firstName,
                      setFirstName,
                      lastName,
                      setLastName,
                      email,
                      setEmail,
                      password,
                      setPassword,
                      passwordConfirm,
                      setPasswordConfirm }) => {
  return (
    <Container>
      <TitleSection title="Register Form"/>
      <form onSubmit={handleSubmit}
            action={
              <NextLink
                component = "a"
                href="/login">
              </NextLink>
            }
      >
        <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
          <TextField
            type="text"
            variant='outlined'
            color='secondary'
            label="First Name"
            onChange={e => setFirstName(e.target.value)}
            value={firstName}
            fullWidth
            required
          />
          <TextField
            type="text"
            variant='outlined'
            color='secondary'
            label="Last Name"
            onChange={e => setLastName(e.target.value)}
            value={lastName}
            fullWidth
            required
          />
        </Stack>
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
        <TextField
          type="text"
          variant='outlined'
          color='secondary'
          label="Nickname"
          onChange={e => setNickname(e.target.value)}
          value={nickname}
          fullWidth
          required
          sx={{mb: 4}}
        />
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
        <TextField
          type="password"
          variant='outlined'
          color='secondary'
          label="Confirm password"
          onChange={e => setPasswordConfirm(e.target.value)}
          value={passwordConfirm}
          required
          fullWidth
          sx={{mb: 4}}
        />
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          >
          Register
        </Button>
      </form>
      <small>
        Already have an account?
        <NextLink
          href="/login" passHref legacyBehavior>
          <MUILink ml={1}
                   sx={{
                     color: 'links',
                     '&:hover': {
                       color: '&:hover.links_hover'
                     },
                   }}
          >
            Login here
          </MUILink>
        </NextLink>
      </small>
    </Container>
  );
};

export default SignupPage;