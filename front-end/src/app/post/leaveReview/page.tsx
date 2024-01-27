import React from "react";
import Form from "./Form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Leave Review",
  description: "by yilmazer.dev",
};
const page = () => {

  return (
    <div>
      <Form />
    </div>
  );
};

export default page;
