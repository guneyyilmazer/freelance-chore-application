"use client";
import { faAnglesRight, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../images/logo.svg";
import hamburgerMenuIcon from "../images/hamburgerMenuIcon.svg";
import closeCircle from "../images/close-circle.svg";
import { BACKEND_SERVER_IP } from "../layout";
import { setIsLoggedIn, setUser } from "../features/appSlice";
import Cookies from "js-cookie";
import Auth from "./Auth";
import MessagesButton from "./MessagesButton";
const Header = () => {
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const user = useSelector((shop: any) => shop.app.user);
  return (
    <div>
      {!hamburgerMenu && (
        <div className="w-[100vw] flex justify-center items-center secondary">
          <div className="w-[90%] h-[10svh] flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 flex justify-center items-center">
                <img src={logo.src} alt="" />
              </div>
              <div className="text-white text-xl font-bold leading-[30px]">
                orea
              </div>
            </Link>
            <button
              onClick={() => {
                setHamburgerMenu(true);
              }}
            >
              <img src={hamburgerMenuIcon.src} alt="" />
            </button>
          </div>
        </div>
      )}
      {hamburgerMenu && (
        <div className="absolute flex flex-col items-center top-0 left-0 secondary z-20 w-[100vw] h-[100vh] text-white">
          <div className="w-[90%]">
            <div className="h-[10svh] flex justify-between items-center">
              <Link
                onClick={() => setHamburgerMenu(false)}
                href="/"
                className="flex items-center"
              >
                <div className="w-10 h-10 flex justify-center items-center">
                  <img src={logo.src} alt="" />
                </div>
                <div className="text-white text-xl font-bold leading-[30px]">
                  orea
                </div>
              </Link>
              <button
                onClick={() => {
                  setHamburgerMenu(false);
                }}
              >
                <img src={closeCircle.src} alt="" />
              </button>
            </div>
            <ul className="gap-5 my-8 flex flex-col ">
              <li>
                {" "}
                <Link
                  href="/posts"
                  onClick={() => setHamburgerMenu(false)}
                  className="text-center text-white"
                >
                  Jobs
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  href="/messages/dms"
                  onClick={() => setHamburgerMenu(false)}
                  className="text-center text-white"
                >
                  Messages
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  href="/freelancers"
                  onClick={() => setHamburgerMenu(false)}
                  className="text-center text-white"
                >
                  Freelancers
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  href="/resources"
                  onClick={() => setHamburgerMenu(false)}
                  className="text-center text-white"
                >
                  Resources
                </Link>
              </li>
            </ul>
            <div className="flex flex-col text-center gap-5">
              <Link
                href="/post/create"
                onClick={() => setHamburgerMenu(false)}
                className="px-10 py-3 gap-2 text-white bg-green-600 rounded-xl"
              >
                <div className="flex justify-center items-center gap-2">
                  Create a Listing
                  <div className="text-xs ">
                    <FontAwesomeIcon icon={faAnglesRight} />
                  </div>
                </div>
              </Link>
              {!user.isLoggedIn && (
                <Link
                  href="/auth"
                  onClick={() => setHamburgerMenu(false)}
                  className="px-10 py-3 text-white rounded-xl shadow border border-white"
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
                  className="px-10 py-3 text-white rounded-xl shadow border border-white"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
