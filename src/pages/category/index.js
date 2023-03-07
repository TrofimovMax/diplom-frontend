import Heading from '/src/components/Heading';
import NextLink from "next/link";
import {useRouter} from "next/router";
import {Box, Button, Container, Typography, ImageList, ImageListItem} from '@mui/material';

import Benefits from "/src/api/benefits.json"
import Images from "/src/api/images.json"

const categories = [
  {id: 1, title: 'ForKids', path: '/category/for-kids'},
  {id: 2, title: 'Gyms', path: '/category/gyms'},
  {id: 3, title: 'SwimmingPool', path: '/category/swimming-pools'},
];
const Category = () => {
  const {pathname} = useRouter();
  return (
    <Container>
      <Box sx={{
        minHeight: '100%',
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Heading text='Category' tag={'h2'}/>
        <Box>
          {categories.map(({id, title, path}) => {
            return (
              <Button
                component='a'
                LinkComponent={NextLink}
                active={pathname === path ? "true" : null}
                key={id}
                href={path}
              >
                {title}
              </Button>
            )
          })}
        </Box>
        <ImageList sx={{width: 1200, height: 450}} cols={3} rowHeight={400}>
          {Images.Images.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=400&h=400&fit=crop&auto=format`}
                srcSet={`${item.img}?w=800&h=800&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Typography variant='h6' gutterBottom={true}>We all know that going to the gym is good for your health and we
          are all aware
          that we should be a bit more active. Joining a gym makes doing these things a lot easier but if you needed
          some more motivation
        </Typography>
        {
          Benefits.Benefits.map((block, index) => {
            return (
              <Box key={index}>
                <Typography variant='body1' gutterBottom sx={{fontWeight: 'bold'}}>
                  {block.caption}
                </Typography>
                <Typography variant='body2' gutterBottom>
                  {block.description}
                </Typography>
              </Box>
            );
          })
        }
      </Box>
    </Container>
  );
}
export default Category;