"use client";
import React, { useEffect, useState } from "react";
import { BACKEND_SERVER_IP } from "../layout";

import Cookies from "js-cookie";

type JobType = {
  cleaning?: true;
  walkingTheDog?: true;
  cuttingGrass?: true;
  movingHeavyObjects?: true;
  plumbering?: true;
  random?: true;
};
type post = {
  _id: string;
  title: string;
  description: string;
  price: number;
  picture: string;
  pictures: string[];
  type: JobType;
};
const Posts = ({ type }: { type: JobType }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const getPosts = async () => {
    const res = await fetch(`${BACKEND_SERVER_IP}/post`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },

      method: "POST",
      body: JSON.stringify({
        type,
        page: 1,
        amount: 15,
      }),
    });
    const { posts } = await res.json();
    setPosts(posts);
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="flex m-10 justify-center flex-wrap">
      {posts.length != 0 &&
        posts.map((item: post) => (
          <div
            onClick={() => window.location.replace(`post/?id=${item._id}`)}
            className="shadow p-3 w-72 cursor-pointer hover:opacity-80 flex flex-col m-2"
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <span className="text-sm">
              Type:{item.type.cleaning && "Cleaning"}
              {item.type.cuttingGrass && "Cutting Grass"}
              {item.type.movingHeavyObjects && "Moving Heavy Objects"}
              {item.type.plumbering && "Plumbering"}
              {item.type.walkingTheDog && "Walking The Dog"}
            </span>
            <span className="text-sm">Price:{item.price}$</span>
            <span className="text-sm">{item.description.slice(0, 50)}</span>
            <div className="flex justify-center my-4">
              <img className="max-h-72 rounded" src={item.picture} />
            </div>
            <div className="flex justify-center">
              {item.pictures.map((item) => (
                <img className="w-10" src={item} />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Posts;
