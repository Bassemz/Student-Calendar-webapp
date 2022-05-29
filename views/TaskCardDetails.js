import {
  Heading,
  VStack,
  UnorderedList,
  ListItem,
  Flex,
} from "@chakra-ui/react";

// const data =[
//     {
//         name: "CMSE322",
//         tasks:[
//             {
//                 name: "SRS report",
//                 milestones:[
//                     "Write Introduction",
//                     "Write REQs"
//                 ]

//             }
//         ]
//     },
//     {
//         name: "CMSE326",
//         tasks:[
//             {
//                 name: "Assignment 1",
//                 milestones:[
//                     "Write test case1",
//                 ]

//             }
//         ]

//     }
// ]

export default function TaskCardDetail({ name, tasks }) {
  return (
    <VStack
      spacing="1.5"
      alignItems={"left"}
      alignContent="start"
      justifyContent={"start"}
      justifyItems="start"
      textAlign={"left"}
    >
      <Heading size="md" color={"#2a4ea2"}>
        {name}
      </Heading>
      <VStack spacing="1" alignItems="left" px={[2, 3, 4, 5]}>
        {tasks.map((e, i) => {
          return (
            <VStack
              key={i}
              id={i}
              w="100%"
              justifyContent="start"
              alignItems="left"
            >
              <Heading size="sm">{e.name}</Heading>
              <UnorderedList spacing="-0.5" px="10">
                {e.milestones.map((e, i) => {
                  return (
                    <ListItem key={i}>
                      <Heading size="xs">{e}</Heading>
                    </ListItem>
                  );
                })}
              </UnorderedList>
            </VStack>
          );
        })}
      </VStack>
      {/* <Heading size="md">CMSE322</Heading>
        <VStack spacing="1" alignItems={"left"} px={[2, 3, 4, 5]}>
          <Heading size="sm">SRS report</Heading>
          <UnorderedList spacing="-0.5">
            <ListItem size="xs">Write Introduction</ListItem>
            <ListItem size="xs">Write REQs</ListItem>
          </UnorderedList>
          <Heading size="sm">SDS report</Heading>
          <UnorderedList spacing="0.5">
            <ListItem>Draw DFD</ListItem>
          </UnorderedList>
          </VStack> */}
    </VStack>
  );
}
