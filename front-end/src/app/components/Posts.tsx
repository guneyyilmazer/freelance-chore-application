"use client";
import React, { useEffect, useState } from "react";
import { BACKEND_SERVER_IP } from "../layout";
import Cookies from "js-cookie";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { post } from "../types";
import { useSelector } from "react-redux";

const Posts = () => {
  const filter = useSelector((shop: any) => shop.app.searchFilter);
  const searchParams = useSearchParams();
  const router = useRouter();

  const [posts, setPosts] = useState([]);
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
        amount: 15,
        type: filter.jobType,
        city: filter.selectedCity,
        state: filter.selectedState,
        price: filter.price,
        hourly: filter.hourly,
      }),
    });
    const response = await res.json();
    setLastPage(response.lastPage);
    setPosts(response.posts);
  };
  useEffect(() => {
    getPosts();
  }, [filter]);
  return (
    <div className="flex flex-col m-10 justify-center text-center">
      <div className="flex flex-wrap justify-center">
        {posts.length != 0 &&
          posts.map((item: post) => (
            <Link
              href={`post/?id=${item._id}`}
              className="shadow p-3 w-72 cursor-pointer hover:opacity-80 flex flex-col m-2"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <span className="text-sm">
                Type:{item.type.cleaning && "Cleaning"}
                {item.type.cuttingGrass && "Cutting Grass"}
                {item.type.moving && "Moving Heavy Objects"}
                {item.type.plumbing && "Plumbering"}
                {item.type.dogWalking && "Walking The Dog"}
              </span>
              <span className="text-sm">
                {item.location.state + "/" + item.location.city}
              </span>
              <span className="text-sm">
                {item.price != -1
                  ? "Price:" + item.price
                  : "Hourly: " + item.hourly}
                $
              </span>
              <span className="text-sm">{item.description.slice(0, 50)}</span>
              <div className="flex justify-center my-4">
                <img className="h-72 rounded" src={item.picture} />
              </div>
              <div className="flex justify-center">
                {item.pictures.map((item) => (
                  <img className="h-10 w-10 m-1" src={item} />
                ))}
              </div>
            </Link>
          ))}
      </div>
      {posts.length != 0 && (
        <div className="flex justify-center items-center">
          <button
            className="text-xl px-2 rounded-full mx-1 bg-green-900 text-white"
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
            className="text-xl px-2 rounded-full mx-1 bg-green-900 text-white"
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
      )}
    </div>
  );
};

export default Posts;
