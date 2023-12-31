import React, { useEffect, useRef, useState } from "react";
import { BACKEND_SERVER_IP } from "../layout";
import Cookies from "js-cookie";

const EditDesc = ({ show, setShow, text, id }: any) => {
  const [value, setValue] = useState(text);
  const descRef = useRef<HTMLTextAreaElement>(null);
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
    const res = await fetch(`${BACKEND_SERVER_IP}/post/changeDescription`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },

      method: "PATCH",
      body: JSON.stringify({
        id,
        newDescription: descRef.current!.value,
      }),
    });
    const response = await res.json();
    if (!response.error) {
      alert("Description changed successfully!");
      window.location.reload();
    }
    setShow(!show);
  };
  return (
    <div ref={ref} className="break-words flex flex-col">
      <textarea
        ref={descRef}
        value={value}
        className="shadow p-3 appearance-none border h-24"
        onChange={(e) => setValue(e.target.value)}
      />
      <div>

      <button
        className="bg-green-800 mt-2 p-2 px-4 rounded-md text-white"
        onClick={handleClick}
        >
        Save
      </button>
        </div>
    </div>
  );
};

export default EditDesc;
