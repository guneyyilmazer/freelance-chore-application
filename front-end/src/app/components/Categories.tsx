import Link from "next/link";
import React from "react";

const Categories = () => {
  const categories = [
    { name: "Cleaning", icon: "", type: "cleaning" },
    { name: "Cutting Grass", icon: "", type: "cuttingGrass" },
    { name: "Plumbering", icon: "", type: "plumbering" },
    { name: "Moving Heavy Objects", icon: "", type: "movingHeavyObjects" },
    { name: "Walking The Dog", icon: "", type: "walkingTheDog" },
  ];
  return (
    <div className="flex">
      {categories.map((item) => (
        <Link
          href={`posts/?type=${item.type}`}
          className="flex flex-col justify-center items-center text-center text-sm p-2 m-1 bg-green-800 rounded-lg text-white w-24 h-15"
        >
          <img src={item.icon} />
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
