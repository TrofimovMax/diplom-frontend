import {useEffect} from "react";
import {NextRouter, useRouter} from "next/router";
import Heading from "@components/atoms/Heading";
import {Container, Grid} from "@mui/material";

const Error: React.FC = () => {
  const router: NextRouter = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, [router]);

  return (
    <Container sx={{
      mt: "15vh",
      paddingBottom: "65vh"
    }}>
      <Grid container>
        <Grid item xs={12} sm={6} md={3} sx={{
          mx: "auto",
        }}>
          <Heading tag="h1" text="Oops"/>
          <Heading tag="h3" text="We can't seem to find the page you're looking for"/>
        </Grid>
      </Grid>
    </Container>
  )
};
export default Error;