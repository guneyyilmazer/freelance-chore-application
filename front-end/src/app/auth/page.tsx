import React from "react";
import Auth from "./auth";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Auth",
  description: "by yilmazer.dev",
};
const page = () => {
  return <Auth />;
};

export default page;
