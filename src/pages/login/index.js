import React, {useState, useEffect, useContext} from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { loginRequest } from "api/login";
import LoginPage from "components/pages/login/LoginPage";
import IsLoading from "components/molecules/isLoading";
import NoticeContext from "api/NoticeContext";
import IsError from "components/molecules/IsError";

const Login = () => {
  const router = useRouter();
  const [checked, setChecked] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {handleClick, setResponseMessage, setSeverity} = useContext(NoticeContext);
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
    return await loginRequest(userData)
  };

  const { isError, isLoading, mutateAsync} = useMutation(
    "login",
    loginHandler,
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data?.headers?.getAuthorization())
        router.reload();
      },
      onError(err) {
        setResponseMessage("Вы ввели неправильный логин или пароль");
        setSeverity("error");
        handleClick();
      }
    }
  );

  const signIn = () => {
    mutateAsync();
  };

  if (isLoading) return (<IsLoading/>);

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