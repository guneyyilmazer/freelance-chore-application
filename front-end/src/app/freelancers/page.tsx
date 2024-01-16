"use client";
import React, { useEffect, useState } from "react";
import { BACKEND_SERVER_IP } from "../layout";
import Cookies from "js-cookie";
import { user } from "../types/UserTypes";
import SearchBar from "../components/SearchBar";
import DefaultProfilePicture from "../images/default.jpeg";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import FilterSideBar from "../components/FilterSideBar";
import { useSelector } from "react-redux";
import { filterType } from "../types";
const page = () => {
  const filter: filterType = useSelector((shop: any) => shop.app.searchFilter);
  useEffect(() => {
    getFreelancers();
  }, [filter]);
  const [freelancers, setFreelancers] = useState([]);
  const getFreelancers = async () => {
    const res = await fetch(`${BACKEND_SERVER_IP}/user/loadFreelancers`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },
      body: JSON.stringify({
        page: 1,
        amount: 15,
        type: filter.jobType,
        state: filter.selectedState,
        city: filter.selectedCity,
        wage: filter.hourly,
      }),

      method: "POST",
    });
    const response = await res.json();
    if (!response.error) {
      setFreelancers(response.freelancers);
    }
  };
  return (
    <div className="flex justify-center">
      <div className="">
        <div className="absolute w-[12vw] left-0 md:m-2">
          <FilterSideBar page="freelancers" />
        </div>
        <div>
          <div className="flex justify-center">
            <SearchBar freelancer={true} />
          </div>
          <div className="flex flex-col w-56 justify-center items-center flex-wrap">
            {freelancers.map((item: user) => (
              <Link
                href={`/user?id=${item._id}`}
                className="flex text-center break-words my-5"
              >
                <img
                  className="w-14 h-14 m-auto mr-3 rounded-full"
                  src={
                    item.profilePicture
                      ? item.profilePicture
                      : DefaultProfilePicture.src
                  }
                />
                <div className="flex flex-col break-words mx-1 text-start">
                  <span className="text-xl mt-2">{item.username}</span>
                  <div className="flex break-words items-center">
                    <span className="text-sm break-words">
                      From:{item.location.state}/{item.location.city}
                    </span>
                  </div>
                  <span className="text-sm break-words">
                    Specilazes in:
                    {item.freelancerDetails?.jobType.cleaning && " Cleaning"}
                    {item.freelancerDetails?.jobType.cuttingGrass &&
                      " Cutting Grass"}
                    {item.freelancerDetails?.jobType.movingHeavyObjects &&
                      " Moving Heavy Objects"}
                    {item.freelancerDetails?.jobType.plumbering &&
                      " Plumbering"}
                    {item.freelancerDetails?.jobType.walkingTheDog &&
                      " Walking The Dog"}
                  </span>
                  <span className="text-sm rounded-lg">
                    Hourly:{item.freelancerDetails?.hourlyWage}$
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
