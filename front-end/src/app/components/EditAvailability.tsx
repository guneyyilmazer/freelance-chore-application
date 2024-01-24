import React, { useEffect, useRef, useState } from "react";
import { BACKEND_SERVER_IP } from "../layout";
import Cookies from "js-cookie";

const EditDesc = ({ show, setShow, id }: any) => {
  const availabilityRef = useRef<HTMLSelectElement>(null);
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
  const handleClick = async () => {
    if (!availabilityRef.current?.value) {
      alert("Must choose one.");
    } else {
      const res = await fetch(`${BACKEND_SERVER_IP}/post/changeAvailability`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Cookies.get("Auth_Token")}`,
        },

        method: "PATCH",
        body: JSON.stringify({
          id,
          availability: {[availabilityRef.current?.value]:true},
        }),
      });
      const response = await res.json();
      if (!response.error) {
        alert("Availability has been changed successfully!");
        window.location.reload();
      }
      setShow(!show);
    }
  };
  return (
    <div className="w-[100vw] h-[100vh] absolute left-0 top-0 bg-white bg-opacity-80 flex justify-center items-center">
      <div ref={ref} className="break-words">
        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-2xl">Select a value</h3>
          <select
            className="shadow p-3 appearance-none border"
            ref={availabilityRef}
          >
            <option selected disabled>
              Select a value
            </option>
            <option value="fullTime">Full Time</option>
            <option value="partTime">Part Time</option>
          </select>
            <button
              className="bg-green-600 mx-1 p-2 px-4 rounded-md text-white"
              onClick={handleClick}
            >
              Save
            </button>
        </div>
      </div>
    </div>
  );
};

export default EditDesc;
