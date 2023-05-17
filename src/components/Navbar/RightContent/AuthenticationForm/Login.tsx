import { useFormik } from "formik";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
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
import { setUser } from "@/store/features/user/userSlice";

type loginData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const submitRef = useRef(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = async (values: loginData) => {
    setError("");
    setLoading(true);
    const login = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });
    const data = await login.json();
    if (data.errors) {
      setError("Invalid user!");
    } else {
      dispatch(setUser(data.user));
      dispatch(setModal({ open: false, view: "" }));
    }
    setLoading(false);
  };

  return (
    <Flex align="center" justify="center" w={"full"}>
      <Box bg="white" p={6} pt={0} rounded="md" w={"full"}>
        <Formik
          initialValues={{
            email: localStorage.getItem("email") || "",
            password: localStorage.getItem("password") || "",
            rememberMe: !!localStorage.getItem("rememberMe"),
          }}
          onSubmit={(values) => {
            if (values.rememberMe) {
              localStorage.setItem("email", values.email);
              localStorage.setItem("password", values.password);
              localStorage.setItem("rememberMe", "True");
            } else {
              localStorage.setItem("email", "");
              localStorage.setItem("password", "");
              localStorage.setItem("rememberMe", "");
            }
            onLogin(values);
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
                      if (value.length == 0) {
                        error = "Email can't be blank!";
                      }
                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
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
                      let error;
                      if (value.length < 6) {
                        error = "Password must contain at least 6 characters";
                      }

                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                {error !== "" && (
                  <Text fontWeight={400} color={"red.500"} fontSize={"sm"}>
                    {error}
                  </Text>
                )}

                <Field
                  as={Checkbox}
                  id="rememberMe"
                  name="rememberMe"
                  colorScheme="purple"
                >
                  Remember me?
                </Field>

                <Flex>
                  <Text>Don't have any account?</Text>
                  <Text
                    onClick={() =>
                      dispatch(setModal({ open: true, view: "register" }))
                    }
                    ml={2}
                    fontWeight={600}
                    cursor={"pointer"}
                  >
                    Register
                  </Text>
                </Flex>

                <Button
                  type="submit"
                  colorScheme="purple"
                  width="full"
                  isLoading={loading}
                >
                  Login
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};
export default Login;
