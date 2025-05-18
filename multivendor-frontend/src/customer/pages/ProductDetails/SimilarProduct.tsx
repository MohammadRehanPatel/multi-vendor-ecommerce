import React from "react";
import SimilarProductCard from "./SimilarProductCard";

const SimilarProduct = () => {
  return (
    <div className="mt-10">
      <h2 className="font-bold text-3xl text-primary-color">
        Similar Products
      </h2>
      <div className="py-8 grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 justify-between gap-36  gap-y-8">
        {[1, 1, 1, 1, 1].map((item, index) => (
          <SimilarProductCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default SimilarProduct;
