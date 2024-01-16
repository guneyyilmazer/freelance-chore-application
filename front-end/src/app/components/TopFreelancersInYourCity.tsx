import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const TopFreelancersInYourCity = () => {
  return (
    <div className="w-[100vw] h-[606px] relative bg-slate-800 flex-col justify-center items-center inline-flex">
      <div className="text-center flex w-full justify-center my-[40px] text-white text-[32px] font-bold font-['Helvetica Neue'] leading-[44px]">
        Top Freelancers In Your City
      </div>
      <div className=" w-[88%] flex justify-end mb-5 text-white">
        <div className="w-[100px] flex justify-around">
          <span>01/04</span>
          <button>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
      <div className="flex justify-around w-[90%]">
        {/* cards */}
        <div className="w-[302px] h-[356px] relative bg-white rounded-lg">
          <img
            className="w-[286px] h-[215px] left-[8px] top-[8px] absolute rounded-lg"
            src="https://via.placeholder.com/286x215"
          />
          <div className="left-[20px] top-[308px] absolute justify-start items-center gap-1 inline-flex">
            <div className="w-6 h-6 justify-center items-center flex">
              <div className="w-6 h-6 relative"></div>
            </div>
            <div className="text-slate-600 text-xs font-normal font-['Helvetica Neue'] leading-[18px]">
              85 Jobs Completed{" "}
            </div>
          </div>
          <div className="left-[20px] top-[239px] absolute flex-col justify-start items-start gap-0.5 inline-flex">
            <div className="text-black text-xl font-bold font-['Helvetica Neue'] leading-[30px]">
              Jonathan Flores
            </div>
            <div className="text-slate-600 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
              HVAC Technician
            </div>
          </div>
          <div className="px-2 py-1 left-[223px] top-[252px] absolute bg-slate-50 rounded-lg justify-center items-center gap-0.5 inline-flex">
            <div className="w-[22px] h-[11px] text-zinc-900 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
              4.8
            </div>
            <div className="w-5 h-5 relative" />
          </div>
          <div className="left-[207px] top-[310px] absolute text-green-600 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
            View Profile
          </div>
        </div>
        <div className="w-[302px] h-[356px] relative bg-white rounded-lg">
          <img
            className="w-[286px] h-[215px] left-[8px] top-[8px] absolute rounded-lg"
            src="https://via.placeholder.com/286x215"
          />
          <div className="left-[20px] top-[308px] absolute justify-start items-center gap-1 inline-flex">
            <div className="w-6 h-6 justify-center items-center flex">
              <div className="w-6 h-6 relative"></div>
            </div>
            <div className="text-slate-600 text-xs font-normal font-['Helvetica Neue'] leading-[18px]">
              102 Jobs Completed{" "}
            </div>
          </div>
          <div className="left-[20px] top-[239px] absolute flex-col justify-start items-start gap-0.5 inline-flex">
            <div className="text-black text-xl font-bold font-['Helvetica Neue'] leading-[30px]">
              Leslie Alexander
            </div>
            <div className="text-slate-600 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
              Home and Office Moving
            </div>
          </div>
          <div className="px-2 py-1 left-[223px] top-[252px] absolute bg-slate-50 rounded-lg justify-center items-center gap-0.5 inline-flex">
            <div className="w-[22px] h-[11px] text-zinc-900 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
              4.9
            </div>
            <div className="w-5 h-5 relative" />
          </div>
          <div className="left-[207px] top-[310px] absolute text-green-600 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
            View Profile
          </div>
        </div>
        <div className="w-[302px] h-[356px] relative bg-white rounded-lg">
          <img
            className="w-[286px] h-[215px] left-[8px] top-[8px] absolute rounded-lg"
            src="https://via.placeholder.com/286x215"
          />
          <div className="left-[20px] top-[308px] absolute justify-start items-center gap-1 inline-flex">
            <div className="w-6 h-6 justify-center items-center flex">
              <div className="w-6 h-6 relative"></div>
            </div>
            <div className="text-slate-600 text-xs font-normal font-['Helvetica Neue'] leading-[18px]">
              64Jobs Completed{" "}
            </div>
          </div>
          <div className="left-[20px] top-[239px] absolute flex-col justify-start items-start gap-0.5 inline-flex">
            <div className="text-black text-xl font-bold font-['Helvetica Neue'] leading-[30px]">
              Ralph Edwards
            </div>
            <div className="text-slate-600 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
              Electrical Technician
            </div>
          </div>
          <div className="px-2 py-1 left-[223px] top-[252px] absolute bg-slate-50 rounded-lg justify-center items-center gap-0.5 inline-flex">
            <div className="w-[22px] h-[11px] text-zinc-900 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
              4.7
            </div>
            <div className="w-5 h-5 relative" />
          </div>
          <div className="left-[207px] top-[310px] absolute text-green-600 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
            View Profile
          </div>
        </div>
        <div className="w-[302px] h-[356px] relative bg-white rounded-lg">
          <img
            className="w-[286px] h-[215px] left-[8px] top-[8px] absolute rounded-lg"
            src="https://via.placeholder.com/286x215"
          />
          <div className="left-[20px] top-[308px] absolute justify-start items-center gap-1 inline-flex">
            <div className="w-6 h-6 justify-center items-center flex">
              <div className="w-6 h-6 relative"></div>
            </div>
            <div className="text-slate-600 text-xs font-normal font-['Helvetica Neue'] leading-[18px]">
              236 Jobs Completed{" "}
            </div>
          </div>
          <div className="left-[20px] top-[239px] absolute flex-col justify-start items-start gap-0.5 inline-flex">
            <div className="text-black text-xl font-bold font-['Helvetica Neue'] leading-[30px]">
              Courtney Henry
            </div>
            <div className="text-slate-600 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
              Graffiti Painter
            </div>
          </div>
          <div className="px-2 py-1 left-[223px] top-[252px] absolute bg-slate-50 rounded-lg justify-center items-center gap-0.5 inline-flex">
            <div className="w-[22px] h-[11px] text-zinc-900 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
              5.0
            </div>
            <div className="w-5 h-5 relative" />
          </div>
          <div className="left-[207px] top-[310px] absolute text-green-600 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
            View Profile
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopFreelancersInYourCity;
