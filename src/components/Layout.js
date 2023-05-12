import Header from "@/components/organisms/Header/Header";
import Footer from "@/components/organisms/Footer/Footer";
import React, {useState} from "react";
import NoticesService from "@/components/organisms/NoticesService";
import NoticeContext from "@/api/NoticeContext";

const Layout = ({children}) => {

  const [responseMessage, setResponseMessage] = useState("Something has gone wrong");
  const [severity, setSeverity] = useState("error");
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;
  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };
  const handleClose = () => {
    setState({ ...state, open: false });
    setSeverity("error");
    setResponseMessage("Что-то пошло не так");
  };

  return (
    <NoticeContext.Provider value={{
      setResponseMessage:setResponseMessage,
      setSeverity: setSeverity,
      handleClick: handleClick()
    }}>
      <NoticesService
        vertical={vertical}
        horizontal={horizontal}
        open={open}
        handleClose={handleClose}
        severity={severity}
        responseMessage={responseMessage}
      />
      <>
        <Header/>
        {children}
        <Footer/>
      </>
    </NoticeContext.Provider>
  );
}
export default Layout;