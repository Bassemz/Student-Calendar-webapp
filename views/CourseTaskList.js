import { useRef } from "react";
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

import { useSelector, useDispatch } from "react-redux";
import { addTasks, editCourseName } from "../app/slices/userCourses";
import DrawerCourseTaskItem from "./Drawer/DrawerCourseTaskItem";

function CourseTaskList({ courseId, courseName, courseProgressPercentage }) {
  const tasks = useSelector(
    (state) => state.userCourses.value.courses.byId[courseId].tasks
  );
  // console.log(tasks);
  const dispatch = useDispatch();
  const inputRef = useRef(0);

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
        courseId: courseId,
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
          onSubmit={() => {
            dispatch(
              editCourseName({
                courseId: courseId,
                courseName: inputRef.current.value,
              })
            );
          }}
        >
          <HStack>
            <EditablePreview />
            <Input ref={inputRef} as={EditableInput} />
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
          return <DrawerCourseTaskItem key={e} taskId={e} />;
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
    </VStack>
  );
}

export default CourseTaskList;
