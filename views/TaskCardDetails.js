import { Heading, VStack, UnorderedList, ListItem } from "@chakra-ui/react";

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
    </VStack>
  );
}
