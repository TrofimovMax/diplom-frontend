import React, {useState} from "react";
import { useQuery } from 'react-query';
import { useRouter } from "next/router";
import GymIdPage from "@/components/pages/gyms/GymIdPage";
import NoticesService from "@/components/organisms/NoticesService";
import IsLoading from "@/components/molecules/isLoading";
import IsError from "@/components/molecules/IsError";
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

  if (isLoading) return (<IsLoading/>)
  if (isError) return (<IsError message={error}/>)

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