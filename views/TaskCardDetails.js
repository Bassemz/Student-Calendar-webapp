import { Heading, VStack, UnorderedList, ListItem } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import TaskDayCardDetailsTasks from "./TaskDayCardDetailsTasks";

export default function TaskCardDetail({ taskDayId, courseId }) {
  const tasks = useSelector(
    (state) =>
      state.userCourses.value.calendar.byId[taskDayId].byId[courseId].allTaskIds
  );
  const name = useSelector(
    (state) => state.userCourses.value.courses.byId[courseId].courseName
  );

  return (
    <VStack
      spacing="1.5"
      alignItems={"left"}
      alignContent="start"
      justifyContent={"start"}
      justifyItems="start"
      textAlign={"left"}
      h="100%"
    >
      <Heading size="md" color={"#2a4ea2"}>
        {name}
      </Heading>
      <VStack spacing="1" alignItems="left" px={[2, 3, 4, 5]}>
        {tasks.map((e, i) => {
          return (
            <TaskDayCardDetailsTasks
              key={e}
              taskDayId={taskDayId}
              taskId={e}
              courseId={courseId}
            />
          );
        })}
      </VStack>
    </VStack>
  );
}
