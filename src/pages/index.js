import Heading from '/src/components/Heading';
import {  Container ,Box } from "@mui/material";
import Slider from "@/components/Slider";

const Home = () => (
  <Container>
    <Box>
      <Heading text='Welcome Sport Palace' />
    </Box>
    <Box>
      <Slider />
    </Box>
  </Container>


);
export default Home;