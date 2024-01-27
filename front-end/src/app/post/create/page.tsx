import React from "react";
import PostCreateForm from "../../components/PostCreateForm";
import { useSelector } from "react-redux";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Create Post",
  description: "by yilmazer.dev",
};
const Page = () => {
  return (
    <div>
      <PostCreateForm />
    </div>
  );
};

export default Page;
