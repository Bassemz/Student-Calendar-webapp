import { HStack, Link, Stack, VStack } from "@chakra-ui/layout";
import { Button, Image } from "@chakra-ui/react";
import LinkNext from "next/link";
import LoginInput from "../views/LoginInput";

function SignUp() {
  const handleSignUp = async (e) => {
    e.preventDefault();
  };

  return (
    <VStack>
      <HStack w="100%" p="7">
        <Image src="/logo.png" maxH="100px" />
      </HStack>
      <HStack w="100%" alignItems={"left"} alignContent="start" pX="96">
        <Image src="/login_page_slogan.png" maxH="500px" px="40" />
        <form onSubmit={handleSignUp} style={{ height: "100%", width: "100%" }}>
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
              imgSrc={"/icon_email.svg"}
              type="email"
              placeholder={"E-mail"}
            />
            <LoginInput
              imgSrc={"/icon_password.svg"}
              type="password"
              placeholder={"Password"}
            />
            <HStack w="100%" px="4">
              <Button bgColor="#ffa300" color="white" size="lg" type="submit">
                Sign Up
              </Button>
              <LinkNext href="/login">
                <Button bgColor="blue.400" color="white" size="lg">
                  Log In
                </Button>
              </LinkNext>
            </HStack>
          </VStack>
        </form>
      </HStack>
    </VStack>
  );
}

export default SignUp;
