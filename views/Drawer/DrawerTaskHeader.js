import { useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Heading, HStack } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import React from "react";
import DrawerTaskCalendar from "./DrawerTaskCalendar";
import { removeTask, editTaskStartTime } from "../../app/slices/userCourses";
import { useDispatch } from "react-redux";
import {
  returnDateString,
  returnDateStringWithoutMonth,
} from "../../usefulFunctions";

function DrawerTaskHeader({ courseIndex, taskIndex, taskStartTime, taskName }) {
  const [value, onChange] = useState(new Date(taskStartTime));
  const dispatch = useDispatch();

  const handleCalendarChange = (e) => {
    onChange(e);
    dispatch(
      editTaskStartTime({
        courseIndex: courseIndex,
        taskIndex: taskIndex,
        newStartDate: returnDateStringWithoutMonth(e),
      })
    );
  };

  return (
    <HStack alignContent={"right"} justifyContent="end">
      <Heading size="md" w="32">
        Start Time: {returnDateString(value)}
      </Heading>
      <DrawerTaskCalendar value={value} onChange={handleCalendarChange} />
      <IconButton
        aria-label="icon"
        icon={<DeleteIcon />}
        size="lg"
        color="red"
        onClick={() => {
          if (confirm(`Are you sure you want to delete Task: "${taskName}"`)) {
            dispatch(
              removeTask({
                courseIndex: courseIndex,
                taskIndex: taskIndex,
                taskName: taskName,
              })
            );
          }
        }}
      />
    </HStack>
  );
}

export default DrawerTaskHeader;
