import React, { useState } from 'react';
import NextLink from "next/link";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { TextField, Button, Container, Stack, Link as MUILink, Typography} from '@mui/material';
import TitleSection from "@/components/molecules/TitleSection";
import { signUpRequest } from "@/api/sign-up";

const RegisterForm = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const newUser = {
    user:{
      first_name: firstName,
      last_name: lastName,
      email: email,
      nickname: nickname,
      password: password,
      password_confirmation: passwordConfirm,
      role: "user"
    }
  }

  const signUpHandler = async () => {
    const res = await signUpRequest(newUser);
    if (res.status !== 200) {
      throw new Error(await res.json());
    }
    else {
      return await res.json();
    }
  };

  const { isError, error, isLoading, mutateAsync} = useMutation(
    "signup",
    signUpHandler,
    {
      onSuccess: (data) => {
        router.push("/login");
      },
      onError(err, variables, onMutateValue) {
        alert(err)
      }
    }
  );

 const  handleSubmit = (event) => {
    event.preventDefault();
    mutateAsync(newUser)
  }

  if (isLoading) return (<Typography variant='h1'>Loading...</Typography>);
  if (isError) return (<Typography variant='h1'>Error: {error}</Typography>);

  return (
    <>
      <TitleSection title="Register Form">

      </TitleSection>
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
          sx={{
            ml: "45vw"
          }}>
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
    </>
  )
}

export default RegisterForm;