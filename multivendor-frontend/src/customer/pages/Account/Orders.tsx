import React, { useEffect } from "react";
import { store, useAppDispatch, useAppSelecter } from "../../../State/Store";
import { fetchUserOrderHistory } from "../../../State/customer/orderSlice";
import OrderItemCard from "./OrderItemCard";

const Orders = () => {
  const dispatch = useAppDispatch();
  const { order } = useAppSelecter((store) => store);

  useEffect(() => {
    dispatch(fetchUserOrderHistory(localStorage.getItem("jwt") || ""));
  }, []);

  return (
    <div className="text-sm min-h-screen">
      <div className="pb-5">
        <h1 className="font-semibold text-lg">All Orders</h1>
        <p>from anytime</p>
      </div>
      <div className="space-y-2">
        {order.orders.map((order, index) =>
          order.orderItems.map((item, index) => (
            <OrderItemCard order={order} key={index} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
