"use client";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Cookies from "js-cookie";
import { BACKEND_SERVER_IP } from "../layout";
import { useSearchParams } from "next/navigation";
import Loading from "./Loading";

const Signup = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formIndex, setFormIndex] = useState(0);
  const [selectedState, setSelectedState] = useState(""); //SELECT STATE IN FUNCTION
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [jobType, setJobType] = useState({});
  const [wage, setWage] = useState<number>(15);
  const [aboutMe, setAboutMe] = useState("");
  const stateRef = useRef<HTMLSelectElement>(null);
  const cityRef = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    getStates();
  }, []);
  useEffect(() => {
    selectedState != "" && getStates();
    selectedState != "" && getCities();
  }, [selectedState]);

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
    if (!response.error) setStates(response.data.states);
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
          state: stateRef.current?.value,
        }),
      }
    );
    const response = await res.json();
    console.log(response);
    if (!response.error) setCities(response.data);
  };

  const searchParams = useSearchParams();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      username &&
      email &&
      password &&
      jobType != "" &&
      stateRef.current?.value != "default" &&
      cityRef.current?.value != "default" &&
      aboutMe != "" &&
      wage
    ) {
      const res = await fetch(`${BACKEND_SERVER_IP}/user/signup`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          type: { freelancer: true },
          username: username,
          email: email,
          password: password,
          location: {
            state: stateRef.current!.value,
            city: cityRef.current!.value,
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
        Cookies.set("Auth_Token", response.AuthValidation, { expires: 5 });
        window.location.replace("/");
      } else alert(response.error);
    } else alert("All credentials must be filled.");
  };

  return (
    <div className="flex flex-col justify-center items-center mt-4 md:mt-10">
      <form
        className="flex flex-col w-[80vw] md:w-[30vw]"
        onSubmit={handleSubmit}
      >
        {formIndex == 0 && (
          <>
            <h2 className="text-dark text-2xl mb-4 md:text-3xl font-semibold text-center">
              Signup As A Freelancer
            </h2>
            <h3 className="text-sm">Username</h3>

            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-1"
              placeholder="Enter username"
              name=""
              id=""
            />
            <h3 className="text-sm">Email</h3>

            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-1"
              placeholder="Enter email"
              name=""
              id=""
            />
            <h3 className="text-sm">Password</h3>

            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-1"
              placeholder="Enter password"
              name=""
              id=""
            />
            <div className="flex my-5 flex-col">
              <label htmlFor="jobs">
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
                <option value="cuttingGrass">Grass Cutting</option>
                <option value="cleaning">Cleaning</option>
                <option value="plumbing">Plumbing</option>
                <option value="moving">Moving</option>
                <option value="dogWalking">Dog Walking</option>
              </select>
            </div>
            <h3 className="text-sm">Hourly Wage</h3>

            <input
              type="number"
              onChange={(e) => setWage(Number(e.target.value))}
              className="mt-2 p-1"
              placeholder="Enter your hourly wage (You can change this later)"
              name=""
              id=""
            />
            <h3 className="text-sm my-2">About Me</h3>
            <textarea
              className="border-2"
              cols={30}
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              rows={10}
            ></textarea>
          </>
        )}

        {formIndex == 1 && (
          <div>
            {states.length != 0 ? (
              <div className="flex my-5 flex-col">
                <label htmlFor="types">Choose your state</label>
                <select
                  ref={stateRef}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setCities([]);
                  }}
                  className="shadow p-3 appearance-none border"
                  name="jobs"
                  id="jobs"
                >
                  <option value="default" disabled selected>
                    {" "}
                    Select Your State{" "}
                  </option>
                  {states.map((item: any) => (
                    <option value={item.name}>{item.name}</option>
                  ))}
                </select>
              </div>
            ) : (
              <Loading />
            )}
            {cities.length != 0 ? (
              <div className="flex my-5 flex-col">
                <label htmlFor="types">Choose your city</label>
                <select
                  ref={cityRef}
                  className="shadow p-3 appearance-none border"
                  name="jobs"
                  id="jobs"
                >
                  <option value="default" disabled selected>
                    {" "}
                    Select Your City{" "}
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
            <div className="mt-3 text-center">
              <button
                className="p-2 bg-green-600 text-white rounded-lg"
                type="submit"
              >
                Signup
              </button>
            </div>
          </div>
        )}
        <div className="mt-3 text-center"></div>
      </form>
      {formIndex == 0 && (
        <button
          onClick={() => setFormIndex(1)}
          className="p-3 text-lg my-3 bg-green-600 text-white rounded-lg"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Signup;
