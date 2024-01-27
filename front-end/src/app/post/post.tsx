"use client";
import React, { useEffect, useState } from "react";
import { BACKEND_SERVER_IP } from "../layout";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import ImagePreview from "../components/ImagePreview";
import Link from "next/link";
import EditDesc from "../components/EditDesc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookBookmark,
  faBriefcase,
  faCheck,
  faLocation,
  faLocationDot,
  faPen,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
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
import { setChattingWith } from "../features/appSlice";
import EditAvailability from "../components/EditAvailability";
import { Metadata } from "next";

const Page = () => {
  const [preview, setPreview] = useState(false);
  const [previewPictures, setPreviewPictures] = useState<string[]>();
  const [previewPicturesIndex, setPreviewPicturesIndex] = useState(0);
  const [titleEditShow, setTitleEditShow] = useState(false);
  const [editLocationShow, setEditLocationShow] = useState(false);
  const [wageEditShow, setWageEditShow] = useState(false);
  const [descEditShow, setDescEditShow] = useState(false);
  const [availabilityEditShow, setAvailabilityEditShow] = useState(false);
  const [typeEditShow, setTypeEditShow] = useState(false);
  const router = useRouter();
  useEffect(() => {
    getPost();
  }, []);
  const dispatch = useDispatch();
  const [post, setPost] = useState<post>();
  const searchParams = useSearchParams();
  const user = useSelector((shop: any) => shop.app.user);
  const [postUser, setPostUser] = useState<user>();
  const [applied, setApplied] = useState(false);
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
    if (post.applicants.filter((id: string) => user.userId == id).length != 0)
      setApplied(true);
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
    getPost();
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
    /* ⬇ start of main div ⬇ */
    <div className="flex flex-col justify-center items-center">
      {post ? (
        /* ⬇ start of wrapper div ⬇ */
        <div className="flex flex-col w-[100vw] items-center justify-center my-20">
          <div className="flex flex-col md:flex-row w-[90%] md:w-[70%] items-center justify-center">
            {/* ⬇ start of details div ⬇ */}

            <div className="flex flex-col md:flex-row w-full md:justify-between gap-5">
              {/* ⬇ start of left part of details div ⬇ */}
              <div className="">
                <div className="text-4xl flex items-center mb-7 md:mb-5 font-bold">
                  <div>{post?.title}</div>
                  {post.user == user.userId && !titleEditShow && (
                    <button
                      onClick={() => setTitleEditShow(true)}
                      className="ms-2 flex justify-center items-center w-7 h-7 text-white rounded-full bg-green-600"
                    >
                      <FontAwesomeIcon className="text-sm" icon={faPen} />
                    </button>
                  )}
                </div>
                {/* ⬇ start of details div ⬇ */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-7 flex justify-center items-center">
                      <img src={location.src} alt="" />
                    </div>
                    <div className="text-lg">
                      {post?.location.state + "/" + post?.location.city}
                    </div>
                    {post.user == user.userId && !editLocationShow && (
                      <button
                        onClick={() => setEditLocationShow(true)}
                        className="ms-2 flex justify-center items-center w-7 h-7 text-white rounded-full bg-green-600"
                      >
                        <FontAwesomeIcon className="text-sm" icon={faPen} />
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <div className="text-[18px] flex justify-center w-7 items-center">
                      <FontAwesomeIcon icon={faBookmark} />
                    </div>
                    <div className="text-lg">
                      {post.type.cleaning && "Cleaning"}
                      {post.type.cuttingGrass && "Cutting Grass"}
                      {post.type.moving && "Moving"}
                      {post.type.plumbing && "Plumbing"}
                      {post.type.dogWalking && "Dog Walking"}
                    </div>
                    {post.user == user.userId && !typeEditShow && (
                      <button
                        onClick={() => setTypeEditShow(true)}
                        className="ms-2 flex justify-center items-center w-7 h-7 text-white rounded-full bg-green-600"
                      >
                        <FontAwesomeIcon className="text-sm" icon={faPen} />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 flex justify-center items-center">
                      <img src={briefcase.src} alt="" />
                    </div>
                    <div className="text-lg">
                      {post.availability.fullTime && "Full Time"}
                      {post.availability.partTime && "Part Time"}
                    </div>
                    {post.user == user.userId && !availabilityEditShow && (
                      <button
                        onClick={() => setAvailabilityEditShow(true)}
                        className="ms-2 flex justify-center items-center w-7 h-7 text-white rounded-full bg-green-600"
                      >
                        <FontAwesomeIcon className="text-sm" icon={faPen} />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 flex justify-center items-center">
                      <img src={dollar.src} alt="" />
                    </div>
                    <div className="text-lg">
                      {post?.price != -1 && "Price: " + post?.price + "$"}
                      {post?.hourly != -1 && post?.hourly + "$ hr"}
                    </div>
                    {post.user == user.userId && !wageEditShow && (
                      <button
                        onClick={() => setWageEditShow(true)}
                        className="ms-2 flex justify-center items-center w-7 h-7 text-white rounded-full bg-green-600"
                      >
                        <FontAwesomeIcon className="text-sm" icon={faPen} />
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="w-7 flex justify-center items-center">
                      <img src={clock.src} alt="" />
                    </div>
                    <div className="text-lg">
                      Posted {post.postedTimeAgoText}
                    </div>
                  </div>
                </div>
                {/* ⬆ end of details div ⬆ */}

                {/* ⬇ start of buttons div ⬇  */}
                <div>
                  {user.userId != post.user ? (
                    <div className="flex gap-1 justify-between md:justify-start items-center py-5">
                      {!applied ? (
                        <button
                          onClick={applyToPost}
                          className="flex grow shrink md:px-10 py-3 text-white font-semibold md:text-sm bg-green-600 rounded-lg shadow border justify-center items-center"
                        >
                          Apply Now
                        </button>
                      ) : (
                        <Link
                          href={"/appliedposts"}
                          className="grow shrink md:px-10 py-3 gap-2 group rounded-lg border hover:text-white hover:bg-green-600 md:text-sm text-green-600 border-green-600 flex justify-center items-center"
                        >
                          See All Posts You Have Applied To
                        </Link>
                      )}
                      <button
                        onClick={savePost}
                        className="grow shrink md:px-10 py-3 gap-2 group rounded-lg border hover:text-white hover:bg-green-600 md:text-sm text-green-600 border-green-600 flex justify-center items-center"
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
                  ) : (
                    <div className="mt-10">
                      <Link
                        className="grow shrink md:px-10 py-3 gap-2 group rounded-lg border hover:text-white hover:bg-green-600 text-green-600 border-green-600 flex justify-center items-center"
                        href={`post/applicants?id=${post._id}`}
                      >
                        See Who Applied To Your Post
                      </Link>
                    </div>
                  )}
                </div>
                {/* ⬆ end of buttons div ⬆ */}
              </div>
              {/* ⬆ end of left part of details div ⬆ */}

              {/* ⬇ start of right part of details div ⬇ */}
              <div className="md:w-[430px] md:h-[350px] flex flex-col bg-slate-50 p-5 rounded-xl gap-4">
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
                  <div className="w-full flex items-center mt-2 gap-3 text-green-600 text-sm">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert("The link has been copied to your clipboard!");
                      }}
                    >
                      Copy Link
                    </button>
                    <Link
                      href={`/post/applicants?id=${searchParams.get("id")}`}
                    >
                      See Applicants
                    </Link>
                  </div>
                </div>
              </div>
              {/* ⬆ end of right part of details div ⬆ */}
            </div>
            {/* ⬆ end of details div ⬆ */}
          </div>

          {/* ⬇ start of description div ⬇ */}
          <div className="flex w-[90%] md:w-[70%]">
            <div className="flex flex-col my-20">
              <div className="flex">
                <div className="text-lg font-bold">Overview</div>
                {post.user == user.userId && !descEditShow && (
                  <button
                    onClick={() => setDescEditShow(true)}
                    className="ms-2 flex justify-center items-center w-7 h-7 text-white rounded-full bg-green-600"
                  >
                    <FontAwesomeIcon className="text-sm" icon={faPen} />
                  </button>
                )}
              </div>
              <div className="">{post?.description}</div>
            </div>
          </div>
          {/* ⬆ end of description div ⬆ */}

          {/* ⬇ start of user card div ⬇ */}
          <div className="w-full flex flex-col items-center justify-center">
            <div className="flex flex-col px-4 md:px-14 py-7 rounded-lg border border-gray-200 md:flex-row items-center gap-6">
              <div className="flex items-center gap-6">
                <img
                  className="w-16 h-16 md:w-[100px] md:h-[100px] rounded-full"
                  src={
                    postUser?.profilePicture
                      ? postUser.profilePicture
                      : DefaultProfilePicture.src
                  }
                />
                <div className="flex flex-col">
                  <div className="text-lg font-bold">{postUser?.username}</div>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <div className="mr-1">
                        <img src={star.src} alt="" />
                      </div>
                      <div className="text-slate-600">
                        {postUser?.freelancerDetails?.starAverage} | 5 Rated,
                        Verified Freelancer
                      </div>
                    </div>
                    <div className="w-full text-slate-600">
                      Based in:{" "}
                      {postUser?.location.state + "/" + postUser?.location.city}
                    </div>
                  </div>
                </div>
              </div>

              <AuthButtons user={user} post={post} />
            </div>
          </div>
          {/* ⬆ end of user card div ⬆ */}

          {/* ⬇ start of editing components ⬇ */}
          {titleEditShow && (
            <EditTitle
              show={titleEditShow}
              setShow={setTitleEditShow}
              id={post._id}
            />
          )}
          {typeEditShow && (
            <EditJobType
              show={typeEditShow}
              setShow={setTypeEditShow}
              type={post.type}
              id={post._id}
            />
          )}
          {editLocationShow && (
            <EditLocation
              show={editLocationShow}
              setShow={setEditLocationShow}
              id={post._id}
            />
          )}
          {wageEditShow && (
            <EditWageType
              show={wageEditShow}
              setShow={setWageEditShow}
              id={post._id}
            />
          )}
          {availabilityEditShow && (
            <EditAvailability
              show={availabilityEditShow}
              setShow={setAvailabilityEditShow}
              id={post._id}
            />
          )}
          {descEditShow && (
            <EditDesc
              show={descEditShow}
              text={post.description}
              setShow={setDescEditShow}
              id={post._id}
            />
          )}
          {/* ⬆ end of editing components ⬆ */}
        </div>
      ) : (
        /* ⬆ end of wrapper div ⬆ */

        <Page404 />
      )}
    </div>
    /* ⬆ end of main div ⬆ */
  );
};

export default Page;
