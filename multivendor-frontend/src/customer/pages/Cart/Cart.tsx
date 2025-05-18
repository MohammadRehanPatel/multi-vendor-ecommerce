import React, { useEffect, useState } from "react";
import CartItem from "./CartItemCard";
import { Close, Favorite, LocalOffer } from "@mui/icons-material";
import { Button, IconButton, Input, TextField } from "@mui/material";
import PricingCard from "./PricingCard";
import { useNavigate } from "react-router-dom";
import Checkout from "../Checkout/Checkout";
import { store, useAppDispatch, useAppSelecter } from "../../../State/Store";
import { fetchUserCart } from "../../../State/customer/cartSlice";
import CartItemCard from "./CartItemCard";
import { applyCoupon } from "../../../State/customer/couponSlice";

const Cart = () => {
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelecter((store) => store);
  const handleChange = (e: any) => {
    setCouponCode(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchUserCart(localStorage.getItem("jwt") || ""));
  }, [couponApplied]);

  const handleApplyCoupon = (data: any, applied: boolean) => {
    dispatch(applyCoupon(data));
    setCouponApplied(true);
  };

  return (
    <div className="pt-10 px-5 sm:px-10 md:px-60 min-h-screen ">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 ">
        <div className="cartItem lg:col-span-2 space-y-3">
          {cart.cart?.cartItems.map((item, index) => (
            <CartItemCard key={index} item={item} />
          ))}{" "}
        </div>
        <div className="price col-span-1 text-sm space-y-3">
          <div className="border rounded-md p-4">
            <div className="flex gap-3 items-center">
              <LocalOffer color="primary" />
              <h2 className="text-xl text-primary-color">Apply Coupon</h2>
            </div>
            {!couponApplied ? (
              <div className="flex items-center justify-between mt-4">
                <TextField
                  onChange={handleChange}
                  size="small"
                  variant="outlined"
                  className="border    border-gray-300 px-3 py-2  rounded-md"
                  placeholder="Coupon Code"
                  value={couponCode}
                />
                <Button
                  onClick={() =>
                    handleApplyCoupon(
                      {
                        apply: "true",
                        code: couponCode,
                        orderValue: cart.cart?.totalSellingPrice || 0,
                        jwt: localStorage.getItem("jwt") || "",
                      },
                      true
                    )
                  }
                  size="small"
                  className=" ml-2"
                  color="primary"
                >
                  Apply
                </Button>
              </div>
            ) : (
              <div className="flex items-center  mt-3">
                <div className="p-1 pl-5 pr-3 border rounded-md flex items-center  gap-4">
                  <span className="">{couponCode}Applied</span>
                  <IconButton
                    size="small"
                    onClick={() =>
                      handleApplyCoupon(
                        {
                          apply: "",
                          code: couponCode,
                          jwt: localStorage.getItem("jwt") || "",
                        },
                        false
                      )
                    }
                  >
                    <Close className="text-red-600" />
                  </IconButton>
                </div>
              </div>
            )}
          </div>
          <div className="border rounded-md">
            <PricingCard />
            <div className="p-5">
              <Button
                onClick={() => navigate("/checkout")}
                fullWidth
                variant="contained"
                sx={{ py: "11px" }}
              >
                Buy now
              </Button>
            </div>
          </div>
          <div className="wishlist border flex items-center justify-center">
            <Button
              endIcon={<Favorite color="primary" />}
              color="primary"
              className="hover:bg-primary-color hover:text-white"
            >
              Add From WishList
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
