import { setModal } from "@/store/features/modal/modalSlice";
import { RootState } from "@/store/store";
import { Box, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { IoMdCreate } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

type CreateArticleProps = {};

const CreateArticlePage: React.FC<CreateArticleProps> = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  return (
    <Flex width={"100%"} bg={"gray.100"} borderRadius={"10px"}>
      <Flex
        align={"center"}
        width={"90%"}
        m={"auto"}
        my="5"
        cursor={"pointer"}
        onClick={() => {
          if (!!user.username) {
            router.push("/CreateArticlePage");
            return;
          }
          dispatch(setModal({ view: "login", open: true }));
        }}
      >
        <Input
          flexGrow={1}
          bg={"gray.50"}
          border={"1px solid"}
          borderColor={"gray.500"}
          mx="3"
          placeholder={"Create your own article"}
        ></Input>
        <Icon as={IoMdCreate}></Icon>
      </Flex>
    </Flex>
  );
};
export default CreateArticlePage;
