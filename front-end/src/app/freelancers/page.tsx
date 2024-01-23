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
import { setMobileFilterMenu, setSearchFilter } from "../features/appSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import star from "../images/Star.svg";
import {
  faAngleUp,
  faCaretLeft,
  faCaretRight,
  faFilter,
  faLocation,
  faLocationArrow,
  faLocationPin,
  faLocationPinLock,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import MobileFilterMenu from "../components/MobileFilterMenu";
const page = () => {
  const mobileFilterMenu = useSelector(
    (shop: any) => shop.app.mobileFilterMenu
  );
  const dispatch = useDispatch();
  const [allPages, setAllPages] = useState<number[]>([]);
  const [lastPage, setLastPage] = useState(true);
  const searchParams = useSearchParams();
  const [page, setPage] = useState(
    searchParams.get("page") &&
      Number(searchParams.get("page")) > 0 &&
      !lastPage
      ? Number(searchParams.get("page"))
      : 1
  );
  const router = useRouter();
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
        page,
        amount: 5,
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
      setLastPage(response.lastPage);
      setAllPages(() => {
        let allPages = [];
        for (let i = 1; i < response.pagesCount + 1; i++) {
          allPages.push(i);
        }
        return allPages;
      });
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
    <div className="w-[100vw] relative bg-white flex flex-col items-center">
      {mobileFilterMenu && (
        <div className="md:hidden">
          <MobileFilterMenu page="freelancers" />
        </div>
      )}
      <div className="w-full hidden md:block my-10 md:m-14 text-center md:text-start text-[40px] font-bold leading-[48px]">
        <span className="md:m-12">Freelancers</span>
      </div>
      <div className="flex justify-around w-[90%]">
        <div className="hidden md:flex">
          <FilterSideBarr page="freelancers" />
        </div>
        <div className="flex flex-col w-full items-center">
          <button
            onClick={() => dispatch(setMobileFilterMenu(true))}
            className="text-lg mb-3 w-full flex justify-end items-center text-green-600"
          >
            <span className="mr-1">Filter</span>
            <FontAwesomeIcon icon={faFilter} />
          </button>
          <div className="w-full">
            <input
              onChange={handleChange}
              placeholder="Search freelancers by name"
              className="w-full pl-4 py-3 bg-white rounded-lg border border-gray-200 flex items-end gap-4"
            />
            <div className="text-slate-500 w-full text-sm" />
          </div>
          <div className="flex w-full mt-5 mb-2 flex-col gap-10">
            {freelancers.map((item: user) => (
              <Link
                href={`/user?id=${item._id}`}
                className="h-[308px] flex items-center md:items-start flex-col md:flex-row bg-white rounded-lg shadow border border-gray-200"
              >
                <div className="m-3 w-[90%] md:w-64 flex flex-row md:flex-col justify-between md:justify-start items-center">
                  <img
                    className="w-32 md:w-48 h-32 md:h-[212px] left-[16px] rounded-lg"
                    src={
                      item.profilePicture
                        ? item.profilePicture
                        : DefaultProfilePicture.src
                    }
                  />
                  <div>
                    <div className="w-[190px] md:w-full text-center my-4 px-9 py-3.5 rounded-lg bg-green-600 text-white text-sm">
                      Send a Message
                    </div>
                  </div>
                </div>
                <div className="md:m-5 w-[90%] md:w-full flex justify-center md:justify-start flex-col">
                  <div className="flex md:flex-col justify-between items-center md:items-start">
                    <div className="text-slate-800 text-xl font-bold">
                      {item.username}
                    </div>
                    <div className="mt-3">
                      <span className="text-slate-800 text-lg font-bold">
                        {item.freelancerDetails?.hourlyWage + "$"}
                      </span>
                      <span className="text-slate-800 text-lg">/hr</span>
                    </div>
                  </div>
                  <div className="text-slate-800 text-sm my-2">
                    {item.freelancerDetails?.jobType.cleaning &&
                      "Cleaning Specialist"}
                    {item.freelancerDetails?.jobType.cuttingGrass &&
                      "Grass Cutting Specialist"}
                    {item.freelancerDetails?.jobType.moving &&
                      "Moving Specialist"}
                    {item.freelancerDetails?.jobType.plumbing && "Plumber"}
                    {item.freelancerDetails?.jobType.dogWalking && "Dog Walker"}
                  </div>
                  <div className="flex md:items-center gap-6">
                    <div className="flex md:justify-center items-center">
                      <FontAwesomeIcon icon={faLocationPinLock} />
                      <div className="text-slate-600">
                        {item.location.city + "/" + item.location.state}
                      </div>
                    </div>
                    <div className="flex md:justify-center items-center gap-1">
                      <div className="text-zinc-900 text-sm">4.8</div>
                      <img src={star.src} alt="" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm">
                    {item.freelancerDetails?.aboutMe}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="w-[90%] relative flex justify-center items-center">
            <div className="flex absolute right-0">
              <select
                style={{ textAlignLast: "center" }}
                className="px-2 appearance-none border shadow"
              >
                {allPages.map((page) => (
                  <option className="bg-slate-200" value={page}>
                    {page}
                  </option>
                ))}
              </select>
              <span className="ml-1">
                <FontAwesomeIcon icon={faAngleUp} />
              </span>
            </div>

            <button
              className="text-xl px-2 rounded-full mx-1 text-green-600"
              onClick={() => {
                page - 1 > 0 &&
                  router.replace(`/freelancers/?page=${page - 1}`);
                setPage((page) => {
                  if (page - 1 > 0) return page - 1;
                  else return page;
                });
              }}
            >
              <FontAwesomeIcon icon={faCaretLeft} />
            </button>
            <span>{page}</span>
            <button
              className="text-xl px-2 rounded-full mx-1 text-green-600"
              onClick={() => {
                !lastPage && router.replace(`/freelancers/?page=${page + 1}`);

                setPage((page) => {
                  if (!lastPage) return page + 1;
                  else return page;
                });
              }}
            >
              <FontAwesomeIcon icon={faCaretRight} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
