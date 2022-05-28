import React from "react";
import { HStack, VStack, Image, Heading, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Progress } from "@chakra-ui/react";

export default function CourseCard({ courseName, courseProgressPercentage }) {
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
    >
      <Image
        height="100px"
        p="2"
        maxWidth="100px"
        src="/course_icon.jpeg"
        borderRadius="15px"
      />
      <VStack spacing={2} alignItems="left" width="100%">
        <Heading as="h1" size="md" display="inline">
          {courseName}
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
      />
    </HStack>
  );
}
