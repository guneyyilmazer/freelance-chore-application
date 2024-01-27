"use client";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Cookies from "js-cookie";
import { BACKEND_SERVER_IP } from "../layout";
import Loading from "./Loading";
import getBase64 from "./GetBase64";

const Signup = () => {
  const [picture, setPicture] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      usernameRef.current?.value &&
      emailRef.current?.value &&
      passwordRef.current?.value &&
      selectedState != "" &&
      cityRef.current?.value != "default"
    ) {
      const res = await fetch(`${BACKEND_SERVER_IP}/user/signup`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: usernameRef.current!.value,
          email: emailRef.current!.value,
          password: passwordRef.current!.value,
          location: { state: selectedState, city: cityRef.current?.value },
          profilePicture: picture,
          type: { hirer: true },
        }),
      });
      const response = await res.json();
      if (!response.error) {
        Cookies.set("Auth_Token", response.AuthValidation, { expires: 5 });
        window.location.replace("/");
      } else alert(response.error);
    } else alert("All credentials must be filled.");
  };

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef<HTMLSelectElement>(null);
  const cityRef = useRef<HTMLSelectElement>(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState(""); //SELECT STATE IN FUNCTION
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
    if (!response.error) {
      if (response.data.length == 0) {
        setCities(["Centre"]);
      } else {
        setCities(response.data);
      }
    }
  };

  return (
    <form
      className="flex flex-col min-h-[70vh] md:w-[50vw] shadow p-5 px-12 justify-center"
      onSubmit={handleSubmit}
    >
      <h2 className="text-center font-semibold my-4 text-xl">
        Signup as a hirer account
      </h2>
      <label className="text-lg" htmlFor="username">
        Username
      </label>
      <input
        type="text"
        ref={usernameRef}
        className="my-2"
        placeholder="Enter username"
        name=""
        id="username"
      />

      <label className="text-lg" htmlFor="email">
        Email
      </label>
      <input
        type="email"
        ref={emailRef}
        className="my-2"
        placeholder="Enter email"
        name=""
        id="email"
      />
      <label className="text-lg" htmlFor="password">
        Password
      </label>

      <input
        type="password"
        ref={passwordRef}
        className="my-2"
        placeholder="Enter password"
        name=""
        id="password"
      />
      {states.length != 0 ? (
        <div className="flex mt-5 flex-col">
          <label htmlFor="types">Choose your state</label>
          <select
            ref={stateRef}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setCities([]);
            }}
            className="shadow p-3 appearance-none border"
            name="states"
            id="states"
          >
            <option value="default" disabled selected>
              {" "}
              Select Your State{" "}
            </option>
            {states.map((item: any) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <Loading />
      )}
      {cities.length != 0 ? (
        <div className="flex mt-5 flex-col">
          <label htmlFor="types">Choose your city</label>
          <select
            ref={cityRef}
            className="shadow p-3 appearance-none border"
            name="cities"
            id="cities"
          >
            <option value="default" disabled selected>
              {" "}
              Select Your City{" "}
            </option>
            {cities.map((item: string) => (
              <option key={item} value={item}>
                {item}
              </option>
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
      <div className="mt-4">
        <h4 className="text-lg">Profile Picture</h4>
        <input
          type="file"
          multiple
          onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
            const base64 = await getBase64(e.target.files![0]);
            setPicture(base64);
          }}
          className="text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100
        "
        />
      </div>
      <div className="my-2 text-center">
        <button
          className="p-2 py-3 rounded-lg text-white bg-green-600"
          type="submit"
        >
          Signup
        </button>
      </div>
    </form>
  );
};

export default Signup;
