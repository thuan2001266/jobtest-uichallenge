import { comment } from "@/store/features/article/articleSlice";
import { RootState } from "@/store/store";
import { Flex } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import CommentItem from "./CommentItem";

type CommentsProps = {};

const Comments: React.FC<CommentsProps> = () => {
  const currentArticles = useSelector(
    (state: RootState) => state.articles.currentArticles
  );
  console.log(currentArticles);

  return (
    <Flex direction={"column"} mt={2}>
      {currentArticles.comments?.length == 0 ? (
        <Flex justifyContent={"center"} my={6}>
          No one is here yet, be the first one to comment
        </Flex>
      ) : (
        <Flex mt={6}>
          {currentArticles.comments?.length}{" "}
          {currentArticles.comments?.length == 1 ? "comment" : "comments"}
        </Flex>
      )}
      {currentArticles.comments
        ? [...currentArticles.comments]
            .sort((c1, c2) => c2.created - c1.created)
            .map((comment) => (
              <CommentItem comment={comment} key={comment.id}></CommentItem>
            ))
        : null}
    </Flex>
  );
};
export default Comments;
