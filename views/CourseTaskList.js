import { AddIcon, CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, Heading, HStack, OrderedList, VStack } from "@chakra-ui/layout";
import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  Input,
  Progress,
  useEditableControls,
} from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import { addTasks } from "../app/slices/userCourses";
import DrawerCourseTaskItem from "./Drawer/DrawerCourseTaskItem";

// const data = [
//   {
//     taskName: "SRS Report",
//     milestones: [
//       {
//         taskName: "Write Introduction",
//         isCompleted: false,
//       },
//       {
//         taskName: "Write Something Else",
//         isCompleted: false,
//       },
//     ],
//     percentageCompletion: 0,
//   },
//   {
//     taskName: "SDS Report",
//     milestones: [
//       {
//         taskName: "Design until you die",
//         isCompleted: false,
//       },
//     ],
//     percentageCompletion: 0,
//   },
// ];

function CourseTaskList({
  courseIndex,
  courseName,
  tasks,
  courseProgressPercentage,
}) {
  const dispatch = useDispatch();

  //Function component
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }
  //End of unction component

  const handleAddTask = () => {
    dispatch(
      addTasks({
        courseIndex: courseIndex,
      })
    );
  };

  return (
    <VStack px="10" alignItems={"left"} justifyContent="start" w="100%">
      <HStack w="100%">
        <Editable
          defaultValue={courseName}
          fontSize="4xl"
          fontWeight={"bold"}
          isPreviewFocusable={false}
          marginLeft="0"
        >
          <HStack>
            <EditablePreview />
            <Input as={EditableInput} />
            <EditableControls />
          </HStack>
        </Editable>
      </HStack>
      <HStack w="100%" justifyContent={"space-between"}>
        <Heading size="lg">Tasks</Heading>
        <HStack>
          <Heading size="md">{courseProgressPercentage.toString()}%</Heading>
          <Progress
            w="20vw"
            value={courseProgressPercentage}
            colorScheme="green"
            bgColor="red"
            borderRadius="16px"
          />
        </HStack>
      </HStack>
      <OrderedList fontSize={"3xl"} px="8" overflowY={"auto"}>
        {tasks.map((e, i) => {
          return (
            <DrawerCourseTaskItem
              key={e.taskName}
              courseIndex={courseIndex}
              taskIndex={e.taskIndex}
              taskName={e.taskName}
              milestones={e.milestones}
            />
          );
        })}
      </OrderedList>
      <IconButton
        aria-label="add Task"
        icon={<AddIcon />}
        size="lg"
        color="white"
        bgColor="#0055d4"
        onClick={handleAddTask}
      />
      {/* <DrawerCourseTaskItem /> */}
    </VStack>
  );
}

export default CourseTaskList;
