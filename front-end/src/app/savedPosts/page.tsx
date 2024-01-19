"use client";
import React, { useEffect, useState } from "react";
import { BACKEND_SERVER_IP } from "../layout";
import Cookies from "js-cookie";
import { post } from "../types";
import Link from "next/link";
import bookmark from "../images/bookmark.svg";
const page = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = async () => {
    const res = await fetch(`${BACKEND_SERVER_IP}/user/getSavedPosts`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },

      method: "POST",
      body: JSON.stringify({
        page: 1,
        amount: 10,
      }),
    });
    const { posts } = await res.json();
    setSavedPosts(posts);
  };
  return (
    <div>
      {savedPosts.map((post: post) => (
        <Link
          href={`/post?id=${post._id}`}
          className="h-[240px] hover:opacity-60 mb-4 w-[450px] p-6 bg-white rounded-lg shadow border border-gray-200 flex flex-col justify-center gap-5"
        >
          <div className="flex flex-col">
            <div className="text-black my-2 text-lg font-medium">
              {post.type.cleaning && "Cleaning Specialist"}
              {post.type.cuttingGrass && "Grass Cutting Specialist"}
              {post.type.moving && "Moving Specialist"}
              {post.type.plumbing && "Plumber"}
              {post.type.dogWalking && "Dog Walker"}
            </div>
            <div className="flex items-center">
              <div className="px-2 py-1 mr-2 bg-emerald-100 bg-opacity-80 rounded-sm flex">
                <div className="text-green-600 text-xs font-medium">
                  {post.hourly != -1 && "HOURLY"}
                  {post.price != -1 && "FIXED PRICE"}
                </div>
              </div>
              <div className="text-slate-600 text-sm font-normal">
                {post.hourly != -1 && "Hourly Pay: " + post.hourly + "$"}
                {post.price != -1 && "Price: " + post.price + "$"}
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col w-full">
              <div>Posted {post.postedTimeAgoText}</div>
              <div className="flex items-center my-2">
                <img src={location.src} alt="" />
                <div className="text-gray-400 ml-1 text-sm font-normal">
                  {post.location.state + "/" + post.location.city}
                </div>
              </div>
            </div>
            <div className="m-1">
              <img src={bookmark.src} alt="" />
            </div>
          </div>
          <div>
            {post.description.slice(0, 100)}{" "}
            {post.description.length > 100 && "..."}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default page;
