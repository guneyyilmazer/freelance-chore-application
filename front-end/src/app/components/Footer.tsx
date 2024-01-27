"use client";
import Link from "next/link";
import React from "react";
import logo from "../images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faSquareFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "react-redux";

const Footer = () => {
  const mobileFilterMenu = useSelector(
    (shop: any) => shop.app.mobileFilterMenu
  );
  return (
    <div>
      {!mobileFilterMenu && (
        <div className="md:h-[428px] p-6 bg-white flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="md:w-[495px] h-[320px] md:h-[380px] flex flex-col justify-center items-center bg-slate-800 rounded-[20px]">
            <div className="w-[86%] md:w-[80%]">
              <div className="flex flex-col gap-5">
                <div className="text-white text-2xl md:text-[40px] font-bold md:leading-[48px]">
                  Built for you to hire the right person, for the right job.
                </div>
                <div className="md:w-96 text-gray-100 font-light">
                  Hire from over 1000 people for variety of tasks. Find the
                  right fit for your job using New Chore.
                </div>
              </div>
              <div className="mt-[50px] md:mt-[32px]">
                <Link
                  href="/auth"
                  className="px-10 py-3.5 bg-green-600 rounded-lg shadow text-white text-sm text-center gap-1"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[873px] md:h-[380px] relative flex items-center flex-col bg-emerald-100 bg-opacity-70 rounded-[20px]">
            <div className="w-[90%]">
              <div className="grid grid-cols-2 gap-20 md:gap-0 md:flex mt-[50px] justify-between">
                <div className="flex flex-col">
                  <div className="text-slate-800 text-sm font-bold mb-[16px]">
                    Product
                  </div>
                  <div className="flex flex-col text-gray-600 text-sm gap-4">
                    <div>About</div>
                    <div>Changelog</div>
                    <div>Documentation</div>
                    <div>Why New Chore</div>
                    <div>Careers</div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-slate-800 text-sm font-bold mb-[16px]">
                    Community
                  </div>
                  <div className="flex flex-col text-gray-600 text-sm gap-4">
                    <div>New Chore Community</div>
                    <div>Discord</div>
                    <div>Help Center</div>
                    <div>Get Support</div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className=" text-slate-800 text-sm font-bold mb-[16px]">
                    Resources
                  </div>
                  <div className="flex flex-col text-gray-600 text-sm gap-4">
                    <div>New Chore Blog</div>
                    <div>Webinars</div>
                    <div>Podcasts</div>
                    <div>Podcasts</div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-slate-800 text-sm font-bold mb-[16px]">
                    Legal
                  </div>
                  <div className="flex flex-col text-gray-600 text-sm gap-4">
                    <div>Terms of Service</div>
                    <div>Privacy Policy</div>
                  </div>
                </div>
                <div className="hidden md:flex">
                  <div className="w-10 h-10">
                    {" "}
                    <img src={logo.src} alt="" />
                  </div>
                  <div className="text-green-950 text-xl font-bold">New Chore</div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row mt-[40px] gap-5 justify-center items-center">
                <div className="flex justify-center items-center gap-2">
                  <div className="text-slate-800 text-sm font-medium">
                    Contact us
                  </div>
                  <span className="text-green-600 text-sm font-medium underline">
                    support@newchore.com
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-slate-800 text-sm font-bold">
                    Follow Us
                  </div>
                  <div className="flex text-lg gap-2">
                    <FontAwesomeIcon icon={faFacebook} />
                    <FontAwesomeIcon icon={faTwitter} />
                    <FontAwesomeIcon icon={faInstagram} />
                    <FontAwesomeIcon icon={faLinkedin} />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-7 mb-20 md:hidden">
                  <div className="w-10 h-10">
                    {" "}
                    <img className="w-full h-full" src={logo.src} alt="" />
                  </div>
                  <div className="text-green-950 text-xl font-bold">New Chore</div>
                </div>
                <div className="text-center absolute md:right-[400px] bottom-[25px] text-slate-800 text-sm">
                  © 2024 with New Chore
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
