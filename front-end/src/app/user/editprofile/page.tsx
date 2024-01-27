import EditProfileForm from "@/app/components/EditProfileForm";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Edit Profile",
  description: "by yilmazer.dev",
};
const page = () => {
  return (
    <div>
      <EditProfileForm />
    </div>
  );
};

export default page;
