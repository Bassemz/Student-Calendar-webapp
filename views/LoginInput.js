import { Image, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

function LoginInput({ imgSrc, type, placeholder }) {
  return (
    <InputGroup shadow={"lg"} bgColor="#f4f4f4" borderRadius={"3xl"}>
      <InputLeftElement pointerEvents={"none"}>
        <Image src={imgSrc} w="32px" h="auto" />
      </InputLeftElement>
      <Input type={type} placeholder={placeholder} />
    </InputGroup>
  );
}

export default LoginInput;
