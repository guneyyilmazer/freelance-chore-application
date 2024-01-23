"use client";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import MessagesButton from "./MessagesButton";
import logo from "../images/logo.svg";
const Header = () => {
  const user = useSelector((shop: any) => shop.app.user);
  return (
    <div className="w-[100vw] hidden md:flex justify-around items-center h-[10vh] secondary">
      <Link
        href="/"
        className="flex h-10 items-center gap-1.5"
      >
        <img src={logo.src} alt="" />
        <div className="text-center text-white text-xl font-bold">
          orea
        </div>
      </Link>
      <div className="flex h-6 justify-center items-center gap-5">
        <Link
          href="/posts"
          className="text-center text-white"
        >
          Jobs
        </Link>
        <MessagesButton />
        <Link
          href="/freelancers"
          className="flex justify-center items-center gap-1"
        >
          <div className="text-center text-white">
            Freelancers
          </div>
        </Link>
        <div className="flex justify-center items-center gap-1">
          <div className="text-center text-white">
            Resources
          </div>
        </div>
      </div>
      <div className="flex text-sm gap-2 justify-between">
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
          <div className="flex justify-center items-center">
            <FontAwesomeIcon icon={faAnglesRight} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
