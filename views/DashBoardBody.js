import { useRef } from "react";
import {
  VStack,
  HStack,
  Heading,
  IconButton,
  Flex,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import CourseSwiper from "./CourseSwiper";
import TaskSwiper from "./TaskSwiper";
import { useDispatch } from "react-redux";
import { addCourse } from "../app/slices/userCourses";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function DashBoardBody() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const finalRef = useRef();
  const dispatch = useDispatch();

  const current = new Date();
  const date = `${current.getDate()} ${
    monthNames[current.getMonth()]
  } ${current.getFullYear()}`;

  return (
    <VStack w="100vw" paddingX={[5, 10, 10, 15]} alignItems="left">
      <Flex px={4} w="100%" justifyContent="center">
        <Flex align="center" justifyContent="center" gap={3}>
          <Image src="/icon_calender.png" maxH="60px" />
          <Heading color={"#bfbbbb"} fontSize="16px">
            {date}
          </Heading>
        </Flex>
      </Flex>
      <VStack
        paddingX={[5, 10, 12, 20]}
        p=""
        w="100vw"
        alignItems={"left"}
        justifyContent="flex-start"
      >
        <HStack w="100%">
          <Heading size="xl">Courses</Heading>
          <IconButton
            aria-label="add courses"
            icon={<AddIcon />}
            size="lg"
            color="white"
            bgColor="#0055d4"
            onClick={onOpen}
          />
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Enter Course Name</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Course Name</FormLabel>
                  <Input ref={initialRef} placeholder="Course Name" />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    dispatch(addCourse(initialRef.current));
                    onClose();
                  }}
                >
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </HStack>
        {/* Course swiper component*/}
        <CourseSwiper />
      </VStack>
      <VStack
        alignItems={"left"}
        justifyContent="flex-start"
        minHeight={"600px"}
      >
        <Heading
          paddingX={[5, 10, 12, 20]}
          paddingY="5"
          size="xl"
          justifySelf={"center"}
          alignSelf="center"
        >
          Calendar
        </Heading>
        <TaskSwiper />
      </VStack>
    </VStack>
  );
}
