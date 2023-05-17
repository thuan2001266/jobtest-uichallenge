import Header from "@/components/Navbar/Header";
import { RootState } from "@/store/store";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import Head from "next/head";
import { useState } from "react";
import { useSelector } from "react-redux";

type CreateArticleProps = {};

export type articleData = {
  title: string;
  description: string;
  body: string;
  taglist: string;
};

const CreateArticle: React.FC<CreateArticleProps> = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const [message, setMessage] = useState("");

  const onCreateArticle = async (value: articleData) => {
    setMessage("");
    setLoading(true);
    try {
      const createArticle = await fetch("http://localhost:3000/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          title: value.title,
          description: value.description,
          body: value.body,
          tagList: value.taglist
            .split(",")
            .map((str) => str.trim())
            .filter((str) => str !== ""),
        }),
      });
      const data = await createArticle.json();
      if (!!data.created) {
        setMessage("Create articles successfully!");
      } else {
        setMessage("Error orcured!");
      }
    } catch (error) {
      console.log("createArticle error:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Create Article</title>
        <meta name="description" content="Create Article" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <Flex
        alignItems={"cemter"}
        justifyContent={"center"}
        mt={"30px"}
        pb="30px"
      >
        <Box
          p={5}
          bg={"white"}
          borderRadius={"8px"}
          border={"1px solid"}
          borderColor={"gray.500"}
          w={{ base: "92%", md: "60%" }}
        >
          <Text
            mb={3}
            textAlign={"center"}
            fontSize={"xl"}
            fontWeight={700}
            color={"purple"}
          >
            Create article
          </Text>
          <Formik
            initialValues={{
              title: "",
              description: "",
              body: "",
              taglist: "",
            }}
            onSubmit={(values) => {
              onCreateArticle(values);
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormControl isInvalid={!!errors.title && touched.title}>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Field
                      as={Input}
                      id="title"
                      name="title"
                      type="text"
                      variant="filled"
                      validate={(value: string) => {
                        let error;
                        if (value.length == 0) {
                          error = "Title can't be blank!";
                        }
                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.title}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.description && touched.description}
                  >
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Field
                      as={Input}
                      id="description"
                      name="description"
                      type="text"
                      variant="filled"
                      validate={(value: string) => {
                        let error;
                        if (value.length == 0) {
                          error = "Description can't be blank!";
                        }

                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.description}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.body && touched.body}>
                    <FormLabel htmlFor="body">Body</FormLabel>
                    <Field
                      as={Textarea}
                      id="body"
                      name="body"
                      type="text"
                      variant="filled"
                      validate={(value: string) => {
                        let error;
                        if (value.length == 0) {
                          error = "Body can't be blank!";
                        }

                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.body}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.taglist && touched.taglist}>
                    <FormLabel htmlFor="taglist">
                      Taglist &#40;Tags is separated by ','&#41;
                    </FormLabel>
                    <Field
                      as={Input}
                      id="taglist"
                      name="taglist"
                      type="text"
                      variant="filled"
                      validate={(value: string) => {
                        let error;
                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.taglist}</FormErrorMessage>
                  </FormControl>
                  {message !== "" && (
                    <Text
                      fontWeight={400}
                      color={
                        message !== "Error orcured!" ? "green.800" : "red.500"
                      }
                      fontSize={"sm"}
                    >
                      {message}
                    </Text>
                  )}

                  <Button
                    type="submit"
                    colorScheme="purple"
                    width="full"
                    isLoading={loading}
                  >
                    Submit
                  </Button>
                </VStack>
              </form>
            )}
          </Formik>
        </Box>
      </Flex>
    </>
  );
};
export default CreateArticle;
