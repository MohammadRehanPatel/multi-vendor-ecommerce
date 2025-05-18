import React from "react";
import HomeCategoryTable from "./HomeCategoryTable";
import { useAppSelecter } from "../../../State/Store";

const ElectronicTable = () => {
  const { customer } = useAppSelecter((store) => store);
  return (
    <div>
      <HomeCategoryTable
        data={customer.homePageData?.electronicsCategories || []}
      />
    </div>
  );
};

export default ElectronicTable;
