import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../user/userSlice";

const initialState: User[] = [];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      return action.payload;
    },
    removeUser: (state, action: PayloadAction<number>) => {
      const userId = action.payload;
      return state.filter((user) => user.id !== userId);
    },
    resetUser: () => {
      return initialState;
    },
  },
});

const { reducer, actions } = userSlice;
export const { setUsers, removeUser, resetUser } = actions;
export default reducer;
