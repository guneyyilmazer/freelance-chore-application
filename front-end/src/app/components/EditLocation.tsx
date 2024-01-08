import React, { useEffect, useRef, useState } from "react";
import { BACKEND_SERVER_IP } from "../layout";
import Cookies from "js-cookie";
import Loading from "./Loading";

const EditDesc = ({ show, setShow, id }: any) => {
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleUserKeyPress = (event: KeyboardEvent) => {
    if (event.key == "Escape") {
      setShow(!show);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);
  const onClickOutside = () => {
    show && setShow(false);
  };
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);
  useEffect(() => {
    getStates();
  }, []);
  useEffect(() => {
    //calling the api after state change, because state works async
    selectedState != "" && getStates();
    selectedState != "" && getCities();
    setSelectedCity("");
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
      response.data.length == 0 && setCities(["Centre"]);
    }
  };
  const handleClick = async () => {
    const res = await fetch(`${BACKEND_SERVER_IP}/post/changeLocation`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },

      method: "PATCH",
      body: JSON.stringify({
        id,
        location: { state: selectedState, city: selectedCity },
      }),
    });
    const response = await res.json();
    if (!response.error) {
      alert(response.msg);
      window.location.reload();
    }
    setShow(!show);
  };
  return (
    <div ref={ref} className="break-words">
      {states.length != 0 ? (
        <div className="flex my-3 flex-col">
          <label htmlFor="types">Choose your state</label>
          <select
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedCity("");
              setCities([]);
            }}
            className="shadow break-words p-3 appearance-none border"
            name="jobs"
            id="jobs"
          >
            <option
              value={selectedState != "" ? (selectedState as string) : "empty"}
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
              value={selectedCity != "" ? (selectedCity as string) : "empty"}
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
      <div className="flex justify-center items-center">
        <button
          className="bg-green-800 my-2 p-2 px-4 rounded-md text-white"
          onClick={handleClick}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditDesc;
