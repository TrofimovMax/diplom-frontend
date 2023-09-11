import React from 'react';
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import { EditGymPage } from "components/pages/gyms/EditGymPage";
import IsLoading from "components/molecules/isLoading";
import IsError from "components/molecules/IsError";
import {getByQueryKey} from "api/getByQueryKey";
import {useGetGymByIdQuery} from "../__generated__/GetGymById.query";

const Edit = () => {
  const router = useRouter();
  const gymId = router.query.id;
  const { loading, error: apolloError, data: gymData } = useGetGymByIdQuery({
    variables: { gym_id: gymId }
  })
  const { isLoading: isLoadingAdmin, data: adminData } = useQuery(["admin"], getByQueryKey);

  if (loading && isLoadingAdmin) return (<IsLoading/>)
  if (apolloError) return (<IsError/>)

  return (
    gymData && adminData?.data?.status === 'ok'?
      (<EditGymPage
        data = {gymData?.getGymById}
        router = {router}
        gymId = {gymId}
      />)
      : (<IsError />)
  );
};

export default Edit;