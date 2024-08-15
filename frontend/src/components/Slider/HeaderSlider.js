import React from 'react';
import "./HeaderSlider.scss";
import { sliderImgs } from "../../utils/images";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeaderSlider = () => {
  let settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true, // Add fade transition
    cssEase: 'linear'
  };

  return (
    <div className='slider'>
      <div className='container'>
        <div className='slider-content'>
          <Slider {...settings}>
            {sliderImgs.map((img, index) => (
              <div key={index} className='slider-item'>
                <img src={img} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default HeaderSlider