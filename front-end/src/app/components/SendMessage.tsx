"use client";
import { ChangeEvent, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import getBase64 from "../components/GetBase64";
import reduceBase64Size from "../components/ReduceBase64Size";
import send from "../images/send.svg";
const SendMessage = () => {
  const socket = useSelector((shop: any) => shop.app.socket); //will implement the type later
  const room = useSelector((shop: any) => shop.app.room);
  const loadedFirstMessages = useSelector(
    (shop: any) => shop.app.loadedFirstMessages
  );
  const emptyRoom = useSelector((shop: any) => shop.app.emptyRoom);
  const user = useSelector((shop: any) => shop.app.user);
  const chattingWith = useSelector((shop: any) => shop.app.chattingWith);

  const [pictures, setPictures] = useState<string[]>();
  const [inputState, setInputState] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [timer, setTimer] = useState<any>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const handleTyping = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);
    socket.emit("typing", user, room, chattingWith);
    const newTimer = setTimeout(
      () => socket.emit("stopped-typing", user, room, chattingWith),
      700
    );
    setTimer(newTimer);

    setInputState(e.target.value);
  };
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const array: string[] = [];
    for (let i = 0; i < e.target.files!.length; i++) {
      const res = await getBase64(e.target.files![i]);
      const reducedSize = await reduceBase64Size(res);
      array.push(reducedSize);
    }
    setPictures(array);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((inputRef.current?.value != "" || pictures?.length != 0) && user) {
      socket.emit(
        "send-msg",
        user,
        room,
        inputRef.current!.value ? inputRef.current!.value : "",
        pictures,
        chattingWith
      );
      setPictures([]);
      inputRef.current!.value = "";
      socket.emit("stopped-typing", user, room, chattingWith);
    }
  };

  return (
    (loadedFirstMessages || emptyRoom) && (
      <div
        style={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}
        className="flex bg-white items-center py-4 justify-center"
      >
        <form onSubmit={handleSubmit} className="flex w-[90%] justify-between">
          <div className="flex w-full items-center">
            <input
              className="w-[90%] bg-slate-200 text-center py-4 rounded-xl outline-none rounded-2"
              type="text"
              onChange={handleTyping}
              value={inputState}
              ref={inputRef}
            />
          </div>
          <div className="flex gap-2 justify-center items-center">
            <div
              className="bg-green-600 hover:bg-green-800 text-xl flex justify-center items-center p-2.5 text-white rounded-full"
              onClick={() => fileRef.current?.click()}
            >
              <FontAwesomeIcon icon={faImage} />
            </div>
            <button
              className="bg-green-600 hover:bg-green-800 text-white font-bold p-2 w-9 rounded-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              <img className="w-full h-full" src={send.src} alt="" />
            </button>
          </div>
          <input
            type="file"
            ref={fileRef}
            multiple
            onChange={handleChange}
            className="hidden"
          />
        </form>
      </div>
    )
  );
};

export default SendMessage;
