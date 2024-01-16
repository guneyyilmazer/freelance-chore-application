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
    <div ref={ref} className="flex flex-col my-2 break-words">
      <span className="text-xl">Edit Title</span>

      <div className="flex items-center">
      <input
        type="text"
        className="shadow appearance-none border my-1 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ref={titleRef}
      />
        <button
          className="bg-green-800 mx-1 px-4 py-2 rounded-md text-white"
          onClick={handleClick}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditDesc;
