import React from "react";
import SignUpAsAFreelancer from "../../components/SignupAsAFreelancer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign Up As A Freelancer",
  description: "by yilmazer.dev",
};
const Page = () => {
  return (
    <div>
      <SignUpAsAFreelancer />
    </div>
  );
};

export default Page;
