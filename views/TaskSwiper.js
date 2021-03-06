import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

import TaskDayCard from "./TaskDayCard";
import { HStack } from "@chakra-ui/layout";

import { useSelector } from "react-redux";

export default function TaskSwiper() {
  const data = useSelector(
    (state) => state.userCourses.value.calendar.allCalendarDays
  );
  // console.log(data);

  return (
    <HStack w="100%" px="20">
      <Swiper
        style={{
          padding: "1.5rem 2.8rem 2.5rem 2.8rem",
          //   paddingLeft: "2.8rem",
          //   paddingRight: "2.8rem",
          width: "100vw",
        }}
        slidesPerView={3}
        spaceBetween={10}
        navigation={true}
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
            slidesPerView: 2,
            spaceBetween: 25,
          },
          1300: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1450: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Navigation]}
        className="mySwiper"
        height="100%"
      >
        {data.map((e, i) => {
          return (
            <SwiperSlide
              key={e}
              id={i}
              style={{
                height: "100%",
                lineHeight: "1.3",
                alignItems: "left",
                alignContent: "left",
              }}
            >
              <TaskDayCard taskDayId={e} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </HStack>
  );
}
