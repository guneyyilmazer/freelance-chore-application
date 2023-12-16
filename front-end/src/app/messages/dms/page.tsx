"use client";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setChattingWith } from "../../features/appSlice";
import { useDispatch } from "react-redux";
import { DirectMessagesRoom } from "../../types/AllTypes";
import { BACKEND_SERVER_IP } from "../../layout";
import DefaultProfilePicture from "../../images/default.jpeg";
import SearchBar from "@/app/components/SearchBar";
const DirectMessages = () => {
  const dispatch = useDispatch();
  const user = useSelector((shop: any) => shop.app.user);

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
  useEffect(() => {
    loadPrivateRooms();
  }, []);
  return rooms ? (
    <div className="text-dark flex justify-center items-center flex-col">
      <SearchBar />
      <div className="flex my-2 flex-wrap">
        {rooms.map((item) => {
          const chattingWith = item.users.filter(
            (object: any) => object.userId != user.userId
          )[0];
          return (
            <img
              className="rounded-full cursor-pointer h-14"
              onClick={() => {
                dispatch(setChattingWith(chattingWith.userId));

                window.location.replace("/messages");
              }}
              src={
                chattingWith.profilePicture
                  ? chattingWith.profilePicture
                  : DefaultProfilePicture.src
              }
            />
          );
        })}
      </div>
      <h3 className="font-semibold text-lg my-5">Direct Messages</h3>
      {rooms.length != 0 ? (
        rooms.map((item: any, index: number) => {
          //find who client is chatting with
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

                window.location.replace("/messages");
              }}
              className={"flex justify-between cursor-pointer mt-2 ".concat(
                isTheMessageSeen ? " text-gray-600 " : " text-dark "
              )}
            >
              <img
                className="rounded-full w-12 h-12 mx-2"
                src={
                  chattingWith.profilePicture
                    ? chattingWith.profilePicture
                    : DefaultProfilePicture.src
                }
                alt=""
              />
              <div className="flex flex-col">
                <span className=" ">{chattingWith.username}</span>
                <div className="flex ">
                  <span>
                    {item.lastMessage.content.length < 20
                      ? item.lastMessage.content
                      : item.lastMessage.content.slice(0, 20) + "..."}
                  </span>
                  <span className="mx-3">{item.lastMessage.sent}</span>
                </div>
                {!isTheMessageSeen && (
                  <FontAwesomeIcon
                    title="You have unread messages!"
                    className="bg-red-600 p-2 rounded-full text-white"
                    icon={faBell}
                  />
                )}
              </div>
            </div>
          );
        })
      ) : (
        //else rooms.length == 0
        <div className="lead my-5">
          You dont have any messages, start a chat by clicking on a user.
        </div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default DirectMessages;
