// import { render, screen } from "../src/setupTests";
// import Register from "../src/components/Navbar/RightContent/AuthenticationForm/Register";
// import userEvent from "@testing-library/user-event";
// import * as React from "react";
// describe("Register Component", () => {
//   test("renders correctly", () => {
//     render(<Register />);
//     expect(screen.getByText("Register")).toBeInTheDocument();
//   });

//   it("should render input fields", () => {
//     render(<Register />);

//     expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
//     expect(screen.getByLabelText("User Name")).toBeInTheDocument();
//     expect(screen.getByLabelText("Password")).toBeInTheDocument();
//     expect(screen.getByLabelText("Repeat password")).toBeInTheDocument();
//   });

//   it("should update input values correctly", () => {
//     render(<Register />);

//     const emailInput = screen.getByLabelText("Email Address");
//     userEvent.type(emailInput, "test@example.com");
//     expect(emailInput).toHaveValue("test@example.com");

//     const usernameInput = screen.getByLabelText("User Name");
//     userEvent.type(usernameInput, "testuser");
//     expect(usernameInput).toHaveValue("testuser");

//     const passwordInput = screen.getByLabelText("Password");
//     userEvent.type(passwordInput, "password123");
//     expect(passwordInput).toHaveValue("password123");

//     const repeatPasswordInput = screen.getByLabelText("Repeat password");
//     userEvent.type(repeatPasswordInput, "password123");
//     expect(repeatPasswordInput).toHaveValue("password123");
//   });

//   it("should show an error message when username's length < 6", () => {
//     render(<Register />);

//     const usernameInput = screen.getByLabelText("User Name");

//     userEvent.type(usernameInput, "asd");

//     userEvent.click(screen.getByRole("button", { name: "Register" }));

//     expect(
//       screen.getByText("Username must contain at least 6 characters")
//     ).toBeInTheDocument();
//   });

//   it("should show an error message when password's length < 6", () => {
//     render(<Register />);

//     const passwordInput = screen.getByLabelText("Password");
//     const repeatPasswordInput = screen.getByLabelText("Repeat password");

//     userEvent.type(passwordInput, "password123");
//     userEvent.type(repeatPasswordInput, "password456");

//     userEvent.click(screen.getByRole("button", { name: "Register" }));

//     expect(
//       screen.getByText("Password must contain at least 6 characters")
//     ).toBeInTheDocument();
//   });

//   it("should show an error message when password and repeat password do not match", () => {
//     render(<Register />);

//     const passwordInput = screen.getByLabelText("Password");
//     const repeatPasswordInput = screen.getByLabelText("Repeat password");

//     userEvent.type(passwordInput, "password123");
//     userEvent.type(repeatPasswordInput, "password456");

//     userEvent.click(screen.getByRole("button", { name: "Register" }));

//     expect(
//       screen.getByText("Incorrect repeated password!")
//     ).toBeInTheDocument();
//   });
// });
