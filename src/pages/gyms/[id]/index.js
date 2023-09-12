import React from "react";
import {useRouter} from "next/router";
import IsLoading from "@components/molecules/isLoading";
import IsError from "@components/molecules/IsError";
import GymIdPage from "@components/pages/gyms/GymIdPage";
import {useGetGymByIdQuery} from "./__generated__/GetGymById.query";

const Gym = () => {
  const router = useRouter();
  const gymId = router.query.id;

  const { loading, error: apolloError, data: gymData } = useGetGymByIdQuery({
    variables: { gym_id: gymId }
  })

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