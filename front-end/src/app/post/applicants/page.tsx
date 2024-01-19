"use client";
import { BACKEND_SERVER_IP } from "@/app/layout";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { user } from "@/app/types";
import { useSearchParams } from "next/navigation";
import { faLocationPinLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import star from "../../images/Star.svg";
import DefaultProfilePicture from "../../images/default.jpeg";

const page = () => {
  const searchParams = useSearchParams();
  const [applicants, setApplicants] = useState([]);
  const getApplicants = async () => {
    const res = await fetch(`${BACKEND_SERVER_IP}/post/getApplicants`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },

      method: "POST",
      body: JSON.stringify({
        id: searchParams.get("id"),
      }),
    });
    const data = await res.json();
    if (data.error)
      //@ts-ignore
      //@ts-ignore
      alert(data.error);
    else {
      setApplicants(data.applicants);
    }
  };
  useEffect(() => {
    getApplicants();
  }, []);
  return (
    <div className="flex justify-center">
      {" "}
      {applicants.map((item: user) => (
        <Link
          href={`/user?id=${item._id}`}
          className="w-[450px] h-[308px] my-4 flex bg-white rounded-lg shadow border border-gray-200"
        >
          <div className="m-3 flex flex-col justify-center items-center">
            <img
              className="w-48 h-[212px] left-[16px] rounded-lg"
              src={
                item.profilePicture
                  ? item.profilePicture
                  : DefaultProfilePicture.src
              }
            />
            <div className="text-center my-4 px-9 py-3.5 rounded-lg bg-green-600 text-white text-sm">
              Send a Message
            </div>
          </div>
          <div className="m-5 flex flex-col">
            <div className="text-slate-800 text-xl font-bold">
              {item.username}
            </div>
            <div className="mt-3">
              <span className="text-slate-800 text-lg font-bold">
                {item.freelancerDetails?.hourlyWage + "$"}
              </span>
              <span className="text-slate-800 text-lg">/hr</span>
            </div>
            <div className="text-slate-800 text-sm my-2">
              {item.freelancerDetails?.jobType.cleaning &&
                "Cleaning Specialist"}
              {item.freelancerDetails?.jobType.cuttingGrass &&
                "Grass Cutting Specialist"}
              {item.freelancerDetails?.jobType.moving && "Moving Specialist"}
              {item.freelancerDetails?.jobType.plumbing && "Plumber"}
              {item.freelancerDetails?.jobType.dogWalking && "Dog Walker"}
            </div>
            <div className="flex items-center gap-6">
              <div className="flex justify-center items-center">
                <FontAwesomeIcon icon={faLocationPinLock} />
                <div className="text-slate-600">
                  {item.location.city + "/" + item.location.state}
                </div>
              </div>
              <div className="flex justify-center items-center gap-1">
                <div className="text-zinc-900 text-sm">4.8</div>
                <img src={star.src} alt="" />
              </div>
            </div>
            <div className="mt-4 text-sm">
              {item.freelancerDetails?.aboutMe}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default page;
