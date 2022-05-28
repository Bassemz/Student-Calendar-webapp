import Head from "next/head";
import { Flex, HStack, Image, SimpleGrid, Heading } from "@chakra-ui/react";
import DashBoard from "../views/DashBoard";

export default function Home() {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  // const [isNotSmallerScreen] = useMediaQuery("(min-width:600px)");

  return (
    <div>
      <DashBoard />
    </div>
  );
}
