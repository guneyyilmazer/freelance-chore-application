"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BACKEND_SERVER_IP } from "../layout";
import { useSearchParams } from "next/navigation";
import { user } from "../types/UserTypes";
import { useSelector } from "react-redux";
import DefaultProfilePicture from "../images/default.jpeg";
import Link from "next/link";
const page = () => {
  const client = useSelector((shop: any) => shop.app.user);
  const [user, setUser] = useState<user>();
  const searchParams = useSearchParams();
  useEffect(() => {
    getUser();
  });
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
  return (
    <div className="flex flex-col my-5 justify-center items-center">
      <div className="my-5">{user?.username}</div>
      <div>
        <img
          src={
            user?.profilePicture
              ? user.profilePicture
              : DefaultProfilePicture.src
          }
        />
      </div>
      <div>
        {user && user.userId != client.userId && (
          <div className="my-5">
            <Link
              href="/messages"
              onClick={() => {
                localStorage.setItem("chattingWith", user.userId);
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send A Message
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
