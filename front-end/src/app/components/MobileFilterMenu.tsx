import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { JobType, filterType } from "../types";
import Loading from "./Loading";
import { setMobileFilterMenu, setSearchFilter } from "../features/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBarsProgress,
  faSliders,
  faToolbox,
  faX,
} from "@fortawesome/free-solid-svg-icons";

const FilterSideBar = ({ page }: { page: string }) => {
  const searchParams = useSearchParams();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const mobileFilterMenu = useSelector(
    (shop: any) => shop.app.mobileFilterMenu
  );

  const [sideBarVisible, setSideBarVisible] = useState(false);
  const dispatch = useDispatch();
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
      : [0, 99999],
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
  useEffect(() => {
    if (filter.price == -1 && filter.hourly == -1) {
      setFilter((state: filterType) => {
        return {
          availability: "random",
          hourlyBetween: state.hourlyBetween,
          username: state.username,
          hourly: page == "posts" ? -2 : 0,
          price: -1,
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
      const filtered = response.data.filter(
        (item: string) => item != filter.selectedCity
      );
      setCities(filter.selectedCity ? filtered : response.data);
    }
  };
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
    <div className="absolute z-20 top-0 left-0 w-[100vw] h-[100vh] bg-white overflow-y-auto flex flex-col items-center gap-10">
      <div className="flex justify-end w-[95%]">
        <button
          className="mt-5 mr-5 text-lg"
          onClick={() => dispatch(setMobileFilterMenu(false))}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
      <div className="text-center text-3xl font-bold">Hourly Rate</div>
      <div className="flex flex-col text-xl font-semibold gap-10">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6">
            <input
              type="radio"
              className="w-full h-full"
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
          </div>
          <label htmlFor="under20">under 20$ per hr</label>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 relative">
            <input
              type="radio"
              className="w-full h-full"
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
          </div>
          <label htmlFor="20to40">$20 to $40 per hr</label>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 relative">
            <input
              type="radio"
              className="w-full h-full"
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
                    hourly: -2,
                    price: -1,
                    jobType: state.jobType,
                    selectedState: state.selectedState,
                    selectedCity: state.selectedCity,
                  };
                });
              }}
              name="hourly"
              id="40to60"
            />
          </div>
          <label htmlFor="40to60">$40 to $60 per hr</label>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 relative">
            <input
              checked={
                filter.hourlyBetween![0] == 60 && filter.hourlyBetween![1] == 80
                  ? true
                  : false
              }
              type="radio"
              className="w-full h-full"
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
          </div>
          <label htmlFor="60to80">$60 to $80 per hr</label>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 relative">
            <input
              type="radio"
              className="w-full h-full"
              checked={
                filter.hourlyBetween![0] == 80 &&
                filter.hourlyBetween![1] == 100
                  ? true
                  : false
              }
              name="hourly"
              onChange={() => {
                setPriceChecked(false);
                setHourlyChecked(true);
                setFilter((state: filterType) => {
                  return {
                    availability: state.availability,
                    username: state.username,
                    hourlyBetween: [80, 100],
                    hourly: -2,
                    price: -1,
                    jobType: state.jobType,
                    selectedState: state.selectedState,
                    selectedCity: state.selectedCity,
                  };
                });
              }}
              id="80to100"
            />
          </div>
          <label htmlFor="80to100">$80 to 100$ per hr </label>
        </div>
        <div className="flex gap-3">
          <div className="w-6 h-6">
            <input
              type="radio"
              name="hourly"
              className="w-full h-full"
              checked={
                filter.hourlyBetween![0] == 100 &&
                filter.hourlyBetween![1] > 100
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
                    hourlyBetween: [100, 9999999],
                    hourly: -2,
                    price: -1,
                    jobType: state.jobType,
                    selectedState: state.selectedState,
                    selectedCity: state.selectedCity,
                  };
                });
              }}
              id="over100"
            />
          </div>
          <label htmlFor="over100">$100+ per hr </label>
        </div>
      </div>
      <div className="flex mt-10 flex-col">
        <div className="text-center text-3xl font-semibold">Location</div>
        <div>
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
                  disabled
                  selected
                >
                  {filter.selectedCity != "" ? filter.selectedCity : "Select"}
                </option>
                {cities.map((item: string) => (
                  <option value={item}>{item}</option>
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
      <div className="flex flex-col gap-4">
        <div className="text-center text-3xl font-semibold">Categories</div>
        <div className="flex flex-col text-lg gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6">
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
                className="w-full h-full"
                name="jobType"
                checked={filter.jobType.plumbing ? true : false}
              />
            </div>
            <label htmlFor="plumbing">Plumbing</label>
          </div>
          <div className="flex items-center gap-3">
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
                className="w-full h-full"
                name="jobType"
                id="dogWalking"
                checked={filter.jobType.dogWalking ? true : false}
              />
            </div>
            <label htmlFor="dogWalking">Dog Walking</label>
          </div>
          <div className="flex items-center gap-3">
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
                className="w-full h-full"
                id="cleaning"
                checked={filter.jobType.cleaning ? true : false}
              ></input>
            </div>
            <label htmlFor="cleaning">Cleaning</label>
          </div>
          <div className="flex items-center gap-3">
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
                className="w-full h-full"
                id="moving"
              />
            </div>
            <label htmlFor="moving">Moving</label>
          </div>
          <div className="flex items-center gap-3">
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
                id="cuttingGrass"
                className="w-full h-full"
                checked={filter.jobType.cuttingGrass ? true : false}
              />
            </div>
            <label htmlFor="cuttingGrass">Cutting Grass</label>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="font-semibold text-center text-3xl">Available For</div>
        <div className="flex items-center text-lg flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6">
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
                  className="w-full h-full"
                  name="jobType"
                  id="fullTime"
                  checked={filter.availability == "fullTime" ? true : false}
                />
              </div>
              <label htmlFor="fullTime">Full - Time Jobs</label>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6">
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
                  className="w-full h-full"
                  name="jobType"
                  id="partTime"
                  checked={filter.availability == "partTime" ? true : false}
                />
              </div>
              <label htmlFor="partTime">Part - Time Jobs</label>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6">
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
                  name="jobType"
                  id="random"
                  checked={filter.availability == "random" ? true : false}
                />
              </div>
              <label htmlFor="random">All Jobs</label>
            </div>
          </div>
        </div>
      </div>
      <div className="justify-start items-start gap-[26px] inline-flex">
        <div className="w-[147px] text-black text-base font-bold font-['Helvetica Neue'] leading-normal">
          Earned Amount
        </div>
        <div className="w-6 h-6 justify-center items-center flex">
          <div className="w-6 h-6 relative"></div>
        </div>
      </div>
      <div className="justify-start items-start gap-[26px] inline-flex">
        <div className="w-[147px] text-black text-base font-bold font-['Helvetica Neue'] leading-normal">
          Hours Billed
        </div>
        <div className="w-6 h-6 justify-center items-center flex">
          <div className="w-6 h-6 relative"></div>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
