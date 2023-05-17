import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../user/userSlice";

const initialState: User[] = [];

type indexChange = {
  from: number;
  to: number;
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      return action.payload;
    },
    changeUserOrder: (state, action: PayloadAction<indexChange>) => {
      const newArray = [...state];
      const element = newArray.splice(action.payload.from, 1)[0];
      newArray.splice(action.payload.to, 0, element);
      return newArray;
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
export const { setUsers, removeUser, resetUser, changeUserOrder } = actions;
export default reducer;
