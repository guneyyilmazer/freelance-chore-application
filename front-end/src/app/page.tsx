"use client";
import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import { BACKEND_SERVER_IP } from "./layout";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { user } from "./types";
import Link from "next/link";
import emilyturner from "./images/emilyturner.jpg";
import DefaultProfilePicture from "./images/default.jpeg";
import Features from "./components/Features";
import ForClientsAndFreelancers from "./components/ForClientsAndFreelancers";
import HireTheseFreelancers from "./components/HireTheseFreelancers";
import TopFreelancersInYourCity from "./components/TopFreelancersInYourCity";
export default function Home() {
  const client = useSelector((shop: any) => shop.app.user);
  const [user, setUser] = useState<user>();
  console.log(client);
  useEffect(() => {
    getUser();
  }, []);
  const [freelancers, setFreelancers] = useState([]);
  const getUser = async () => {
    const res = await fetch(`${BACKEND_SERVER_IP}/user/loadUser`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },
      body: JSON.stringify({
        userId: client.userId,
      }),

      method: "POST",
    });
    const response = await res.json();
    if (!response.error) {
      setUser(response);
    }
  };

  return (
    <main className="">
      <div className="secondary pt-[60px]">
        <Hero />
      </div>
      <div className="">
        <Features />
      </div>
      <div>
        <ForClientsAndFreelancers />
      </div>
      <div>
        <HireTheseFreelancers />
      </div>
      <div className="">
        <TopFreelancersInYourCity />
      </div>
      <div className="w-[100vw] flex justify-center items-center relative h-[300px] md:h-[600px] bg-opacity-20">
        <div className="w-[90%]">
          {" "}
          <div className="text-white 0 md:ml-[100px] py-[30px] md:py-[70px] font-bold">
            WHAT USERS ARE SAYING
          </div>
          <div className="md:w-[587px] md:ml-[100px] text-white text-lg md:text-[32px] font-bold md:leading-[44px]">
            {" "}
            “Orea was a game-changer to manage my busy schedule. I hired an
            amazing lawn technician who efficiently takes care of my lawn.”
          </div>
          <div className="text-white md:ml-[100px] my-[30px] font-bold">
            Emily Turner
          </div>
          <div className="w-full h-full left-0 top-0 absolute z-[-1]">
            <img
              src={emilyturner.src}
              className="md:w-full object-cover h-full"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="md:w-12 h-12 bg-white bg-opacity-5 rounded-full border-2 border-white border-opacity-5" />
    </main>
  );
}
