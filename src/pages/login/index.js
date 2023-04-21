import {Typography} from "@mui/material";
import React, {useState, useEffect} from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { loginRequest } from "@/api/login";
import LoginPage from "@/components/pages/login/LoginPage";


const Login = () => {
  const router = useRouter();
  const [checked, setChecked] = useState();
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

  useEffect(() => {
    if (localStorage.getItem("token")){
      router.push("/");
    }
  }, [])

  const loginHandler = async () => {
    const response = await loginRequest(userData)
    localStorage.setItem("token", response.headers.getAuthorization())
    return response;
  };

  const { isError, error, isLoading, mutateAsync} = useMutation(
    "login",
    loginHandler,
    {
      onSuccess: (data) => {
        router.reload();
      },
      onError(err) {
        alert(err.message);
        router.reload();
      }
    }
  );

  const signIn = () => {
    mutateAsync(userData)
  };

  if (isLoading) return (<Typography variant='h1'>Loading...</Typography>);
  if (isError) return (<Typography variant='h1'>Error: {error}</Typography>);

  return (
    <LoginPage
    signIn = {signIn}
    email = {email}
    setEmail = {setEmail}
    password = {password}
    setPassword = {setPassword}
    checked = {checked}
    handleChange = {handleChange}
    />
  );
};

export default Login;