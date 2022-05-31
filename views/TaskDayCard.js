import { VStack, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import CourseCardDetail from "./TaskCardDetails";
import { returnBeautifulDateStrings } from "../usefulFunctions";

// const data = [
//   {
//     name: "CMSE322",
//     tasks: [
//       {
//         name: "SRS report",
//         milestones: ["Write Introduction", "Write REQs"],
//       },
//       {
//         name: "SDS report",
//         milestones: ["Design", "Design", "Design", "Die"],
//       },
//     ],
//   },
//   {
//     name: "CMSE326",
//     tasks: [
//       {
//         name: "Assignment 1",
//         milestones: ["Write test case1"],
//       },
//       {
//         name: "Assignment 2",
//         milestones: ["Test Website1"],
//         milestones: ["Test Website2"],
//         milestones: ["Assess quality"],
//         milestones: ["Compare"],
//         milestones: ["Write result"],
//       },
//     ],
//   },
// ];

export default function TaskDayCard({ taskDayId }) {
  const data = useSelector(
    (state) => state.userCourses.value.calendar.byId[taskDayId].allCourseIds
  );

  return (
    <VStack
      padding="4"
      spacing="3"
      boxShadow={"dark-lg"}
      rounded="md"
      bg="white"
      alignItems={"left"}
      alignContent="left"
      justifyContent="start"
      justifyItems={"start"}
      minH="450px"
      minW="290px"
      maxH={"450px"}
      animation={"ease"}
      className="task-swiper-slide"
    >
      <Heading size="lg">
        {returnBeautifulDateStrings(new Date(taskDayId))}
      </Heading>
      <VStack
        w="100%"
        justifyContent={"left"}
        justifyItems="left"
        alignContent="start"
        alignItems="start"
        overflowY="auto"
      >
        {data.map((e, i) => {
          return (
            <CourseCardDetail key={e} taskDayId={taskDayId} courseId={e} />
          );
        })}
      </VStack>
    </VStack>
  );
}
