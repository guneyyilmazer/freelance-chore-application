"use client";
import React, { useEffect, useState } from "react";
import { BACKEND_SERVER_IP } from "../layout";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
type JobType = {
  cleaning?: true;
  walkingTheDog?: true;
  cuttingGrass?: true;
  movingHeavyObjects?: true;
  plumbering?: true;
};
type post = {
  _id: string;
  user: string;
  title: string;
  description: string;
  price: number;
  picture: string;
  pictures: string[];
  type: JobType;
};
const Post = () => {
  useEffect(() => {
    getPost();
  }, []);
  const [post, setPost] = useState<post>();
  const searchParams = useSearchParams();
  const user = useSelector((shop: any) => shop.app.user);

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
  return (
    <div className="flex text-center justify-center">
      {post && (
        <div className=" p-3 w-[50vw] flex flex-col m-5">
          <h3 className="text-3xl my-5 font-semibold">{post.title}</h3>
          <span className="text-sm">
            Type:{post.type.cleaning && "Cleaning"}
            {post.type.cuttingGrass && "Cutting Grass"}
            {post.type.movingHeavyObjects && "Moving Heavy Objects"}
            {post.type.plumbering && "Plumbering"}
            {post.type.walkingTheDog && "Walking The Dog"}
          </span>
          <span className="text-sm">Price:{post.price}$</span>
          <span className="text-sm">{post.description.slice(0, 50)}</span>
          <div className="flex justify-center my-4">
            <img
              className="max-h-72 rounded cursor-pointer hover:opacity-80"
              src={post.picture}
            />
          </div>
          <div className="flex justify-center">
            {post.pictures.map((item) => (
              <img
                className="w-10 cursor-pointer hover:opacity-80"
                src={item}
              />
            ))}
          </div>
          <div>
            {user.userId != post.user && (
              <button
                onClick={() => localStorage.setItem("chattingWith", post.user)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-5 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Send A Message
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
