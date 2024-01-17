"use client";
import React, { useEffect, useState } from "react";
import { BACKEND_SERVER_IP } from "../layout";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import ImagePreview from "../components/ImagePreview";
import Link from "next/link";
import EditDesc from "../components/EditDesc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocation,
  faLocationDot,
  faPen,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import EditJobType from "../components/EditJobType";
import { post, user } from "../types";
import AuthButtons from "./AuthButtons";
import EditWageType from "../components/EditWageType";
import EditLocation from "../components/EditLocation";
import EditTitle from "../components/EditTitle";
import Page404 from "../components/Page404";
import Cookies from "js-cookie";
import DefaultProfilePicture from "../images/default.jpeg";
import location from "../images/location.svg";
import briefcase from "../images/briefcasenormal.svg";
import dollar from "../images/dollar-circle.svg";
import clock from "../images/clock.svg";
import bookmark from "../images/bookmark.svg";
import star from "../images/star.svg";
const page = () => {
  const [preview, setPreview] = useState(false);
  const [previewPictures, setPreviewPictures] = useState<string[]>();
  const [previewPicturesIndex, setPreviewPicturesIndex] = useState(0);
  const [titleEditShow, setTitleEditShow] = useState(false);
  const [editLocationShow, setEditLocationShow] = useState(false);
  const [wageEditShow, setWageEditShow] = useState(false);
  const [descEditShow, setDescEditShow] = useState(false);
  const [typeEditShow, setTypeEditShow] = useState(false);
  const router = useRouter();
  useEffect(() => {
    getPost();
  }, []);
  const [post, setPost] = useState<post>();
  const searchParams = useSearchParams();
  const user = useSelector((shop: any) => shop.app.user);
  const [postUser, setPostUser] = useState<user>();

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
    setPreviewPictures(post.pictures);
  };
  useEffect(() => {
    post && getUser();
  }, [post]);
  const getUser = async () => {
    const res = await fetch(`${BACKEND_SERVER_IP}/user/loadUser`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },
      body: JSON.stringify({
        userId: post?.user,
      }),

      method: "POST",
    });
    const response = await res.json();
    if (!response.error) {
      setPostUser(response);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {post ? (
        <div className="flex flex-col justify-around my-20">
          <div className="flex justify-between">
            <div className="w-[478px] h-[254px] flex-col justify-start items-start gap-5 inline-flex">
              <div className="w-[478px] text-black text-4xl font-bold font-['Helvetica Neue'] leading-[54px]">
                {post?.title}
              </div>
              <div className="flex-col justify-start items-start gap-6 flex">
                <div className="justify-start items-center gap-2 inline-flex">
                  <div className="w-6 h-6 justify-center items-center flex">
                    <div className="w-6 h-6 relative">
                      <img src={location.src} alt="" />
                    </div>
                  </div>
                  <div className="w-[162px] text-black text-lg font-normal font-['Helvetica Neue'] leading-[27px]">
                    {post?.location.state + "/" + post?.location.city}
                  </div>
                </div>
                <div className="justify-start items-center gap-2 inline-flex">
                  <div className="w-6 h-6 justify-center items-center flex">
                    <div className="w-6 h-6 relative">
                      <img src={briefcase.src} alt="" />
                    </div>
                  </div>
                  <div className="w-[162px] text-black text-lg font-normal font-['Helvetica Neue'] leading-[27px]">
                    Contract
                  </div>
                </div>
                <div className="justify-start items-center gap-2 inline-flex">
                  <div className="w-6 h-6 justify-center items-center flex">
                    <div className="w-6 h-6 relative">
                      <img src={dollar.src} alt="" />
                    </div>
                  </div>
                  <div className="text-black text-lg font-normal font-['Helvetica Neue'] leading-[27px]">
                    {post?.price != -1 && "Price: " + post?.price}
                    {post?.hourly != -1 && post?.hourly + "$ hr"}
                  </div>
                </div>
                <div className="justify-start items-center gap-2 inline-flex">
                  <div className="w-6 h-6 justify-center items-center flex">
                    <div className="w-6 h-6 relative">
                      <img src={clock.src} alt="" />
                    </div>
                  </div>
                  <div className="w-[162px] text-black text-lg font-normal font-['Helvetica Neue'] leading-[27px]">
                    Posted 5hrs ago
                  </div>
                </div>
              </div>
              <div className="flex items-center py-5 justify-start">
                <div className="mr-2 flex-col justify-center items-center inline-flex">
                  <div className="px-10 py-3 bg-green-600 rounded-lg shadow border justify-center items-center gap-[5px] inline-flex">
                    <div className="text-center text-white text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
                      Apply Now
                    </div>
                  </div>
                </div>
                <div className="w-[232px] h-[46px] pl-1 flex-col justify-start items-start gap-2 inline-flex">
                  <div className="grow shrink basis-0 px-10 rounded-[40px] border border-green-600 justify-center items-center gap-[5px] inline-flex">
                    <div className="w-6 h-6 relative">
                      <img src={bookmark.src} alt="" />
                    </div>
                    <div className="text-center text-green-600 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
                      Save This Job
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[430px] h-[350px] bg-slate-100 p-5 rounded-xl flex-col justify-start items-start gap-4 inline-flex">
              <div className="flex-col justify-start items-start gap-2 flex">
                <div className="text-center text-black text-sm font-medium font-['Helvetica Neue'] leading-[21px]">
                  Job Categories
                </div>
                <div className="justify-start items-start gap-2 inline-flex">
                  <div className="px-2 py-1 rounded-lg shadow border border-slate-800 justify-center items-center gap-1 flex">
                    <div className="text-slate-800 text-xs font-normal font-['Helvetica Neue'] leading-[18px]">
                      {post.type.cleaning && "Cleaning"}
                      {post.type.cuttingGrass && "Cutting Grass"}
                      {post.type.movingHeavyObjects && "Moving"}
                      {post.type.plumbering && "Plumbing"}
                      {post.type.walkingTheDog && "Dog Walking"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-col justify-start items-start gap-2 flex">
                <div className="text-center text-black text-sm font-medium font-['Helvetica Neue'] leading-[21px]">
                  Skills
                </div>
                <div className="justify-start items-start gap-2 inline-flex">
                  <div className="px-2 py-1 rounded-lg shadow border border-slate-800 justify-center items-center gap-1 flex">
                    <div className="text-slate-800 text-xs font-normal font-['Helvetica Neue'] leading-[18px]">
                      {post.type.cleaning && "Cleaning"}
                      {post.type.cuttingGrass && "Cutting Grass"}
                      {post.type.movingHeavyObjects && "Moving"}
                      {post.type.plumbering && "Plumbing"}
                      {post.type.walkingTheDog && "Dog Walking"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-col justify-start items-start gap-1 flex">
                <div className="text-center text-black text-sm font-medium font-['Helvetica Neue'] leading-[21px]">
                  Experience Level
                </div>
                <div className="text-center text-slate-600 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
                  Intermediate, Professional
                </div>
              </div>
              <div className="flex-col justify-start items-start gap-1 flex">
                <div className="text-center text-black text-sm font-medium font-['Helvetica Neue'] leading-[21px]">
                  Share this Job
                </div>
                <div className="pl-3 pr-[17px] py-[11px] bg-emerald-100 bg-opacity-40 rounded-lg justify-start items-center inline-flex">
                  <div className="text-gray-500 text-xs font-medium font-['Helvetica Neue'] leading-[18px]">
                    {window.location.href}
                  </div>
                </div>
                <div className="text-center text-green-600 text-sm font-medium font-['Helvetica Neue'] leading-[21px]">
                  Copy Link
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center my-20">
              <div className="flex mb-5 justify-start w-full">
                <div className="w-[254px] text-black text-lg font-bold font-['Helvetica Neue'] leading-[27px]">
                  Overview{" "}
                </div>
              </div>
              <div className="w-[989px] text-black text-base font-normal font-['Helvetica Neue'] leading-normal">
                {post?.description}
              </div>
            </div>
          </div>
          <div className="w-[843px] my-10">
            <div className="w-[254px] mb-5 text-black text-lg font-bold font-['Helvetica Neue'] leading-[27px]">
              Responsibilities
            </div>
            <span className="text-black text-base font-normal font-['Helvetica Neue'] leading-normal">
              Install, inspect, and troubleshoot air conditioning units in
              accordance with industry standards.
              <br />
            </span>
            <span className="text-black text-base font-normal font-['Helvetica Neue'] leading-normal">
              <br />
            </span>
            <span className="text-black text-base font-normal font-['Helvetica Neue'] leading-normal">
              Collaborate with team members to coordinate installation schedules
              and ensure timely project completion.
              <br />
            </span>
            <span className="text-black text-base font-normal font-['Helvetica Neue'] leading-normal">
              <br />
            </span>
            <span className="text-black text-base font-normal font-['Helvetica Neue'] leading-normal">
              Conduct thorough assessments of clients' HVAC needs and recommend
              appropriate solutions.
              <br />
            </span>
            <span className="text-black text-base font-normal font-['Helvetica Neue'] leading-normal">
              <br />
            </span>
            <span className="text-black text-base font-normal font-['Helvetica Neue'] leading-normal">
              Maintain accurate records of all installations, repairs, and
              inspections.
              <br />
            </span>
            <span className="text-black text-base font-normal font-['Helvetica Neue'] leading-normal">
              <br />
            </span>
            <span className="text-black text-base font-normal font-['Helvetica Neue'] leading-normal">
              Provide excellent customer service by addressing client inquiries
              and concerns with professionalism.
              <br />
            </span>
            <span className="text-black text-base font-normal font-['Helvetica Neue'] leading-normal">
              <br />
            </span>
            <span className="text-black text-base font-normal font-['Helvetica Neue'] leading-normal">
              Stay updated on industry trends and technological advancements in
              HVAC systems.
            </span>
          </div>
          <div className="w-full flex justify-center">
            <div className="w-[816px] h-[156px] px-14 py-7 rounded-lg shadow border border-gray-200 flex-col justify-start items-start gap-1 inline-flex">
              <div className="justify-start items-center gap-6 inline-flex">
                <div className="justify-start items-center gap-6 flex">
                  <img
                    className="w-[100px] h-[100px] rounded-full"
                    src={
                      postUser?.profilePicture
                        ? postUser.profilePicture
                        : DefaultProfilePicture.src
                    }
                  />
                  <div className="flex-col flex">
                    <div className="w-[283px] text-black text-lg font-bold font-['Helvetica Neue'] leading-[27px]">
                      {postUser?.username}
                    </div>
                    <div className="flex-col justify-center items-center flex">
                      <div className="justify-center flex">
                        <div className="mr-1">
                          <img src={star.src} alt="" />
                        </div>
                        <div className="w-[271px] text-slate-600 font-['Helvetica Neue']">
                          4.8 | 5 rating based on 37 reviews
                        </div>
                      </div>
                      <div className="w-[271px] text-slate-600 text-base font-normal font-['Helvetica Neue'] leading-normal">
                        Based in:{" "}
                        {postUser?.location.state +
                          "/" +
                          postUser?.location.city}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[50%] pl-1 pt-1 flex-col justify-start items-start gap-2 inline-flex">
                  <div className="grow shrink basis-0 px-3 bg-green-600 rounded-lg shadow border justify-center items-center gap-[5px] inline-flex">
                    <div className="text-center text-white text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
                      Contact Me About This Job
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Page404 />
      )}
    </div>
  );
};

export default page;
