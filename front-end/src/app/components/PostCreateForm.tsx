"use client";
import { ChangeEvent, useRef, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { BACKEND_SERVER_IP } from "../layout";
import getBase64 from "./GetBase64";
import Auth from "./Auth";
const PostCreateForm = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const [pictures, setPictures] = useState<string[]>([]);
  const [mainPicture, setMainPicture] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${BACKEND_SERVER_IP}/post/create`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },

      method: "POST",
      body: JSON.stringify({
        title: titleRef.current!.value,
        description: descRef.current!.value,
        price: priceRef.current!.value,
        pictures,
        picture: mainPicture,
        type: { [typeRef.current!.value]: true },
      }),
    });
    const response = await res.json();
    if (!response.error) alert("Post created successfully!");
  };
  return (
    <div className="flex justify-center mt-10">
      <form className="bg-white max-w-[30rem] shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-center my-5 font-semibold text-xl">Create Post</h2>
        <input
          ref={titleRef}
          className="appearance-none border-2 my-1 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          placeholder="Enter title."
          type="text"
        />
        <textarea
          ref={descRef}
          className="shadow appearance-none border my-1 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter Description."
        />
        <input
          ref={priceRef}
          className="shadow appearance-none border my-1 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter price."
          type="number"
        />
        <div className="flex my-5 flex-col">
          <label htmlFor="jobs">Choose a gig type:</label>

          <select
            ref={typeRef}
            className="shadow p-3 appearance-none border"
            name="jobs"
            id="jobs"
          >
            <option disabled selected>
              {" "}
              Select A Type{" "}
            </option>
            <option value="grassCutting">Grass Cutting</option>
            <option value="cleaning">Cleaning</option>
            <option value="plumbering">Plumbering</option>
            <option value="movingHeavyObjects">Moving Heavy Objects</option>
            <option value="walkingTheDog">Walking The Dog</option>
          </select>
        </div>
        <input
          type="file"
          multiple
          onChange={async (e: ChangeEvent<HTMLInputElement>) => {
            const newList = [];
            for (let i = 0; i < e.target.files!.length; i++) {
              const base64 = await getBase64(e.target.files![i]);
              newList.push(base64);
            }
            setPictures(newList);
            setMainPicture(newList[0]); //placeholder
          }}
          className="block mt-7 w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
        />
        {pictures.length != 0 && (
          <div className="flex flex-col">
            Choose The Main Picture
            <div className="flex flex-row">
              {pictures.map((item) => (
                <img
                  onClick={() => setMainPicture(item)}
                  className="w-20 h-20 m-1 hover:opacity-50 cursor-pointer"
                  src={item}
                />
              ))}
            </div>
          </div>
        )}
        {mainPicture && (
          <div className="my-3">
            Main Picture:
            <img className="w-20 h-20 m-1" src={mainPicture} />
          </div>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-5 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSubmit}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default Auth(PostCreateForm);
