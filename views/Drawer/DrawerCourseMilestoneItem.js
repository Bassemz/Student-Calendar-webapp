import { useRef } from "react";
import { HStack } from "@chakra-ui/layout";
import {
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  editMilestone,
  markMilestone,
  removeMilestone,
} from "../../app/slices/userCourses";
import { DeleteIcon } from "@chakra-ui/icons";

function DrawerCourseMilestoneItem({
  courseIndex,
  taskIndex,
  milestoneName,
  milestoneIndex,
  isCompleted,
}) {
  const inputRef = useRef(0);
  //   const checkboxRef = useRef(0);
  const dispatch = useDispatch();

  const handleEditMilestone = () => {
    dispatch(
      editMilestone({
        courseIndex: courseIndex,
        taskIndex: taskIndex,
        milestoneIndex: milestoneIndex,
        milestoneName: inputRef.current.value,
      })
    );
  };

  const handleRemoveMilestone = () => {
    dispatch(
      removeMilestone({
        courseIndex: courseIndex,
        taskIndex: taskIndex,
        milestoneIndex: milestoneIndex,
        isCompleted,
      })
    );
  };

  const handleCheckboxCheck = (e) => {
    dispatch(
      markMilestone({
        courseIndex: courseIndex,
        taskIndex: taskIndex,
        milestoneIndex: milestoneIndex,
        milestoneStatus: e.target.checked,
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
