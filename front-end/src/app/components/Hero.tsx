import React from "react";
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

const Hero = () => {
  return (
    <div className="w-[1440px] h-[650px] secondary">
      <div className="flex justify-around">
        <div>
          <div className="text-white">
            <h2 className="text-[48px] mt-[9px] w-[604px] leading-[64px] font-[700]">
              Find The Ideal Experts For Your Next Task
            </h2>
            <div className="w-[604px] mt-[20px] text-white text-base font-normal font-['Helvetica Neue'] leading-normal">
              From lawn care to heavy lifting, our professionals are here to
              make your tasks hassle-free. Experience the freedom to focus on
              what matters most while dedicated hands handle the rest. Your
              to-dos, their expertise.
            </div>
          </div>
          <div>
            <div className="w-[412px] my-[32px] h-[53px] pl-5 pr-0.5 py-0.5 bg-white rounded-[40px] justify-end items-center gap-[59px] inline-flex">
              <div className="self-stretch justify-start items-center gap-2 inline-flex">
                <div className="w-6 h-6 justify-center items-center flex">
                  <div className="w-6 h-6 relative"></div>
                </div>
                <div className="w-[200px] text-slate-500 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
                  What do you need help with?
                </div>
              </div>
              <div className="w-[114px] h-[49px] px-5 py-3.5 bg-green-600 rounded-[40px] justify-center items-center inline-flex">
                <div className="w-[74px] text-center text-white text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
                  Search
                </div>
              </div>
            </div>
            <div className="w-[554px] h-[83px] relative">
              <div className="left-[5px] top-0 absolute text-center text-white text-sm font-bold font-['Helvetica Neue'] leading-[21px]">
                TRENDING SERVICES
              </div>
              <div className="left-0 top-[33px] absolute justify-start items-start gap-4 inline-flex">
                <div className="w-[174px] flex justify-around h-[50px] relative">
                  <div className="w-[174px] h-[50px] left-0 top-0 absolute bg-white bg-opacity-5 rounded-[51px] border border-white border-opacity-5 backdrop-blur-[11.60px]" />
                  <div className="left-[20px] top-[14px] absolute opacity-80 text-white text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
                    CLEANING
                  </div>
                  <img
                    src={risingarrow.src}
                    className="absolute right-0 top-[10px] mr-4"
                    alt=""
                  />
                </div>
                <div className="w-[174px] h-[50px] relative">
                  <div className="w-[174px] h-[50px] left-0 top-0 absolute bg-white bg-opacity-5 rounded-[51px] border border-white border-opacity-5 backdrop-blur-[11.60px]" />
                  <div className="left-[20px] top-[14px] absolute opacity-80 text-white text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
                    PLUMBING
                  </div>
                  <img
                    src={risingarrow.src}
                    className="absolute right-0 top-[10px] mr-4"
                    alt=""
                  />
                </div>
                <div className="w-[174px] h-[50px] relative">
                  <div className="w-[174px] h-[50px] left-0 top-0 absolute bg-white bg-opacity-5 rounded-[51px] border border-white border-opacity-5 backdrop-blur-[11.60px]" />
                  <div className="left-[20px] top-[14px] absolute opacity-80 text-white text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
                    HVAC REPAIR
                  </div>
                  <img
                    src={risingarrow.src}
                    className="absolute right-0 top-[10px] mr-4"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="w-[550px] mt-[32px] h-10 justify-start items-center gap-4 inline-flex">
              <div className="justify-start items-start flex">
                <img className="w-10 h-10 rounded-[200px]" src={user1.src} />
                <img className="w-10 h-10 rounded-[200px]" src={user2.src} />
                <img className="w-10 h-10 rounded-[200px]" src={user3.src} />
                <img className="w-10 h-10 rounded-[200px]" src={user4.src} />
              </div>
              <div className="text-center">
                <span className="text-gray-50 text-base font-normal font-['Helvetica Neue'] leading-normal">
                  Join the{" "}
                </span>
                <span className="text-gray-50 text-base font-bold font-['Helvetica Neue'] leading-normal">
                  800+ people
                </span>
                <span className="text-gray-50 text-base font-normal font-['Helvetica Neue'] leading-normal">
                  {" "}
                  who are using Orea to hire.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[550px]">
          <div className="w-[480px] h-[245px] relative">
            <div className="left-[6px] top-0 absolute rounded-2xl shadow border border-white flex-col justify-end items-center inline-flex">
              <img
                className="w-[252px] rounded-2xl h-64"
                src={michaelscott.src}
              />
            </div>
            <div className="pl-3 pr-8 py-3 w-[195px] left-[200px] top-[12px] absolute bg-white rounded-2xl shadow justify-start items-center gap-3 inline-flex">
              <img className="w-10 h-10 rounded-full" src={michaelscott.src} />
              <div className="flex-col justify-start items-start inline-flex">
                <div className="text-black text-sm font-bold font-['Helvetica Neue'] leading-[21px]">
                  Michael Scott
                </div>
                <div className="text-gray-400 text-sm font-light font-['Helvetica Neue'] leading-[21px]">
                  Auto Mechanic
                </div>
              </div>
            </div>
            <div className="px-4 py-3 left-[-90px] top-[165px] absolute bg-white rounded-2xl shadow flex-col justify-start items-start gap-1 inline-flex">
              <div className="flex-col justify-start items-start gap-1 flex">
                <div className="text-black text-sm font-bold font-['Helvetica Neue'] leading-[21px]">
                  Open to Work
                </div>
                <div className="justify-start items-start gap-4 inline-flex">
                  <div className="justify-start items-center gap-1 flex">
                    <div className="w-4 h-4 justify-center items-center flex">
                      <img src={wallet.src} alt="" />
                    </div>
                    <div className="text-green-500 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
                      $75/hr
                    </div>
                  </div>
                  <div className="justify-start items-center gap-1 flex">
                    <div className="w-4 h-4 justify-center items-center flex">
                      <img src={briefcase.src} alt="" />
                    </div>
                    <div className="text-red-600 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
                      Part-Time
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[485px] h-[245px] relative">
            <div className="left-[200px] bottom-1 absolute rounded-2xl shadow border border-white flex-col justify-end items-center inline-flex">
              <img
                className="w-[252px] rounded-2xl h-64"
                src={jennifersmith.src}
              />
            </div>
            <div className="pl-3 pr-8 py-3 left-[70px] top-[163px] absolute bg-white rounded-2xl shadow justify-start items-center gap-3 inline-flex">
              <img className="w-10 h-10 rounded-full" src={jennifersmith.src} />
              <div className="flex-col justify-start items-start inline-flex">
                <div className="text-black text-sm font-bold font-['Helvetica Neue'] leading-[21px]">
                  Jennifer Smith{" "}
                </div>
                <div className="text-gray-400 text-sm font-light font-['Helvetica Neue'] leading-[21px]">
                  Plumber
                </div>
              </div>
            </div>
            <div className="px-4 py-3 w-[190px] left-[392px] top-[29px] absolute bg-white rounded-2xl shadow flex-col justify-start items-start gap-1 inline-flex">
              <div className="flex-col justify-start items-start gap-1 flex">
                <div className="text-black text-sm font-bold font-['Helvetica Neue'] leading-[21px]">
                  Open to Work
                </div>
                <div className="justify-start items-start gap-4 inline-flex">
                  <div className="justify-start items-center gap-1 flex">
                    <div className="w-4 h-4 justify-center items-center flex">
                      <img src={wallet.src} alt="" />
                    </div>
                    <div className="text-green-500 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
                      $90hr
                    </div>
                  </div>
                  <div className="justify-start items-center gap-1 flex">
                    <div className="w-4 h-4 justify-center items-center flex">
                      <img src={briefcase.src} alt="" />
                    </div>
                    <div className="text-red-600 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
                      Full-Time
                    </div>
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
