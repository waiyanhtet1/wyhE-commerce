import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./style.css";

// import required modules
import { Navigation } from "swiper";

export default function SlideSwiper() {
  return (
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
      <SwiperSlide>
        <div className="imageContainer">
          <img
            src="https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60"
            alt=""
          />
        </div>
        <div className="infoContainer">
          <h1>SUMMER SALE</h1>
          <p>DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.</p>
          <button>Show Now</button>
        </div>
      </SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
    </Swiper>
  );
}
