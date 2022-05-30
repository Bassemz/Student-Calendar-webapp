import React, { useRef } from "react";
import {
  HStack,
  VStack,
  Image,
  Heading,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Progress } from "@chakra-ui/react";
import CourseTaskList from "./CourseTaskList";
import { useSelector, useDispatch } from "react-redux";
import { removeCourse } from "../app/slices/userCourses";

export default function CourseCard({
  courseId,
  //   courseIndex,
  //   courseName,
  //   courseProgressPercentage,
  //   data,
}) {
  //   console.log(useSelector((state) => state.value));
  const course = useSelector(
    (state) => state.userCourses.value.courses.byId[courseId]
  );
  let courseProgressPercentage =
    course.totalNumberOfMilestones === 0
      ? 0
      : Math.floor(
          (course.totalNumberOfCompletedMilestones /
            course.totalNumberOfMilestones) *
            100
        );
  const { isOpen, onOpen, onClose } = useDisclosure();
  let didClickOnIcon = false;
  const dispatch = useDispatch();

  return (
    <HStack
      spacing={2}
      isInline
      maxW="96"
      width="100%"
      p="2"
      bgColor="#e8e8e8"
      borderRadius="15px"
      minWidth="100%"
      className="course-card-swiper-slider"
      onClick={() => {
        if (!didClickOnIcon) {
          onOpen();
        }
        didClickOnIcon = false;
      }}
    >
      <Image
        height="100px"
        p="2"
        maxWidth="100px"
        src="/course_icon.jpeg"
        borderRadius="15px"
      />
      <Drawer onClose={onClose} isOpen={isOpen} size={"xl"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Stack w="100%" px="5" py="2">
              <Heading>Course Management</Heading>
            </Stack>
          </DrawerHeader>
          <DrawerBody>
            <CourseTaskList
              courseId={courseId}
              //   tasks={data}
              courseProgressPercentage={courseProgressPercentage}
              courseName={course.courseName}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <VStack spacing={2} alignItems="left" width="100%">
        <Heading as="h1" size="md" display="inline">
          {course.courseName}
        </Heading>
        <VStack spacing={1} p={1} alignItems="left">
          <Heading size="xs">{courseProgressPercentage.toString()}%</Heading>
          <Progress
            value={courseProgressPercentage}
            colorScheme="green"
            bgColor="red"
            borderRadius="16px"
          />
        </VStack>
      </VStack>
      <IconButton
        aria-label="icon"
        icon={<DeleteIcon />}
        size="lg"
        color="red"
        onClick={() => {
          didClickOnIcon = true;
          if (
            confirm(
              `Are you sure you want to delete course ${course.courseName}`
            )
          )
            dispatch(
              removeCourse({
                courseId: courseId,
              })
            );
        }}
      />
    </HStack>
  );
}
