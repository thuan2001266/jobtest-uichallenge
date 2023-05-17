import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: number;
  username: string;
  email: string;
  bio: string;
  image: string;
  token?: string;
}

const initialState: User = {
  id: -1,
  username: "",
  email: "",
  bio: "",
  image: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return { ...state, ...action.payload };
    },
    resetUser: (state) => {
      return initialState;
    },
  },
});

const { reducer, actions } = userSlice;
export const { setUser, resetUser } = actions;
export default reducer;
