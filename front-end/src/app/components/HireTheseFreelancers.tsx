import React from "react";
import cleaner from "../images/cleaner.jpeg";
import plumber from "../images/plumber.jpeg";
import mover from "../images/mover.jpeg";
import dogWalker from "../images/dog-walker.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
const HireTheseFreelancers = () => {
  return (
    <div className="w-[100vw] h-[586px] relative bg-white flex-col justify-center items-center inline-flex">
      <div className="w-[90%]">
        <div className="text-center text-black text-[32px] font-bold font-['Helvetica Neue'] leading-[44px]">
          Hire These Freelancers and Even More
        </div>
        <div className="text-green-600 w-full flex justify-end items-center text-base font-medium font-['Helvetica Neue'] leading-normal">
          See All Categories
          <div className="ml-2">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </div>
        <div className="w-6 h-6 justify-center items-center flex"></div>
        <div className="flex relative justify-between w-full">
          <Link href="/freelancers?type=plumbing" className="relative">
            <div className="text-white absolute m-7 text-sm font-normal font-['Helvetica Neue']">
              Leaky faucet? They`ll fix it!
            </div>
            <div className="text-white absolute mt-14 m-7 text-2xl font-bold font-['Helvetica Neue'] leading-9">
              Plumbers
            </div>
            <div className="w-[50.77px] flex justify-center items-center m-4 absolute bottom-0 text-white right-0 h-[50.77px] bg-white bg-opacity-5 rounded-full border border-white border-opacity-5 backdrop-blur-[9.20px]">
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
            <div className="w-[302px] h-[400px] bg-black bg-opacity-20 rounded-lg">
              <img
                className="object-cover rounded-xl w-full h-full"
                src={plumber.src}
                alt=""
              />
            </div>
          </Link>
          <Link href="/freelancers?type=moving" className="relative">
            <div className="text-white absolute m-7 text-sm font-normal font-['Helvetica Neue']">
              Relocate stress free with pros.
            </div>
            <div className="text-white absolute mt-14 m-7 text-2xl font-bold font-['Helvetica Neue'] leading-9">
              Movers
            </div>
            <div className="w-[50.77px] flex justify-center items-center m-4 absolute bottom-0 text-white right-0 h-[50.77px] bg-white bg-opacity-5 rounded-full border border-white border-opacity-5 backdrop-blur-[9.20px]">
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
            <div className="w-[302px] h-[400px] bg-black bg-opacity-20 rounded-lg">
              <img
                className="object-cover rounded-xl w-full h-full"
                src={mover.src}
                alt=""
              />
            </div>
          </Link>
          <Link href="/freelancers?type=cleaning" className="relative">
            <div className="text-white absolute m-7 text-sm font-normal font-['Helvetica Neue']">
              Sparkling spaces everytime.
            </div>
            <div className="text-white absolute mt-14 m-7 text-2xl font-bold font-['Helvetica Neue'] leading-9">
              Cleaners
            </div>
            <div className="w-[50.77px] flex justify-center items-center m-4 absolute bottom-0 text-white right-0 h-[50.77px] bg-white bg-opacity-5 rounded-full border border-white border-opacity-5 backdrop-blur-[9.20px]">
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
            <div className="w-[302px] h-[400px] bg-black bg-opacity-20 rounded-lg">
              <img
                className="object-cover rounded-xl w-full h-full"
                src={cleaner.src}
                alt=""
              />
            </div>
          </Link>
          <Link href="/freelancers?type=dogWalking" className="relative">
            <div className="text-white absolute m-7 text-sm">
              Don't have time to walk your dogs?
            </div>
            <div className="text-white absolute mt-14 m-7 text-2xl font-bold font-['Helvetica Neue'] leading-9">
              Dog Walkers
            </div>
            <div className="w-[50.77px] flex justify-center items-center m-4 absolute bottom-0 text-white right-0 h-[50.77px] bg-white bg-opacity-5 rounded-full border border-white border-opacity-5 backdrop-blur-[9.20px]">
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
            <div className="w-[302px] h-[400px] bg-black bg-opacity-20 rounded-lg">
              <img
                className="object-cover rounded-xl w-full h-full"
                src={dogWalker.src}
                alt=""
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HireTheseFreelancers;
