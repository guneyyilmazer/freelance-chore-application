"use client";
import React from "react";
import Cookies from "js-cookie";
import Auth from "../components/Auth";
import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";
const Header = () => {
  const user = useSelector((shop: any) => shop.app.user);
  console.log(user)
  return (
    <nav className="flex justify-between">
      <div>
        <button className="mx-1">Home</button>
        <button className="mx-1">Jobs</button>
      </div>
      <div>
        {user.isLoggedIn=="" && (
          <button
            className="mx-1"
            onClick={() => {
              Cookies.remove("Auth_Token");

              window.location.replace("/auth");
            }}
          >
            Login
          </button>
        )}
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Header;
