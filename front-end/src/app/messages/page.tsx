import React from "react";
import Room from "../components/Room";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Messages",
  description: "by yilmazer.dev",
};
const Page = () => {
  return (
    <div>
      <Room />
    </div>
  );
};

export default Page;
