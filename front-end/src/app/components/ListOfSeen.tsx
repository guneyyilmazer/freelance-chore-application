import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import { useEffect, useState } from "react";
import { user } from "../types";
import DefaultProfilePicture from "../images/default.jpeg";
const ListOfSeen = ({ users, showSeen, setShowSeen }: any) => {
  const [count, setCount] = useState(users.length);

  const handleUserKeyPress = (event: KeyboardEvent) => {
    if (event.key == "Escape") {
      setShowSeen(!showSeen);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);
  return (
    <div className="secondary z-50 w-[100vw] h-[100vh] overflow-y-auto text-white absolute top-0 left-0">
      <div className="flex justify-center flex-col">
        <span className="text-2xl my-4 text-center">
          Seen By {count} {count == 1 ? "User" : "Users"}
        </span>
        <div className="flex justify-center items-center flex-col">
          {users.map((item: user, index: number) => {
            return (
              <div
                key={index}
                className="my-1 flex w-52 justify-center text-white"
              >
                <Link
                  className="no-underline flex justify-center items-center text-white"
                  href={`/user/?id=${item.userId}`}
                >
                  <img
                    className="rounded-full w-8 h-8"
                    src={
                      item.profilePicture
                        ? item.profilePicture
                        : DefaultProfilePicture.src
                    }
                    alt=""
                  />
                  <span className="ms-1">{item.username}</span>{" "}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={() => setShowSeen(!showSeen)}
        className="absolute w-10 h-10 rounded-full m-2 bg-green-600 top-0 right-0"
      >
        <FontAwesomeIcon icon={faX} />
      </button>
    </div>
  );
};

export default ListOfSeen;
