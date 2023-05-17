import { articleData } from "@/pages/CreateArticlePage";
import {
  Article,
  removeArticle,
  updateArticle,
} from "@/store/features/article/articleSlice";
import { setModal } from "@/store/features/modal/modalSlice";
import { RootState } from "@/store/store";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

type ArticleItemProps = {
  article: Article;
  end?: boolean;
  detail?: boolean;
};

const ArticleItem: React.FC<ArticleItemProps> = ({ article, end, detail }) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onDeleteArticle = async () => {
    try {
      setLoading(true);
      const deleteArticle = await fetch(
        `http://localhost:3000/api/articles/${article.slug}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setLoading(false);
      dispatch(removeArticle(article.slug));
    } catch (error) {
      console.log("onDeleteArticle error:", error);
    }
  };

  const onUpdateArticle = async (value: articleData) => {
    setMessage("");
    setLoading(true);
    try {
      const createArticle = await fetch(
        `http://localhost:3000/api/articles/${article.slug}`,
        {
          method: "PUT",
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
        }
      );
      const data = await createArticle.json();
      dispatch(updateArticle(data.article));
      if (data.slug != "") {
        setMessage("Update articles successfully!");
      } else {
        setMessage("Error orcured!");
      }
    } catch (error) {
      console.log("onUpdateArticle error:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text w={"90%"} color={"purple"} textAlign={"center"}>
              Delete articles "{article.title}"?
            </Text>
          </ModalHeader>
          <ModalCloseButton />

          <ModalFooter>
            <Button
              mr={3}
              onClick={() => setDeleteModalOpen(false)}
              variant="ghost"
            >
              Close
            </Button>
            <Button colorScheme="purple" onClick={onDeleteArticle}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={updateModalOpen} onClose={() => setUpdateModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text w={"90%"} color={"purple"} textAlign={"center"}>
              Update articles
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex alignItems={"cemter"} justifyContent={"center"} pb="30px">
              <Box bg={"white"} w={"full"}>
                <Formik
                  initialValues={{
                    title: article.title,
                    description: article.description,
                    body: article.body,
                    taglist: article.tagList.join(", "),
                  }}
                  onSubmit={(values) => {
                    onUpdateArticle(values);
                  }}
                >
                  {({ handleSubmit, errors, touched }) => (
                    <form onSubmit={handleSubmit}>
                      <VStack spacing={4} align="flex-start">
                        <FormControl
                          isInvalid={!!errors.title && touched.title}
                        >
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
                          isInvalid={
                            !!errors.description && touched.description
                          }
                        >
                          <FormLabel htmlFor="description">
                            Description
                          </FormLabel>
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
                          <FormErrorMessage>
                            {errors.description}
                          </FormErrorMessage>
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
                        <FormControl
                          isInvalid={!!errors.taglist && touched.taglist}
                        >
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
                              message !== "Error orcured!"
                                ? "green.800"
                                : "red.500"
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
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex
        direction={"column"}
        pt={2}
        pb={6}
        borderBottom={end ? "" : "1px solid"}
        borderColor={"gray.400"}
        cursor={detail ? "unset" : "pointer"}
        w={"full"}
        onClick={() => router.push(`/article/${article.slug}`)}
        transition="transform 0.3s"
        _hover={
          detail
            ? {
                transform: "scale(1)",
              }
            : {
                transform: "scale(1.006)",
              }
        }
      >
        {article.author?.username === user.username ? (
          <Flex justifyContent={"flex-end"}>
            <Button
              variant={"link"}
              color={"black"}
              fontSize={"sm"}
              onClick={(event) => {
                event.stopPropagation();
                setUpdateModalOpen(true);
              }}
            >
              Update
            </Button>
            <Text> | </Text>
            <Button
              variant={"link"}
              color={"black"}
              fontSize={"sm"}
              onClick={(event) => {
                event.stopPropagation();
                setDeleteModalOpen(true);
              }}
            >
              Delete
            </Button>
          </Flex>
        ) : (
          <></>
        )}
        <Flex
          // align={{ md: "center" }}
          direction={"column"}
        >
          <Text fontSize={"2xl"} mr={3} flexGrow={1} width={"100%"}>
            {article.title}
          </Text>
          <Text fontSize={"xs"}>
            {"created at " +
              moment(new Date(article.created)).format("MMM DD, YYYY") +
              (article.updated !== article.created
                ? " | updated at " +
                  moment(new Date(article.updated)).format("MMM DD, YYYY")
                : "") +
              (detail ? "" : " by " + article.author?.username)}
          </Text>
        </Flex>
        <Flex w={"100%"}>
          <Text isTruncated>Description: {article.description}</Text>
        </Flex>
        <Flex w={"100%"}>
          <Text isTruncated>{article.body}</Text>
        </Flex>
        <Flex align={"center"}>
          <Text>{article.favoriteCount}</Text>
          <Icon
            as={AiOutlineHeart}
            ml={1}
            _hover={{ cursor: "pointer" }}
          ></Icon>
        </Flex>
        <Flex align={"center"} w={"100%"} flexWrap="wrap">
          {article.tagList.length != 0 && (
            <Text mr={2} fontSize={"sm"}>
              Tag:
            </Text>
          )}

          {article.tagList.map((tag, index) => (
            <Box
              key={index}
              p={"1px 3px"}
              border={"1px solid"}
              borderColor={"gray.400"}
              mr={2}
              borderRadius={"5px"}
              cursor={"pointer"}
            >
              {tag}
            </Box>
          ))}
        </Flex>
      </Flex>
    </>
  );
};
export default ArticleItem;
