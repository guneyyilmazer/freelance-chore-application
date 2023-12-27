import React from "react";
import Categories from "./Categories";

const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <span className="text-5xl">What do you need help with?</span>
      <div className="my-5 text text-4xl">
        <input
          className="appearance-none rounded text-center py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          placeholder="Search..."
          type="text"
        />
        <button className="bg-green-600 text-white p-2 px-4 rounded-lg">S</button>
      </div>
      <div className="my-10">

<h3 className="text-xl">Browse Categories</h3>
      <Categories/>
      </div>
    </div>
  );
};

export default Hero;
