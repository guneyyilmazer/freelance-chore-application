"use client"
import React from "react";
import { user, post } from "../types";
import Link from "next/link";
import { setChattingWith } from "../features/appSlice";
import { useDispatch } from "react-redux";

const AuthButtons = ({ user, post }: { user: user; post: post }) => {
  const dispatch = useDispatch()
  return (
    <div>
      {user.userId != post.user && (
        <div className="my-5">
          <Link
            href="/messages"
            onClick={() => {
              dispatch(setChattingWith(post.user))
              localStorage.setItem("chattingWith", post.user);
            }}
            className="flex py-2.5 px-3 text-white text-sm bg-green-600 rounded-lg shadow border justify-center items-center"
          >
            Send A Message
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;
