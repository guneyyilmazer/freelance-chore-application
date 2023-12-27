import "../css/SearchBar.css";
import { useEffect } from "react";
import { user } from "../types";
import DefaultProfilePicture from "../images/default.jpeg";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  useEffect(() => setShow(false), [router]);
  return show ? (
    <div className="bg-gray-800 text-white">
      {!userNotFound ? (
        users.map((item, index) => (
          <Link
            key={index}
            href={`/user/?id=${item._id}`}
            className=" results flex py-3 ps-2 items-center no-underline"
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
          </Link>
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
