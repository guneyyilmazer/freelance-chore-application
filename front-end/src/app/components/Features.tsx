import React from "react";
import features1 from "../images/features1.png";
import features2 from "../images/features2.png";
import features3 from "../images/features3.png";
import features4 from "../images/features4.png";
const Features = () => {
  return (
    <div className="md:w-[100vw] h-[860px] md:h-[839px] bg-slate-800 flex flex-col justify-center items-center">
      {/* ⬆ start of main div ⬆ */}

      {/* ⬇ start of wrapper div ⬇ */}
      <div className="w-[90%] md:w-full">
        {/* ⬇ start of title div ⬇ */}
        <div className="flex justify-center mb-[20px]">
          <div className="w-full md:w-[650px] text-center text-white text-3xl md:text-[32px] font-medium leading-[44px]">
            New Chore Is Equipped With The Best Features To Enable You Find The
            Right Fit.
          </div>
        </div>
        {/* ⬆ end of title div ⬆ */}

        {/* ⬇ start of features div ⬇ */}
        <div className="flex md:justify-center overflow-x-auto w-full gap-6">
          {/* ⬇ start of feature 1 div ⬇ */}
          <div className="w-[302px] flex flex-col gap-6">
            <div className="h-[0.60px] bg-green-600 bg-opacity-70" />
            <div className="text-white text-xl font-medium">
              Accurate Matchmaking
            </div>
            <div className="flex flex-col gap-6">
              <img
                className="h-[417px] relative rounded-[20px]"
                src={features1.src}
              />
              <div className="text-white font-light">
                Our advanced algorithm pairs you with skilled professionals
                based on their expertise, reviews, and proximity.
              </div>
            </div>
          </div>
          {/* ⬆ end of feature 1 div ⬆ */}

          {/* ⬇ start of feature 2 div ⬇ */}
          <div className="w-[302px] flex flex-col gap-6">
            <div className="h-[0.60px] bg-green-600 bg-opacity-70" />
            <div className="text-white text-xl font-medium">
              Instant Chat Support
            </div>
            <div className="flex flex-col gap-6">
              <img
                className="h-[417px] relative rounded-[20px]"
                src={features2.src}
              />
              <div className="text-white font-light">
                Need quick assistance? Connect instantly with our dedicated
                support team through our built-in chat feature.{" "}
              </div>
            </div>
          </div>
          {/* ⬆ end of feature 2 div ⬆ */}

          {/* ⬇ start of feature 3 div ⬇ */}
          <div className="w-[302px] flex flex-col gap-6">
            <div className="h-[0.60px] bg-green-600 bg-opacity-70" />
            <div className="text-white text-xl font-medium">
              Transparent Pricing
            </div>
            <div className="flex flex-col gap-6">
              <img
                className="h-[417px] relative rounded-[20px]"
                src={features3.src}
              />
              <div className="text-white font-light">
                We guarantee upfront, transparent pricing for every job. Know
                exactly what you&apos;ll pay before you hire.
              </div>
            </div>
          </div>
          {/* ⬆ end of feature 3 div ⬆ */}

          {/* ⬇ start of feature 4 div ⬇ */}

          <div className="w-[302px] flex flex-col gap-6">
            <div className="h-[0.60px] bg-green-600 bg-opacity-70" />
            <div className="text-white text-xl font-medium leading-[30px]">
              Secure Payments
            </div>
            <div className="flex flex-col gap-6">
              <img
                className="h-[417px] relative rounded-[20px]"
                src={features4.src}
              />
              <div className="text-white font-light">
                Your financial security is our priority. All transactions are
                processed through a reliable, encrypted system.
              </div>
            </div>
          </div>
          {/* ⬆ end of feature 4 div ⬆ */}
        </div>
        {/* ⬆ end of features div ⬆ */}
      </div>
      {/* ⬆ end of wrapper div ⬆ */}

      {/* ⬇ end of main div ⬇ */}
    </div>
  );
};

export default Features;
