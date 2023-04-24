import React, {useState} from "react";
import { useQuery } from 'react-query';
import { useRouter } from "next/router";
import GymIdPage from "@/components/pages/gyms/GymIdPage";
import NoticesService from "@/components/organisms/NoticesService";
import IsLoading from "@/components/molecules/isLoading";
import IsError from "@/components/molecules/IsError";
import {getByQueryKey} from "@/api/getByQueryKey";
import NoticeContext from "@/api/NoticeContext";
const Gym = () => {
  const router = useRouter();
  const gymId = router.query.id;

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
    setResponseMessage("Something has gone wrong");
  };

  const { isLoading,isError, data, error} = useQuery(["gyms", gymId ], getByQueryKey);

  if (isLoading) return (<IsLoading/>)
  if (isError) return (<IsError message={error}/>)

  return (
    <>
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
        <GymIdPage
          data={data.data}
          router={router}
          gymId={gymId}
        />
      </NoticeContext.Provider>
    </>
  )
}
export default Gym;