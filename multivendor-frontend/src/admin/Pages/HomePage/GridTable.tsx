import React from "react";
import HomeCategoryTable from "./HomeCategoryTable";
import { useAppSelecter } from "../../../State/Store";

const GridTable = () => {
  const { customer } = useAppSelecter((store) => store);
  return (
    <div>
      <HomeCategoryTable data={customer.homePageData?.grid || []} />
    </div>
  );
};

export default GridTable;
