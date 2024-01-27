"use client";
import React, { useEffect, useState } from "react";
import { BACKEND_SERVER_IP } from "../../../layout";
import Cookies from "js-cookie";
import { post } from "../../../types";
import Link from "next/link";
import bookmark from "../../../images/bookmark.svg";
import location from "../../../images/location.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faCaretLeft,
  faCaretRight,
  faFilter,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter, useSearchParams } from "next/navigation";
const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [allPages, setAllPages] = useState([1]);
  const [lastPage, setLastPage] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState<number>(
    searchParams.get("page")
      ? Number(searchParams.get("page")) > 0 && !lastPage
        ? Number(searchParams.get("page"))
        : 1
      : 1
  );
  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = async () => {
    const res = await fetch(`${BACKEND_SERVER_IP}/user/getAppliedPosts`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },
      body: JSON.stringify({ page, amount: 10 }),
      method: "POST",
    });
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
    <div className="flex flex-col items-center justify-center">
      <div className="w-full md:w-[80vw] overflow-y-auto flex items-center flex-col">
        <div className="w-[90%] flex flex-col">
          <div className="flex justify-between w-full my-20 items-center">
            <div className="flex flex-col">
              <div className="text-xl font-bold">
                All Jobs You Have Applied To
              </div>
              <div>Showing {posts.length} results</div>
            </div>
          </div>
          {/*  POSTS */}
          <div className="flex flex-wrap w-full justify-between">
            {posts.map((post: post, index: number) => (
              <div key={index} className="flex items-center">
                <Link
                  href={`/post?id=${post._id}`}
                  className="h-[240px] hover:opacity-60 mb-4 w-full md:w-[450px] p-6 bg-white rounded-lg shadow border border-gray-200 flex flex-col justify-center gap-5"
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
                        {post.hourly != -1 &&
                          "Hourly Pay: " + post.hourly + "$"}
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
                  </div>
                  <div>
                    {post.description.slice(0, 100)}{" "}
                    {post.description.length > 100 && "..."}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-px mt-5 bg-gray-200" />

      <div className="w-[90%] relative mt-2 bg-blac flex justify-center items-center">
        <div className="flex absolute right-0">
          <select
            style={{ textAlignLast: "center" }}
            className="px-2 appearance-none border shadow"
          >
            {allPages.map((page) => (
              <option key={page} className="bg-slate-200" value={page}>
                {page}
              </option>
            ))}
          </select>
          <span className="ml-1">
            <FontAwesomeIcon icon={faAngleUp} />
          </span>
        </div>

        <button
          className="text-xl px-2 rounded-full mx-1 text-green-600"
          onClick={() => {
            page - 1 > 0 && router.replace(`/appliedposts/?page=${page - 1}`);
            setPage((page) => {
              if (page - 1 > 0) return page - 1;
              else return page;
            });
          }}
        >
          <FontAwesomeIcon icon={faCaretLeft} />
        </button>
        <span>{page}</span>
        <button
          className="text-xl px-2 rounded-full mx-1 text-green-600"
          onClick={() => {
            !lastPage && router.replace(`/appliedposts/?page=${page + 1}`);

            setPage((page) => {
              if (!lastPage) return page + 1;
              else return page;
            });
          }}
        >
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
      </div>
    </div>
  );
};

export default Page;
