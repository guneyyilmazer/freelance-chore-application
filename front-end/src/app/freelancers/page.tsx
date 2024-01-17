"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { BACKEND_SERVER_IP } from "../layout";
import Cookies from "js-cookie";
import { user } from "../types/UserTypes";
import SearchBar from "../components/SearchBar";
import DefaultProfilePicture from "../images/default.jpeg";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import FilterSideBar from "../components/FilterSideBar";
import { useDispatch, useSelector } from "react-redux";
import { filterType } from "../types";
import FilterSideBarr from "../components/FilterSideBarr";
import { setSearchFilter } from "../features/appSlice";
const page = () => {
  const dispatch = useDispatch();
  const filter: filterType = useSelector((shop: any) => shop.app.searchFilter);
  useEffect(() => {
    getFreelancers();
  }, [filter]);
  const [freelancers, setFreelancers] = useState([]);
  const getFreelancers = async () => {
    const res = await fetch(`${BACKEND_SERVER_IP}/user/loadFreelancers`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },
      body: JSON.stringify({
        page: 1,
        amount: 15,
        username: filter.username,
        type: filter.jobType,
        state: filter.selectedState,
        city: filter.selectedCity,
        wage: filter.hourly,
        hourlyBetween: filter.hourlyBetween,
      }),

      method: "POST",
    });
    const response = await res.json();
    if (!response.error) {
      setFreelancers(response.freelancers);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setSearchFilter({
        username: e.target.value,
        jobType: filter.jobType,
        selectedState: filter.selectedState,
        selectedCity: filter.selectedCity,
        hourly: filter.hourly,
        price: -1,
        hourlyBetween: filter.hourlyBetween,
      })
    );
  };
  return (
    <div className="w-[100vw] h-[2090px] relative bg-white flex-col items-center inline-flex">
      <div className="text-black w-full m-14 justify-start text-[40px] font-bold font-['Helvetica Neue'] leading-[48px]">
        <span className="m-12">Freelancers</span>
      </div>
      <div className="flex justify-around w-[100%]">
        <FilterSideBarr page="freelancers" />
        <div className="flex-col justify-start items-start gap-8 inline-flex">
          <div className="w-full">
            <input
              onChange={handleChange}
              placeholder="Search freelancers by name"
              className="w-full pl-4 py-3 bg-white rounded-lg border border-gray-200 justify-start items-end gap-4 inline-flex"
            />
            <div className="w-6 h-6 justify-center items-center inline-flex">
              <div className="w-6 h-6 relative"></div>
            </div>
            <div className="text-slate-500 w-full text-sm font-normal font-['Helvetica Neue'] leading-[21px]" />
          </div>
          <div className="flex-col w-[954px] justify-start items-start gap-10 flex">
            {freelancers.map((item: user) => (
              <div className="w-[954px] h-[308px] relative bg-white rounded-lg shadow border border-gray-200">
                <div className="left-[232px] top-[24px] absolute text-slate-800 text-xl font-bold font-['Helvetica Neue'] leading-[30px]">
                  {item.username}
                </div>
                <div className="left-[870px] top-[25.50px] absolute">
                  <span className="text-slate-800 text-lg font-bold font-['Helvetica Neue'] leading-[27px]">
                    {item.freelancerDetails?.hourlyWage + "$"}
                  </span>
                  <span className="text-slate-800 text-lg font-normal font-['Helvetica Neue'] leading-[27px]">
                    /hr
                  </span>
                </div>
                <div className="left-[232px] top-[58px] absolute text-slate-800 text-sm font-medium font-['Helvetica Neue'] leading-[21px]">
                  {Object.keys(item.freelancerDetails!.jobType)[0]}
                </div>
                <div className="w-[690px] left-[232px] top-[131px] absolute text-black text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
                  {item.freelancerDetails?.aboutMe}
                </div>
                <img
                  className="w-48 h-[212px] left-[16px] top-[16px] absolute rounded-lg"
                  src={
                    item.profilePicture
                      ? item.profilePicture
                      : DefaultProfilePicture.src
                  }
                />
                <div className="left-[232px] top-[91px] absolute justify-start items-center gap-6 inline-flex">
                  <div className="justify-start items-center gap-1 flex">
                    <div className="w-5 h-5 justify-center items-center flex">
                      <div className="w-5 h-5 relative"></div>
                    </div>
                    <div className="w-[98px] text-slate-600 text-base font-normal font-['Helvetica Neue'] leading-normal">
                      {item.location.city + "/" + item.location.state}
                    </div>
                  </div>
                  <div className="px-2 py-1 bg-white rounded-lg justify-center items-center gap-1 flex">
                    <div className="w-[22px] h-[11px] text-zinc-900 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
                      4.8
                    </div>
                    <div className="w-5 h-5 relative" />
                  </div>
                </div>
                <div className="w-[200px] pl-1 pt-1 left-[18px] top-[239px] absolute flex-col justify-start items-start gap-2 inline-flex">
                  <div className="self-stetch grow shrink basis-0 px-9 py-3.5 bg-green-600 rounded-[40px] shadow border justify-center items-center gap-[5px] inline-flex">
                    <div className="text-center text-white text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
                      Send a Message
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-[62px] bg-white flex-col justify-center items-center gap-2 inline-flex">
        <div className="w-[889px] h-px justify-center items-center inline-flex">
          <div className="w-[889px] self-stretch bg-gray-200" />
        </div>
        <div className="self-stretch py-2 bg-white justify-between items-center inline-flex">
          <div className="pl-0.5 pr-1 justify-center items-center flex">
            <div className="text-center text-black text-sm font-medium font-['Helvetica Neue'] leading-[21px]">
              Page 1 of 22
            </div>
          </div>
          <div className="justify-center items-center gap-1 flex">
            <div className="w-6 h-6 p-2 bg-white rounded-md border border-green-600 flex-col justify-center items-center gap-2 inline-flex">
              <div className="text-center text-black text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
                1
              </div>
            </div>
            <div className="w-6 h-6 p-2 bg-white rounded-md flex-col justify-center items-center gap-2 inline-flex">
              <div className="text-center text-gray-400 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
                2
              </div>
            </div>
            <div className="w-6 h-6 p-2 bg-white rounded-md flex-col justify-center items-center gap-2 inline-flex">
              <div className="text-center text-gray-400 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
                3
              </div>
            </div>
            <div className="w-6 h-6 p-2 bg-white rounded-md flex-col justify-center items-center gap-2 inline-flex">
              <div className="text-center text-gray-400 text-sm font-normal font-['Inter'] leading-tight">
                …
              </div>
            </div>
            <div className="w-6 h-6 p-2 bg-white rounded-md flex-col justify-center items-center gap-2 inline-flex">
              <div className="text-center text-gray-400 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
                20
              </div>
            </div>
            <div className="w-6 h-6 p-2 bg-white rounded-md flex-col justify-center items-center gap-2 inline-flex">
              <div className="text-center text-gray-400 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
                21
              </div>
            </div>
            <div className="w-6 h-6 p-2 bg-white rounded-md flex-col justify-center items-center gap-2 inline-flex">
              <div className="text-center text-gray-400 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
                22
              </div>
            </div>
          </div>
          <div className="justify-start items-center gap-3.5 flex">
            <div className="text-center text-gray-400 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
              Go to page
            </div>
            <div className="h-[37px] p-2 bg-white rounded-md border border-gray-200 justify-start items-center gap-1 flex">
              <div className="grow shrink basis-0 h-[21px] justify-start items-center gap-2 flex">
                <div className="justify-start items-center gap-0.5 flex">
                  <div className="text-gray-400 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
                    00
                  </div>
                </div>
              </div>
              <div className="justify-start items-center gap-1 flex">
                <div className="w-5 h-5 justify-center items-center flex">
                  <div className="w-5 h-5 relative"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
