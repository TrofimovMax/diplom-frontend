import React from "react";
import {useRouter} from "next/router";
import IsLoading from "@/components/molecules/isLoading";
import IsError from "@/components/molecules/IsError";
import GymIdPage from "@/components/pages/gyms/GymIdPage";
import {useQuery as useApolloQuery} from "@apollo/client"
import {GET_GYM_BY_ID} from "@/pages/gyms/[id]/GetGymById";

const Gym = () => {
  const router = useRouter();
  const gymId = router.query.id;

  const { loading, error: apolloError, data: gymData } = useApolloQuery(GET_GYM_BY_ID, {
    variables: { gym_id: gymId }, // Pass the gymId as a variable
  });

  if (loading) return (<IsLoading/>)
  if (apolloError) return (<IsError />)

  return (
    <>
      {
        (() => {
          if (gymData) {
            return (
              <GymIdPage
                data={gymData?.getGymById}
                router={router}
                gymId={gymId}
              />
            )
          }
        })()
      }
    </>
  )
}
export default Gym;