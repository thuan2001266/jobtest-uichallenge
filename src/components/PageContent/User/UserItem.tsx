import { User } from "@/store/features/user/userSlice";
import { removeUser } from "@/store/features/users/usersSlice";
import { RootState } from "@/store/store";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type UserItemProps = { user: User };

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const signedInUser = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const onDeleteUser = async () => {
    setLoading(true);
    const deleteUser = await fetch(
      `http://localhost:3000/api/users/${user.email}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${signedInUser?.token}`,
        },
      }
    );
    // wait 1 second for smooth delete
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(() => {});
      }, 1000);
    });
    setLoading(false);
    dispatch(removeUser(user.id));
  };

  return (
    <>
      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Box textAlign={"center"} w={"full"}>
              <Text fontWeight={700} color="purple">
                {user?.username}'s profile
              </Text>
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="6">
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                readOnly={true}
                placeholder="Image"
                value={user.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Username</FormLabel>
              <Input
                readOnly={true}
                placeholder="Image"
                value={user.username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Bio</FormLabel>
              <Input
                readOnly={true}
                placeholder="Bio"
                value={user.bio}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
              />
              {/* //ref={initialRef} */}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              <Input
                readOnly={true}
                placeholder="Image"
                value={user.image}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>{" "}
      <GridItem
        w="100%"
        borderRadius={"4px"}
        border={"1px solid"}
        py={3}
        bg={signedInUser.email == user.email ? "gray.300" : "gray.100"}
        transition="transform 0.3s"
        _hover={{
          transform: "scale(1.02)",
        }}
        onClick={() => setOpen(true)}
      >
        <Flex align={"center"} mx={3}>
          <Flex align={"center"} flexGrow={1}>
            <Box minW={"22px"}>
              {user.image ? (
                <Image
                  borderRadius={"full"}
                  boxSize={"22px"}
                  src={user.image}
                ></Image>
              ) : (
                <Image
                  borderRadius={"full"}
                  boxSize={"22px"}
                  src={
                    "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                  }
                ></Image>
              )}
            </Box>
            <Flex direction={"column"} px={2} flexGrow={1}>
              <Text fontSize={"14px"} isTruncated w={"90%"}>
                {user.email}
              </Text>
              <Text fontSize={"14px"} isTruncated w={"90%"}>
                {user.username}
              </Text>
            </Flex>
          </Flex>
          <Button
            fontSize={"15px"}
            variant={"unstyled"}
            color={"red.500"}
            onClick={(e) => {
              e.stopPropagation();
              onDeleteUser();
            }}
            isDisabled={signedInUser.email == user.email ? true : false}
            isLoading={loading}
          >
            Delete
          </Button>
        </Flex>
      </GridItem>
    </>
  );
};
export default UserItem;
