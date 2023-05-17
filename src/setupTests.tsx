// import "@testing-library/jest-dom";
// import { ChakraProvider } from "@chakra-ui/react";
// import { Provider } from "react-redux";
// import { render, RenderOptions } from "@testing-library/react";
// import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
// import { RootState } from "./store/store";
// import { Article, initialState } from "./store/features/article/articleSlice";
// import { User } from "./store/features/user/userSlice";
// const mockStore = configureMockStore<RootState>();
// import * as React from "react";
// const store: MockStoreEnhanced<RootState> = mockStore({
//   articles: initialState,
//   user: {} as User,
//   modal: { open: true, view: "register" },
//   users: [] as User[],
// });

// const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => (
//   <ChakraProvider>
//     <Provider store={store}>{children}</Provider>
//   </ChakraProvider>
// );

// const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
//   render(ui, { wrapper: Providers, ...options });

// export * from "@testing-library/react";
// export { customRender as render };
