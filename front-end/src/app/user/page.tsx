"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BACKEND_SERVER_IP, categories } from "../layout";
import { useRouter, useSearchParams } from "next/navigation";
import { user } from "../types/UserTypes";
import { useSelector } from "react-redux";
import DefaultProfilePicture from "../images/default.jpeg";
import AuthButtons from "./AuthButtons";
import location from "../images/location.svg";
import star from "../images/Star.svg";
import { post } from "../types";
const Page = () => {
  const client = useSelector((shop: any) => shop.app.user);
  const [user, setUser] = useState<user>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [allPages, setAllPages] = useState([1]);
  const [lastPage, setLastPage] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState<number>(
    searchParams.get("page") ?
      Number(searchParams.get("page")) > 0 &&
        !lastPage
        ? Number(searchParams.get("page"))
        : 1 : 1
  );
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
  useEffect(() => {
    user && getPosts();
  }, [user]);
  const getPosts = async () => {
    const res = await fetch(
      `${BACKEND_SERVER_IP}/user/getThisFreelancersHiredPosts`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Cookies.get("Auth_Token")}`,
        },
        body: JSON.stringify({
          page,
          amount: 10,
          id: user?.userId,
          completed: true,
        }),
        method: "POST",
      }
    );
    const response = await res.json();
    setPosts(response.posts);
    setAllPages(() => {
      let allPages = [];
      for (let i = 1; i < response.pagesCount + 1; i++) {
        allPages.push(i);
      }
      return allPages;
    });
    setLastPage(response.lastPage);
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between md:text-sm md:w-full">
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
                    <div className="text-zinc-900">{user.freelancerDetails?.starAverage}</div>
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
            <div className="text-slate-800 text-2xl font-bold">
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
          <div className="md:w-full">
            <h3 className="text-xl font-semibold">About Me</h3>
            {user.freelancerDetails?.aboutMe}</div>

          <div className="mt-10">
            <h3 className="text-xl font-bold">Work History</h3>
            {posts && posts.map((post: post, index: number) => (
              <div key={index}>
                <div className="h-px my-2 bg-slate-200"></div>
                <div className="font-bold">{post.title}</div>
                <div>
                  {post.reviews.hirerReview.star == 5 ? (
                    <div className="flex">
                      <img src={star.src} alt="" />
                      <img src={star.src} alt="" />
                      <img src={star.src} alt="" />
                      <img src={star.src} alt="" />
                      <img src={star.src} alt="" />
                    </div>
                  ) : post.reviews.hirerReview.star == 4 ? (
                    <div className="flex">
                      <img src={star.src} alt="" />
                      <img src={star.src} alt="" />
                      <img src={star.src} alt="" />
                      <img src={star.src} alt="" />
                    </div>
                  ) : post.reviews.hirerReview.star == 3 ? (
                    <div className="flex">
                      <img src={star.src} alt="" />
                      <img src={star.src} alt="" />
                      <img src={star.src} alt="" />
                    </div>
                  ) : post.reviews.hirerReview.star == 2 ? (
                    <div className="flex">
                      <img src={star.src} alt="" />
                      <img src={star.src} alt="" />
                    </div>
                  ) : post.reviews.hirerReview.star == 1 ? (
                    <div>
                      <img src={star.src} alt="" />
                    </div>
                  ) : (
                    <div className="text-sm">not rated</div>
                  )}
                </div>
                <div>{post.reviews.hirerReview.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
