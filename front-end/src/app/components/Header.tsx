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
import SignInButton from "./SignInButton";
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
        {user.isLoggedIn && (
          <div className="justify-center items-center gap-1 flex">
            <Link
              href="/messages/dms"
              className="text-center text-white text-base font-normal font-['Helvetica Neue'] leading-normal"
            >
              Messages
            </Link>
          </div>
        )}
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
        <SignInButton />
        <Link
          href="/post/create"
          className="w-[210px] h-full flex-col justify-end items-end gap-2 inline-flex"
        >
          <div className="grow shrink basis-0 px-10 py-3 bg-green-600 rounded-xl shadow justify-center items-center gap-[5px] inline-flex">
            <div className="text-center text-white text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
              Create a Listing
            </div>
            <div className="justify-center items-center flex">
              <div className="flex-col justify-center text-white items-center flex">
                <FontAwesomeIcon icon={faAnglesRight} />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
