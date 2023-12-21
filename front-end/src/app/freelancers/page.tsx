"use client";
import React, { useEffect, useState } from "react";
import { BACKEND_SERVER_IP } from "../layout";
import Cookies from "js-cookie";
import { user } from "../types/UserTypes";
import SearchBar from "../components/SearchBar";
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
      {freelancers.map((item: user) => (
        <div className="flex flex-col my-5">
          <span>{item.username}</span>
          <span>State:{item.location.state}</span>
          <span>City:{item.location.city}</span>
          <span>
            {item.accountType.freelancer && "Account type: Freelancer"}
          </span>
          <span>Hourly:{item.freelancerDetails?.hourlyWage}$</span>
          <span>
            Specilazes in:{" "}
            {item.freelancerDetails?.jobType.cleaning && "Cleaning"}
            {item.freelancerDetails?.jobType.cuttingGrass && "Cutting Grass"}
            {item.freelancerDetails?.jobType.movingHeavyObjects &&
              "Moving Heavy Objects"}
            {item.freelancerDetails?.jobType.plumbering && "Plumbering"}
            {item.freelancerDetails?.jobType.walkingTheDog && "Walking The Dog"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default page;
