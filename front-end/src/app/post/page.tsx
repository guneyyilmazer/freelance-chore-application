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
import bookmarkWhite from "../images/bookmark-white.svg";
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
  const savePost = async () => {
    const res = await fetch(`${BACKEND_SERVER_IP}/user/savePost`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },

      method: "POST",
      body: JSON.stringify({
        id: post?._id,
      }),
    });
    const data = await res.json();
    if (res.status == 200) alert("Successfully saved post!");
    //@ts-ignore
    if (data.error)
      //@ts-ignore
      alert(data.error);
  };
  const applyToPost = async () => {
    const res = await fetch(`${BACKEND_SERVER_IP}/post/applyToPost`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },

      method: "POST",
      body: JSON.stringify({
        id: post?._id,
      }),
    });
    const data = await res.json();
    if (res.status == 200) alert("Successfully applied!");
    //@ts-ignore
    if (data.error)
      //@ts-ignore
      alert(data.error);
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
            <div className="flex flex-col gap-5">
              <div className="text-4xl font-bold">{post?.title}</div>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <div>
                    <img src={location.src} alt="" />
                  </div>
                  <div className="text-lg">
                    {post?.location.state + "/" + post?.location.city}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <img src={briefcase.src} alt="" />
                  </div>
                  <div className="text-lg">Contract</div>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <img src={dollar.src} alt="" />
                  </div>
                  <div className="text-lg">
                    {post?.price != -1 && "Price: " + post?.price}
                    {post?.hourly != -1 && post?.hourly + "$ hr"}
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div>
                    <img src={clock.src} alt="" />
                  </div>
                  <div className="text-lg">Posted {post.postedTimeAgoText}</div>
                </div>
              </div>
              <div className="flex items-center py-5">
                <button
                  onClick={applyToPost}
                  className="flex px-10 py-3 text-white font-semibold text-sm bg-green-600 rounded-lg shadow border justify-center items-center"
                >
                  Apply Now
                </button>
                <div className="pl-1 flex-col gap-2 inline-flex">
                  <button
                    onClick={savePost}
                    className="p-3 gap-2 group rounded-lg border hover:text-white hover:bg-green-600 text-sm text-green-600 border-green-600 flex justify-center items-center"
                  >
                    <div className="text-md group-hover:hidden">
                      <img src={bookmark.src} alt="" />
                    </div>
                    <div className="text-md hidden group-hover:block">
                      <img src={bookmarkWhite.src} alt="" />
                    </div>
                    Save This Job
                  </button>
                </div>
              </div>
            </div>
            <div className="w-[430px] h-[350px] flex flex-col bg-slate-50 p-5 rounded-xl gap-4">
              <div className="flex flex-col gap-2">
                <div className="text-sm">Job Categories</div>
                <div className="flex gap-2">
                  <div className="px-2 py-1 rounded-lg shadow border border-slate-800 justify-center items-center gap-1 flex">
                    <div className="text-slate-800 text-xs">
                      {post.type.cleaning && "Cleaning"}
                      {post.type.cuttingGrass && "Cutting Grass"}
                      {post.type.moving && "Moving"}
                      {post.type.plumbing && "Plumbing"}
                      {post.type.dogWalking && "Dog Walking"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-sm">Skills</div>
                <div className="flex">
                  <div className="px-2 py-1 rounded-lg shadow border border-slate-800 justify-center items-center gap-1 flex">
                    <div className="text-slate-800 text-xs">
                      {post.type.cleaning && "Cleaning"}
                      {post.type.cuttingGrass && "Cutting Grass"}
                      {post.type.moving && "Moving"}
                      {post.type.plumbing && "Plumbing"}
                      {post.type.dogWalking && "Dog Walking"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-col justify-start items-start gap-1 flex">
                <div className="text-sm">Experience Level</div>
                <div className="text-slate-600 text-sm">
                  {post.skillLevel.charAt(0).toUpperCase() +
                    post.skillLevel.slice(1)}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-sm">Share this Job</div>
                <div className="flex pl-3 pr-[17px] py-[11px] bg-emerald-100 bg-opacity-40 rounded-lg items-center">
                  <div className="text-gray-500 text-xs">
                    {window.location.href}
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("The link has been copied to your clipboard!");
                  }}
                  className="text-start mt-2 text-green-600 text-sm"
                >
                  Copy Link
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center my-20">
              <div className="flex mb-5 justify-start w-full">
                <div className="text-lg font-bold">Overview</div>
              </div>
              <div className="w-[1000px] text-black text-base">
                {post?.description}
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <div className="flex flex-col px-14 py-7 rounded-lg shadow border border-gray-200">
              <div className="flex justify-between items-center gap-6">
                <div className="flex items-center gap-6">
                  <img
                    className="w-[100px] h-[100px] rounded-full"
                    src={
                      postUser?.profilePicture
                        ? postUser.profilePicture
                        : DefaultProfilePicture.src
                    }
                  />
                  <div className="flex flex-col">
                    <div className="text-lg font-bold">
                      {postUser?.username}
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <div className="flex justify-center">
                        <div className="mr-1">
                          <img src={star.src} alt="" />
                        </div>
                        <div className="text-slate-600">
                          4.8 | 5 rating based on 37 reviews
                        </div>
                      </div>
                      <div className="w-full text-slate-600">
                        Based in:{" "}
                        {postUser?.location.state +
                          "/" +
                          postUser?.location.city}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex py-2.5 px-3 bg-green-600 rounded-lg shadow border justify-center items-center">
                  <div className="text-center text-white text-sm">
                    Contact Me About This Job
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
