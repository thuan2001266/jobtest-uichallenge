import { updateCurrentArticle } from "@/store/features/article/articleSlice";
import { setModal } from "@/store/features/modal/modalSlice";
import { RootState } from "@/store/store";
import { Flex, Icon, Input } from "@chakra-ui/react";
import { useState } from "react";

import { BiCommentCheck } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

type CreateCommentProp = {
  slug: string;
};

const CreateComment: React.FC<CreateCommentProp> = ({ slug }) => {
  const [comment, setComment] = useState("");
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const onComment = async () => {
    if (!user.username) {
      dispatch(setModal({ view: "login", open: true }));
      return;
    }
    if (comment == "") return;
    try {
      const onComment = await fetch(
        `http://localhost:3000/api/articles/${slug}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({
            body: comment,
          }),
        }
      );
      const data = await onComment.json();
      dispatch(updateCurrentArticle(data.article));
      setComment("");
    } catch (error) {
      console.log("onComment error:", error);
    }
  };
  return (
    <Flex mt={3} align={"center"}>
      <Input
        placeholder="What is your thought?"
        flexGrow={1}
        bg={"gray.50"}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        border={"1px solid"}
        borderColor={"gray.500"}
      ></Input>
      <Icon
        as={BiCommentCheck}
        fontSize={"20pt"}
        ml={3}
        cursor={"pointer"}
        onClick={onComment}
      ></Icon>
    </Flex>
  );
};
export default CreateComment;
