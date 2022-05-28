import {
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

export default function DashBoardHeader() {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  return (
    <Flex maxW="100vw" w="100%" p={"0.9rem"} justifyContent="space-between">
      <Image src="/logo.png" maxH="70px" />
      <HStack
        w="100%"
        pl="15"
        spacing={[2, 5, 14, 24]}
        justifyContent={"right"}
        pr="16"
      >
        {/* <Flex align="center" justifyContent="center" gap={3}>
          <Image src="/icon_calender.png" maxH="60px" />
          <Heading color={"#bfbbbb"} fontSize="16px">
            {date}
          </Heading>
        </Flex> */}
        <Flex justifyContent={"space-between"} gap={4}>
          <Image src="/icon_notification.svg" maxH="80px" />
          <Heading size="sm">Aksara Pratama M</Heading>
          <Menu>
            <MenuButton>
              <Image src="/icon_profileArrow.svg" />
            </MenuButton>
            <MenuList>
              <MenuItem>My Profile</MenuItem>
              <MenuItem>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
}
