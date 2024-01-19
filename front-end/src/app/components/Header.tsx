"use client";
import { faAnglesRight, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_SERVER_IP } from "../layout";
import { setIsLoggedIn, setUser } from "../features/appSlice";
import Cookies from "js-cookie";
import Auth from "./Auth";
import MessagesButton from "./MessagesButton";
const Header = () => {
  const [hamburgerMenuCollapsed, setHamburgerMenuCollapsed] = useState(false);
  const user = useSelector((shop: any) => shop.app.user);
  return (
    <div className="w-[100vw] flex justify-around items-center h-[90px] secondary">
      <Link
        href="/"
        className="w-[89px] h-10 justify-start items-center gap-1.5 inline-flex"
      >
        <div className="w-10 h-10 relative" />
        <div className="text-center text-white text-xl font-bold font-['Helvetica Neue'] leading-[30px]">
          orea
        </div>
      </Link>
      <div className="w-[327px] h-6 justify-center items-center gap-5 inline-flex">
        <div className="justify-center items-center gap-2 flex">
          <Link
            href="/posts"
            className="text-center text-white text-base font-normal font-['Helvetica Neue'] leading-normal"
          >
            Jobs
          </Link>
        </div>
        <MessagesButton />
        <Link
          href="/freelancers"
          className="justify-center items-center gap-1 flex"
        >
          <div className="text-center text-white text-base font-normal font-['Helvetica Neue'] leading-normal">
            Freelancers
          </div>
        </Link>
        <div className="justify-center items-center gap-1 flex">
          <div className="text-center text-white text-base font-normal font-['Helvetica Neue'] leading-normal">
            Resources
          </div>
        </div>
      </div>
      <div className="w-[370px] flex justify-between">
        {!user.isLoggedIn && (
          <Link
            href="/auth"
            className="px-10 py-3 text-white rounded-xl shadow border border-white justify-center items-center"
          >
            Sign In
          </Link>
        )}
        {user.isLoggedIn && (
          <button
            onClick={() => {
              Cookies.remove("Auth_Token");
              window.location.reload();
            }}
            className="px-10 py-3 text-white rounded-xl shadow border border-white justify-center items-center"
          >
            Logout
          </button>
        )}
        <Link
          href="/post/create"
          className="px-10 py-3 text-white gap-2 bg-green-600 flex rounded-xl"
        >
          Create a Listing
          <div className="justify-center items-center flex">
            <FontAwesomeIcon icon={faAnglesRight} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
