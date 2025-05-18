import { Box, Button, Divider } from "@mui/material";
import React, { useEffect } from "react";
import test from "../../../assets/vendora-removebg-preview.png";
import { useNavigate, useParams } from "react-router-dom";
import OrderStepper from "./OrderStepper";
import { Payment, Payments } from "@mui/icons-material";
import { useAppDispatch, useAppSelecter } from "../../../State/Store";
import {
  fetchOrderById,
  fetchOrderItemById,
} from "../../../State/customer/orderSlice";

const OrderDetail = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { order } = useAppSelecter((store) => store);
  const { orderId, orderItemId } = useParams();

  useEffect(() => {
    dispatch(
      fetchOrderById({
        orderId: Number(orderId),
        jwt: localStorage.getItem("jwt") || "",
      })
    );
    dispatch(
      fetchOrderItemById({
        orderItemId: Number(orderItemId),
        jwt: localStorage.getItem("jwt") || "",
      })
    );
  }, []);

  return (
    <Box className="space-y-3">
      <section className="flex flex-col gap-5 justify-center items-center">
        <img
          className="w-[100px]"
          src={order.orderItem?.product.images[0]}
          alt=""
        />
        <div className="text-sm text-center space-y-1">
          <h1 className="font-bold">
            {order.orderItem?.product.seller?.businessDetails.businessName}
          </h1>
          <p>{order.orderItem?.product.title}</p>
          <p>
            {" "}
            <strong>Size: </strong>M{" "}
          </p>
        </div>
        <div className="">
          <Button
            variant="contained"
            onClick={() => navigate(`/review/${5}/create`)}
          >
            Write Review
          </Button>
        </div>
      </section>
      <section className="border p-5">
        <OrderStepper orderStatus={"CONFIRMED"} />
      </section>
      <div className="border p-5">
        <h1 className="text-lg font-bold pb-3">Delivery Address</h1>
        <div className="text-sm space-y-2">
          <div className="flex gap-5 font-medium">
            <p>{order.currentOrder?.shippingAddress.name}</p>
            <Divider flexItem orientation="vertical" />
            <p>{order.currentOrder?.shippingAddress.mobile}</p>
          </div>
          <p>
            {order.currentOrder?.shippingAddress.address},{" "}
            {order.currentOrder?.shippingAddress.state},{" "}
            {order.currentOrder?.shippingAddress.city}
            {" - "}
            {order.currentOrder?.shippingAddress.pinCode}
          </p>
        </div>
      </div>
      <div className="border space-y-4">
        <div className="flex justify-between text-sm pt-5 px-5">
          <div className="space-y-1">
            <p className="font-bold">Total Item Price</p>
            <p>
              You saved{" "}
              <span className="text-green-500 font-medium text-xs">
                ₹ {100}
              </span>{" "}
              on this item
            </p>
          </div>
          <p className="font-medium">₹ {order.orderItem?.sellingPrice}.00</p>
        </div>
        <div className="px-5">
          <div className="bg-teal-50 px-5 py-2 text-xs font-medium flex items-center gap-3">
            <Payments />
            <p>Pay On Delivery</p>
          </div>
        </div>
        <Divider />
        <div className="px-5 pb-5">
          <p className="text-xs ">
            <strong>Sold by : </strong>
            {order.orderItem?.product.seller?.businessDetails.businessName}
          </p>
        </div>
        <div className="p-10">
          <Button
            disabled={false}
            // onClick={handleCancelOrder}

            color="error"
            fullWidth
            variant="outlined"
            sx={{ py: "0.7rem" }}
          >
            {false ? "Order Cancelled" : "Cancel Order"}
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default OrderDetail;
