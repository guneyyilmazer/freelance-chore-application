"use client";
import { faBell, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setChattingWith, setMobileDmSideBar } from "../features/appSlice";
import { useDispatch } from "react-redux";
import { DirectMessagesRoom, user } from "../types";
import { BACKEND_SERVER_IP } from "../layout";
import DefaultProfilePicture from "../images/default.jpeg";
import SearchBar from "@/app/components/SearchBar";
const DirectMessages = () => {
  const dispatch = useDispatch();
  const user = useSelector((shop: any) => shop.app.user);
  const globalChattingWith = useSelector((shop: any) => shop.app.chattingWith);
  const [rooms, setRooms] = useState<DirectMessagesRoom[]>();
  const loadPrivateRooms = async () => {
    const res = await fetch(`${BACKEND_SERVER_IP}/loadPrivateRooms`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },
      method: "POST",
    });
    const response = await res.json();
    if (!response.error) {
      setRooms(response.rooms);
    }
  };
  useEffect(()=>{
    localStorage.setItem("chattingWith",globalChattingWith)
  },[globalChattingWith])
  useEffect(() => {
    loadPrivateRooms();
  }, []);
  return (
    <div className="text-dark w-[100vw] md:w-[90%] h-[100vh] md:h-full absolute left-0 z-50 md:static flex flex-col items-center md:items-stretch bg-white ">
      <div className="w-[90%] md:w-full">
        <div className="flex justify-between">
          <div className="text-2xl w-full text-start font-semibold my-4">
            Messages
          </div>
          <button
            onClick={() => dispatch(setMobileDmSideBar(false))}
            className="flex items-center"
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
        <div className="w-full">
          <SearchBar />
        </div>
        {rooms?.map((item: any, index: number) => {
          const chattingWith = item.users.filter(
            (object: any) => object.userId != user.userId
          )[0];
          //check seenBy array to see if client's userId is in there
          const isTheMessageSeen =
            item.lastMessage.seenBy.filter(
              (item: string) => item == user.userId
            ).length == 0
              ? false
              : true;
          return (
            <div
            key={index}
              onClick={() => {
                dispatch(setChattingWith(chattingWith.userId));
              }}
              className={"flex w-full flex-col mt-6 hover:cursor-pointer relative justify-between".concat(
                isTheMessageSeen ? " text-gray-600 " : " text-dark "
              )}
            >
              <div className="flex hover:opacity-50 gap-2">
                <img
                  className="rounded-full w-12 h-12"
                  src={
                    chattingWith.profilePicture
                      ? chattingWith.profilePicture
                      : DefaultProfilePicture.src
                  }
                  alt=""
                />
                <div className="flex flex-col">
                  <span className="font-bold">{chattingWith.username}</span>
                  <div className="flex items-start">
                    <div>
                      {item.lastMessage.content.length < 20
                        ? item.lastMessage.content
                        : item.lastMessage.content.slice(0, 20) + "..."}
                      {item.lastMessage.content == " " &&
                        (item.lastMessage.sender.userId == user.userId
                          ? "you sent a picture"
                          : "you received a picture")}
                    </div>
                    <div className="absolute top-0 right-0 m-1">
                      {item.lastMessage.sent}
                    </div>
                  </div>
                  {!isTheMessageSeen && (
                    <FontAwesomeIcon
                      title="You have unread messages!"
                      className="bg-red-600 p-2 absolute bottom-0 right-0 m-1 rounded-full text-white"
                      icon={faBell}
                    />
                  )}
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <div className="h-px bg-slate-200 w-[90%]"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DirectMessages;
