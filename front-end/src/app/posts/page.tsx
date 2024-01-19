"use client";
import Posts from "../components/Posts";
import { useSelector } from "react-redux";
import FilterSideBar from "../components/FilterSideBarr";
import { BACKEND_SERVER_IP } from "../layout";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { post } from "../types";
import searchNormal from "../images/search-normal.svg";
import location from "../images/location.svg";
import Link from "next/link";
import bookmark from "../images/bookmark.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faArrowUp,
  faCaretLeft,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
const page = () => {
  const filter = useSelector((shop: any) => shop.app.searchFilter);
  const searchParams = useSearchParams();
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [allPages, setAllPages] = useState([1]);
  const [lastPage, setLastPage] = useState(false);
  const [page, setPage] = useState<number>(
    searchParams.get("page") &&
      Number(searchParams.get("page")) > 0 &&
      !lastPage
      ? Number(searchParams.get("page"))
      : 1
  );
  const getPosts = async () => {
    const res = await fetch(`${BACKEND_SERVER_IP}/post`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },

      method: "POST",
      body: JSON.stringify({
        page,
        amount: 10,
        type: filter.jobType,
        hourlyBetween: filter.hourlyBetween,
        city: filter.selectedCity,
        state: filter.selectedState,
        price: filter.price,
        hourly: -2,
        //if its the default value then filter.hourly but if not then -2, which indicated the endpoint to not search based on the hourly value but the hourlyBetween value
      }),
    });
    const response = await res.json();
    setLastPage(response.lastPage);
    setPosts(response.posts);
    setAllPages(() => {
      let allPages = [];
      for (let i = 1; i < response.pagesCount + 1; i++) {
        allPages.push(i);
      }
      return allPages;
    });
  };
  useEffect(() => {
    getPosts();
  }, [filter]);
  return (
    <div>
      <div className="flex">
        <div className="md:w-[20vw] m-20">
          <FilterSideBar page="posts" />
        </div>
        <div className="md:w-[80vw] flex flex-col">
          <div className="w-[90%] flex flex-col">
            <div className="flex justify-between w-full my-20 items-center">
              <div className="flex flex-col">
                <div className="text-xl font-bold">All Jobs</div>
                <div>Showing {posts.length} results</div>
              </div>
              <div className="flex">
                <div>
                  <span className="text-slate-500">Sort By: </span>
                  <span className="text-slate-800">Most Relevant</span>
                </div>
                <div className="ml-2">^</div>
              </div>
            </div>
            {/*  POSTS */}
            <div className="flex flex-wrap w-full justify-between">
              {posts.map((post: post) => (
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
          </div>
          <div className="h-px mt-5 bg-gray-200" />

          <div className="w-[90%] relative mt-2 bg-blac flex justify-center items-center">
            <div className="flex absolute right-0">
              <select
                style={{ textAlignLast: "center" }}
                className="px-2 appearance-none border shadow"
              >
                {allPages.map((page) => (
                  <option className="bg-slate-200" value={page}>
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
                page - 1 > 0 && router.replace(`/posts/?page=${page - 1}`);
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
                !lastPage && router.replace(`/posts/?page=${page + 1}`);

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
      </div>
    </div>
  );
};

export default page;
