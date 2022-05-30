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
import { useDispatch } from "react-redux";
import { editTaskName, addMilestone } from "../../app/slices/userCourses";
import DrawerCourseMilestoneItem from "./DrawerCourseMilestoneItem";
import { AddIcon } from "@chakra-ui/icons";
import { uuid } from "uuidv4";

import DrawerTaskHeader from "./DrawerTaskHeader";

function DrawerCourseTaskItem({
  courseIndex,
  taskIndex,
  taskName,
  taskStartTime,
  milestones,
}) {
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
          <DrawerTaskHeader
            courseIndex={courseIndex}
            taskIndex={taskIndex}
            taskStartTime={taskStartTime}
            taskName={taskName}
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
                        key={e.milestoneId}
                        courseIndex={courseIndex}
                        taskIndex={taskIndex}
                        milestoneName={e.milestoneName}
                        milestoneIndex={i}
                        deadline={e.deadline}
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
