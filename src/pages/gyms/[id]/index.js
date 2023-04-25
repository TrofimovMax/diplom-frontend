import React from "react";
import { useQuery } from 'react-query';
import { useRouter } from "next/router";
import Index from "@/components/pages/gyms/GymIdPage";
import IsLoading from "@/components/molecules/isLoading";
import IsError from "@/components/molecules/IsError";
import {getByQueryKey} from "@/api/getByQueryKey";
const Gym = () => {
  const router = useRouter();
  const gymId = router.query.id;

  const { isLoading,isError, data, error} = useQuery(["gyms", gymId ], getByQueryKey);

  if (isLoading) return (<IsLoading/>)
  if (isError) return (<IsError message={error}/>)

  return (
    <>
      <Index
        data={data.data}
        router={router}
        gymId={gymId}
      />
    </>
  )
}
export default Gym;