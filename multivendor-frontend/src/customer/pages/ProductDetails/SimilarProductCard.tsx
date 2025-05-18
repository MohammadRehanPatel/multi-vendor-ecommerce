import React from "react";
// import "../Product/ProductCard.css";

const SimilarProductCard = () => {
  return (
    // <div className="px-4 mx-3">
    //   <div className="group px-4 relative">
    //     <div className="card relative">
    //       <img
    //         className=" hover:shadow-md hover:scale-105  card-media w-full h-full object-top object-cover  transition ease-in-out duration-300"
    //         src={
    //           "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRH-qcwimCK94IiTJn2hLX9qFB6mbaI93aZdbt5iCCnTg-zi32YSNWxZZu9oIKjwDPwrwk3wZXMxRO1YK994mNoaS1eOdPpmg_4povgtkI"
    //         }
    //         alt=""
    //       />
    //     </div>

    //     <div className="details py-4 pt-3 w-full space-y-1 group-hover-effect translate-y-1 rounded-md">
    //       <div className="name">
    //         <h1 className="text-primary-color font-bold">Unstd</h1>
    //         <p className="text-gray-500 font-semibold">Blue T Shirt</p>
    //       </div>
    //       <div className="price flex items-center  gap-3">
    //         <span className="font-semibold text-primary-color ">₹ 400 </span>
    //         <span className="thin-line-through line-through  text-gray-400">
    //           ₹ 999{" "}
    //         </span>
    //         <span className="text-primary-color font-semibold">30%</span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="group  relative">
      <div className="card  flex justify-between gap-8 items-center">
        <img
          className=" hover:scale-105  card-media w-full h-full object-top object-cover  transition ease-in-out duration-300"
          src={
            "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRH-qcwimCK94IiTJn2hLX9qFB6mbaI93aZdbt5iCCnTg-zi32YSNWxZZu9oIKjwDPwrwk3wZXMxRO1YK994mNoaS1eOdPpmg_4povgtkI"
          }
          alt=""
        />
      </div>

      <div className="details pt-3 space-y-1 group-hover-effect w-[230px] rounded-md justify-between">
        <div className="">
          <h1>Unstd</h1>
          <p>Blue T Shirt</p>
        </div>
        <div className="price flex items-center gap-3">
          <span className="font-semibold text-gray-800">₹ 400 </span>
          <span className="thin-line-through  text-gray-400">₹ 999 </span>
          <span className="text-primary-color font-semibold">30%</span>
        </div>
      </div>
    </div>
  );
};

export default SimilarProductCard;
