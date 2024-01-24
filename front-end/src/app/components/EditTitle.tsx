import React, { useEffect, useRef, useState } from "react";
import { BACKEND_SERVER_IP } from "../layout";
import Cookies from "js-cookie";

const EditDesc = ({ show, setShow, id }: any) => {
  const titleRef = useRef<HTMLInputElement>(null);
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
    const res = await fetch(`${BACKEND_SERVER_IP}/post/changeTitle`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },

      method: "PATCH",
      body: JSON.stringify({
        id,
        title: titleRef.current?.value,
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
    <div className="absolute w-[100vw] h-[100vh] left-0 top-0 bg-white bg-opacity-80 flex justify-center items-center">
      <div ref={ref} className="flex flex-col break-words">
        <span className="text-2xl font-semibold">New Title</span>

        <div className="flex items-center">
          <div>
            <input
              type="text"
              className="shadow appearance-none border my-1 rounded w-full px-3 py-2 leading-tight focus:outline-none focus:shadow-outline"
              ref={titleRef}
            />
          </div>
          <div>
            <button
              className="bg-green-600 mx-1 px-3 py-2 rounded-md text-white"
              onClick={handleClick}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDesc;
