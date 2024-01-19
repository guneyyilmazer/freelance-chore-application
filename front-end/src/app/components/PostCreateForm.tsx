"use client";
import { ChangeEvent, useRef, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { BACKEND_SERVER_IP } from "../layout";
import getBase64 from "./GetBase64";
import Auth from "./Auth";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "./Loading";
import { categories } from "../layout";
const PostCreateForm = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const hourlyRef = useRef<HTMLInputElement>(null);
  const skillLevelRef = useRef<HTMLSelectElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const [pictures, setPictures] = useState<string[]>([]);
  const [mainPicture, setMainPicture] = useState("");
  const [states, setStates] = useState([]);
  const [priceWage, setPriceWage] = useState(false);
  const [hourly, setHourly] = useState(true);
  const [cities, setCities] = useState([]);
  const searchParams = useSearchParams();
  const [wage, setWage] = useState<number>(
    searchParams.get("hourly") ? Number(searchParams.get("hourly")) : 0
  );
  const [selectedState, setSelectedState] = useState(
    searchParams.get("state") ? searchParams.get("state") : ""
  );
  const [selectedCity, setSelectedCity] = useState(
    searchParams.get("city") ? searchParams.get("city") : ""
  );
  useEffect(() => console.log(selectedCity), [selectedCity]);
  const router = useRouter();
  const getStates = async () => {
    const res = await fetch(
      "https://countriesnow.space/api/v0.1/countries/states",
      {
        headers: {
          "Content-Type": "application/json",
        },

        method: "POST",
        body: JSON.stringify({
          country: "united states",
        }),
      }
    );
    const response = await res.json();
    if (!response.error) {
      setStates(response.data.states);
    }
  };
  const getCities = async () => {
    const res = await fetch(
      "https://countriesnow.space/api/v0.1/countries/state/cities",
      {
        headers: {
          "Content-Type": "application/json",
        },

        method: "POST",
        body: JSON.stringify({
          country: "united states",
          state: selectedState,
        }),
      }
    );
    const response = await res.json();
    if (!response.error) {
      const filtered = response.data.filter(
        (item: string) => item != selectedCity
      );
      setCities(selectedCity ? filtered : response.data);
    }
  };
  useEffect(() => {
    getStates();
  }, []);
  useEffect(() => {
    selectedState != "" && getStates();
    selectedState != "" && getCities();
  }, [selectedState]);
  const handleSubmit = async (e: React.FormEvent) => {
    if (
      titleRef.current?.value == "" ||
      descRef.current?.value == "" ||
      (priceRef.current?.value || hourlyRef.current?.value) ||
      skillLevelRef.current?.value ||
      selectedState == "" ||
      selectedCity == "" ||
      typeRef.current?.value
    ) {
      alert("All credentials must be filled!");
    }
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
        price: priceRef.current?.value ? Number(priceRef.current?.value) : -1,
        hourly: hourlyRef.current?.value
          ? Number(hourlyRef.current?.value)
          : -1,
        skillLevel: skillLevelRef.current?.value,
        pictures,
        picture: mainPicture,
        location: { state: selectedState, city: selectedCity },
        type: { [typeRef.current?.value as string]: true },
      }),
    });
    const response = await res.json();
    if (!response.error) {
      alert("Post created successfully!");
      window.location.replace("/posts");
    }
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
        <div className="flex items-center">
          <input
            onChange={() => {
              setPriceWage(false);
              setHourly(true);
            }}
            checked={hourly}
            type="radio"
            id="hourly"
            name="wage"
            value="hourly"
            className="mx-2"
          />
          <label htmlFor="hourly"> Hourly Wage</label>
          <input
            className="mx-2"
            checked={priceWage}
            onChange={() => {
              setHourly(false);
              setPriceWage(true);
            }}
            type="radio"
            id="price"
            name="wage"
            value="price"
          />
          <label htmlFor="price"> Price</label>
        </div>
        {priceWage && (
          <input
            ref={priceRef}
            className="shadow appearance-none border my-1 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter price."
            type="number"
          />
        )}
        {hourly && (
          <input
            ref={hourlyRef}
            className="shadow appearance-none border my-1 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter hourly wage."
            type="number"
          />
        )}
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
            <option value={categories.cuttingGrass.name}>Grass Cutting</option>
            <option value={categories.cleaning.name}>Cleaning</option>
            <option value={categories.plumbing.name}>Plumbing</option>
            <option value={categories.moving.name}>Moving</option>
            <option value={categories.dogWalking.name}>Dog Walking</option>
          </select>
        </div>
        <div className="flex my-5 flex-col">
          <label htmlFor="skillLevel">Choose desired skill level</label>

          <select
            ref={skillLevelRef}
            className="shadow p-3 appearance-none border"
            name="skillLevel"
            id="skillLevel"
          >
            <option disabled selected>
              {" "}
              Select A Skill Level{" "}
            </option>
            <option value="entry">Entry</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
        </div>
        {states.length != 0 ? (
          <div className="flex my-3 flex-col">
            <label htmlFor="types">Choose your state</label>
            <select
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedCity("");
                setCities([]);
              }}
              className="shadow break-words p-3 appearance-none border"
              name="jobs"
              id="jobs"
            >
              <option
                value={
                  selectedState != "" ? (selectedState as string) : "empty"
                }
                disabled
                selected
              >
                {selectedState != "" ? selectedState : "Select"}
              </option>
              {states.map((item: any) => (
                <option value={item.name}>{item.name}</option>
              ))}
            </select>
          </div>
        ) : (
          <div className="my-3">
            <Loading />
          </div>
        )}
        {cities.length != 0 ? (
          <div className="flex flex-col">
            <label htmlFor="types">Choose your city</label>
            <select
              onChange={(e) => {
                setSelectedCity(e.target.value);
              }}
              className="shadow p-3 appearance-none border"
              name="jobs"
              id="jobs"
            >
              <option
                value={selectedCity != "" ? (selectedCity as string) : "empty"}
                disabled
                selected
              >
                {selectedCity != "" ? selectedCity : "Select"}
              </option>
              {cities.map((item: string) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </div>
        ) : selectedState != "" ? (
          <div className="my-3">
            <Loading />
          </div>
        ) : (
          ""
        )}
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
