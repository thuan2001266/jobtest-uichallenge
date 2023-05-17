import {
  comment,
  updateCurrentArticle,
} from "@/store/features/article/articleSlice";
import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

type CommentItemProps = { comment: comment };

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const user = useSelector((state: RootState) => state.user);
  const currentArticle = useSelector(
    (state: RootState) => state.articles.currentArticles
  );

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [updateComment, setUpdateComment] = useState(false);
  const [commentDetailOpen, setCommentDetailOpen] = useState(false);
  const onDeleteComment = async () => {
    try {
      setLoading(true);
      const deleteComment = await fetch(
        `http://localhost:3000/api/articles/${currentArticle.slug}/comments/${comment.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      const data = await deleteComment.json();
      setLoading(false);
      dispatch(updateCurrentArticle(data.article));
    } catch (error) {
      console.log("onDeleteCOmment error:", error);
    }
  };
  return (
    <>
      <Modal isOpen={updateComment} onClose={() => setUpdateComment(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text color={"purple"} textAlign={"center"}>
              Notice
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>
              There is no back-end route available for updating comment
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={commentDetailOpen}
        onClose={() => setCommentDetailOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text color={"purple"} textAlign={"center"}>
              Comment Detail
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Creator's email: {comment.author.email}</Text>
            <Text>Creator's username: {comment.author.username}</Text>
            <Text>Creator's bio: {comment.author.bio}</Text>
            <Text>Comment's ID: {comment.id}</Text>
            <Text>Comment's body: {comment.body}</Text>
            <Text mb={6}>
              Comment's created at:{" "}
              {moment(new Date(comment.created)).format("DD MM YYYY")}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex
        direction={"column"}
        mt={2}
        cursor={"pointer"}
        onClick={() => setCommentDetailOpen(true)}
      >
        {comment.author?.username === user.username && (
          <Flex justifyContent={"flex-end"}>
            <Button
              variant={"link"}
              color={"black"}
              fontSize={"xs"}
              onClick={(event) => {
                event.stopPropagation();
                setUpdateComment(true);
              }}
            >
              Update
            </Button>
            <Text> | </Text>
            <Button
              variant={"link"}
              color={"black"}
              fontSize={"xs"}
              onClick={(event) => {
                event.stopPropagation();
                onDeleteComment();
              }}
              isLoading={loading}
            >
              Delete
            </Button>
          </Flex>
        )}
        <Flex align={"center"}>
          <Box width={"5%"} minW={"33px"}>
            {comment.author.image ? (
              <Image
                borderRadius={"full"}
                boxSize={"33px"}
                src={comment.author.image}
              ></Image>
            ) : (
              <Image
                borderRadius={"full"}
                boxSize={"33px"}
                src={
                  "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                }
              ></Image>
            )}
          </Box>
          <Flex direction={"column"} w={"86%"} ml={3}>
            <Text fontSize={"18px"}>{comment.author.username}</Text>
            <Text fontSize={"12px"}>
              on {moment(new Date(comment.created)).format("MMM DD, YYYY")}
            </Text>
            <Text>{comment.body}</Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
export default CommentItem;
