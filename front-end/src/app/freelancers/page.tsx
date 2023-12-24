"use client";
import React, { useEffect, useState } from "react";
import { BACKEND_SERVER_IP } from "../layout";
import Cookies from "js-cookie";
import { user } from "../types/UserTypes";
import SearchBar from "../components/SearchBar";
import DefaultProfilePicture from "../images/default.jpeg";
import { useSearchParams } from "next/navigation";
const page = () => {
  const searchParams = useSearchParams();
  useEffect(() => {
    getFreelancers();
  }, []);
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
        type:
          searchParams.get("type") != null
            ? { [searchParams.get("type") as string]: true }
            : { random: true },
      }),

      method: "POST",
    });
    const response = await res.json();
    if (!response.error) {
      setFreelancers(response.freelancers);
    }
  };
  return (
    <div>
      <div className="flex justify-center">
        <SearchBar freelancer={true} />
      </div>
      <div className="flex justify-around flex-wrap">
        {freelancers.map((item: user) => (
          <div className="flex text-center my-5">
            <div className="flex justify-center items-center">
              <img
                className="w-20 h-20 mx-1 rounded-full"
                src={
                  item.profilePicture
                    ? item.profilePicture
                    : DefaultProfilePicture.src
                }
              />
            </div>
            <div className="flex flex-col mx-1 text-start">
              <span className="text-xl mt-2">{item.username}</span>
              <div className="flex items-center">
                <span className="text-sm">
                  From:{item.location.state}/{item.location.city}
                </span>
              </div>
              <span className="text-sm">
                Specilazes in:
                {item.freelancerDetails?.jobType.cleaning && " Cleaning"}
                {item.freelancerDetails?.jobType.cuttingGrass &&
                  " Cutting Grass"}
                {item.freelancerDetails?.jobType.movingHeavyObjects &&
                  " Moving Heavy Objects"}
                {item.freelancerDetails?.jobType.plumbering && " Plumbering"}
                {item.freelancerDetails?.jobType.walkingTheDog &&
                  " Walking The Dog"}
              </span>
              <span className="text-sm rounded-lg">
                Hourly:{item.freelancerDetails?.hourlyWage}$
              </span>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
