"use client";
import React from "react";
import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";
import { useSearchParams } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  return (
    <div className="flex">
      <div className="w-[10vw]">
        <Sidebar />
      </div>
      <div className="w-[90vw]">
        <Posts
          type={
            type == "cleaning"
              ? { cleaning: true }
              : type == "cuttingGrass"
              ? { cuttingGrass: true }
              : type == "movingHeavyObjects"
              ? { movingHeavyObjects: true }
              : type == "walkingTheDog"
              ? { walkingTheDog: true }
              : type == "plumbering"
              ? { plumbering: true }
              : { random: true }
          }
        />
      </div>
    </div>
  );
};

export default page;
