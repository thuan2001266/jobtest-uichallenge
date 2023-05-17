import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalStatus = {
  open: boolean;
  view: "register" | "login" | "";
};

const initialState: ModalStatus = {
  open: false,
  view: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<ModalStatus>) => {
      state.open = action.payload.open;
      state.view = action.payload.view;
    },
  },
});

const { reducer, actions } = modalSlice;
export const { setModal } = actions;
export default reducer;
