import { Article } from "@/store/features/article/articleSlice";
import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import ArticleItem from "./ArticleItem";
import CreateArticle from "./CreateArticle";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Articles: React.FC = () => {
  const articles = useSelector((state: RootState) => state.articles);
  return (
    <Flex
      width={{ base: "92%", md: "80%", lg: "65%" }}
      borderRadius={"12px"}
      p={5}
      m={"auto"}
      mt={"10px"}
      direction={"column"}
    >
      <CreateArticle></CreateArticle>
      <Flex
        direction={"column"}
        bg={"gray.100"}
        borderRadius={"10px"}
        mt={"15px"}
        p={5}
      >
        <Text fontWeight={700} fontSize={"2xl"} my="2" color={"purple"}>
          List of articles
        </Text>
        {articles.articleItems.length == 0 && (
          <Flex direction={"column"} align={"center"}>
            <Text>There are no article yet</Text>
          </Flex>
        )}
        {articles.articleItems.map((article, index) => (
          <ArticleItem
            article={article}
            key={article.slug}
            end={index == articles.articleItems.length - 1}
          ></ArticleItem>
        ))}
      </Flex>
    </Flex>
  );
};

export default Articles;
