"use client";
import React, { useEffect, useRef, useState } from "react";
import Categories from "./Categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import jennifersmith from "../images/jennifersmith.png";
import michaelscott from "../images/michaelscott.png";
import user1 from "../images/user1.png";
import user2 from "../images/user2.png";
import user3 from "../images/user3.png";
import user4 from "../images/user4.png";
import briefcase from "../images/briefcase.svg";
import wallet from "../images/wallet.svg";
import risingarrow from "../images/risingarrow.svg";
import searchNormal from "../images/search-normal.svg";
import Link from "next/link";
import { categoriesArray } from "../layout";
import titleBg from "../images/titlebg.png";

const Hero = () => {
  const [searchInput, setSearchInput] = useState("");
  type result = { name: string; displayName: string };
  const [result, setResult] = useState<result>({ name: "", displayName: "" });
  useEffect(() => {
    searchInput != "" &&
      setResult(() => {
        const res = categoriesArray.filter((item) =>
          item.name.startsWith(searchInput.charAt(0))
        );
        return res.length != 0
          ? (res[0] as result)
          : { name: "", displayName: "" };
      });
    searchInput == "" && setResult({ name: "", displayName: "" });
  }, [searchInput]);
  return (
    <div className="md:h-[550px] secondary">
      <div className="flex flex-col md:flex-row justify-around">
        <div>
          <div className="flex flex-col w-full md:w-full items-center text-white">
            <div className="w-[88vw] sm:w-[400px] md:w-full">
              <div className="md:w-[600px] text-3xl md:text-5xl md:leading-[64px] font-bold text-white">
                <div className="w-full">
                  <div className="flex mb-1 md:m-0">
                    <h2 className="">Find The &#8203; </h2>{" "}
                    <span
                      className="px-2"
                      style={{
                        background: `url(${titleBg.src})`,
                        backgroundSize: "100%",
                      }}
                    >
                      {" "}
                      Ideal Experts
                    </span>
                  </div>
                  <h2>For Your Next Task</h2>
                </div>
              </div>
              <div className="md:w-[600px] mt-5 text-white">
                From lawn care to heavy lifting, our professionals are here to
                make your tasks hassle-free. Experience the freedom to focus on
                what matters most while dedicated hands handle the rest. Your
                to-dos, their expertise.
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center md:block">
            <div className="w-[88vw] md:w-[430px] relative">
              <div className="my-[32px] h-[53px] flex pl-5 pr-0.5 py-0.5 text-slate-500 text-sm bg-white rounded-lg justify-between items-center">
                <div className="flex items-center gap-3">
                  <img src={searchNormal.src} alt="" />
                </div>
                <input
                  className="outline-none"
                  placeholder="What do you need help with?"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                />
                <button
                  onClick={() =>
                    window.location.replace(`/freelancers?type=${result.name}`)
                  }
                  className="px-5 md:px-10 py-3.5 text-white text-sm bg-green-600 rounded-lg"
                >
                  Search
                </button>
              </div>
              {result.displayName != "" && (
                <div className="absolute bg-white w-full flex items-center h-[50px] top-[60px]">
                  <Link
                    href={`/freelancers?type=${result.name}`}
                    className="m-2 text-sm"
                  >
                    {result && result.displayName.toUpperCase()}
                  </Link>
                </div>
              )}
            </div>
            <div className="flex justify-center items-center h-[500px] flex-col md:hidden">
              <div className="flex flex-col justify-center items-center gap- w-[100vw]">
                <div className="w-[350px] h-[167px] relative">
                  <div className="left-[20px] top-0 absolute rounded-[11px] shadow border border-white flex flex-col justify-end items-center">
                    <img
                      className="w-[172px] h-[174px] rounded-xl"
                      src={michaelscott.src}
                    />
                  </div>
                  <div className="flex left-[130px] top-[8px] w-[150px] p-2 absolute bg-white rounded-[11px] shadow items-center gap-2">
                    <img
                      className="w-[27px] h-[27px] rounded-full"
                      src={michaelscott.src}
                    />
                    <div className="flex flex-col">
                      <div className="text-[10px] font-bold leading-[14px]">
                        Michael Scott
                      </div>
                      <div className="text-gray-400 text-[10px] font-light leading-[14px]">
                        Auto Mechanic
                      </div>
                    </div>
                  </div>
                  <div className="p-2 left-[-20px] top-[112px] absolute bg-white rounded-[10.91px] shadow flex flex-col gap-1">
                    <div className="flex-col justify-start items-start gap-[2.73px] flex">
                      <div className="text-[10px] font-bold leading-[14.31px]">
                        Open to Work
                      </div>
                      <div className="flex gap-[10px]">
                        <div className="flex items-center gap-1">
                          <div className="w-[10px] h-[10px] flex justify-center items-center"></div>
                          <div className="text-green-500 text-[10px] leading-[14px]">
                            $75/hr
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-[10px] h-[10px] flex justify-center items-center"></div>
                          <div className="text-red-600 text-[10px] leading-[14px]">
                            Part-Time
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[377px] h-[141px] relative">
                  <div className="left-[144px] absolute rounded-xl shadow border border-white flex flex-col justify-end items-center">
                    <img
                      className="w-[172px] h-[174px] rounded-xl"
                      src={jennifersmith.src}
                    />
                  </div>
                  <div className="p-3 left-[60px] top-[93px] absolute bg-white rounded-[9px] shadow flex justify-start items-center gap-2">
                    <img
                      className="w-[23px] h-[23px] rounded-full"
                      src={jennifersmith.src}
                    />
                    <div className="flex flex-col">
                      <div className="text-[10px] font-bold leading-3">
                        Jennifer Smith{" "}
                      </div>
                      <div className="text-gray-400 text-[10px] font-light leading-3">
                        Plumber
                      </div>
                    </div>
                  </div>
                  <div className="left-[250px] top-[20px] p-2 w-[130px] absolute bg-white rounded-[9px] shadow flex flex-col gap-1">
                    <div className="flex flex-col gap-[2px]">
                      <div className="text-[10px] font-bold">Open to Work</div>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1">
                          <div className="w-[10px] h-[10px] flex justify-center items-center"></div>
                          <div className="text-green-500 text-[9.5px]">
                            $90hr
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-[9px] h-[9px] flex justify-center items-center"></div>
                          <div className="text-red-600 text-[10px] leading-3">
                            Full-Time
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-white text-sm font-bold">
                TRENDING SERVICES
              </div>
              <div className="mt-4">
                <div className="hidden md:flex gap-4">
                  <Link
                    href="/posts?type=cleaning"
                    className="w-[174px] flex justify-around items-center h-[50px] hover:opacity-50 bg-white bg-opacity-5 rounded-[51px] border border-white border-opacity-5 backdrop-blur-[11.60px] opacity-80 text-white text-sm"
                  >
                    <div className="">CLEANING</div>
                    <div className="w-7 h-7">
                      <img src={risingarrow.src} className="" alt="" />
                    </div>
                  </Link>
                  <Link
                    href="/posts?type=plumbing"
                    className="w-[174px] flex justify-around items-center h-[50px] hover:opacity-50 bg-white bg-opacity-5 rounded-[51px] border border-white border-opacity-5 backdrop-blur-[11.60px] opacity-80 text-white text-sm"
                  >
                    <div className="">PLUMBING</div>
                    <div className="w-7 h-7">
                      <img src={risingarrow.src} className="" alt="" />
                    </div>
                  </Link>
                  <Link
                    href="/posts?type=dogWalking"
                    className="w-[174px] flex justify-around items-center h-[50px] hover:opacity-50 bg-white bg-opacity-5 rounded-[51px] border border-white border-opacity-5 backdrop-blur-[11.60px] opacity-80 text-white text-sm"
                  >
                    <div className="">DOG WALKING</div>
                    <div className="w-7 h-7">
                      <img src={risingarrow.src} className="" alt="" />
                    </div>
                  </Link>
                </div>
                <div className="flex flex-col md:hidden gap-4">
                  <div className="flex gap-3">
                    <Link
                      href="/posts?type=cleaning"
                      className="w-[174px] flex justify-around items-center h-[50px] hover:opacity-50 bg-white bg-opacity-5 rounded-[51px] border border-white border-opacity-5 backdrop-blur-[11.60px] opacity-80 text-white text-sm"
                    >
                      <div className="">CLEANING</div>
                      <div className="w-7 h-7">
                        <img src={risingarrow.src} className="" alt="" />
                      </div>
                    </Link>
                    <Link
                      href="/posts?type=plumbing"
                      className="w-[174px] flex justify-around items-center h-[50px] hover:opacity-50 bg-white bg-opacity-5 rounded-[51px] border border-white border-opacity-5 backdrop-blur-[11.60px] opacity-80 text-white text-sm"
                    >
                      <div className="">PLUMBING</div>
                      <div className="w-7 h-7">
                        <img src={risingarrow.src} className="" alt="" />
                      </div>
                    </Link>
                  </div>
                  <Link
                    href="/posts?type=dogWalking"
                    className="w-[174px] flex justify-around items-center h-[50px] hover:opacity-50 bg-white bg-opacity-5 rounded-[51px] border border-white border-opacity-5 backdrop-blur-[11.60px] opacity-80 text-white text-sm"
                  >
                    <div className="">DOG WALKING</div>
                    <div className="w-7 h-7">
                      <img src={risingarrow.src} className="" alt="" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-[95%] hidden md:flex md:w-[550px] mt-[32px] h-10 items-center gap-4">
              <div className="flex">
                <img
                  className="w-7 h-7 md:w-10 md:h-10 rounded-[200px]"
                  src={user1.src}
                />
                <img
                  className="w-7 h-7 md:w-10 md:h-10 rounded-[200px]"
                  src={user2.src}
                />
                <img
                  className="w-7 h-7 md:w-10 md:h-10 rounded-[200px]"
                  src={user3.src}
                />
                <img
                  className="w-7 h-7 md:w-10 md:h-10 rounded-[200px]"
                  src={user4.src}
                />
              </div>
              <div className="w-[400px] md:text-center">
                <span className="text-gray-50 text-base">Join the </span>
                <span className="text-gray-50 text-base font-bold">
                  800+ people
                </span>
                <span className="text-gray-50 text-base">
                  {" "}
                  who are using Orea to hire.
                </span>
              </div>
            </div>
            <div className="w-[70%] py-[50px] flex justify-center flex-col md:hidden md:w-[550px] mt-[32px] h-10 items-start gap-4">
              <div className="w-[300px] md:text-center">
                <span className="text-gray-50 text-base">Join the </span>
                <span className="text-gray-50 text-base font-bold">
                  800+ people
                </span>
                <span className="text-gray-50 text-base">
                  {" "}
                  who are using Orea to hire.
                </span>
              </div>
              <div className="flex w-full justify-end relative">
                <img
                  className="w-7 h-7 md:w-10 md:h-10 rounded-[200px]"
                  src={user1.src}
                />
                <img
                  className="w-7 h-7 md:w-10 md:h-10 rounded-[200px]"
                  src={user2.src}
                />
                <img
                  className="w-7 h-7 md:w-10 md:h-10 rounded-[200px]"
                  src={user3.src}
                />
                <img
                  className="w-7 h-7 md:w-10 md:h-10 rounded-[200px]"
                  src={user4.src}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-col w-[550px]">
          <div className="w-[480px] h-[245px] relative">
            <div className="left-[6px] top-0 absolute rounded-2xl shadow border border-white flex flex-col justify-end items-center ">
              <img
                className="w-[252px] rounded-2xl h-64"
                src={michaelscott.src}
              />
            </div>
            <div className="pl-3 pr-8 py-3 w-[195px] left-[200px] top-[12px] absolute bg-white rounded-2xl shadow flex items-center gap-3">
              <img className="w-10 h-10 rounded-full" src={michaelscott.src} />
              <div className="flex flex-col">
                <div className="text-black text-sm font-bold">
                  Michael Scott
                </div>
                <div className="text-gray-400 text-sm font-light">
                  Auto Mechanic
                </div>
              </div>
            </div>
            <div className="px-4 py-3 left-[-90px] top-[165px] absolute bg-white rounded-2xl shadow flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <div className="text-black text-sm font-bold">Open to Work</div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <img src={wallet.src} alt="" />
                    <div className="text-green-500 text-sm">$75/hr</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <img src={briefcase.src} alt="" />
                    <div className="text-red-600 text-sm">Part-Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[485px] h-[245px] relative">
            <div className="left-[200px] bottom-1 absolute rounded-2xl shadow border border-white flex flex-col justify-end items-center">
              <img
                className="w-[252px] rounded-2xl h-64"
                src={jennifersmith.src}
              />
            </div>
            <div className="pl-3 pr-8 py-3 left-[70px] top-[163px] absolute bg-white rounded-2xl shadow flex items-center gap-3">
              <img className="w-10 h-10 rounded-full" src={jennifersmith.src} />
              <div className="flex flex-col">
                <div className="text-black text-sm font-bold">
                  Jennifer Smith{" "}
                </div>
                <div className="text-gray-400 text-sm font-light">Plumber</div>
              </div>
            </div>
            <div className="px-4 py-3 w-[190px] left-[392px] top-[29px] absolute bg-white rounded-2xl shadow flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <div className="text-black text-sm font-bold">Open to Work</div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 flex justify-center items-center">
                      <img src={wallet.src} alt="" />
                    </div>
                    <div className="text-green-500 text-sm">$90hr</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 flex justify-center items-center">
                      <img src={briefcase.src} alt="" />
                    </div>
                    <div className="text-red-600 text-sm">Full-Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
