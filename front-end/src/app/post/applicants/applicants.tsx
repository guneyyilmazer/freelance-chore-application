"use client";
import { BACKEND_SERVER_IP } from "@/app/layout";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { post, user } from "@/app/types";
import { useSearchParams } from "next/navigation";
import { faLocationPinLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import star from "../../images/Star.svg";
import DefaultProfilePicture from "../../images/default.jpeg";
import { useSelector } from "react-redux";

const Page = () => {
  const searchParams = useSearchParams();
  const [applicants, setApplicants] = useState<user[]>();
  const client = useSelector((shop: any) => shop.app.user);
  const [post, setPost] = useState<post>();
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
  const getPost = async () => {
    const res = await fetch(`${BACKEND_SERVER_IP}/post/getPost`, {
      headers: {
        "Content-Type": "application/json",
      },

      method: "POST",
      body: JSON.stringify({
        _id: searchParams.get("id"),
      }),
    });
    const { post } = await res.json();
    setPost(post);
  };
  const hire = async (freelancerId: string) => {
    const res = await fetch(`${BACKEND_SERVER_IP}/post/hire`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },

      method: "POST",
      body: JSON.stringify({
        postId: post?._id,
        freelancerId,
      }),
    });
    if (res.status == 200) alert("Successfully hired!");
    const response = await res.json()
    if (response.error) alert(response.error)
  };
  useEffect(() => {
    getApplicants();
    getPost();
  }, []);
  return (
    <div className="flex flex-col overflow-y-auto items-center justify-center">
      {applicants && (
        <>
          <div className="text-center text-2xl md:text-4xl">
            {applicants.length == 1 ? (
              "1 Person Has Already Applied"
            ) : applicants.length == 0 ? (
              <div className="my-10 flex items-center">
                No One Has Applied Yet, Be The First!
              </div>
            ) : (
              applicants.length + " People Have Already Applied"
            )}{" "}
          </div>
          <div className="flex flex-col gap-5 mt-5">
            {applicants.map((item: user,index:number) => (
              <div key={index}>
                <div className="h-[308px] flex items-center md:items-start flex-col md:flex-row bg-white rounded-lg shadow border border-gray-200">
                  <div className="m-3 w-[95%] md:w-full flex flex-row md:flex-col justify-between md:justify-start items-center">
                    <img
                      className="w-32 md:w-48 h-32 md:h-48 rounded-lg"
                      src={
                        item.profilePicture
                          ? item.profilePicture
                          : DefaultProfilePicture.src
                      }
                    />
                    <div className="flex">
                      {client.userId == post?.user ? (
                        <button
                          onClick={() => hire(item._id as string)}
                          className="w-[190px] md:w-full text-center my-4 px-9 py-3.5 rounded-lg bg-green-600 text-white text-sm"
                        >
                          Hire
                        </button>
                      ) : (
                        <button className="w-[190px] md:w-full text-center my-4 px-9 py-3.5 rounded-lg bg-green-600 text-white text-sm">
                          Send A Message
                        </button>
                      )}
                      <Link
                        href={`/user?id=${item._id}`}
                        className="w-[190px] md:w-full text-center my-4 px-9 py-3.5 rounded-lg bg-green-600 text-white text-sm"
                      >
                        See Profile
                      </Link>
                    </div>
                  </div>
                  <div className="md:m-5 w-[90%] md:w-full flex justify-center md:justify-start flex-col">
                    <div className="flex md:flex-col justify-between items-center md:items-start">
                      <div className="text-slate-800 text-xl font-bold">
                        {item.username}
                      </div>
                      <div className="mt-3">
                        <span className="text-slate-800 text-lg font-bold">
                          {item.freelancerDetails?.hourlyWage + "$"}
                        </span>
                        <span className="text-slate-800 text-lg">/hr</span>
                      </div>
                    </div>
                    <div className="text-slate-800 text-sm my-2">
                      {item.freelancerDetails?.jobType.cleaning &&
                        "Cleaning Specialist"}
                      {item.freelancerDetails?.jobType.cuttingGrass &&
                        "Grass Cutting Specialist"}
                      {item.freelancerDetails?.jobType.moving &&
                        "Moving Specialist"}
                      {item.freelancerDetails?.jobType.plumbing && "Plumber"}
                      {item.freelancerDetails?.jobType.dogWalking &&
                        "Dog Walker"}
                    </div>
                    <div className="flex md:items-center gap-6">
                      <div className="flex md:justify-center items-center">
                        <FontAwesomeIcon icon={faLocationPinLock} />
                        <div className="text-slate-600">
                          {item.location.city + "/" + item.location.state}
                        </div>
                      </div>
                      <div className="flex md:justify-center items-center gap-1">
                        <div className="text-zinc-900 text-sm">4.8</div>
                        <img src={star.src} alt="" />
                      </div>
                    </div>
                    <div className="mt-4 text-sm">
                      {item.freelancerDetails?.aboutMe}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
