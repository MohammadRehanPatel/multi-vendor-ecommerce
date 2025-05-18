import React from "react";
import ShopByCategoryCard from "./ShopByCategoryCard";
import { useAppSelecter } from "../../../../State/Store";

const ShopByCategory = () => {
  const { customer } = useAppSelecter((store) => store);
  return (
    <div className="flex flex-wrap justify-between gap-7 lg:px-20">
      {customer.homePageData?.shopByCategories.map((item, index) => (
        <ShopByCategoryCard key={index} item={item} />
      ))}
    </div>
  );
};

export default ShopByCategory;
