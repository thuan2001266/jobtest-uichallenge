import { useFormik } from "formik";
import React, { useState } from "react";
import { Formik, Field } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setModal } from "@/store/features/modal/modalSlice";

type submitData = {
  email: string;
  username: string;
  password: string;
};

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const [checkPassword, setCheckPassword] = useState("");
  const [error, setError] = useState("");
  const onRegister = async (values: submitData) => {
    setError("");
    const register = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });
    const data = await register.json();
    if (data.message) {
      setError(data.message);
    } else {
      dispatch(setModal({ open: true, view: "login" }));
    }
  };

  return (
    <Flex align="center" justify="center" w={"full"}>
      <Box bg="white" p={6} pt={0} rounded="md" w={"full"}>
        <Formik
          initialValues={{
            email: "",
            username: "",
            password: "",
            repeatPassword: "",
          }}
          onSubmit={(values) => {
            onRegister(values);
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl isInvalid={!!errors.email && touched.email}>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    variant="filled"
                    validate={(value: string) => {
                      let error;
                      if (value.length < 6) {
                        error = "Email can't be blank!";
                      }
                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.username && touched.username}>
                  <FormLabel htmlFor="username">User Name</FormLabel>
                  <Field
                    as={Input}
                    id="username"
                    name="username"
                    type="text"
                    variant="filled"
                    validate={(value: string) => {
                      let error;
                      if (value.length < 6) {
                        error = "Username must contain at least 6 characters";
                      }

                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    variant="filled"
                    validate={(value: string) => {
                      setCheckPassword(value);
                      let error;
                      if (value.length < 6) {
                        error = "Password must contain at least 6 characters";
                      }
                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.repeatPassword && touched.repeatPassword}
                >
                  <FormLabel htmlFor="repeatPassword">
                    Repeat password
                  </FormLabel>
                  <Field
                    as={Input}
                    id="repeatPassword"
                    name="repeatPassword"
                    type="password"
                    variant="filled"
                    validate={(value: string) => {
                      let error;
                      if (value.length < 6) {
                        error = "Password must contain at least 6 characters";
                      }
                      if (value !== checkPassword) {
                        error = "Incorrect repeated password!";
                      }
                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.repeatPassword}</FormErrorMessage>
                </FormControl>
                {error && (
                  <Text fontWeight={400} color={"red.500"} fontSize={"sm"}>
                    {error}
                  </Text>
                )}

                <Flex>
                  <Text>Already have an account?</Text>
                  <Text
                    onClick={() =>
                      dispatch(setModal({ open: true, view: "login" }))
                    }
                    ml={2}
                    fontWeight={600}
                    cursor={"pointer"}
                  >
                    Login
                  </Text>
                </Flex>
                <Button type="submit" colorScheme="purple" width="full">
                  Register
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};
export default Register;
