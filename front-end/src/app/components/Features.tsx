import React from "react";
import features1 from "../images/features1.png";
import features2 from "../images/features2.png";
import features3 from "../images/features3.png";
import features4 from "../images/features4.png";
const Features = () => {
  return (
    <div className="w-[100vw] h-[839px] px-20 pb-[55.40px] bg-slate-800 flex-col justify-center items-center gap-[52px] inline-flex">
      <div>
        <div className="w-full flex justify-center my-[20px]">
          <div className="w-[650px] text-center text-white text-[32px] font-medium font-['Helvetica Neue'] leading-[44px]">
            Orea Is Equipped With The Best Features To Enable You Find The Right
            Fit.
          </div>
        </div>
        <div className="self-stretch justify-start items-start gap-6 inline-flex">
          <div className="flex-col justify-start items-start gap-5 inline-flex">
            <div className="flex-col justify-start items-start gap-6 flex">
              <div className="w-[302px] h-[0.60px] bg-green-600 bg-opacity-70" />
              <div className="text-white text-xl font-medium font-['Helvetica Neue'] leading-[30px]">
                Accurate Matchmaking
              </div>
            </div>
            <div className="flex-col justify-start items-start gap-6 flex">
              <img
                className="w-[302px] h-[417px] relative rounded-[20px]"
                src={features1.src}
              />
              <div className="w-[302px] text-white text-base font-light font-['Helvetica Neue'] leading-normal">
                Our advanced algorithm pairs you with skilled professionals
                based on their expertise, reviews, and proximity.
              </div>
            </div>
          </div>
          <div className="flex-col justify-start items-start gap-5 inline-flex">
            <div className="flex-col justify-start items-start gap-6 flex">
              <div className="w-[302px] h-[0.60px] bg-green-600 bg-opacity-70" />
              <div className="text-white text-xl font-medium font-['Helvetica Neue'] leading-[30px]">
                Instant Chat Support
              </div>
            </div>
            <div className="flex-col justify-start items-start gap-6 flex">
              <img
                className="w-[302px] h-[417px] relative rounded-[20px]"
                src={features2.src}
              />
              <div className="w-[302px] text-white text-base font-light font-['Helvetica Neue'] leading-normal">
                Need quick assistance? Connect instantly with our dedicated
                support team through our built-in chat feature.{" "}
              </div>
            </div>
          </div>
          <div className="flex-col justify-start items-start gap-5 inline-flex">
            <div className="flex-col justify-start items-start gap-6 flex">
              <div className="w-[302px] h-[0.60px] bg-green-600 bg-opacity-70" />
              <div className="text-white text-xl font-medium font-['Helvetica Neue'] leading-[30px]">
                Transparent Pricing
              </div>
            </div>
            <div className="flex-col justify-start items-start gap-6 flex">
              <img
                className="w-[302px] h-[417px] relative rounded-[20px]"
                src={features3.src}
              />
              <div className="w-[302px] text-white text-base font-light font-['Helvetica Neue'] leading-normal">
                We guarantee upfront, transparent pricing for every job. Know
                exactly what you'll pay before you hire.
              </div>
            </div>
          </div>
          <div className="flex-col justify-start items-start gap-5 inline-flex">
            <div className="flex-col justify-start items-start gap-6 flex">
              <div className="w-[302px] h-[0.60px] bg-green-600 bg-opacity-70" />
              <div className="text-white text-xl font-medium font-['Helvetica Neue'] leading-[30px]">
                Secure Payments
              </div>
            </div>
            <div className="flex-col justify-start items-start gap-6 flex">
              <img
                className="w-[302px] h-[417px] relative rounded-[20px]"
                src={features4.src}
              />
              <div className="w-[302px] text-white text-base font-light font-['Helvetica Neue'] leading-normal">
                Your financial security is our priority. All transactions are
                processed through a reliable, encrypted system.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
