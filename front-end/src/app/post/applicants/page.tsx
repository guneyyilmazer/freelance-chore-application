import React from "react";
import Applicants from "./applicants";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Applicants",
  description: "by yilmazer.dev",
};
const page = () => {
  return <Applicants />;
};

export default page;
