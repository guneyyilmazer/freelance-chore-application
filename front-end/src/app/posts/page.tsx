"use client";
import React, { useEffect, useState } from "react";
import Posts from "../components/Posts";
import { useRouter, useSearchParams } from "next/navigation";
import { JobType } from "../types";

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [jobType, setJobType] = useState<JobType>(
    searchParams.get("type") != "random" && searchParams.get("type")
      ? { [searchParams.get("type") as string]: true }
      : { random: true }
  );
  return (
    <div className="flex">
      <div className="w-[10vw] m-3">
        {/* sidebar */}
        <div className="flex flex-col">
          <label className="text-center" htmlFor="jobs">
            Job Type
          </label>
          <select
            onChange={(e) => {
              setJobType({ [e.target.value]: true });
              router.replace(`/posts?type=${e.target.value}`);
            }}
            className="shadow p-3 appearance-none border"
            name="jobs"
            id="jobs"
          >
            <option value="default" disabled selected>
              {" "}
              {Object.keys(jobType)[0]
                ? Object.keys(jobType)[0] == "cleaning"
                  ? "Cleaning"
                  : Object.keys(jobType)[0] == "plumbering"
                  ? "Plumbering"
                  : Object.keys(jobType)[0] == "cuttingGrass"
                  ? "Cutting Grass"
                  : Object.keys(jobType)[0] == "movingHeavyObjects"
                  ? "Moving Heavy Objects"
                  : Object.keys(jobType)[0] == "walkingTheDog"
                  ? "Walking The Dog"
                  : "Select"
                : "Select"}{" "}
            </option>
            <option value="cuttingGrass">Cutting Grass</option>
            <option value="cleaning">Cleaning</option>
            <option value="plumbering">Plumbering</option>
            <option value="movingHeavyObjects">Moving Heavy Objects</option>
            <option value="walkingTheDog">Walking The Dog</option>
          </select>
        </div>
      </div>
      <div className="w-[90vw]">
        <Posts
          type={
            Object.keys(jobType)[0] == "cleaning"
              ? { cleaning: true }
              : Object.keys(jobType)[0] == "cuttingGrass"
              ? { cuttingGrass: true }
              : Object.keys(jobType)[0] == "movingHeavyObjects"
              ? { movingHeavyObjects: true }
              : Object.keys(jobType)[0] == "walkingTheDog"
              ? { walkingTheDog: true }
              : Object.keys(jobType)[0] == "plumbering"
              ? { plumbering: true }
              : { random: true }
          }
        />
      </div>
    </div>
  );
};

export default page;
