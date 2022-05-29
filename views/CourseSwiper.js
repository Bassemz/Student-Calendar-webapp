import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector, useDispatch } from "react-redux";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination } from "swiper";

import CourseCard from "./CourseCard";
import { HStack } from "@chakra-ui/layout";

// const data = [
//   {
//     courseN: "CMSE322",
//     courseProgressPercentage: 70,
//     courseData: [
//       {
//         taskName: "SRS Report",
//         milestones: ["Write Introduction", "Write non-functional requirements"],
//       },
//       {
//         taskName: "SDS Report",
//         milestones: ["Design", "Design", "Design", "Die"],
//       },
//     ],
//   },
//   {
//     courseN: "CMSE318",
//     courseProgressPercentage: 60,
//     courseData: [
//       {
//         taskName: "SRS Report",
//         milestones: ["Write Introduction", "Write non-functional requirements"],
//       },
//       {
//         taskName: "SDS Report",
//         milestones: ["Design", "Design", "Design", "Die"],
//       },
//     ],
//   },
//   {
//     courseN: "CMSE346",
//     courseProgressPercentage: 90,
//     courseData: [
//       {
//         taskName: "SRS Report",
//         milestones: ["Write Introduction", "Write non-functional requirements"],
//       },
//       {
//         taskName: "SDS Report",
//         milestones: ["Design", "Design", "Design", "Die"],
//       },
//     ],
//   },
//   {
//     courseN: "CMSE354",
//     courseProgressPercentage: 50,
//     courseData: [
//       {
//         taskName: "SRS Report",
//         milestones: ["Write Introduction", "Write non-functional requirements"],
//       },
//       {
//         taskName: "SDS Report",
//         milestones: ["Design", "Design", "Design", "Die"],
//       },
//     ],
//   },
//   {
//     courseN: "CMSE326",
//     courseProgressPercentage: 40,
//     courseData: [
//       {
//         taskName: "SRS Report",
//         milestones: ["Write Introduction", "Write non-functional requirements"],
//       },
//       {
//         taskName: "SDS Report",
//         milestones: ["Design", "Design", "Design", "Die"],
//       },
//     ],
//   },
// ];

export default function CourseSwiper() {
  const { data } = useSelector((state) => state.userCourses.value);

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
          let courseProgressPercentage =
            e.totalNumberOfMilestones === 0
              ? 0
              : Math.floor(
                  (e.totalNumberOfCompletedMilestones /
                    e.totalNumberOfMilestones) *
                    100
                );

          return (
            <SwiperSlide key={i} id={i}>
              <CourseCard
                courseIndex={e.courseIndex}
                courseName={e.courseName}
                courseProgressPercentage={courseProgressPercentage}
                data={e.tasks}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </HStack>
  );
}
