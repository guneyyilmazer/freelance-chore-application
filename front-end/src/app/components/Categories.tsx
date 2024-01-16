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
    <div className="flex flex-wrap flex-col md:flex-row">
      {categories.map((item) => (
        <Link
          href={`posts/?type=${item.type}`}
          className="flex flex-col justify-center items-center text-center text-xl md:text-sm p-10 md:p-5 m-1 bg-green-800 rounded-lg text-white "
        >
          <img src={item.icon} />
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
