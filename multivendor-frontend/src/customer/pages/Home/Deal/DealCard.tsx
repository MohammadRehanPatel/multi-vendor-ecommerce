import React from "react";
import { Deal } from "../../../../types/DealTypes";

const DealCard = ({ item }: { item: Deal }) => {
  console.log("Deal Data ", item);
  return (
    <div className="w-[14rem] cursor-pointer transition-transform duration-300 hover:shadow-md hover:scale-105">
      <div className="relative overflow-hidden rounded-2xl shadow-lg border-4 border-transparent bg-gradient-to-b from-gray-900 to-gray-800">
        <img
          className="w-full h-[13rem] object-cover rounded-t-2xl"
          src={item.category.image}
          alt="Smart Watch"
        />

        <div className="absolute top-2 left-1 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
          Limited Offer
        </div>

        <div className="p-4 text-center text-white">
          <p className="text-lg font-bold ">{item.category.name}</p>
          <p className="text-3xl font-extrabold text-yellow-400">
            {item.discount}% OFF
          </p>
          <button className="mt-2 px-4 py-2 bg-primary-color hover:scale-105 rounded-lg font-semibold text-white transition">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealCard;
