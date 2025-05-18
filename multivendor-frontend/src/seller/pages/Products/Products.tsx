import React from "react";
import ProductTable from "./ProductTable";

const Products = () => {
  return (
    <div>
      <h1 className="font-bold text-xl text-primary-color mb-5">
        All Products
      </h1>
      <ProductTable />
    </div>
  );
};

export default Products;
