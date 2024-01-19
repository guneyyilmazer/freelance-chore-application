"use client";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Cookies from "js-cookie";
import { BACKEND_SERVER_IP } from "../layout";
import { useSearchParams } from "next/navigation";
import { user } from "../types";
import { JobType } from "../types";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const router = useRouter();
  const client = useSelector((shop: any) => shop.app.user);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formIndex, setFormIndex] = useState(0);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [username, setUsername] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [jobType, setJobType] = useState<JobType>({});
  const [wage, setWage] = useState<number>();
  const [user, setUser] = useState<user>();
  const stateRef = useRef<HTMLSelectElement>(null);
  const cityRef = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    //calling the api after state change, because state works async
    selectedState != "" && getStates();
    selectedState != "" && getCities();
    setSelectedCity("");
  }, [selectedState]);
  const getUser = async () => {
    const res = await fetch(`${BACKEND_SERVER_IP}/user/loadUser`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },
      body: JSON.stringify({
        token: Cookies.get("Auth_Token"),
      }),

      method: "POST",
    });

    const response = await res.json();
    if (!response.error) {
      setUsername(response.username);
      setJobType(response.freelancerDetails.jobType);
      setSelectedState(response.location.state);
      setSelectedCity(response.location.city);
      setWage(response.freelancerDetails.hourlyWage);
      setUser(response);
      setAboutMe(response.freelancerDetails.aboutMe)
    }
  };
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

  const searchParams = useSearchParams();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username && selectedCity && selectedState && wage && jobType) {
      //will add aboutMe later on
      const res = await fetch(`${BACKEND_SERVER_IP}/user/changeProfile`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Cookies.get("Auth_Token")}`,
        },
        method: "PUT",
        body: JSON.stringify({
          username,
          location: {
            state: selectedState,
            city: selectedCity,
          },
          freelancerDetails: {
            jobType,
            hourlyWage: wage,
            aboutMe,
          },
        }),
      });
      const response = await res.json();
      if (!response.error) {
        alert("Successfully updated profile!");

        router.push(`/user/?id=${client.userId}`);
      } else alert(response.error);
    } else alert("All credentials must be filled.");
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        {formIndex == 0 && (
          <>
            <h2 className="text-dark text-center">Edit Your Profile</h2>
            <h3 className="text-sm">Username</h3>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 p-1"
              placeholder="Enter username"
              name=""
              id=""
            />
            <div className="flex my-5 flex-col">
              <label className="text-sm" htmlFor="jobs">
                Choose the main type of work you would like to do
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
                  Select A Type{" "}
                </option>
                <option selected={jobType.cuttingGrass} value="cuttingGrass">
                  Grass Cutting
                </option>
                <option selected={jobType.cleaning} value="cleaning">
                  Cleaning
                </option>
                <option selected={jobType.plumbing} value="plumbing">
                  Plumbing
                </option>
                <option
                  selected={jobType.moving}
                  value="moving"
                >
                  Moving
                </option>
                <option selected={jobType.dogWalking} value="dogWalking">
                  Dog Walking
                </option>
              </select>
            </div>
            <div>
              <h3 className="text-sm">About Me</h3>
              <textarea
                className="shadow"
                cols={30}
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                rows={10}
              ></textarea>
            </div>
            <h3 className="text-sm">Hourly Wage</h3>
            <input
              type="number"
              value={wage}
              onChange={(e) => setWage(Number(e.target.value))}
              className="mt-2 p-1"
              placeholder="Enter your hourly wage (You can change this later)"
              name=""
              id=""
            />
          </>
        )}

        {formIndex == 1 && (
          <div>
            {states.length != 0 && (
              <div className="flex my-5 flex-col">
                <label htmlFor="types">Choose your state</label>
                <select
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                  }}
                  className="shadow p-3 appearance-none border"
                  name="jobs"
                  id="jobs"
                >
                  <option value={selectedState} disabled selected>
                    Selected State: {selectedState}
                  </option>
                  {states.map((item: any) => (
                    <option value={item.name}>{item.name}</option>
                  ))}
                </select>
              </div>
            )}
            {cities.length != 0 && (
              <div className="flex my-5 flex-col">
                <label htmlFor="types">Choose your city</label>
                <select
                  ref={cityRef}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="shadow p-3 appearance-none border"
                  name="jobs"
                  id="jobs"
                >
                  <option value={cities[0]} disabled selected>
                    Selected City: {cities[0]}
                  </option>
                  {cities.map((item: string) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="mt-3 text-center">
              <button
                className="p-2 bg-green-900 text-white rounded-lg"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        )}
        <div className="mt-3 text-center"></div>
      </form>
      {formIndex == 0 && (
        <button
          onClick={() => setFormIndex(1)}
          className="p-2 bg-green-900 text-white rounded-lg"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default EditProfile;
