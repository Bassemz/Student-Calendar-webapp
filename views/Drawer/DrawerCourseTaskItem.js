import { useRef } from "react";
import {
  Box,
  Heading,
  HStack,
  ListItem,
  OrderedList,
  VStack,
} from "@chakra-ui/layout";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editTaskName,
  removeTask,
  addMilestone,
} from "../../app/slices/userCourses";
import DrawerCourseMilestoneItem from "./DrawerCourseMilestoneItem";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { uuid } from "uuidv4";

function DrawerCourseTaskItem({
  courseIndex,
  taskIndex,
  taskName,
  milestones,
}) {
  const { data } = useSelector((state) => state.userCourses.value);
  //   console.log(taskName);
  const dispatch = useDispatch();
  const taskNameInput = useRef(0);

  const handleAddMilestone = () => {
    dispatch(
      addMilestone({
        courseIndex: courseIndex,
        taskIndex: taskIndex,
      })
    );
  };

  return (
    <ListItem w="100%">
      <VStack w="100%" alignItems={"start"} justifyContent="start">
        <HStack p="3" w="100%">
          <Editable
            defaultValue={taskName}
            bgColor="#f4f4f4"
            boxShadow={"lg"}
            borderRadius="md"
            px="2"
            w="100%"
            onSubmit={() => {
              dispatch(
                editTaskName({
                  courseIndex: courseIndex,
                  taskIndex: taskIndex,
                  taskName: taskNameInput.current,
                })
              );
            }}
          >
            <EditablePreview w="100%" />
            <EditableInput ref={taskNameInput} w="100%" />
          </Editable>
          <IconButton
            aria-label="icon"
            icon={<DeleteIcon />}
            size="lg"
            color="red"
            alignSelf={"right"}
            justifySelf="end"
            onClick={() => {
              if (
                confirm(`Are you sure you want to delete Task: "${taskName}"`)
              ) {
                console.log(data);
                dispatch(
                  removeTask({
                    courseIndex: courseIndex,
                    taskIndex: taskIndex,
                    taskName: taskName,
                  })
                );
                // dispatch(removeCourse(courseName.toUpperCase()));
              }
            }}
          />
        </HStack>
        <Accordion allowToggle px="3" w="100%">
          <AccordionItem>
            <AccordionButton fontSize="lg">
              <Box flex={"1"} textAlign="left">
                <Heading size="md">Milestones</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <OrderedList fontSize={"lg"}>
                {milestones.map((e, i) => {
                  return (
                    <ListItem key={e.milestoneId}>
                      <DrawerCourseMilestoneItem
                        key={uuid()}
                        courseIndex={courseIndex}
                        taskIndex={taskIndex}
                        milestoneName={e.milestoneName}
                        milestoneIndex={e.milestoneIndex}
                        isCompleted={e.isCompleted}
                      />
                    </ListItem>
                  );
                })}
              </OrderedList>
              <IconButton
                aria-label="add Task"
                icon={<AddIcon />}
                size="lg"
                color="white"
                bgColor="#0055d4"
                onClick={handleAddMilestone}
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    </ListItem>
  );
}

export default DrawerCourseTaskItem;
