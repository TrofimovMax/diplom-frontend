import Heading from '/src/components/atoms/Heading';
import {Container, Box, Grid} from "@mui/material";
import Slider from "@/components/organisms/SliderBar/Slider";
import GymsCard from "@/components/organisms/GymsCard";
import cards from '@/helper/gymsCard.json'

const Home = () => (
  <Box>
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} >
        <Slider/>
      </Grid>
    </Grid>

    <Container>
      <Grid container >
        <Grid item xs={12} md={3} sx={{mx: 'auto'}}>
          <Heading text='Наши клубы'/>
        </Grid>
      </Grid>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 6, md: 12 }}>
        {
          cards.map(({id, image, title, text, link}) => {
            return(
          <Grid item key={id} xs={12} sm={8} md={4}>
          <GymsCard
          image = {image}
          title = {title}
          text = {text}
          link = {link}
          />
          </Grid>
          );
        })
        }

      </Grid>
    </Container>
  </Box>
);
export default Home;