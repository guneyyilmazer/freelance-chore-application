import React, { useEffect, useRef, useState } from "react";
import { BACKEND_SERVER_IP } from "../layout";
import Cookies from "js-cookie";
import { JobType } from "../types";

const EditDesc = ({
  show,
  setShow,
  type,
  id,
}: {
  show: boolean;
  setShow: any;
  type: JobType;
  id: string;
}) => {
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
    <div className="w-[100vw] h-[100vh] absolute left-0 top-0 flex items-center justify-center bg-white bg-opacity-80">
      <div ref={ref} className="flex justify-center flex-col gap-2">
        <label className="text-2xl" htmlFor="types">
          Choose a gig type:
        </label>
        <div className="flex items-center gap-2">
          <select
            ref={typeRef}
            className="shadow p-2 px-4 appearance-none border"
            name="jobs"
            id="jobs"
          >
            <option
              selected={type.cuttingGrass ? true : false}
              value="cuttingGrass"
            >
              Grass Cutting
            </option>
            <option selected={type.cleaning ? true : false} value="cleaning">
              Cleaning
            </option>
            <option selected={type.plumbing ? true : false} value="plumbing">
              Plumbing
            </option>
            <option selected={type.moving ? true : false} value="moving">
              Moving
            </option>
            <option
              selected={type.dogWalking ? true : false}
              value="dogWalking"
            >
              Dog Walking
            </option>
          </select>
          <div>
            <button
              className="bg-green-600 p-2 px-4 rounded-md text-white"
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
