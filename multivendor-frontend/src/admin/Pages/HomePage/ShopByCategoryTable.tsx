import React from "react";
import HomeCategoryTable from "./HomeCategoryTable";
import { useAppSelecter } from "../../../State/Store";

const ShopByCategoryTable = () => {
  const { customer } = useAppSelecter((store) => store);
  return (
    <div>
      <HomeCategoryTable data={customer.homePageData?.shopByCategories || []} />
    </div>
  );
};

export default ShopByCategoryTable;
