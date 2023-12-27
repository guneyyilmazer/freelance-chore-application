"use client";
import React, { useEffect, useState } from "react";
import { BACKEND_SERVER_IP } from "../layout";
import Cookies from "js-cookie";
import { user } from "../types/UserTypes";
import SearchBar from "../components/SearchBar";
import DefaultProfilePicture from "../images/default.jpeg";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Loading from "../components/Loading";
const page = () => {
  const searchParams = useSearchParams();
  useEffect(() => {
    getFreelancers();
  }, []);
  const [freelancers, setFreelancers] = useState([]);
  const [jobType, setJobType] = useState(
    searchParams.get("type") != "random" &&
      searchParams.get("type") != undefined
      ? { [searchParams.get("type") as string]: true }
      : { random: true }
  );
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [wage, setWage] = useState(
    searchParams.get("hourly") ? searchParams.get("hourly") : 0
  );
  const [selectedState, setSelectedState] = useState(
    searchParams.get("state") ? searchParams.get("state") : ""
  );
  const [selectedCity, setSelectedCity] = useState(
    searchParams.get("city") ? searchParams.get("city") : ""
  );
  useEffect(() => console.log(selectedCity), [selectedCity]);
  const router = useRouter();
  const getStates = async () => {
    const res = await fetch(
      "https://countriesnow.space/api/v0.1/countries/states",
      {
        headers: {
          "Content-Type": "application/json",
        },

        method: "POST",
        body: JSON.stringify({
          country: "united states",
        }),
      }
    );
    const response = await res.json();
    if (!response.error) {
      setStates(response.data.states);
    }
  };
  const getCities = async () => {
    const res = await fetch(
      "https://countriesnow.space/api/v0.1/countries/state/cities",
      {
        headers: {
          "Content-Type": "application/json",
        },

        method: "POST",
        body: JSON.stringify({
          country: "united states",
          state: selectedState,
        }),
      }
    );
    const response = await res.json();
    if (!response.error) {
      const filtered = response.data.filter(
        (item: string) => item != selectedCity
      );
      setCities(selectedCity ? filtered : response.data);
    }
  };
  useEffect(() => {
    getStates();
  }, []);
  useEffect(() => {
    //calling the api after state change, because state works async
    selectedState != "" && getStates();
    selectedState != "" && getCities();
  }, [selectedState]);
  const getFreelancers = async () => {
    const res = await fetch(`${BACKEND_SERVER_IP}/user/loadFreelancers`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },
      body: JSON.stringify({
        page: 1,
        amount: 15,
        type: jobType,
        state: selectedState,
        city: selectedCity,
        wage,
      }),

      method: "POST",
    });
    const response = await res.json();
    if (!response.error) {
      setFreelancers(response.freelancers);
    }
  };
  return (
    <div className="flex justify-center">
      <div className="w-52 m-3 absolute left-0">
        {" "}
        {/* sidebar */}
        <div className="flex flex-col">
          <label className="text-center" htmlFor="jobs">
            Job Type
          </label>
          <select
            onChange={(e) => {
              setJobType({ [e.target.value]: true });
            }}
            className="shadow p-3 appearance-none border"
            name="jobs"
            id="jobs"
          >
            <option value="default" disabled selected>
              {" "}
              {Object.keys(jobType)[0]
                ? Object.keys(jobType)[0] == "cleaning"
                  ? "Cleaning"
                  : Object.keys(jobType)[0] == "plumbering"
                  ? "Plumbering"
                  : Object.keys(jobType)[0] == "cuttingGrass"
                  ? "Cutting Grass"
                  : Object.keys(jobType)[0] == "movingHeavyObjects"
                  ? "Moving Heavy Objects"
                  : Object.keys(jobType)[0] == "walkingTheDog"
                  ? "Walking The Dog"
                  : "Select"
                : "Select"}{" "}
            </option>
            <option value="cuttingGrass">Grass Cutting</option>
            <option value="cleaning">Cleaning</option>
            <option value="plumbering">Plumbering</option>
            <option value="movingHeavyObjects">Moving Heavy Objects</option>
            <option value="walkingTheDog">Walking The Dog</option>
          </select>
        </div>
        {states.length != 0 ? (
          <div className="flex my-3 flex-col">
            <label htmlFor="types">Choose your state</label>
            <select
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedCity("");
              }}
              className="shadow break-words p-3 appearance-none border"
              name="jobs"
              id="jobs"
            >
              <option
                value={selectedState != "" ? selectedState : "empty"}
                disabled
                selected
              >
                {selectedState != "" ? selectedState : "Select"}
              </option>
              {states.map((item: any) => (
                <option value={item.name}>{item.name}</option>
              ))}
            </select>
          </div>
        ) : (
          <div className="my-3">
            <Loading />
          </div>
        )}
        {cities.length != 0 ? (
          <div className="flex flex-col">
            <label htmlFor="types">Choose your city</label>
            <select
              onChange={(e) => {
                setSelectedCity(e.target.value);
              }}
              className="shadow p-3 appearance-none border"
              name="jobs"
              id="jobs"
            >
              <option
                value={selectedCity != "" ? selectedCity : "empty"}
                disabled
                selected
              >
                {selectedCity != "" ? selectedCity : "Select"}
              </option>
              {cities.map((item: string) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </div>
        ) : selectedState != "" ? (
          <div className="my-3">
            <Loading />
          </div>
        ) : (
          ""
        )}
        <div className="my-4">
          <h3 className="text-sm">Hourly Wage</h3>
          <input
            type="number"
            value={wage}
            onChange={(e) => setWage(e.target.value)}
            className="mt-2 w-52 p-1"
            name=""
            id=""
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => {
              window.location.replace("/freelancers");
            }}
            className="px-4 mx-1 py-1 my-4 bg-green-900 text-white rounded-md"
          >
            Reset
          </button>
          <button
            onClick={() => {
              router.push(
                `/freelancers/?type=${
                  Object.keys(jobType)[0] != undefined
                    ? Object.keys(jobType)[0]
                    : "random"
                }&state=${selectedState}&city=${selectedCity}&hourly=${wage}`
              );

              getFreelancers();
            }}
            className="px-4 py-1 my-4 bg-green-900 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-center">
          <SearchBar freelancer={true} />
        </div>
        <div className="flex flex-col w-56 justify-center items-center flex-wrap">
          {freelancers.map((item: user) => (
            <Link
              href={`/user?id=${item._id}`}
              className="flex text-center break-words my-5"
            >
              <img
                className="w-14 h-14 m-auto mr-3 rounded-full"
                src={
                  item.profilePicture
                    ? item.profilePicture
                    : DefaultProfilePicture.src
                }
              />
              <div className="flex flex-col break-words mx-1 text-start">
                <span className="text-xl mt-2">{item.username}</span>
                <div className="flex break-words items-center">
                  <span className="text-sm break-words">
                    From:{item.location.state}/{item.location.city}
                  </span>
                </div>
                <span className="text-sm break-words">
                  Specilazes in:
                  {item.freelancerDetails?.jobType.cleaning && " Cleaning"}
                  {item.freelancerDetails?.jobType.cuttingGrass &&
                    " Cutting Grass"}
                  {item.freelancerDetails?.jobType.movingHeavyObjects &&
                    " Moving Heavy Objects"}
                  {item.freelancerDetails?.jobType.plumbering && " Plumbering"}
                  {item.freelancerDetails?.jobType.walkingTheDog &&
                    " Walking The Dog"}
                </span>
                <span className="text-sm rounded-lg">
                  Hourly:{item.freelancerDetails?.hourlyWage}$
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
