import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../user/userSlice";

export interface comment {
  author: User;
  body: string;
  created: number;
  id: number;
}

export interface Article {
  id: number;
  slug: string;
  title: string;
  description: string;
  body: string;
  created: number;
  updated: number;
  tagList: [];
  favoriteCount: number;
  comments?: comment[];
  author?: User;
}

export interface ArticleState {
  articleItems: Article[];
  currentArticles: Article;
  total: number;
  isLoading: boolean;
}

export const emtyArtical: Article = {
  id: -1,
  slug: "",
  title: "",
  description: "",
  body: "",
  created: -1,
  updated: -1,
  tagList: [],
  favoriteCount: -1,
  comments: [],
};

export const initialState: ArticleState = {
  articleItems: [],
  currentArticles: emtyArtical,
  total: 0,
  isLoading: true,
};

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<Article[]>) => {
      state.articleItems = action.payload;
    },
    updateCurrentArticle: (state, action: PayloadAction<Article>) => {
      state.currentArticles = { ...state.currentArticles, ...action.payload };
    },
    addArticle: (state, action: PayloadAction<Article>) => {
      state.articleItems.push(action.payload);
    },
    updateArticle: (state, action: PayloadAction<Article>) => {
      const updatedArticle = action.payload;
      const index = state.articleItems.findIndex(
        (article) => article.id === updatedArticle.id
      );
      if (index !== -1) {
        state.articleItems[index] = {
          ...state.articleItems[index],
          ...updatedArticle,
        };
      }
    },
    removeArticle: (state, action: PayloadAction<string>) => {
      const articleSlug = action.payload;
      state.articleItems = state.articleItems.filter(
        (article) => article.slug !== articleSlug
      );
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

const { reducer, actions } = articleSlice;
export const {
  addArticle,
  setTotal,
  setLoading,
  removeArticle,
  setArticles,
  updateArticle,
  updateCurrentArticle,
} = actions;
export default reducer;
