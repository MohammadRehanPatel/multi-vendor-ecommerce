import React from "react";
import OrderTable from "./OrderTable";

const Orders = () => {
  return (
    <div>
      <h1 className="font-bold mb-5 text-xl text-primary-color ">All Orders</h1>
      <OrderTable />
    </div>
  );
};

export default Orders;
