import React, {useState} from "react";
import { Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { useRouter } from "next/router";
import GymIdPage from "@/components/pages/gyms/GymIdPage";
import NoticesService from "@/components/organisms/NoticesService";
const getGymById = async (id) => {
  if (id) {
    const res = await fetch(`http://localhost:3000/gyms/${id}`);
    return res.json();
  }
}
const Gym = () => {
  const router = useRouter();
  const gymId = router.query.id;

  const [responseMessage, setResponseMessage] = useState("");
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
  };

  const { isLoading,isError, data, error} = useQuery(
    ["gyms", gymId],
    () => getGymById(gymId),
  );

  if (isLoading) return (<Typography variant='h1'>Loading...</Typography>)
  if (isError) return (<Typography variant='h1'>Error: {error}</Typography>)
  // data?.schedule?.configuration?.raw?.hours path to obj {day:{time: time}, ...}
  //JSON.stringify(data?.schedule?.configuration?.raw?.hours, null, '  ')
  return (
    <>
      <NoticesService
        vertical={vertical}
        horizontal={horizontal}
        open={open}
        handleClose={handleClose}
        severity={severity}
        responseMessage={responseMessage}
      />
      <GymIdPage
        data={data}
        router={router}
        gymId={gymId}
        setResponseMessage = {setResponseMessage}
        setSeverity = {setSeverity}
        handleClick = {handleClick}
      />
    </>
  )
}
export default Gym;