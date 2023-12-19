import React, { useEffect, useRef, useState } from "react";
import { BACKEND_SERVER_IP } from "../layout";
import Cookies from "js-cookie";

const EditDesc = ({ show, setShow, type, id }: any) => {
  const typeRef = useRef<HTMLSelectElement>(null);
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
    const res = await fetch(`${BACKEND_SERVER_IP}/post/changeType`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },

      method: "PATCH",
      body: JSON.stringify({
        id,
        newType: { [typeRef.current!.value]: true },
      }),
    });
    const response = await res.json();
    if (!response.error) {
      alert("Type has been changed successfully!");
      window.location.reload();
    }
    setShow(!show);
  };
  return (
    <div ref={ref} className="flex my-5 flex-col">
      <label htmlFor="types">Choose a gig type:</label>

      <select
        ref={typeRef}
        className="shadow p-3 appearance-none border"
        name="jobs"
        id="jobs"
      >
        <option
          selected={type.grassCutting ? true : false}
          value="grassCutting"
        >
          Grass Cutting
        </option>
        <option selected={type.cleaning ? true : false} value="cleaning">
          Cleaning
        </option>
        <option selected={type.plumbering ? true : false} value="plumbering">
          Plumbering
        </option>
        <option
          selected={type.movingHeavyObjects ? true : false}
          value="movingHeavyObjects"
        >
          Moving Heavy Objects
        </option>
        <option
          selected={type.walkingTheDog ? true : false}
          value="walkingTheDog"
        >
          Walking The Dog
        </option>
      </select>
      <button onClick={handleClick}>Save</button>
    </div>
  );
};

export default EditDesc;
