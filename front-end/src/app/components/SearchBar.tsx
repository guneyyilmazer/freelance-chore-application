"use client";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import SearchBarResults from "./SearchBarResults";
import { user } from "../types/AllTypes";
import { BACKEND_SERVER_IP } from "../layout";

const SearchBar = ({ freelancer }: { freelancer?: boolean }) => {
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
    }
  }, [inputRef.current?.value]);
  const findUsers = async () => {
    if (inputRef.current!.value != "") {
      const res = await fetch(`${BACKEND_SERVER_IP}/user/findUsers`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Cookies.get("Auth_Token")}`,
        },

        method: "POST",
        body: JSON.stringify({
          username: inputRef.current!.value,
          freelancer,
        }),
      });
      const response = await res.json();
      if (!response.error) setUsers(response.users);
      if (response.notFound) setUserNotFound(true);
      if (!response.notFound) setUserNotFound(false);
    }
  };

  return (
    <div className="relative" onClick={() => setShow(true)}>
      <form className="flex">
        <input
          ref={inputRef}
          onChange={findUsers}
          type="text"
          className="text-dark p-1 text-center"
          style={{
            outline: "none",
            background: "none",
            border: "none",
            borderBottom: "2px solid",
            borderColor: "Red",
          }}
          placeholder={`Search for ${freelancer ? "freelancers" : "users"}`}
        />
      </form>
      <div ref={ref} className="absolute w-[100%]">
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
