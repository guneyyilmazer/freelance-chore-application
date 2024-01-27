import React from "react";
import Post from "./post";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "View Post",
  description: "by yilmazer.dev",
};
const page = () => {
  return <Post />;
};

export default page;
