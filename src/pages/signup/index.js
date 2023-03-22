import React, {useState} from 'react';
import {TextField, Button, Container, Stack, Link as MUILink} from '@mui/material';
import Link from "next/link";
import NextLink from "next/link";
import TitleSection from "@/components/TitleSection";


const RegisterForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

 const  handleSubmit = (event) => {
    event.preventDefault();
    console.log(firstName, lastName, email, nickname, password, passwordConfirm)
  }

  return (
    <>
      <TitleSection title="Register Form">

      </TitleSection>
      <form onSubmit={handleSubmit}
            action={
              <NextLink
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
          label="confirm password"
          onChange={e => setPasswordConfirm(e.target.value)}
          value={passwordConfirm}
          required
          fullWidth
          sx={{mb: 4}}
        />
        <Button variant="outlined" color="secondary" type="submit">Register</Button>
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