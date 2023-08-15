import React from 'react';
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import { EditGymPage } from "@/components/pages/gyms/EditGymPage";
import IsLoading from "@/components/molecules/isLoading";
import IsError from "@/components/molecules/IsError";
import {getByQueryKey} from "@/api/getByQueryKey";
import {useQuery as useApolloQuery} from "@apollo/client/react/hooks/useQuery";
import {GET_GYM_BY_ID} from "@/pages/gyms/[id]/GetGymById";

const Edit = () => {
  const router = useRouter();
  const gymId = router.query.id;
  const { loading, error: apolloError, data: gymData } = useApolloQuery(GET_GYM_BY_ID, {
    variables: { gym_id: gymId }, // Pass the gymId as a variable
  });
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