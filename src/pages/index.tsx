import Header from "@/components/Navbar/Header";
import Articles from "@/components/PageContent/Articles/Articles";
import UserList from "@/components/PageContent/User/UserList";
import { Article, setArticles } from "@/store/features/article/articleSlice";
import { RootState } from "@/store/store";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";

export default function Home({ articles }: { articles: Article[] }) {
  // const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  dispatch(setArticles(articles));
  return (
    <>
      <Head>
        <title>Test App</title>
        <meta name="description" content="Test App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <Articles></Articles>
      <UserList></UserList>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const response = await fetch("http://localhost:3000/api/articles");
    const data: any = await response.json();
    const articles = data.articles;

    return {
      props: {
        articles,
      },
    };
  } catch (error) {
    console.log("getServersideProps error", error);
  }
}
