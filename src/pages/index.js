import Heading from '/src/components/Heading';
import {Container, Box, Paper, Grid, Card, CardContent, Typography, CardActions, Button} from "@mui/material";
import Slider from "@/components/Slider";
import GymsCard from "@/components/GymsCard";
import cards from '@/helper/gymsCard.json'
import TitleSection from "@/components/TitleSection";

const Home = () => (
  <Box>
    <Container>
      <Box>
        <Slider/>
      </Box>
    </Container>

    <Container>
      <Grid container >
        <Grid item xs={12} md={2} sx={{mx: 'auto'}}>
          <Heading text='Our gyms'/>
        </Grid>
      </Grid>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {
          cards.map(({id, image, title, text, link}) => {
            return(
          <Grid item key={id} xs={2} sm={4} md={4}>
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