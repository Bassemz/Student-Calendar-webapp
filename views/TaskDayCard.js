import { VStack, Heading } from "@chakra-ui/react";
import CourseCardDetail from "./TaskCardDetails";

const data = [
  {
    name: "CMSE322",
    tasks: [
      {
        name: "SRS report",
        milestones: ["Write Introduction", "Write REQs"],
      },
      {
        name: "SDS report",
        milestones: ["Design", "Design", "Design", "Die"],
      },
    ],
  },
  {
    name: "CMSE326",
    tasks: [
      {
        name: "Assignment 1",
        milestones: ["Write test case1"],
      },
      {
        name: "Assignment 2",
        milestones: ["Test Website1"],
        milestones: ["Test Website2"],
        milestones: ["Assess quality"],
        milestones: ["Compare"],
        milestones: ["Write result"],
      },
    ],
  },
];

export default function TaskDayCard() {
  return (
    <VStack
      padding="4"
      spacing="3"
      boxShadow={"dark-lg"}
      rounded="md"
      bg="white"
      alignItems={"left"}
      justifyContent="flex-start"
      maxH={"450px"}
      animation={"ease"}
      className="task-swiper-slide"
    >
      <Heading size="lg">Tue, 24 May</Heading>
      <VStack w="100%" overflowY="auto">
        {data.map((e, i) => {
          return <CourseCardDetail key={i} name={e.name} tasks={e.tasks} />;
        })}
      </VStack>
    </VStack>
  );
}
