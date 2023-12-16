"use client";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: {
    userId: Cookies.get("userId") ? Cookies.get("userId") : "",
    username: "",
    profilePicture: "",
    isLoggedIn: false,
  },
  emptyRoom: false,
  loading: true,
  loadedFirstMessages: false,
  socket: {},
  chattingWith:
    typeof window !== "undefined"
      ? window.localStorage.getItem("chattingWith")
      : "",
  room:
    typeof window !== "undefined" ? window.localStorage.getItem("room") : "",
};
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setRoom: (state, action) => {
      state.room = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLoadedFirstMessages: (state, action) => {
      state.loadedFirstMessages = action.payload;
    },
    setEmptyRoom: (state, action) => {
      state.emptyRoom = action.payload;
    },
    setChattingWith: (state, action) => {
      state.chattingWith = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.user.isLoggedIn = action.payload;
    },
  },
});
export const {
  setUser,
  setRoom,
  setChattingWith,
  setSocket,
  setLoading,
  setLoadedFirstMessages,
  setEmptyRoom,
  setIsLoggedIn,
} = appSlice.actions;
export default appSlice.reducer;
