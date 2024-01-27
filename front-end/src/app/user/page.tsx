import React from "react";
import Profile from "./profile";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Profile Page",
  description: "by yilmazer.dev",
};
const page = () => {
  return <Profile />;
};

export default page;
