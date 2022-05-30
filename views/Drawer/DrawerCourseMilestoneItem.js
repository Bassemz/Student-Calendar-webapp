import { useRef, useState } from "react";
import { Heading, HStack } from "@chakra-ui/layout";
import {
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  editMilestone,
  markMilestone,
  removeMilestone,
  editMilestoneEndTime,
} from "../../app/slices/userCourses";
import { DeleteIcon } from "@chakra-ui/icons";
import DrawerTaskCalendar from "./DrawerTaskCalendar";
import {
  returnDateString,
  returnDateStringWithoutMonth,
} from "../../usefulFunctions";

function DrawerCourseMilestoneItem({ milestoneId }) {
  const { courseId, taskId, milestoneName, isCompleted, deadline } =
    useSelector(
      (state) => state.userCourses.value.milestones.byId[milestoneId]
    );

  const [value, onChange] = useState(new Date(deadline));
  const inputRef = useRef(0);
  const dispatch = useDispatch();

  const handleEditMilestone = () => {
    dispatch(
      editMilestone({
        milestoneId: milestoneId,
        milestoneName: inputRef.current.value,
      })
    );
  };

  const handleRemoveMilestone = () => {
    dispatch(
      removeMilestone({
        courseId: courseId,
        taskId: taskId,
        milestoneId: milestoneId,
        isCompleted,
      })
    );
  };

  const handleCheckboxCheck = (e) => {
    dispatch(
      markMilestone({
        courseId: courseId,
        taskId: taskId,
        milestoneId: milestoneId,
        milestoneStatus: e.target.checked,
      })
    );
  };

  const handleCalendarChange = (e) => {
    onChange(e);
    dispatch(
      editMilestoneEndTime({
        milestoneId: milestoneId,
        newEndDate: returnDateStringWithoutMonth(e),
      })
    );
  };

  return (
    <HStack w="100%" py="3">
      <Editable
        defaultValue={milestoneName}
        bgColor="#f4f4f4"
        boxShadow={"lg"}
        borderRadius="md"
        px="2"
        w="100%"
        onSubmit={handleEditMilestone}
      >
        <EditablePreview
          textDecoration={isCompleted ? "line-through" : null}
          w="100%"
        />
        <EditableInput ref={inputRef} w="100%" />
      </Editable>
      <Heading size="sm" w="40">
        End Time: {returnDateString(value)}
      </Heading>
      <DrawerTaskCalendar value={value} onChange={handleCalendarChange} />
      <Checkbox onChange={handleCheckboxCheck} defaultChecked={isCompleted} />
      <IconButton
        aria-label="icon"
        icon={<DeleteIcon />}
        size="md"
        color="red"
        alignSelf={"right"}
        justifySelf="end"
        onClick={handleRemoveMilestone}
      />
    </HStack>
  );
}

export default DrawerCourseMilestoneItem;
