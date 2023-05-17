import { ModalStatus, setModal } from "@/store/features/modal/modalSlice";
import { RootState } from "@/store/store";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "./AuthenticationForm/Login";
import Register from "./AuthenticationForm/Register";
import UserMenu from "./UserMenu";

type AuthenticationButtonProps = {};

const AuthenticationButton: React.FC<AuthenticationButtonProps> = () => {
  const { open, view } = useSelector((state: RootState) => state.modal);
  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const handleAuthentication = (modalStatus: ModalStatus) =>
    dispatch(setModal({ open: modalStatus.open, view: modalStatus.view }));

  return (
    <>
      <Modal
        isOpen={open}
        onClose={() => handleAuthentication({ open: false, view: "" })}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Box textAlign={"center"} w={"full"}>
              <Text fontWeight={700} color={"purple"}>
                {view === "login" ? "Login" : "Register"}
              </Text>
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {view === "login" ? <Login></Login> : <Register></Register>}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex align={"center"}>
        {user.id != -1 ? (
          <Flex>
            <UserMenu user={user}></UserMenu>
          </Flex>
        ) : (
          <>
            <Button
              variant={"link"}
              color={"black"}
              onClick={() =>
                handleAuthentication({ open: true, view: "login" })
              }
            >
              Login
            </Button>
            <Text m={1}>|</Text>
            <Button
              variant={"link"}
              color={"black"}
              onClick={() =>
                handleAuthentication({ open: true, view: "register" })
              }
            >
              Register
            </Button>
          </>
        )}
      </Flex>
    </>
  );
};
export default AuthenticationButton;
