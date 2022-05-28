import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination } from "swiper";

import CourseCard from "./CourseCard";
import { HStack } from "@chakra-ui/layout";

const data = [
  {
    courseN: "CMSE322",
    courseProgressPercentage: 70,
  },
  {
    courseN: "CMSE318",
    courseProgressPercentage: 60,
  },
  {
    courseN: "CMSE346",
    courseProgressPercentage: 90,
  },
  {
    courseN: "CMSE354",
    courseProgressPercentage: 50,
  },
  {
    courseN: "CMSE326",
    courseProgressPercentage: 40,
  },
];

export default function CourseSwiper() {
  const swiperSlide = useSwiperSlide();

  return (
    <HStack w="100%">
      <Swiper
        style={{
          paddingLeft: "2.8rem",
          paddingRight: "2.8rem",
          width: "100vw",
        }}
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          950: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          1300: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1450: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper"
        height="100%"
      >
        {data.map((e, i) => {
          return (
            <SwiperSlide key={i} id={i}>
              <CourseCard
                courseName={e.courseN}
                courseProgressPercentage={e.courseProgressPercentage}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </HStack>
  );
}
