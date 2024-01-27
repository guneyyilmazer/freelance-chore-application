import React from "react";
import Freelancers from "./freelancers";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Freelancers",
  description: "by yilmazer.dev",
};
const page = () => {
  return <Freelancers />;
};

export default page;
