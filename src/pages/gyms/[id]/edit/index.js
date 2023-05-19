import React from 'react';
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import { EditGymPage } from "@/components/pages/gyms/EditGymPage";
import IsLoading from "@/components/molecules/isLoading";
import IsError from "@/components/molecules/IsError";
import {getByQueryKey} from "@/api/getByQueryKey";

const Edit = () => {
  const router = useRouter();
  const gymId = router.query.id;
  const { isLoading, isError, data, error} = useQuery(["gyms", gymId ], getByQueryKey);

  if (isLoading) return (<IsLoading/>)
  if (isError) return (<IsError message={error.message}/>)

  return (
    data?.data !== undefined?
      (<EditGymPage
        data = {data?.data}
        router = {router}
        gymId = {gymId}
      />)
      : (<IsError />)
  );
};

export default Edit;