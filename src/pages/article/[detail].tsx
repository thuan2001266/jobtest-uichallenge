import Comments from "@/components/DetailPage/Comments";
import CreateComment from "@/components/DetailPage/CreateComment";
import Header from "@/components/Navbar/Header";
import ArticleItem from "@/components/PageContent/Articles/ArticleItem";
import UserItem from "@/components/PageContent/User/UserItem";
import {
  Article,
  updateCurrentArticle,
} from "@/store/features/article/articleSlice";
import { Flex } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

type detailProps = { article: Article };

const detail: React.FC<detailProps> = ({ article }) => {
  console.log(article);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateCurrentArticle(article));
  }, []);
  return (
    <>
      <Head>
        <title>{article.title}</title>
        <meta name="description" content="Article detail page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <Flex
        bg={"gray.100"}
        width={{ base: "92%", md: "80%", lg: "65%" }}
        m={"auto"}
        mt={"10px"}
        borderRadius={"12px"}
        p={5}
        direction={"column"}
      >
        <ArticleItem article={article} detail={true} end={true}></ArticleItem>
        <CreateComment slug={article.slug}></CreateComment>
        <Comments></Comments>
      </Flex>
    </>
  );
};
export default detail;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const slug = context.query.detail;
  try {
    const articleDetail = await fetch(
      `http://localhost:3000/api/articles/${slug}`
    );
    const data = await articleDetail.json();
    const article = data.article;
    return {
      props: {
        article,
      },
    };
  } catch (error) {
    console.log("getServersideProps error", error);
  }
}
