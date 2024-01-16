import React from "react";

const Footer = () => {
  return (
    <div className="w-[1440px] h-[428px] p-6 bg-white justify-center items-center gap-6 inline-flex">
      <div className="w-[495px] h-[380px] relative bg-slate-800 rounded-[20px]">
        <div className="w-[180px] pl-1 pt-1 left-[40px] top-[279px] absolute flex-col justify-start items-start gap-2 inline-flex">
          <div className="self-stretch grow shrink basis-0 px-10 py-3.5 bg-green-600 rounded-[40px] shadow justify-center items-center gap-[5px] inline-flex">
            <div className="text-center text-white text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
              Get Started
            </div>
            <div className="h-[9px] justify-center items-center flex">
              <div className="w-[9px] h-[9px] relative flex-col justify-start items-start flex" />
            </div>
          </div>
        </div>
        <div className="h-[204px] left-[40px] top-[43px] absolute flex-col justify-start items-start gap-3 inline-flex">
          <div className="self-stretch text-white text-[40px] font-bold font-['Helvetica Neue'] leading-[48px]">
            Built for you to hire right person, for the right job.
          </div>
          <div className="w-96 text-gray-100 text-base font-light font-['Helvetica Neue'] leading-normal">
            Hire from over 1000 people for variety of tasks. Find the right fit
            for your job using Orea.
          </div>
        </div>
        <div className="w-[283px] h-[283px] left-[300px] top-[190px] absolute" />
      </div>
      <div className="w-[873px] h-[380px] relative bg-emerald-100 bg-opacity-70 rounded-[20px]">
        <div className="w-[127px] left-[36px] top-[44px] absolute flex-col justify-between items-start inline-flex">
          <div className="w-[113.13px] mb-[15px] text-slate-800 text-sm font-bold font-['Helvetica Neue'] leading-[21px]">
            Product
          </div>
          <div className="flex-col justify-start items-start gap-[15px] flex">
            <div className="w-[118px] text-gray-600 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
              About
            </div>
            <div className="w-[118px] text-gray-600 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
              Changelog
            </div>
            <div className="w-[118px] text-gray-600 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
              Documentation
            </div>
            <div className="w-[118px] text-gray-600 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
              Why Orea
            </div>
            <div className="w-[127px] text-gray-600 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
              Careers
            </div>
          </div>
        </div>
        <div className="w-[118px] left-[211px] top-[44px] absolute flex-col justify-between items-start inline-flex">
          <div className="w-[113.13px] mb-[15px] text-slate-800 text-sm font-bold font-['Helvetica Neue'] leading-[21px]">
            Community
          </div>
          <div className="flex-col justify-start items-start gap-[15px] flex">
            <div className="w-[118px] text-gray-600 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
              Orea Community
            </div>
            <div className="w-[118px] text-gray-600 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
              Discord
            </div>
            <div className="w-[118px] text-gray-600 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
              Help Center
            </div>
            <div className="w-[118px] text-gray-600 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
              Get Support
            </div>
          </div>
        </div>
        <div className="w-[118px] left-[377px] top-[44px] absolute flex-col justify-between items-start inline-flex">
          <div className="w-[113.13px] mb-[15px] text-slate-800 text-sm font-bold font-['Helvetica Neue'] leading-[21px]">
            Resources
          </div>
          <div className="flex-col justify-start items-start gap-[15px] flex">
            <div className="w-[118px] text-gray-600 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
              Orea Blog
            </div>
            <div className="w-[118px] text-gray-600 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
              Webinars
            </div>
            <div className="w-[118px] text-gray-600 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
              Podcasts
            </div>
            <div className="w-[118px] text-gray-600 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
              Podcasts
            </div>
          </div>
        </div>
        <div className="w-[118px] left-[543px] top-[44px] absolute flex-col justify-between items-start inline-flex">
          <div className="w-[113.13px] mb-[15px] text-slate-800 text-sm font-bold font-['Helvetica Neue'] leading-[21px]">
            Legal
          </div>
          <div className="flex-col justify-start items-start gap-[15px] flex">
            <div className="w-[118px] text-gray-600 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
              Terms of Service
            </div>
            <div className="w-[118px] text-gray-600 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
              Privacy Policy
            </div>
          </div>
        </div>
        <div className="left-[223px] top-[274px] absolute justify-center items-center gap-6 inline-flex">
          <div className="justify-center items-center gap-2 flex">
            <div className="text-slate-800 text-sm font-medium font-['Helvetica Neue'] leading-[21px]">
              Contact us
            </div>
            <div>
              <span className="text-green-600 text-sm font-medium font-['Helvetica Neue'] underline leading-[21px]">
                support
              </span>
              <span className="text-green-600 text-sm font-medium font-['Helvetica Neue'] underline leading-[21px]">
                @orea.com
              </span>
            </div>
          </div>
          <div className="justify-end items-center gap-4 flex">
            <div className="text-slate-800 text-sm font-bold font-['Helvetica Neue'] leading-[21px]">
              Follow Us
            </div>
            <div className="justify-start items-start gap-2 flex">
              <div className="w-6 h-6 relative" />
              <div className="w-6 h-6 relative" />
              <div className="w-6 h-6 relative" />
              <div className="w-6 h-6 relative" />
            </div>
          </div>
        </div>
        <div className="w-[197px] left-[338px] top-[331px] absolute text-center text-slate-800 text-sm font-normal font-['Helvetica Neue'] leading-[21px]">
          © 2024 with Orea
        </div>
        <div className="left-[717px] top-[44px] absolute justify-start items-center gap-1.5 inline-flex">
          <div className="w-10 h-10 relative" />
          <div className="text-center text-green-950 text-xl font-bold font-['Helvetica Neue'] leading-[30px]">
            orea
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
