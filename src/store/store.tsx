import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import articleReducer from "./features/article/articleSlice";
import userReducer from "./features/user/userSlice";
import usersReducer from "./features/users/usersSlice";
import modalReducer from "./features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    articles: articleReducer,
    user: userReducer,
    modal: modalReducer,
    users: usersReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
