import React from 'react';
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import EditGymPage from "@/components/pages/gyms/EditGymPage";
import IsLoading from "@/components/molecules/isLoading";
import IsError from "@/components/molecules/IsError";
import {getByQueryKey} from "@/api/getByQueryKey";

const getGymById = async (id, url) => {
  if (id) {
    const res = await fetch(url);
    return res.json();
  }
}
const Edit = () => {
  const router = useRouter();
  const gymId = router.query.id;
  const url = `http://localhost:3000/gyms/${gymId}`;
  const { isLoading, isError, data, error} = useQuery(["gyms", gymId ], getByQueryKey);

  if (isLoading) return (<IsLoading/>)
  if (isError) return (<IsError message={error}/>)

  return (
    <EditGymPage
    data = {data.data}
    url = {url}
    router = {router}
    gymId = {gymId}
    />
  );
};

export default Edit;