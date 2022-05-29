import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  HStack,
  ListIcon,
  ListItem,
  OrderedList,
  VStack,
} from "@chakra-ui/layout";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  Input,
  Progress,
  useEditableControls,
} from "@chakra-ui/react";

const data = [
  {
    taskName: "SRS Report",
    milestones: [
      {
        taskName: "Write Introduction",
        isCompleted: false,
      },
      {
        taskName: "Write Something Else",
        isCompleted: false,
      },
    ],
    percentageCompletion: 0,
  },
  {
    taskName: "SDS Report",
    milestones: [
      {
        taskName: "Design until you die",
        isCompleted: false,
      },
    ],
    percentageCompletion: 0,
  },
];

function CourseTaskList({ courseName, tasks, courseProgressPercentage }) {
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
      <OrderedList fontSize={"3xl"} px="8">
        <ListItem>
          <VStack w="100%" alignItems={"start"} justifyContent="start">
            <HStack p="3">
              <Editable
                defaultValue="Some Value"
                bgColor="#f4f4f4"
                boxShadow={"dark-lg"}
                borderRadius="md"
                px="2"
              >
                <EditablePreview w="100%" />
                <EditableInput w="100%" />
              </Editable>
            </HStack>
            <Accordion allowToggle>
              <AccordionItem>
                <AccordionButton></AccordionButton>
              </AccordionItem>
            </Accordion>
          </VStack>
        </ListItem>
        {/* <ListItem>Consectetur adipiscing elit</ListItem>
        <ListItem>Integer molestie lorem at massa</ListItem>
        <ListItem>Facilisis in pretium nisl aliquet</ListItem> */}
      </OrderedList>
    </VStack>
  );
}

export default CourseTaskList;
