import { Add, Close, Remove } from "@mui/icons-material";
import { Button, Divider, IconButton } from "@mui/material";
import React, { useState } from "react";
import { CartItem } from "../../../types/CartTypes";
import { useAppDispatch } from "../../../State/Store";
import { updateCartItem } from "../../../State/customer/cartSlice";

const CartItemCard = ({ item }: { item: CartItem }) => {
  // const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const handleUpdateQuantity = (value: number) => () => {
    //update qty
    dispatch(
      updateCartItem({
        jwt: localStorage.getItem("jwt") || null,
        cartItemId: item.id,
        cartItem: { quantity: item.quantity + value },
      })
    );
  };

  return (
    <div className="border rounded-md relative">
      <div className="p-5 flex gap-3">
        <div className="">
          <img
            className="w-[90px] rounded-lg"
            src={item.product.images[0]}
            alt=""
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">
            {item.product.seller?.businessDetails.businessName}
          </h2>
          <p className="text-gray-600 font-medium text-sm">
            {item.product.title}
          </p>
          <p className="text-gray-400 text-sm">
            <strong>Sold By:</strong> Company Name
          </p>
          <p className="text-sm">7 Days Replacement Available</p>
          <p className="text-sm text-gray-500">
            <strong>Quantity : </strong>
            {item.quantity}
          </p>
        </div>
      </div>
      <Divider />
      <div className="flex justify-between items-center">
        <div className="px-5 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2 w-[140px] justify-between">
            <Button
              className="border  py-1 px-2 rounded text-primary-color
                              hover:text-primary-color"
              //   onClick={() => setQuantity(quantity - 1)}
              onClick={handleUpdateQuantity(-1)}
              disabled={item.quantity == 1 ? true : false}
            >
              <Remove />
            </Button>
            <span
              //   onChange={(e: any) => setQuantity(e.target.value)}
              className="block w-[32px] px-3 py-2 rounded-md text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-primary-color [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            >
              {item.quantity}
            </span>
            <Button
              className="  py-1 px-2 rounded text-primary-color hover:text-primary-color border"
              //   onClick={() => setQuantity(quantity + 1)}
              onClick={handleUpdateQuantity(1)}
            >
              <Add />
            </Button>
          </div>
        </div>
        <div className="pr-5">
          <p className="text-s font-medium text-gray-700">
            Price: ₹{item.sellingPrice}
          </p>
        </div>
      </div>
      <div className="absolute top-1 right-1">
        <IconButton>
          <Close color="primary" />
        </IconButton>
      </div>
    </div>
  );
};

export default CartItemCard;
