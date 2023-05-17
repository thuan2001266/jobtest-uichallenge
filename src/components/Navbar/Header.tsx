import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import AuthenticationButton from "./RightContent/AuthenticationButton";
import { useRouter } from "next/router";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const router = useRouter();
  return (
    <Flex
      w={"full"}
      height={"50px"}
      justifyContent={"space-between"}
      px={"10%"}
      bg={"white"}
      align={"center"}
    >
      <Text
        fontWeight={"600"}
        fontSize={"26px"}
        _hover={{ borderBottom: "2px solid" }}
        cursor={"pointer"}
        onClick={() => {
          router.push("/");
        }}
        color={"purple"}
      >
        Blog
      </Text>
      <AuthenticationButton></AuthenticationButton>
    </Flex>
  );
};
export default Header;
