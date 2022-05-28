import { HStack, Link, Stack, VStack } from "@chakra-ui/layout";
import { Button, Image } from "@chakra-ui/react";
import LinkNext from "next/link";
import LoginInput from "../views/LoginInput";

function login() {
  const handleLogInSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <VStack>
      <HStack w="100%" p="7">
        <Image src="/logo.png" maxH="100px" />
      </HStack>
      <HStack w="100%" alignItems={"left"} alignContent="start" pX="96">
        <Image src="/login_page_slogan.png" maxH="500px" px="40" />
        <form
          onSubmit={handleLogInSubmit}
          style={{ height: "100%", width: "100%" }}
        >
          <VStack
            w="100%"
            alignContent="left"
            justifyContent="start"
            spacing="5"
            py="28"
            paddingRight={"450px"}
          >
            <LoginInput
              imgSrc={"/icon_username.svg"}
              type="text"
              placeholder={"Username"}
            />
            <LoginInput
              imgSrc={"/icon_password.svg"}
              type="password"
              placeholder={"Password"}
            />
            <HStack w="100%" px="2">
              <Button bgColor="blue.400" color="white" size="lg" type="submit">
                Log In
              </Button>
              <LinkNext href={"/signup"}>
                <Button bgColor="#ffa300" color="white" size="lg">
                  Sign Up
                </Button>
              </LinkNext>
              <Stack justifyContent={"center"} alignItems="end" w="40%">
                <Link style={{ textDecoration: "underline" }}>Need Help?</Link>
              </Stack>
            </HStack>
          </VStack>
        </form>
      </HStack>
    </VStack>
  );
}

export default login;
