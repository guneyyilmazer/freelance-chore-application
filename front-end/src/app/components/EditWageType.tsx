import React, { useEffect, useRef, useState } from "react";
import { BACKEND_SERVER_IP } from "../layout";
import Cookies from "js-cookie";

const EditDesc = ({ show, setShow, id }: any) => {
  const [chosen, setChosen] = useState("");
  const hourlyRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
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
    const res = await fetch(`${BACKEND_SERVER_IP}/post/changePrice`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },

      method: "PATCH",
      body: JSON.stringify({
        id,
        price: priceRef.current ? priceRef.current.value : -1,
        hourly: hourlyRef.current ? hourlyRef.current.value : -1,
      }),
    });
    const response = await res.json();
    if (!response.error) {
      alert("Wage has been changed successfully!");
      window.location.reload();
    }
    setShow(!show);
  };
  return (
    <div ref={ref} className="break-words">
      {chosen == "" && (
        <select
          className="shadow p-3 appearance-none border"
          onChange={(e) => setChosen(e.target.value)}
        >
          <option selected disabled>
            Select a wage type
          </option>
          <option value="hourly">Hourly</option>
          <option value="price">Price</option>
        </select>
      )}
      {chosen == "hourly" ? (
        <div className="flex">
          <input
            ref={hourlyRef}
            placeholder="Enter new hourly wage."
            className="shadow appearance-none border my-1 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
          />
          <div className="flex items-center">
            <button
              className="bg-green-800 mx-1 p-2 px-4 rounded-md text-white"
              onClick={handleClick}
            >
              Save
            </button>
          </div>
        </div>
      ) : chosen == "price" ? (
        <div className="flex">
          <input
            className="shadow appearance-none border my-1 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ref={priceRef}
            placeholder="Enter new price."
            type="number"
          />
          <div className="flex items-center">
            <button
              className="bg-green-800 mx-1 p-2 px-4 rounded-md text-white"
              onClick={handleClick}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default EditDesc;
