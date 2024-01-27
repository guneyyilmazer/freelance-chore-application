"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { filterType } from "../types";
import Loading from "./Loading";
import { setSearchFilter } from "../features/appSlice";
import { useDispatch } from "react-redux";
import location from "../images/location.svg";
import dollar from "../images/dollar-circle.svg";
import clock from "../images/clock.svg";
import tickCircle from "../images/tick-circle.svg";
const FilterSideBar = ({ page }: { page: string }) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectableCities, setSelectableCities] = useState<string[]>([]);
  const [priceChecked, setPriceChecked] = useState(
    searchParams.get("price") ? true : false
  );
  const [hourlyChecked, setHourlyChecked] = useState(
    searchParams.get("hourly") ? true : false
  );
  !hourlyChecked && !priceChecked ? setHourlyChecked(true) : "";

  const [filter, setFilter] = useState<filterType>({
    username: searchParams.get("username")
      ? (searchParams.get("username") as string)
      : "",
    availability: searchParams.get("availability")
      ? (searchParams.get("availability") as string)
      : "random",
    hourly: searchParams.get("hourly")
      ? Number(searchParams.get("hourly"))
      : -1,
    hourlyBetween: searchParams.get("hourlybetween")
      ? [
          Number(searchParams.get("hourlybetween")?.split("/")[0]),
          Number(searchParams.get("hourlybetween")?.split("/")[1]),
        ]
      : [0, 999999],
    price: searchParams.get("price") ? Number(searchParams.get("price")) : -1,
    selectedState: searchParams.get("state")
      ? (searchParams.get("state") as string)
      : "",
    selectedCity: searchParams.get("city")
      ? (searchParams.get("city") as string)
      : "",
    jobType:
      searchParams.get("type") != "random" && searchParams.get("type")
        ? { [searchParams.get("type") as string]: true }
        : { random: true },
  });
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
          state: filter.selectedState,
        }),
      }
    );
    const response = await res.json();
    if (!response.error) {
      if (response.data.length == 0) {
        //if user selects a state with no cities
        setCities(["Centre"]);
        setSelectableCities(["Centre"]);
      } else {
        setCities(response.data); //total cities
        setSelectableCities(response.data); //list that removes the selected city from itself
      }
    }
  };
  useEffect(() => {
    //this removes the selected city from the selectable cities list
    //making it filter from the 'cities' array prevents itself from deleting its items one by one till it runs out of cities
    const filtered = cities.filter(
      (item: string) => item != filter.selectedCity
    );
    setSelectableCities((state) => (filter.selectedCity ? filtered : state));
  }, [filter.selectedCity, cities]);

  useEffect(() => {
    if (filter.price == -1 && filter.hourly == -1) {
      setFilter((state: filterType) => {
        return {
          availability: state.availability,
          hourlyBetween: state.hourlyBetween,
          username: state.username,
          hourly: page == "posts" ? -2 : 0, //because we only have one property for hourly and hourlyBetween, -2 activates hourlyBetween and deactivates hourly in the mongoose query
          price: -1, //posts that have hourly as their wage type, have -1 as the value of price property in mongoose schema (vica versa for the price property)
          selectedCity: state.selectedCity,
          selectedState: state.selectedState,
          jobType: state.jobType,
        };
      });
    }
  }, []);
  useEffect(() => {
    dispatch(setSearchFilter(filter));
  }, [filter]);
  useEffect(() => {
    getStates();
  }, []);
  useEffect(() => {
    filter.selectedState != "" && getStates();
    filter.selectedState != "" && getCities();
  }, [filter.selectedState]);
  useEffect(() => {
    router.replace(
      `/${page}/?type=${
        Object.keys(filter.jobType)[0] != undefined
          ? Object.keys(filter.jobType)[0]
          : "random"
      }&username${filter.username}&availability=${
        filter.availability
      }&hourlybetween=${
        filter.hourlyBetween![0] + "/" + filter.hourlyBetween![1]
      }&state=${filter.selectedState}&city=${filter.selectedCity}${
        filter.hourly != -1
          ? "&hourly=" + filter.hourly
          : "&price=" + filter.price
      }`
    );
  }, [filter]);
  return (
    /* ⬇ start of main div ⬇ */
    <div className="flex flex-col gap-8">
      {/* ⬇ start of hourly rate div ⬇ */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <h4 className="font-bold">Hourly Rate</h4>
          <img className="w-6 h-6" src={dollar.src} />
        </div>
        <div className="flex w-[200px] items-center gap-3">
          <input
            className="w-7 h-7"
            type="radio"
            checked={
              filter.hourlyBetween![0] == 0 && filter.hourlyBetween![1] == 20
                ? true
                : false
            }
            onChange={() => {
              setPriceChecked(false);
              setHourlyChecked(true);
              setFilter((state: filterType) => {
                return {
                  availability: state.availability,
                  username: state.username,
                  hourlyBetween: [0, 20],
                  price: -1,
                  hourly: -2,
                  jobType: state.jobType,
                  selectedState: state.selectedState,
                  selectedCity: state.selectedCity,
                };
              });
            }}
            name="hourly"
            id="under20"
          />
          <label htmlFor="under20" className="text-slate-600 text-sm">
            under 20$ per hr
          </label>
        </div>
        <div className="flex w-[200px] items-center gap-3">
          <input
            className="w-7 h-7"
            type="radio"
            checked={
              filter.hourlyBetween![0] == 20 && filter.hourlyBetween![1] == 40
                ? true
                : false
            }
            onChange={() => {
              setPriceChecked(false);
              setHourlyChecked(true);
              setFilter((state: filterType) => {
                return {
                  availability: state.availability,
                  username: state.username,
                  hourlyBetween: [20, 40],
                  price: -1,
                  hourly: -2,
                  jobType: state.jobType,
                  selectedState: state.selectedState,
                  selectedCity: state.selectedCity,
                };
              });
            }}
            name="hourly"
            id="20to40"
          />
          <label htmlFor="20to40" className="text-slate-600 text-sm">
            20$ to 40$ per hr
          </label>
        </div>
        <div className="flex w-[200px] items-center gap-3">
          <input
            className="w-7 h-7"
            type="radio"
            checked={
              filter.hourlyBetween![0] == 40 && filter.hourlyBetween![1] == 60
                ? true
                : false
            }
            onChange={() => {
              setPriceChecked(false);
              setHourlyChecked(true);
              setFilter((state: filterType) => {
                return {
                  availability: state.availability,
                  username: state.username,
                  hourlyBetween: [40, 60],
                  price: -1,
                  hourly: -2,
                  jobType: state.jobType,
                  selectedState: state.selectedState,
                  selectedCity: state.selectedCity,
                };
              });
            }}
            name="hourly"
            id="40to60"
          />
          <label htmlFor="40to60" className="text-slate-600 text-sm">
            40$ to 60$ per hr
          </label>
        </div>
        <div className="flex w-[200px] items-center gap-3">
          <input
            className="w-7 h-7"
            type="radio"
            checked={
              filter.hourlyBetween![0] == 60 && filter.hourlyBetween![1] == 80
                ? true
                : false
            }
            onChange={() => {
              setPriceChecked(false);
              setHourlyChecked(true);
              setFilter((state: filterType) => {
                return {
                  availability: state.availability,
                  username: state.username,
                  hourlyBetween: [60, 80],
                  price: -1,
                  hourly: -2,
                  jobType: state.jobType,
                  selectedState: state.selectedState,
                  selectedCity: state.selectedCity,
                };
              });
            }}
            name="hourly"
            id="60to80"
          />
          <label htmlFor="60to80" className="text-slate-600 text-sm">
            60$ to 80$ per hr
          </label>
        </div>
        <div className="flex w-[200px] items-center gap-3">
          <input
            className="w-7 h-7"
            type="radio"
            checked={
              filter.hourlyBetween![0] == 80 && filter.hourlyBetween![1] == 100
                ? true
                : false
            }
            onChange={() => {
              setPriceChecked(false);
              setHourlyChecked(true);
              setFilter((state: filterType) => {
                return {
                  availability: state.availability,
                  username: state.username,
                  hourlyBetween: [80, 100],
                  price: -1,
                  hourly: -2,
                  jobType: state.jobType,
                  selectedState: state.selectedState,
                  selectedCity: state.selectedCity,
                };
              });
            }}
            name="hourly"
            id="80to100"
          />
          <label htmlFor="80to100" className="text-slate-600 text-sm">
            80$ to 100$ per hr
          </label>
        </div>
        <div className="flex w-[200px] items-center gap-3">
          <input
            className="w-7 h-7"
            type="radio"
            checked={
              filter.hourlyBetween![0] == 100 &&
              filter.hourlyBetween![1] == 999999
                ? true
                : false
            }
            onChange={() => {
              setPriceChecked(false);
              setHourlyChecked(true);
              setFilter((state: filterType) => {
                return {
                  availability: state.availability,
                  username: state.username,
                  hourlyBetween: [100, 999999],
                  price: -1,
                  hourly: -2,
                  jobType: state.jobType,
                  selectedState: state.selectedState,
                  selectedCity: state.selectedCity,
                };
              });
            }}
            name="hourly"
            id="over100"
          />
          <label htmlFor="over100" className="text-slate-600 text-sm">
            over 100$ per hr
          </label>
        </div>
      </div>
      {/* ⬆ end of hourly rate div ⬆ */}

      {/* ⬇ start of location div ⬇ */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <h4 className="font-bold">Location</h4>
          <img className="w-6 h-6" src={location.src} />
        </div>
        <div className="w-[200px]">
          {states.length != 0 ? (
            <div className="flex my-3 flex-col">
              <label htmlFor="types">Choose your state</label>
              <select
                onChange={(e) => {
                  setCities([]);
                  setFilter((state: filterType) => {
                    return {
                      availability: state.availability,
                      username: state.username,
                      hourlyBetween: state.hourlyBetween,
                      hourly: state.hourly,
                      price: state.price,
                      selectedCity: state.selectedCity,
                      selectedState: e.target.value,
                      jobType: state.jobType,
                    };
                  });
                }}
                className="shadow break-words p-3 appearance-none border"
                name="jobs"
                id="jobs"
              >
                <option
                  value={
                    filter.selectedState != ""
                      ? (filter.selectedState as string)
                      : "empty"
                  }
                  disabled
                  selected
                >
                  {filter.selectedState != "" ? filter.selectedState : "Select"}
                </option>
                {states.map((item: any) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
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
                  setFilter((state: filterType) => {
                    return {
                      availability: state.availability,
                      username: state.username,
                      hourly: state.hourly,
                      price: state.price,
                      hourlyBetween: state.hourlyBetween,
                      selectedCity: e.target.value,
                      selectedState: state.selectedState,
                      jobType: state.jobType,
                    };
                  });
                }}
                className="shadow p-3 appearance-none border"
                name="jobs"
                id="jobs"
              >
                <option
                  value={
                    filter.selectedCity != ""
                      ? (filter.selectedCity as string)
                      : "empty"
                  }
                  selected
                >
                  {filter.selectedCity != "" ? filter.selectedCity : "Select"}
                </option>
                {selectableCities.map((item: string) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          ) : filter.selectedState != "" ? (
            <div className="my-3">
              <Loading />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* ⬆ end of location div ⬆ */}

      {/* ⬇ start of categories div ⬇ */}

      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <div className="font-bold">Categories</div>
          <div className="w-6 h-6">
            <img src={tickCircle.src} alt="" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="">
              <input
                onChange={(e) => {
                  setFilter((state: filterType) => {
                    return {
                      availability: state.availability,
                      username: state.username,
                      hourly: state.hourly,
                      hourlyBetween: state.hourlyBetween,
                      price: state.price,
                      selectedCity: state.selectedCity,
                      selectedState: state.selectedState,
                      jobType: { plumbing: true },
                    };
                  });
                }}
                type="radio"
                name="jobType"
                className="w-6 h-6"
                checked={filter.jobType.plumbing ? true : false}
              />
            </div>
            <div className="text-slate-600 text-sm">Plumbing</div>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6">
              <input
                onChange={(e) => {
                  setFilter((state: filterType) => {
                    return {
                      availability: state.availability,
                      username: state.username,
                      hourlyBetween: state.hourlyBetween,
                      hourly: state.hourly,
                      price: state.price,
                      selectedCity: state.selectedCity,
                      selectedState: state.selectedState,
                      jobType: { dogWalking: true },
                    };
                  });
                }}
                type="radio"
                name="jobType"
                className="w-6 h-6"
                checked={filter.jobType.dogWalking ? true : false}
              ></input>
            </div>
            <div className="text-slate-600 text-sm">Dog Walking</div>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6">
              <input
                onChange={(e) => {
                  setFilter((state: filterType) => {
                    return {
                      availability: state.availability,
                      username: state.username,
                      hourlyBetween: state.hourlyBetween,
                      hourly: state.hourly,
                      price: state.price,
                      selectedCity: state.selectedCity,
                      selectedState: state.selectedState,
                      jobType: { cleaning: true },
                    };
                  });
                }}
                type="radio"
                name="jobType"
                className="w-6 h-6"
                checked={filter.jobType.cleaning ? true : false}
              ></input>
            </div>
            <div className="text-slate-600 text-sm">Cleaning</div>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6">
              <input
                onChange={(e) => {
                  setFilter((state: filterType) => {
                    return {
                      availability: state.availability,
                      username: state.username,
                      hourlyBetween: state.hourlyBetween,
                      hourly: state.hourly,
                      price: state.price,
                      selectedCity: state.selectedCity,
                      selectedState: state.selectedState,
                      jobType: { moving: true },
                    };
                  });
                }}
                type="radio"
                name="jobType"
                checked={filter.jobType.moving ? true : false}
                className="w-6 h-6"
              ></input>
            </div>
            <div className="text-slate-600 text-sm">Moving</div>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6">
              <input
                onChange={(e) => {
                  setFilter((state: filterType) => {
                    return {
                      availability: state.availability,
                      username: state.username,
                      hourlyBetween: state.hourlyBetween,
                      hourly: state.hourly,
                      price: state.price,
                      selectedCity: state.selectedCity,
                      selectedState: state.selectedState,
                      jobType: { cuttingGrass: true },
                    };
                  });
                }}
                type="radio"
                name="jobType"
                className="w-6 h-6"
                checked={filter.jobType.cuttingGrass ? true : false}
              ></input>
            </div>
            <div className="text-slate-600 text-sm">Cutting Grass</div>
          </div>
        </div>
      </div>
      {/* ⬆ end of categories div ⬆ */}

      {/* ⬇ start of available for div ⬇ */}

      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <div className="font-bold">Available For</div>
          <img className="w-6 h-6" src={clock.src} alt="" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <input
              onChange={(e) => {
                setFilter((state: filterType) => {
                  return {
                    availability: "fullTime",
                    username: state.username,
                    hourly: state.hourly,
                    hourlyBetween: state.hourlyBetween,
                    price: state.price,
                    selectedCity: state.selectedCity,
                    selectedState: state.selectedState,
                    jobType: state.jobType,
                  };
                });
              }}
              type="radio"
              className="w-6 h-6"
              id="fullTime"
              checked={filter.availability == "fullTime" ? true : false}
            />
            <label htmlFor="fullTime" className="text-slate-600 text-sm">
              Full - Time Jobs
            </label>
          </div>
          <div className="flex gap-3">
            <input
              onChange={(e) => {
                setFilter((state: filterType) => {
                  return {
                    availability: "partTime",
                    username: state.username,
                    hourly: state.hourly,
                    hourlyBetween: state.hourlyBetween,
                    price: state.price,
                    selectedCity: state.selectedCity,
                    selectedState: state.selectedState,
                    jobType: state.jobType,
                  };
                });
              }}
              type="radio"
              className="w-6 h-6 relative"
              id="partTime"
              checked={filter.availability == "partTime" ? true : false}
            />
            <label htmlFor="partTime" className="text-slate-600 text-sm">
              Part - Time Jobs
            </label>
          </div>
          <div className="justify-start items-start gap-3 inline-flex">
            <div className="w-6 h-6 justify-center items-center flex">
              <input
                onChange={(e) => {
                  setFilter((state: filterType) => {
                    return {
                      availability: "random",
                      username: state.username,
                      hourly: state.hourly,
                      hourlyBetween: state.hourlyBetween,
                      price: state.price,
                      selectedCity: state.selectedCity,
                      selectedState: state.selectedState,
                      jobType: state.jobType,
                    };
                  });
                }}
                type="radio"
                className="w-6 h-6 relative"
                id="allJobs"
                checked={filter.availability == "random" ? true : false}
              />
            </div>
            <label htmlFor="allJobs" className="text-slate-600 text-sm">
              All Jobs
            </label>
          </div>
        </div>
      </div>
      {/* ⬆ end of available for div ⬆ */}
    </div>
    /* ⬆ end of main div ⬆ */
  );
};

export default FilterSideBar;
