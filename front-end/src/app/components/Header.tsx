"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
const Header = () => {
  const [hamburgerMenuCollapsed, setHamburgerMenuCollapsed] = useState(false);
  const user = useSelector((shop: any) => shop.app.user);
  return (
    <div className="w-[100vw] flex justify-around items-center h-[103px] secondary">
      <div className="w-[89px] h-10 justify-start items-center gap-1.5 inline-flex">
        <div className="w-10 h-10 relative" />
        <div className="text-center text-white text-xl font-bold font-['Helvetica Neue'] leading-[30px]">
          orea
        </div>
      </div>
      <div className="w-[327px] h-6 justify-center items-center gap-5 inline-flex">
        <div className="justify-center items-center gap-2 flex">
          <div className="text-center text-white text-base font-normal font-['Helvetica Neue'] leading-normal">
            Jobs
          </div>
        </div>
        {user.isLoggedIn && (
          <div className="justify-center items-center gap-1 flex">
            <div className="text-center text-white text-base font-normal font-['Helvetica Neue'] leading-normal">
              Messages
            </div>
          </div>
        )}
        <div className="justify-center items-center gap-1 flex">
          <div className="text-center text-white text-base font-normal font-['Helvetica Neue'] leading-normal">
            Freelancers
          </div>
        </div>
        <div className="justify-center items-center gap-1 flex">
          <div className="text-center text-white text-base font-normal font-['Helvetica Neue'] leading-normal">
            Resources
          </div>
        </div>
      </div>
      <div className="w-[370px] flex justify-between">
        {!user.isLoggedIn && (
          <div className="w-[150px] h-[46px] pl-1 pt-1 flex-col justify-start items-start gap-2 inline-flex">
            <div className="self-stretch grow shrink basis-0 px-10 py-3.5 bg-slate-800 rounded-[40px] shadow border border-white justify-center items-center gap-[5px] inline-flex">
              <div className="text-center text-white text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
                Sign In
              </div>
            </div>
          </div>
        )}
        <div className="w-[210px] h-[46px] pl-1 pt-1 flex-col justify-start items-start gap-2 inline-flex">
          <div className="grow shrink basis-0 px-10 py-3.5 bg-green-600 rounded-[40px] shadow border justify-center items-center gap-[5px] inline-flex">
            <div className="text-center text-white text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
              Create a Listing
            </div>
            <div className="h-[9px] justify-center items-center flex">
              <div className="w-[9px] h-[9px] relative flex-col justify-start items-start flex" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
