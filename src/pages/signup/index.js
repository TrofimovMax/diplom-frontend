import React, {useContext, useState} from 'react';
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { signUpRequest } from "@/api/sign-up";
import SignupPage from "@/components/pages/signup/SignupPage";
import IsLoading from "@/components/molecules/isLoading";
import isEmail from "validator/lib/isEmail";
import NoticeContext from "@/api/NoticeContext";

const SignUp = () => {
  const {handleClick, setResponseMessage, setSeverity} = useContext(NoticeContext);
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
    return await signUpRequest(newUser);
  };

  const { isError, error, isLoading, mutateAsync} = useMutation(
    "signup",
    signUpHandler,
    {
      onSuccess: (data) => {
        router.push("/login");
      },
      onError(error) {
        if (error?.status === 422){
          setResponseMessage("Пароли не совпадают");
        }
        setSeverity("error");
        handleClick();
      }
    }
  );

 const  handleSubmit = (event) => {
   event.preventDefault();
   if(isEmail(email)){
     mutateAsync(newUser)
   } else {
     setResponseMessage("Пожалуйста, введите корректный адрес электронной почты");
     setSeverity("warning");
     handleClick();
   }
  }

  if (isLoading) return (<IsLoading/>);
  //if (isError) return (<IsError message={error.message}/>);

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