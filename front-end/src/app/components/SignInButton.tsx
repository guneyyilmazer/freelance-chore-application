"use client";
import Link from "next/link";
import React from "react";
import Auth from "./Auth";

const SignInButton = () => {
  return (
    <Link
      href="/auth"
      className="w-[150px] h-full flex-col justify-start items-start gap-2 inline-flex"
    >
      <div className="self-stretch grow shrink basis-0 px-10 py-3 bg-slate-800 rounded-xl shadow border border-white justify-center items-center gap-[5px] inline-flex">
        <div className="text-center text-white text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
          Sign In
        </div>
      </div>
    </Link>
  );
};

export default Auth(SignInButton);
