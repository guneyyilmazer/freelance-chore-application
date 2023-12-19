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
          className="flex flex-col m-1 bg-slate-600 w-24 h-15"
        >
          <img src={item.icon} />
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
