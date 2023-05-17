import { User, resetUser } from "@/store/features/user/userSlice";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { useDispatch } from "react-redux";
type UserMenuProps = { user?: User | null };

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const dispatch = useDispatch();
  const [userAvatar, setUserAvatar] = useState(user?.image);
  const [open, setOpen] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");

  const [profileInfo, setProfileInfo] = useState({
    username: "",
    bio: "",
    image: "",
  });
  const logout = async () => {
    dispatch(resetUser());
  };

  const getProfile = async () => {
    const profile = await fetch(
      `http://localhost:3000/api/profiles/${user?.username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await profile.json();
    setProfileInfo({ ...data.profile });
  };

  useEffect(() => {
    if (user?.username) {
      getProfile();
    }
  }, [user]);

  const onSubmitProfile = async () => {
    setUpdateMessage("");
    try {
      const profileUpdate = await fetch("http://localhost:3000/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          username: profileInfo.username,
          email: user?.email,
          bio: profileInfo.bio,
          image: profileInfo.image,
        }),
      });
      const data = await profileUpdate.json();
      if (data.username) {
        setUpdateMessage("Update profile successfully!");
      }
      setUserAvatar(data.image);
    } catch (error) {
      console.log("onSubmitProfile error:", error);
    }
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
              <Text color="purple" fontWeight={700}>
                {user?.username}'s profile
              </Text>
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Bio</FormLabel>
              <Input
                placeholder="Bio"
                value={profileInfo.bio}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setProfileInfo((prev) => ({ ...prev, bio: e.target.value }))
                }
              />
              {/* //ref={initialRef} */}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              <Input
                placeholder="Image"
                value={profileInfo.image}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setProfileInfo((prev) => ({ ...prev, image: e.target.value }))
                }
              />
            </FormControl>
            {updateMessage && (
              <Text fontWeight={400} color={"green.500"} fontSize={"sm"} mt={3}>
                {updateMessage}
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={onSubmitProfile}>
              Save
            </Button>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Menu>
        <MenuButton
          cursor={"pointer"}
          padding={"0px 6px"}
          borderRadius={4}
          _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
        >
          <Flex align={"center"}>
            <Flex align={"center"}>
              {user ? (
                <Flex align={"center"}>
                  {userAvatar ? (
                    <Image
                      borderRadius={"full"}
                      boxSize={"22px"}
                      src={userAvatar}
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
                  <Flex
                    direction={"column"}
                    display={{ base: "none", lg: "flex" }}
                    //   fontSize={"8pt"}
                    align={"flex-start"}
                    ml={2}
                    mr={4}
                  >
                    <Text fontWeight={700} color={"purple"}>
                      {user?.username || user.email?.split("@")[0]}
                    </Text>
                  </Flex>
                </Flex>
              ) : (
                <Icon
                  fontSize={24}
                  color={"gray.400"}
                  mr={1}
                  as={VscAccount}
                ></Icon>
              )}
            </Flex>
            <ChevronDownIcon></ChevronDownIcon>
          </Flex>
        </MenuButton>
        <MenuList>
          {user && (
            <>
              <MenuItem
                fontSize={"10pt"}
                fontWeight={"700"}
                _hover={{ bg: "blue.500", color: "white" }}
                onClick={() => setOpen(true)}
              >
                <Flex align={"center"}>
                  <Icon as={CgProfile} fontSize={20} mr={2}></Icon>
                  Profile
                </Flex>
              </MenuItem>
              <MenuDivider></MenuDivider>
              <MenuItem
                fontSize={"10pt"}
                fontWeight={"700"}
                _hover={{ bg: "blue.500", color: "white" }}
                onClick={() => logout()}
              >
                <Flex align={"center"}>
                  <Icon as={MdOutlineLogin} fontSize={20} mr={2}></Icon>
                  Log Out
                </Flex>
              </MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
    </>
  );
};
export default UserMenu;
