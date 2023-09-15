import React from "react";
import Carousel from "react-material-ui-carousel"
import CarouselItem from "@components/organisms/SliderBar/molecules/CarouselItem";
import Sliders from "@helper/slider.json"
import SliderType from "./Slider.type"

const Slider: React.FC = () => {
  const slider: Array<SliderType> = Sliders
  return (
    <Carousel>
      {
        slider.map( item => <CarouselItem key={item.id} item={item} /> )
      }
    </Carousel>
  );
};

export default Slider;