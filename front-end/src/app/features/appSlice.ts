"use client";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { filterType, user } from "../types";
const initialState: {
  searchFilter: filterType;
  user: user;
  emptyRoom: boolean;
  loading: boolean;
  loadedFirstMessages: boolean;
  socket: {};
  chattingWith: string;
  room: string;
} = {
  searchFilter: {
    hourly: 0,
    price: -1,
    selectedState: "",
    selectedCity: "",
    jobType: {random:true},
  },
  user: {
    userId: Cookies.get("userId") ? (Cookies.get("userId") as string) : "",
    location: { state: "", city: "" },
    accountType: { hirer: true },
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
      ? (window.localStorage.getItem("chattingWith") as string)
      : "",
  room:
    typeof window !== "undefined"
      ? (window.localStorage.getItem("room") as string)
      : "",
};
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSearchFilter: (state, action) => {
      state.searchFilter = action.payload;
    },
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
  setSearchFilter,
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
