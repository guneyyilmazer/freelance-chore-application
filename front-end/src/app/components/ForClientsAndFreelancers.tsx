import React from "react";
import forclient from "../images/forclient.png";
import ticksquare from "../images/tick-square.svg";
import arrowright from "../images/arrow-right.svg";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ForClientsAndFreelancers = () => {
  return (
    <div className="bg-white flex flex-col justify-center items-center py-[64px]">
      <div className="flex justify-center mb-[50px] flex-col items-center">
        <div className="w-[611px] text-center text-black text-base font-normal font-['Helvetica Neue'] leading-normal">
          THE FUTURE OF WORK
        </div>
        <div className="w-[611px] text-center text-black text-2xl font-bold font-['Helvetica Neue'] leading-9">
          Skillful Solutions, Delivered by Experts
        </div>
      </div>
      <div className="flex w-[1300px] justify-around">
        <div className="w-[900px] h-[624px] flex justify-between relative bg-slate-800 rounded-3xl">
          <div>
            <div className="w-[271px] pl-1 pt-1 left-[40px] top-[513px] absolute flex-col justify-start items-start gap-2 inline-flex">
              <div className="self-stretch grow shrink basis-0 px-10 py-3.5 bg-green-600 rounded-[40px] shadow justify-center items-center gap-[5px] inline-flex">
                <div className="text-center text-white text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
                  Discover Orea for Clients
                </div>
              </div>
            </div>
            <div className="left-[40px] top-[132px] absolute flex-col justify-start items-start gap-1 inline-flex">
              <div className="text-center text-white text-4xl font-bold font-['Helvetica Neue'] leading-[54px]">
                For Clients
              </div>
              <div className="w-[339px] text-gray-200 text-base font-normal font-['Helvetica Neue'] leading-normal">
                Orea lets you find and hire skilled professionals for any task
                at hand. Explore a world where your needs are met with
                precision.
              </div>
            </div>
            <div className="w-[333px] h-[42px] left-[40px] flex top-[306px] absolute">
              <div className="w-[297px] left-[36px] top-0 absolute text-gray-200 text-sm font-light font-['Helvetica Neue'] leading-[21px]">
                Gain insights before you hire. Explore detailed profiles of
                skilled freelancers, including reviews.
              </div>
              <div className="w-6 h-6 left-0 top-[3px] absolute justify-center items-center inline-flex">
                <img src={ticksquare.src} />
              </div>
            </div>
            <div className="w-[333px] h-[42px] left-[40px] top-[372px] absolute">
              <div className="w-[297px] left-[36px] top-0 absolute text-gray-200 text-sm font-light font-['Helvetica Neue'] leading-[21px]">
                Efficient appointment scheduling ensures that freelancers work
                to fit your daily schedule.
              </div>
              <div className="w-6 h-6 left-0 top-[3px] absolute justify-center items-center inline-flex">
                <img src={ticksquare.src} />
              </div>
            </div>
            <div className="w-[333px] h-[42px] left-[40px] top-[438px] absolute">
              <div className="w-[297px] left-[36px] top-0 absolute text-gray-200 text-sm font-light font-['Helvetica Neue'] leading-[21px]">
                Orea stands behind the quality of service. We ensure the job
                meets your expectations.
              </div>
              <div className="w-6 h-6 left-0 top-[3px] absolute justify-center items-center inline-flex">
                <img src={ticksquare.src} />
              </div>
            </div>
            <div className="w-16 h-16 flex justify-center items-center left-[40px] top-[44px] absolute">
              <div className="w-16 h-16 left-0 top-0 absolute bg-white bg-opacity-5 rounded-full border border-white border-opacity-5 backdrop-blur-[11.60px]" />
              <div className="w-6 h-6 text-white absolute justify-center items-center inline-flex">
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
            </div>
          </div>
          <div>
            <img className="w-[400px] mr-5" src={forclient.src} />
          </div>
        </div>
        <div className="w-[356px] h-[624px] relative bg-green-950 rounded-[20px]">
          <div className="w-[270px] pl-1 pt-1 left-[24px] top-[514px] absolute flex-col justify-start items-start gap-2 inline-flex">
            <div className="grow shrink basis-0 px-10 py-3.5 bg-green-600 rounded-[40px] shadow justify-center items-center gap-[5px] inline-flex">
              <div className="text-center w-[200px] text-white text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
                Discover Orea for Freelancers
              </div>
            </div>
          </div>
          <div className="left-[24px] top-[116px] absolute text-center text-white text-4xl font-bold font-['Helvetica Neue'] leading-[54px]">
            For Freelancers
          </div>
          <div className="w-[308px] left-[24px] top-[398px] absolute text-gray-200 text-base font-normal font-['Helvetica Neue'] leading-normal">
            As a service provider, Orea lets you showcase your skills and
            connect with clients seeking your expertise.
          </div>
          <div className="w-16 h-16 flex justify-center items-center left-[24px] top-[35px] absolute">
            <div className="w-16 h-16 left-0 top-0 absolute bg-white bg-opacity-5 rounded-full border border-white border-opacity-5 backdrop-blur-[11.60px]" />
            <div className="w-6 h-6 text-white absolute justify-center items-center inline-flex">
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForClientsAndFreelancers;
