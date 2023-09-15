import {useEffect} from "react";
import {useRouter} from "next/router";
import Heading from "@components/atoms/Heading";
import {Box} from "@mui/material";

const Error = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, [router]);

  return (
    <Box>
      <div>
        <Heading text="404"/>
        <Heading tag="h2" text="Something is going wrong..."/>
      </div>
    </Box>
  )
};
export default Error;