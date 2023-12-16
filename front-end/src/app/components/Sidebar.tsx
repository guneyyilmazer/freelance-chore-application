import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div className="shadow h-[40vh]">
      <div className="py-10">
        <h2 className="text-lg text-center ">Job Types</h2>
        <ul className="flex flex-col text-sm p-5 h-[30vh] justify-between">
          <Link
            onClick={() => window.location.reload()}
            href={"/posts/?type=cleaning"}
          >
            Cleaning
          </Link>
          <Link
            onClick={() => window.location.reload()}
            href={"/posts/?type=cuttingGrass"}
          >
            Cutting Grass
          </Link>
          <Link
            onClick={() => window.location.reload()}
            href={"/posts/?type=movingHeavyObjects"}
          >
            Moving Heavy Objects
          </Link>
          <Link
            onClick={() => window.location.reload()}
            href={"/posts/?type=walkingTheDog"}
          >
            Walking The Dog
          </Link>
          <Link
            onClick={() => window.location.reload()}
            href={"/posts/?type=plumbering"}
          >
            Plumbering
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
