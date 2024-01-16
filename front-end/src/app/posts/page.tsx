"use client";
import Posts from "../components/Posts";
import FilterSideBar from "../components/FilterSideBar";
import { useSelector } from "react-redux";

const page = () => {
  return (
    <div className="flex">
      <div className="md:w-[10vw] m-3">
        <FilterSideBar page="posts" />
      </div>
      <div className="w-[90vw]">
        <Posts />
      </div>
    </div>
  );
};

export default page;
