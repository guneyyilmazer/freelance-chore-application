"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BACKEND_SERVER_IP, categories } from "../layout";
import { useSearchParams } from "next/navigation";
import { user } from "../types/UserTypes";
import { useSelector } from "react-redux";
import DefaultProfilePicture from "../images/default.jpeg";
import AuthButtons from "./AuthButtons";
import location from "../images/location.svg";
import star from "../images/Star.svg";
const page = () => {
  const client = useSelector((shop: any) => shop.app.user);
  const [user, setUser] = useState<user>();
  const searchParams = useSearchParams();
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const res = await fetch(`${BACKEND_SERVER_IP}/user/loadUser`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },
      body: JSON.stringify({
        userId: searchParams.get("id"),
        token: Cookies.get("Auth_Token"),
      }),

      method: "POST",
    });
    const response = await res.json();
    if (!response.error) {
      setUser(response);
    }
  };
  return (
    <div className="flex justify-center">
      {user && (
        <div className="flex flex-col mt-20 mb-10 w-[90vw] md:w-[1000px]">
          <div className="flex gap-4 md:gap-6 items-center">
            <img
              className="w-22 h-20 md:w-[187px] md:h-[187px] rounded-full border-4 border-gray-200"
              src={
                user.profilePicture
                  ? user.profilePicture
                  : DefaultProfilePicture.src
              }
            />
            <div className="flex flex-col md:flex-row md:items-center md:justify-between md:text-sm md:w-[500px]">
              <div className="flex flex-col gap-2">
                <div className="text-slate-800 font-bold text-2xl md:text-3xl">
                  {user.username}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <img src={location.src} alt="" />
                    <div className="text-slate-600">
                      {user.location.state + "/" + user.location.city}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-zinc-900">5.0</div>
                    <img src={star.src} alt="" />
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <AuthButtons user={user} client={client} />
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <AuthButtons user={user} client={client} />
          </div>
          <div className="md:w-full my-5 flex items-center justify-between">
            <div className="text-slate-800 text-2xl font-bold leading-9">
              {user.freelancerDetails?.jobType.cleaning &&
                "Cleaning Specialist"}
              {user.freelancerDetails?.jobType.cuttingGrass &&
                "Grass Cutting Specialist"}
              {user.freelancerDetails?.jobType.moving && "Moving Specialist"}
              {user.freelancerDetails?.jobType.plumbing && "Plumber"}
              {user.freelancerDetails?.jobType.dogWalking && "Dog Walker"}
            </div>
            <div className="text-slate-800 text-xl font-bold">
              {user.freelancerDetails?.hourlyWage}$/hr
            </div>
          </div>
          <div className="md:w-full">{user.freelancerDetails?.aboutMe}</div>
        </div>
      )}
    </div>
  );
};

export default page;
