import React from 'react';
import Carousel from 'react-material-ui-carousel'
import CarouselItem from "@components/organisms/SliderBar/molecules/CarouselItem";
import slider from '/src/helper/slider.json'
const Slider = () => {

  return (
    <Carousel>
      {
        slider.map( item => <CarouselItem key={item.id} item={item} /> )
      }
    </Carousel>
  );
};

export default Slider;