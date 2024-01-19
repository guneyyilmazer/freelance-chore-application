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
      <div className="w-[100vw] relative h-[600px] bg-black bg-opacity-20">
        <div className="text-white ml-[100px] py-[70px] text-base font-bold font-['Helvetica Neue'] leading-normal">
          {" "}
          WHAT USERS ARE SAYING
        </div>
        <div className="w-[587px] ml-[100px] text-white text-[32px] font-bold font-['Helvetica Neue'] leading-[44px]">
          {" "}
          “Orea was a game-changer to manage my busy schedule. I hired an
          amazing lawn technician who efficiently takes care of my lawn.”
        </div>
        <div className="text-white ml-[100px] my-[30px] text-base font-bold font-['Helvetica Neue'] leading-normal">
          Emily Turner
        </div>
        <div className="w-full h-full top-0 absolute z-[-1]">
          <img
            src={emilyturner.src}
            className="w-full object-cover h-full"
            alt=""
          />
        </div>
      </div>
      <div className="w-12 h-12 bg-white bg-opacity-5 rounded-full border-2 border-white border-opacity-5" />
    </main>
  );
}
