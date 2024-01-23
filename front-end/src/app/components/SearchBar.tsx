"use client";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import SearchBarResults from "./SearchBarResults";
import { user } from "../types";
import { BACKEND_SERVER_IP } from "../layout";
import search from "../images/search-normal.svg";
const SearchBar = () => {
  const [show, setShow] = useState(true);
  const [userNotFound, setUserNotFound] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [users, setUsers] = useState<user[]>([]);
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
    if (inputRef.current) {
      inputRef.current!.value == "" && setUserNotFound(false);
      inputRef.current!.value == "" && setUsers([]);
    }
  }, [inputRef.current?.value]);
  const findUsers = async () => {
    if (inputRef.current!.value != "") {
      setShow(true);
      const res = await fetch(`${BACKEND_SERVER_IP}/user/findUsers`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Cookies.get("Auth_Token")}`,
        },

        method: "POST",
        body: JSON.stringify({
          username: inputRef.current!.value,
        }),
      });
      const response = await res.json();
      if (!response.error) setUsers(response.users);
      if (response.notFound) setUserNotFound(true);
      else setUserNotFound(false);
    } else {
      setShow(false);
    }
  };

  return (
    <div className="relative" onClick={() => setShow(true)}>
      <div className="w-full flex items-center px-5 py-3 gap-2 rounded-lg border border-zinc-200">
        <div className="w-6 h-6">
          <img src={search.src} alt="" />
        </div>
        <input
          ref={inputRef}
          onChange={findUsers}
          placeholder={`Search for chats...`}
          className="text-slate-600 outline-none"
        />
      </div>

      <div ref={ref} className="absolute z-20 max-h-72 overflow-y-auto w-[100%]">
        <SearchBarResults
          show={show}
          setShow={setShow}
          userNotFound={userNotFound}
          users={users}
        />
      </div>
    </div>
  );
};

export default SearchBar;
