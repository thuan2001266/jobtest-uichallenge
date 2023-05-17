import { setModal } from "@/store/features/modal/modalSlice";
import { changeUserOrder, setUsers } from "@/store/features/users/usersSlice";
import { RootState } from "@/store/store";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import UserItem from "./UserItem";

type UserListProps = {};

const UserList: React.FC<UserListProps> = () => {
  const user = useSelector((state: RootState) => state.user);
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const ref = useRef();

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    dispatch(changeUserOrder({ from: sourceIndex, to: destinationIndex }));
  };

  const getAllUser = async () => {
    const getUsers = await fetch("http://localhost:3000/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    });
    const data = await getUsers.json();
    dispatch(setUsers(data));
    setLoading(false);
  };
  useEffect(() => {
    if (user.token) {
      getAllUser();
    }
  }, [user.token]);

  return (
    <>
      {!loading && user.id != -1 ? (
        <Flex
          direction={"column"}
          width={{ base: "92%", md: "80%", lg: "65%" }}
          m={"auto"}
          my={"20px"}
          p={5}
        >
          <Text fontWeight={700} fontSize={"2xl"} my="2" color={"purple"}>
            List of users
          </Text>
          {users.length > 0 && (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="user-list" key="user-list">
                {(provided) => (
                  <SimpleGrid
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    templateColumns={{
                      base: "repeat(1, 1fr)",
                      md: "repeat(2, 1fr)",
                    }}
                    gap={4}
                  >
                    {users.map((item, index) => (
                      <Draggable
                        key={item.id.toString()}
                        draggableId={item.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <Box
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <UserItem user={item} index={index} />
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </SimpleGrid>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </Flex>
      ) : (
        <Flex justify={"center"} width={"full"} my={"20px"}>
          <Flex>
            <Box
              onClick={() => dispatch(setModal({ open: true, view: "login" }))}
              cursor={"pointer"}
            >
              <Text fontWeight={700}>Login</Text>
            </Box>{" "}
            <Text ml={1}>to view list of users</Text>
          </Flex>
        </Flex>
      )}
    </>
  );
};
export default UserList;
