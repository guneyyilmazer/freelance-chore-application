import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { JobType, filterType } from "../types";
import Loading from "./Loading";
import { setSearchFilter } from "../features/appSlice";
import { useDispatch } from "react-redux";
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
    hourly: searchParams.get("hourly")
      ? Number(searchParams.get("hourly"))
      : -1,
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
          hourly: 0,
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
      }&state=${filter.selectedState}&city=${filter.selectedCity}${
        filter.hourly != -1
          ? "&hourly=" + filter.hourly
          : "&price=" + filter.price
      }`
    );
  }, [filter]);
  return (
    <div>
      <div className="hidden md:block">
        {/* sidebar */}
        <div className="flex flex-col">
          <label className="text-center" htmlFor="jobs">
            Job Type
          </label>
          <select
            onChange={(e) => {
              setFilter((state: filterType) => {
                return {
                  hourly: state.hourly,
                  price: state.price,
                  selectedCity: state.selectedCity,
                  selectedState: state.selectedState,
                  jobType: { [e.target.value]: true },
                };
              });
            }}
            className="shadow p-3 appearance-none border"
            name="jobs"
            id="jobs"
          >
            <option value="default" disabled selected>
              {" "}
              {Object.keys(filter.jobType)[0]
                ? Object.keys(filter.jobType)[0] == "cleaning"
                  ? "Cleaning"
                  : Object.keys(filter.jobType)[0] == "plumbering"
                  ? "Plumbering"
                  : Object.keys(filter.jobType)[0] == "cuttingGrass"
                  ? "Cutting Grass"
                  : Object.keys(filter.jobType)[0] == "movingHeavyObjects"
                  ? "Moving Heavy Objects"
                  : Object.keys(filter.jobType)[0] == "walkingTheDog"
                  ? "Walking The Dog"
                  : "Select"
                : "Select"}{" "}
            </option>
            <option value="cuttingGrass">Cutting Grass</option>
            <option value="cleaning">Cleaning</option>
            <option value="plumbering">Plumbering</option>
            <option value="movingHeavyObjects">Moving Heavy Objects</option>
            <option value="walkingTheDog">Walking The Dog</option>
          </select>
          {states.length != 0 ? (
            <div className="flex my-3 flex-col">
              <label htmlFor="types">Choose your state</label>
              <select
                onChange={(e) => {
                  setCities([]);
                  setFilter((state: filterType) => {
                    return {
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
                      hourly: state.hourly,
                      price: state.price,

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
          <div className="flex flex-col">
            <h3 className="my-2">Wage Type:</h3>
            <div className="flex items-center">
              <label className="text-sm" htmlFor="hourly">
                {" "}
                Hourly Wage
              </label>
              <input
                checked={hourlyChecked}
                onChange={() => {
                  setPriceChecked(false);
                  setHourlyChecked(true);
                  setFilter((state: filterType) => {
                    return {
                      hourly: 0,
                      price: -1,
                      jobType: state.jobType,
                      selectedState: state.selectedState,
                      selectedCity: state.selectedCity,
                    };
                  });
                }}
                type="radio"
                id="hourly"
                className="mx-1"
                name="wage"
                value="hourly"
              />
            </div>
            <div className="flex items-center">
              <label className="text-sm" htmlFor="price">
                {" "}
                Price
              </label>
              <input
                className="mx-1"
                checked={priceChecked}
                onChange={() => {
                  setHourlyChecked(false);
                  setPriceChecked(true);
                  setFilter((state: filterType) => {
                    return {
                      hourly: -1,
                      price: 0,
                      jobType: state.jobType,
                      selectedState: state.selectedState,
                      selectedCity: state.selectedCity,
                    };
                  });
                }}
                type="radio"
                id="price"
                name="wage"
                value="price"
              />
            </div>
          </div>
        </div>
        {filter.hourly != -1 && (
          <div className="my-4">
            <h3 className="text-sm">Hourly Wage</h3>
            <input
              disabled={filter.hourly == -1}
              type="number"
              onChange={(e) => {
                setFilter((state: filterType) => {
                  return {
                    hourly: Number(e.target.value),
                    price: state.price,

                    selectedCity: state.selectedCity,
                    selectedState: state.selectedState,
                    jobType: state.jobType,
                  };
                });
              }}
              min={0}
              className="mt-2 border w-full p-1"
              name=""
              id=""
            />
          </div>
        )}
        {filter.price != -1 && (
          <div className="my-4">
            <h3 className="text-sm">Price</h3>
            <input
              disabled={filter.price == -1}
              type="number"
              onChange={(e) => {
                setFilter((state: filterType) => {
                  return {
                    hourly: state.hourly,
                    price: Number(e.target.value),
                    selectedCity: state.selectedCity,
                    selectedState: state.selectedState,
                    jobType: state.jobType,
                  };
                });
              }}
              min={0}
              className="mt-2 border w-full p-1"
              name=""
              id=""
            />
          </div>
        )}
        <div className="flex justify-center">
          <button
            onClick={() => {
              setFilter({
                hourly: 0,
                jobType: { random: true },
                price: -1,
                selectedCity: "",
                selectedState: "",
              });
            }}
            className="px-4 mx-1 py-1 my-4 bg-green-900 text-white rounded-md"
          >
            Reset
          </button>
        </div>
      </div>
      <button
        className="md:hidden m-3 text-3xl absolute text-dark rounded-full left-0"
        onClick={() => {
          setSideBarVisible(true);
        }}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      {sideBarVisible && (
        <div className="w-[100vw] flex justify-center flex-col items-center absolute left-0 bg-white h-[92.5svh]">
          {/* mobile sidebar */}
          <button
            className="m-3 absolute text-2xl text-dark rounded-full right-0 top-0"
            onClick={() => {
              setSideBarVisible(false);
            }}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
          <div className="flex w-[100%] md:hidden items-center justify-center flex-col">
            <label className="text-xl" htmlFor="jobs">
              Job Type
            </label>
            <select
              onChange={(e) => {
                setFilter((state: filterType) => {
                  return {
                    hourly: state.hourly,
                    price: state.price,
                    selectedCity: state.selectedCity,
                    selectedState: state.selectedState,
                    jobType: { [e.target.value]: true },
                  };
                });
              }}
              className="shadow p-3 w-[70%] appearance-none border"
              name="jobs"
              id="jobs"
            >
              <option value="default" disabled selected>
                {" "}
                {Object.keys(filter.jobType)[0]
                  ? Object.keys(filter.jobType)[0] == "cleaning"
                    ? "Cleaning"
                    : Object.keys(filter.jobType)[0] == "plumbering"
                    ? "Plumbering"
                    : Object.keys(filter.jobType)[0] == "cuttingGrass"
                    ? "Cutting Grass"
                    : Object.keys(filter.jobType)[0] == "movingHeavyObjects"
                    ? "Moving Heavy Objects"
                    : Object.keys(filter.jobType)[0] == "walkingTheDog"
                    ? "Walking The Dog"
                    : "Select"
                  : "Select"}{" "}
              </option>
              <option value="cuttingGrass">Cutting Grass</option>
              <option value="cleaning">Cleaning</option>
              <option value="plumbering">Plumbering</option>
              <option value="movingHeavyObjects">Moving Heavy Objects</option>
              <option value="walkingTheDog">Walking The Dog</option>
            </select>
            <div className="w-[70%]">
              {states.length != 0 ? (
                <div className="my-3">
                  <label className="text-lg" htmlFor="types">
                    Choose your state
                  </label>
                  <select
                    onChange={(e) => {
                      setCities([]);
                      setFilter((state: filterType) => {
                        return {
                          hourly: state.hourly,
                          price: state.price,
                          selectedCity: state.selectedCity,
                          selectedState: e.target.value,
                          jobType: state.jobType,
                        };
                      });
                    }}
                    className="shadow break-words w-[100%] p-3 appearance-none border"
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
                      {filter.selectedState != ""
                        ? filter.selectedState
                        : "Select"}
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
                          hourly: state.hourly,
                          price: state.price,

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
                      {filter.selectedCity != ""
                        ? filter.selectedCity
                        : "Select"}
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

            <div className="flex justify-center items-center flex-col">
              <h3 className="my-3 font-semibold text-xl">Wage Type:</h3>
              <label className="my-2 text-xl" htmlFor="hourly">
                {" "}
                Hourly Wage
              </label>
              <input
                checked={hourlyChecked}
                onChange={() => {
                  setPriceChecked(false);
                  setHourlyChecked(true);
                  setFilter((state: filterType) => {
                    return {
                      hourly: 0,
                      price: -1,
                      jobType: state.jobType,
                      selectedState: state.selectedState,
                      selectedCity: state.selectedCity,
                    };
                  });
                }}
                type="radio"
                id="hourly"
                name="wage"
                value="hourly"
              />
              <label className="my-2 text-xl" htmlFor="price">
                {" "}
                Price
              </label>
              <input
                checked={priceChecked}
                onChange={() => {
                  setHourlyChecked(false);
                  setPriceChecked(true);
                  setFilter((state: filterType) => {
                    return {
                      hourly: -1,
                      price: 0,
                      jobType: state.jobType,
                      selectedState: state.selectedState,
                      selectedCity: state.selectedCity,
                    };
                  });
                }}
                type="radio"
                id="price"
                name="wage"
                value="price"
              />
              {filter.hourly != -1 && (
                <>
                  <h3 className="text-lg mt-4">Hourly Wage</h3>
                  <input
                    disabled={filter.hourly == -1}
                    type="number"
                    onChange={(e) => {
                      setFilter((state: filterType) => {
                        return {
                          hourly: Number(e.target.value),
                          price: state.price,

                          selectedCity: state.selectedCity,
                          selectedState: state.selectedState,
                          jobType: state.jobType,
                        };
                      });
                    }}
                    min={0}
                    className="mt-2 p-1 border-2"
                    name=""
                    id=""
                  />
                </>
              )}
              {filter.price != -1 && (
                <>
                  <h3 className="text-lg mt-4">Price</h3>
                  <input
                    disabled={filter.price == -1}
                    type="number"
                    onChange={(e) => {
                      setFilter((state: filterType) => {
                        return {
                          hourly: state.hourly,
                          price: Number(e.target.value),
                          selectedCity: state.selectedCity,
                          selectedState: state.selectedState,
                          jobType: state.jobType,
                        };
                      });
                    }}
                    min={0}
                    className="mt-2 border-2 p-1"
                    name=""
                    id=""
                  />
                </>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => {
                window.location.replace("/posts");
              }}
              className="px-4 mx-1 py-1 my-4 bg-green-900 text-white rounded-md"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSideBar;
