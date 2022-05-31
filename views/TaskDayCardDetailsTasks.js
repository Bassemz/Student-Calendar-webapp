import { useSelector } from "react-redux";
import { Heading, VStack, UnorderedList, ListItem } from "@chakra-ui/react";

function TaskDayCardDetailsTasks({ taskDayId, taskId, courseId }) {
  const milestones = useSelector(
    (state) =>
      state.userCourses.value.calendar.byId[taskDayId].byId[courseId][taskId]
  );
  console.log(milestones);
  const taskName = useSelector(
    (state) => state.userCourses.value.tasks.byId[taskId].taskName
  );

  const ListItemHeading = ({ milestoneId }) => {
    const name = useSelector(
      (state) =>
        state.userCourses.value.milestones.byId[milestoneId].milestoneName
    );
    const isCompleted = useSelector(
      (state) =>
        state.userCourses.value.milestones.byId[milestoneId].isCompleted
    );
    return (
      <Heading textDecoration={isCompleted ? "line-through" : null} size="xs">
        {name}
      </Heading>
    );
  };

  return (
    <VStack w="100%" justifyContent="start" alignItems="left">
      <Heading size="sm">{taskName}</Heading>
      <UnorderedList spacing="-0.5" px="10">
        {milestones &&
          milestones.map((e, i) => {
            return (
              <ListItem key={e}>
                <ListItemHeading milestoneId={e} />
              </ListItem>
            );
          })}
      </UnorderedList>
    </VStack>
  );
}

export default TaskDayCardDetailsTasks;
