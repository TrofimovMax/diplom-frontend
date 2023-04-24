import React, { useState } from 'react';
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { Typography } from '@mui/material';
import { signUpRequest } from "@/api/sign-up";
import SignupPage from "@/components/pages/signup/SignupPage";
import IsLoading from "@/components/molecules/isLoading;
import IsError from "@/components/molecules/IsError";

const SignUp = () => {
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

  if (isLoading) return (<IsLoading/>);
  if (isError) return (<IsError message={error}/>);

  return (
    <SignupPage
      handleSubmit = {handleSubmit}
      firstName = {firstName}
      setFirstName = {setFirstName}
      lastName = {lastName}
      setLastName = {setLastName}
      email = {email}
      setEmail = {setEmail}
      nickname = {nickname}
      setNickname = {setNickname}
      password = {password}
      setPassword = {setPassword}
      passwordConfirm = {passwordConfirm}
      setPasswordConfirm = {setPasswordConfirm}
    />
  )
}

export default SignUp;