import "../css/SearchBar.css";
import { useEffect } from "react";
import { user } from "../types/AllTypes";
import DefaultProfilePicture from "../images/default.jpeg";

const SearchBarResults = ({
  users,
  show,
  setShow,
  userNotFound,
}: {
  users: user[];

  show: boolean;
  setShow: any;
  userNotFound: boolean;
}) => {
  useEffect(() => setShow(false), [location]);
  return show ? (
    <div className="bg-gray-800 text-white">
      {!userNotFound ? (
        users.map((item, index) => (
          <div
            key={index}
            className=" results flex py-3 ps-2 items-center no-underline"
            onClick={() => {
              window.location.replace(`users/${item._id}`);
            }}
          >
            <img
              style={{ height: "40px", width: "40px" }}
              className="rounded-md"
              src={
                item.profilePicture
                  ? item.profilePicture
                  : DefaultProfilePicture.src
              }
            />
            <span className="ms-2 text-white no-underline">
              {item.username}
            </span>
          </div>
        ))
      ) : (
        <div className="text-center py-2">No results.</div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default SearchBarResults;
