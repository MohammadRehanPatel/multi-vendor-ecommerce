import React from "react";
import ElectricCategoryCard from "./ElectricCategoryCard";
import { useAppSelecter } from "../../../../State/Store";

const ElectricCategory = () => {
  const { customer } = useAppSelecter((store) => store);
  return (
    <div className="flex flex-wrap justify-between py-5 lg:px-20 border-b">
      {customer.homePageData?.electricCategories
        .slice(0, 7)
        .map((item, index) => (
          <ElectricCategoryCard key={index} item={item} />
        ))}
    </div>
  );
};

export default ElectricCategory;
