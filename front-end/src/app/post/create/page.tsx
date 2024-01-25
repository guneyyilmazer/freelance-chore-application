"use client"
import React from "react";
import PostCreateForm from "../../components/PostCreateForm";
import { useSelector } from "react-redux";

const Page = () => {
  const user = useSelector((shop:any)=>shop.app.user)
  if (!user.isLoggedIn) window.location.replace("/auth")
  return (
    <div>
      <PostCreateForm />
    </div>
  );
};

export default Page;
