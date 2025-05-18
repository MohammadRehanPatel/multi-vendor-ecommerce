import { ElectricBolt } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";
import test from "../../../assets/vendora-removebg-preview.png";
import { Order, OrderItem } from "../../../types/OrderTypes";
import { useNavigate } from "react-router-dom";

const OrderItemCard = ({ item, order }: { item: OrderItem; order: Order }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/account/orders/${order.id}/${item.id}`)}
      className="text-sm bg-white p-5 space-y-4 border rounded-md cursor-pointer"
    >
      <div className="flex items-center gap-5">
        <div className="">
          <Avatar sizes="small" sx={{ bgcolor: "#37474f" }} color="primary">
            <ElectricBolt />
          </Avatar>
        </div>
        <div className="">
          <h1 className="font-bold text-primary-color">PENDING</h1>
          <p>Arriving By {order.deliveryDate}</p>
        </div>
      </div>
      <div className="p-5 flex gap-3 bg-teal-50">
        <div className="">
          <img className="w-[70px]" src={item.product.images[0]} alt="" />
        </div>
        <div className="w-full space-y-2">
          <h1 className="font-bold">
            {item.product.seller?.businessDetails.businessName}
          </h1>
          <p>{item.product.title}</p>
          <p>
            <strong>Size: </strong>
            Free
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
