import React from "react";
import HomeCategoryTable from "./HomeCategoryTable";
import { useFormik } from "formik";
import { useAppSelecter } from "../../../State/Store";

const DealCategoryTable = () => {
  const { customer } = useAppSelecter((store) => store);
  return (
    <div>
      <HomeCategoryTable data={customer.homePageData?.dealCategories || []} />
    </div>
  );
};

export default DealCategoryTable;
