"use client"
import React from "react";
import Posts from "../components/Posts";

const page = () => {
  return (
    <div>
      <Posts type={{ cleaning: true }} />
    </div>
  );
};

export default page;
