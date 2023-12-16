"use client";
import { message } from "../types/AllTypes";
import { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import "../css/Messages.css";
import { user } from "../types/AllTypes";
import ImagePreview from "./ImagePreview";
import { useSelector } from "react-redux";
import ListOfSeen from "./ListOfSeen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {
  setLoading,
  setLoadedFirstMessages,
  setEmptyRoom,
} from "../features/appSlice";
import { useDispatch } from "react-redux";
import { seenByUser } from "../types/AllTypes";
import { BACKEND_SERVER_IP } from "../layout";
import DefaultProfilePicture from "../images/default.jpeg";

const Messages = () => {
  const user = useSelector((shop: any) => shop.app.user);
  const socket = useSelector((shop: any) => shop.app.socket);
  const emptyRoom = useSelector((shop: any) => shop.app.emptyRoom);
  const chattingWith = useSelector((shop: any) => shop.app.chattingWith);
  const room = useSelector((shop: any) => shop.app.room);
  const loading = useSelector((shop: any) => shop.app.loading);
  const loadedFirstMessages = useSelector(
    (shop: any) => shop.app.loadedFirstMessages
  );
  const [messages, setMessages] = useState<message[]>([]);
  const [showSeen, setShowSeen] = useState(false);
  const [page, setPage] = useState(1);
  const [preview, setPreview] = useState(false);
  const [seenBy, setSeenBy] = useState<seenByUser[]>();
  const [typing, setTyping] = useState<user[]>([]);
  const [loadedAllMessages, setLoadedAllMessages] = useState(false);
  const [previewPictures, setPreviewPictures] = useState<string[]>();
  const [previewPicturesIndex, setPreviewPicturesIndex] = useState(0);

  const messageContainerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const loadRoom = async () => {
    const res = await fetch(`${BACKEND_SERVER_IP}/loadRoom`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },

      method: "POST",
      body: JSON.stringify({
        room,
        chattingWith,
        userId: user.userId,
        page,
      }),
    });
    const response = await res.json();

    if (!response.error) {
      dispatch(setEmptyRoom(false));

      let newMessages = [...response.messages, ...messages];
      setMessages(newMessages);
      dispatch(setLoadedFirstMessages(true));
    } else if (response.roomIsEmpty) {
      dispatch(setEmptyRoom(true));
    } else {
      //if don't have any messages left to load
      dispatch(setEmptyRoom(false));
      setLoadedAllMessages(true);
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    console.log(user);
    loadRoom();
  }, [page]);
  const scrollDown = () => {
    messageContainerRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };
  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (e.currentTarget.scrollTop == 0) {
      if (!loading) {
        dispatch(setLoading(true));
        !loadedAllMessages && setPage(page + 1);
      }
    }
  };
  socket.on("update-message", (messageArray: message[]) => {
    //it's an array with a length of 1 always, getMessagesReady() (backend) always returns an array
    const message = messageArray[0];
    setMessages((messages) => {
      const seenBy = messages[messages.length - 1].seenBy;

      message.seenBy.filter((item) => item.userId != user.userId);
      if (seenBy.length - 1 + message.seenBy.length <= message.seenBy.length) {
        messages[messages.length - 1].seenBy = [
          ...seenBy,
          ...message.seenBy.filter((item) => item.userId != user.userId),
        ];
      }
      return messages;
    });
  });
  socket.on("stopped-typing-to-client", (user: user) => {
    setTyping((typing) => {
      if (typing) {
        const doWeHaveUser = typing.filter(
          (item) => item.userId == user.userId
        );
        if (doWeHaveUser.length != 0) {
          const newList = typing.filter((item) => item.userId != user.userId);
          return newList;
        }
      }
      return typing;
    });
  });
  socket.on("typing-to-client", (user: user) => {
    setTyping((typing) => {
      if (!typing || typing.length == 0) return [user];
      else {
        const doWeAlreadyHave = typing.filter(
          (item) => item.userId == user.userId
        );
        if (doWeAlreadyHave.length == 0) return [...typing, user];
      }
      return typing;
    });
  });

  socket.on(
    "receive-msg",
    (
      userMsg: user,
      content: string,
      pictures: string[],
      sent: string,
      profilePicture: string
    ) => {
      const hours = sent.split(":")[0];
      const minutes = sent.split(":")[1];
      dispatch(setEmptyRoom(false));
      dispatch(setLoadedFirstMessages(true));
      userMsg.userId != user.userId
        ? //this is the initial value of seenBy, it's later being updated with "update-msg"
          setMessages([
            ...messages,
            {
              sender: userMsg,
              content,
              pictures,
              sent:
                (hours.length == 1 ? "0".concat(hours) : hours) +
                ":" +
                (minutes.length == 1 ? "0".concat(minutes) : minutes),
              profilePicture,

              seenBy: [
                {
                  userId: user.userId,
                  username: user.username,
                  profilePicture: user.profilePicture!,
                },
                {
                  userId: userMsg.userId,
                  username: userMsg.username,
                  profilePicture: userMsg.profilePicture!,
                },
              ],
            },
          ])
        : setMessages([
            ...messages,
            {
              sender: userMsg,
              content,
              pictures,
              sent:
                (hours.length == 1 ? "0".concat(hours) : hours) +
                ":" +
                (minutes.length == 1 ? "0".concat(minutes) : minutes),
              profilePicture,

              seenBy: [
                {
                  userId: user.userId,
                  username: user.username,
                  profilePicture: user.profilePicture,
                },
              ],
            },
          ]);
    }
  );
  useEffect(() => {
    //if you load more messages by scrolling up it won't scroll down nor emit read-msg
    scrollDown();
    socket.emit("read-msg", room, chattingWith, user);
  }, [messages[messages.length - 1]]);

  return emptyRoom ? (
    <div className="flex m-5 text-2xl text-white justify-center">
      Room is empty.
    </div>
  ) : !loadedFirstMessages ? (
    <div className="flex justify-center">
      <FontAwesomeIcon
        className="text-white text-center"
        spin
        style={{ height: "60px", width: "60px", display: "block" }}
        //@ts-ignore
        icon={faCircleNotch}
      />
    </div>
  ) : (
    <div
      onScroll={handleScroll}
      className="flex h-[75vh] flex-col overflow-auto"
    >
      {loading && !loadedAllMessages && (
        <div className="flex justify-center">
          <FontAwesomeIcon
            className="text-white text-center"
            spin
            style={{ height: "25px", width: "25px" }}
            //@ts-ignore

            icon={faCircleNotch}
          />
        </div>
      )}
      <div className="absolute mb-1 w-100 bottom-0 start-0 text-dark flex justify-center items-center">
        {typing && typing.length == 1 && typing[0].username + " is typing..."}
        {typing &&
          typing.length == 2 &&
          typing[0].username + ", " + typing[1].username + " are typing..."}
        {typing &&
          typing.length == 3 &&
          typing[0].username +
            ", " +
            typing[1].username +
            " and " +
            typing[2].username +
            " are typing..."}
        {typing &&
          typing.length > 3 &&
          typing[0].username +
            ", " +
            typing[1].username +
            ", " +
            typing[2].username +
            "and " +
            (typing.length - 3) +
            " users are typing..."}
      </div>
      {messages.map((item, index) => {
        return (
          <div
            ref={messageContainerRef}
            key={index}
            className={`mt-5 flex ${
              item.sender.username == user.username
                ? "justify-end"
                : "justify-start"
            }`}
          >
            {item.sender.username != user.username && (
              <Link
                className="flex items-center me-2"
                href={`/users/${item.sender.userId}`}
              >
                <img
                  style={{ height: "35px", width: "35px" }}
                  className="rounded-full"
                  src={
                    item.profilePicture
                      ? item.profilePicture
                      : DefaultProfilePicture.src
                  }
                />
              </Link>
            )}
            <div
              onMouseUp={() => {
                setShowSeen(true);
                item.seenBy && setSeenBy(item.seenBy);
              }}
              className={`break-words flex flex-col 
            ${
              item.sender.username == user.username
                ? "message-sent"
                : "message-received"
            }`}
              style={{ cursor: "pointer" }}
            >
              <div className="ms-1">{item.content + " "}</div>

              <div className="flex flex-wrap">
                {" "}
                {item.pictures?.map((picture, index) => (
                  <div className="m-1" key={index}>
                    <img
                      className="img-fluid rounded-2"
                      onMouseDown={() => {
                        setPreview(true);
                        setPreviewPictures(item.pictures);
                        setPreviewPicturesIndex(index);
                      }}
                      style={{ maxWidth: "100px", maxHeight: "150px" }}
                      src={picture}
                      alt=""
                    />
                  </div>
                ))}
              </div>
              <div className="username ms-1 flex justify-end items-end">
                {item.sender.username} {item.sent}{" "}
              </div>
            </div>
            {item.sender.username == user.username && (
              <Link
                className="flex items-center"
                href={`/users/${item.sender.userId}`}
                style={{ cursor: "default" }}
              >
                <img
                  style={{ height: "35px", width: "35px", cursor: "pointer" }}
                  className="ms-2 rounded-full"
                  src={
                    item.profilePicture
                      ? item.profilePicture
                      : DefaultProfilePicture.src
                  }
                />
              </Link>
            )}
          </div>
        );
      })}
      {preview && previewPictures && (
        <ImagePreview
          setPreview={setPreview}
          preview={preview}
          previewPicturesIndex={previewPicturesIndex}
          images={previewPictures}
        />
      )}
      {showSeen && seenBy && (
        <ListOfSeen
          users={seenBy}
          showSeen={showSeen}
          setShowSeen={setShowSeen}
        />
      )}
    </div>
  );
};

export default Messages;
