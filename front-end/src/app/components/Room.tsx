"use client";
import { useEffect, useState } from "react";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { user } from "../types";
import { BACKEND_SERVER_IP, SOCKET_IO_IP } from "../layout";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import {
  setChattingWith,
  setMobileChattingWithUserSideBar,
  setMobileDmSideBar,
  setRoom,
  setSocket,
} from "../features/appSlice";
import DefaultProfilePicture from "../images/default.jpeg";
import Dms from "./Dms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faFilter, faX } from "@fortawesome/free-solid-svg-icons";

const Room = () => {
  const chattingWith = useSelector((shop: any) => shop.app.chattingWith); //will implement the type later
  const mobileDmSideBar = useSelector((shop: any) => shop.app.mobileDmSideBar); //will implement the type later
  const mobileChattingWithUserSideBar = useSelector(
    (shop: any) => shop.app.mobileChattingWithUserSideBar
  ); //will implement the type later

  const room = useSelector((shop: any) => shop.app.room); //will implement the type later
  const dispatch = useDispatch();
  const [chattingWithUser, setChattingWithUser] = useState<user>();
  useEffect(() => {
    room != "" && localStorage.setItem("room", room);
  }, [room]);
  useEffect(() => {
    //prevents the initial useEffect call
    //because of this when on click on a searchBarResult the room state doesn't get emptied
    if (chattingWith != "") {
      dispatch(setRoom(""));
      localStorage.removeItem("room");
    }
  }, [chattingWith]);

  const socket = io(SOCKET_IO_IP);
  dispatch(setSocket(socket));

  const [user, setUser] = useState<user>();

  const loadUser = async () => {
    const res = await fetch(`${BACKEND_SERVER_IP}/verify`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },

      method: "POST",
      body: JSON.stringify({ token: Cookies.get("Auth_Token") }),
    });
    const response = await res.json();
    if (!response.error) {
      setUser(response);
    }
  };
  const loadChattingWithUser = async () => {
    const res = await fetch(`${BACKEND_SERVER_IP}/user/loadUser`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },

      method: "POST",
      body: JSON.stringify({ userId: chattingWith }),
    });
    const response = await res.json();
    if (!response.error) {
      setChattingWithUser(response);
    }
  };
  useEffect(() => {
    loadUser();
    loadChattingWithUser();
  }, [chattingWith]);

  if (user) {
    socket.emit(
      "join-room",
      chattingWith ? user.userId! + " " + chattingWith : room,
      Cookies.get("Auth_Token")
    );
  }
  useEffect(() => {
    localStorage.setItem("mobileDmSideBar", mobileDmSideBar);
  }, [mobileDmSideBar]);
  useEffect(() => {
    localStorage.setItem(
      "mobileChattingWithUserSideBar",
      mobileChattingWithUserSideBar
    );
  }, [mobileChattingWithUserSideBar]);
  return (
    <div className="flex h-[90vh] justify-center">
      {mobileDmSideBar ? (
        <div className="md:min-w-[25vw] flex justify-center overflow-y-auto items-start">
          <Dms />
        </div>
      ) : (
        <div className="md:w-[10vw] flex justify-center">
          <div>
            <button
              onClick={() => dispatch(setMobileDmSideBar(true))}
              className="m-2 absolute left-0 md:static text-xl"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col border-l border-r justify-between bg-slate-100 w-[100vw] md:min-w-[50vw] md:max-w-[90vw]">
        <div className="overflow-y-auto">
          <Messages />
        </div>
        <SendMessage />
      </div>
      {mobileChattingWithUserSideBar ? (
        chattingWithUser ? (
          <div className="hidden md:block md:min-w-[25vw] relative">
            <div
              onClick={() => dispatch(setMobileChattingWithUserSideBar(false))}
              className="m-4 absolute right-0 top-0 text-end"
            >
              <FontAwesomeIcon icon={faX} />
            </div>
            <div className="flex mt-14 flex-col items-center">
              <img
                className="w-32 h-32 rounded-full border-black border-4"
                src={
                  chattingWithUser?.profilePicture
                    ? chattingWithUser.profilePicture
                    : DefaultProfilePicture.src
                }
                alt=""
              />
              <div className="text-3xl my-5 font-semibold">
                {chattingWithUser?.username}
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:block md:min-w-[25vw] relative">
            <div
              onClick={() => dispatch(setMobileChattingWithUserSideBar(false))}
              className="m-4 absolute right-0 top-0 text-end"
            >
              <FontAwesomeIcon icon={faX} />
            </div>
            <div className="flex mt-14 flex-col items-center">
              <img
                className="w-32 h-32 rounded-full border-black border-4"
                src={DefaultProfilePicture.src}
                alt=""
              />
              <div className="text-3xl my-5 font-semibold">Start a chat</div>
            </div>
          </div>
        )
      ) : (
        <div className="w-[10vw] flex justify-center">
          <div>
            <button
              onClick={() => dispatch(setMobileChattingWithUserSideBar(true))}
              className="m-2 text-xl"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
