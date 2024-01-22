import React from "react";
import forclient from "../images/forclient.png";
import forClientMobile from "../images/forClientMobile.png";
import ticksquare from "../images/tick-square.svg";
import arrowright from "../images/arrow-right.svg";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import forClientsBg from "../images/forclientsbg.png";
const ForClientsAndFreelancers = () => {
  return (
    <div className="bg-white flex flex-col justify-center items-center py-[64px]">
      <div className="mb-[50px] flex justify-center flex-col items-center">
        <div className="md:w-[611px] text-center">THE FUTURE OF WORK</div>
        <div className="md:w-[611px] text-center text-2xl font-bold">
          Skillful Solutions, Delivered by Experts
        </div>
      </div>
      <div className="flex flex-col w-[92vw] md:w-[1300px] md:flex-row gap-5 justify-around">
        <div className="md:w-[900px] md:h-[624px] flex justify-between relative bg-slate-800 rounded-3xl">
          <div className="flex-col">
            {/* CLIENT CARD */}
            <div className="md:w-[400px] flex items-center flex-col md:block md:ml-[40px] mt-[100px] md:mt-[140px]">
              {/*  TEXT DIV */}
              <div className="flex flex-col w-[90%] justify-center items-center md:justify-start md:items-start gap-2">
                <div className="text-white text-start w-full  text-3xl md:text-4xl font-bold">
                  For Clients
                </div>
                <div className="md:w-[370px] flex justify-center items-center text-gray-200">
                  Orea lets you find and hire skilled professionals for any task
                  at hand. Explore a world where your needs are met with
                  precision.
                </div>
              </div>
              <div className="w-[90%] md:w-[370px] my-[40px]">
                <div className="flex items-start mb-[20px] gap-2 md:gap-4">
                  <img src={ticksquare.src} />
                  <div className="text-gray-200 font-light text-sm">
                    Gain insights before you hire. Explore detailed profiles of
                    skilled freelancers, including reviews.
                  </div>
                </div>
                <div className="flex mb-[20px] gap-2 md:gap-4">
                  <div className="flex items-start w-12">
                    <img src={ticksquare.src} />
                  </div>
                  <div className="text-sm text-gray-200 font-light">
                    Efficient appointment scheduling ensures that freelancers
                    work to fit your daily schedule.
                  </div>
                </div>
                <div className="flex gap-2 md:gap-4">
                  <div className="flex items-start w-12">
                    <img src={ticksquare.src} />
                  </div>
                  <div className="text-sm text-gray-200 font-light">
                    Orea stands behind the quality of service. We ensure the job
                    meets your expectations.
                  </div>
                </div>
              </div>
              <div className="w-16 h-16 flex justify-center items-center left-[20px] md:left-[40px] top-[44px] absolute">
                <div className="w-10 h-10 md:w-16 md:h-16 left-0 top-0 absolute bg-white bg-opacity-5 rounded-full border border-white border-opacity-5 backdrop-blur-[11px]" />
                {/* MOBILE ICON */}
                <div className="w-10 h-10 md:hidden left-0 top-0 md:w-6 md:h-6 text-white absolute flex justify-center items-center">
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
                {/*  DESKTOP ICON */}
                <div className="w-10 h-10 hidden md:flex md:w-6 md:h-6 text-white absolute justify-center items-center">
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </div>
              <Link
                href="/freelancers"
                className="px-10 py-3.5 md:absolute top-[500px] bg-green-600 text-white md:text-sm rounded-lg"
              >
                Discover Orea for Clients
              </Link>
            </div>
            <div className="w-full md:hidden mt-10 flex justify-center items-center">
              <img
                className="w-[300px]
         md:hidden"
                src={forClientMobile.src}
              />
            </div>
          </div>
          <div>
            {" "}
            <img
              className="
          hidden md:block md:w-[400px] mr-5"
              src={forclient.src}
            />
          </div>
        </div>
        <div className="flex flex-col md:w-[356px] md:h-[624px] relative bg-green-950 rounded-[20px]">
          <div className="flex flex-col w-[85%] items-start ml-[20px] mt-[100px] md:mt-[140px]">
            {/*  TEXT DIV */}

            <div className="text-white text-2xl md:text-4xl font-bold">
              For Freelancers
            </div>
            <div className="md:w-[308px] mt-[120px] md:mt-[228px] text-gray-200">
              As a service provider, Orea lets you showcase your skills and
              connect with clients seeking your expertise.
            </div>
            <div className="w-16 h-16 flex justify-center items-center left-[20px] md:left-[24px] top-[35px] absolute">
              <div className="w-10 h-10 md:w-16 md:h-16 left-0 top-0 absolute bg-white bg-opacity-5 rounded-full border border-white border-opacity-5 backdrop-blur-[11px]" />
              {/* MOBILE ICON */}
              <div className="w-10 h-10 md:hidden left-0 top-0 md:w-6 md:h-6 text-white absolute flex justify-center items-center">
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
              {/*  DESKTOP ICON */}
              <div className="w-10 h-10 hidden md:flex md:w-6 md:h-6 text-white absolute justify-center items-center">
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
            </div>
            <Link
              href="/posts"
              className="px-10 py-3.5 mt-[24px] mb-8 md:m-0 md:absolute top-[500px] bg-green-600 rounded-lg flex justify-center items-center md:text-sm text-white"
            >
              Discover Orea for Freelancers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForClientsAndFreelancers;
