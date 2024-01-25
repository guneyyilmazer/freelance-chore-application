import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { BACKEND_SERVER_IP } from "../layout";
import { useSelector } from "react-redux";
import { user } from "../types";
import Cookies from "js-cookie";
import DefaultProfilePicture from "../images/default.jpeg";
import star from "../images/Star.svg";
import tickCircle from "../images/tick-circle.svg";
const TopFreelancersInYourCity = () => {
  const client = useSelector((shop: any) => shop.app.user);
  const [user, setUser] = useState<user>();
  console.log(client);
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    user && getFreelancers();
  }, [user]);
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
  const getFreelancers = async () => {
    const res = await fetch(`${BACKEND_SERVER_IP}/user/loadFreelancers`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },
      body: JSON.stringify({
        page: 1,
        amount: 4,
        type: { random: true },
        state: client.location.state,
        city: client.location.city,
      }),

      method: "POST",
    });
    const response = await res.json();
    if (!response.error) {
      setFreelancers(response.freelancers);
    }
  };
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
        {freelancers.map((item: user) => (
          <div key={item.userId} className="w-[300px] h-[350px] flex flex-col items-center bg-white rounded-lg">
            <img
              className="w-full p-2 h-[215px] rounded-lg"
              src={
                item.profilePicture
                  ? item.profilePicture
                  : DefaultProfilePicture.src
              }
            />
            <div className="flex flex-col mt-4 justify-between w-[85%]">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <div className="text-xl font-bold">{item.username}</div>

                  <div className="text-slate-600 text-sm">
                    {item.freelancerDetails?.jobType.cleaning &&
                      "Cleaning Specialist"}
                    {item.freelancerDetails?.jobType.cuttingGrass &&
                      "Grass Cutting Specialist"}
                    {item.freelancerDetails?.jobType.moving &&
                      "Moving Specialist"}
                    {item.freelancerDetails?.jobType.plumbing && "Plumber"}
                    {item.freelancerDetails?.jobType.dogWalking && "Dog Walker"}
                  </div>
                </div>
                <div className="flex rounded-lg justify-center items-center">
                  <div className="text-zinc-900 text-sm">4.8</div>
                  <img src={star.src} alt="" />
                </div>
              </div>
              <div className="flex w-full mt-5 justify-between">
                <div className="flex gap-1 items-center">
                  <img src={tickCircle.src} alt="" />
                  <div className="text-slate-600 text-xs">
                    85 Jobs Completed{" "}
                  </div>
                </div>
                <div className="text-green-600 text-sm">View Profile</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopFreelancersInYourCity;
