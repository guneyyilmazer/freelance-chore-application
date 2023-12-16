"use client";
import { useEffect, useState } from "react";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { user } from "../types/AllTypes";
import { BACKEND_SERVER_IP, SOCKET_IO_IP } from "../layout";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { setRoom, setSocket } from "../features/appSlice";
const background = require("../images/background.jpeg");

const Room = () => {
    
  const chattingWith = useSelector((shop: any) => shop.app.chattingWith); //will implement the type later

  const room = useSelector((shop: any) => shop.app.room); //will implement the type later
  const dispatch = useDispatch();
  useEffect(() => {
    room != "" && localStorage.setItem("room", room);
  }, [room]);
  useEffect(() => {
    //prevents the initial useEffect call
    //because of this when on click on a searchBarResult the room state doesn't get emptied
    if (chattingWith != "") {
      localStorage.setItem("chattingWith", chattingWith);
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
  useEffect(() => {
    loadUser();
  }, []);

  if (user) {
    socket.emit(
      "join-room",
      chattingWith ? user.userId! + " " + chattingWith : room,
      Cookies.get("Auth_Token")
    );
  }
  return (
    <div
      className="flex flex-col justify-between items-center "
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "600px",
      }}
    >
        <div className="w-[60vw]">

      <Messages />
        </div>
      <div className="">
        <SendMessage />
      </div>
    </div>
  );
};

export default Room;
