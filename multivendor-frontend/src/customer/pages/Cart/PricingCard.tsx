import { Button, Divider } from "@mui/material";
import React from "react";
import { useAppSelecter } from "../../../State/Store";

const PricingCard = () => {
  const { cart } = useAppSelecter((store) => store);

  return (
    <div className="  p-4 w-full  max-lg:max-w-xl max-lg:mx-auto">
      <div className="flex items-center justify-between w-full mb-6">
        <p className="font-normal text-md leading-4 text-gray-600">Sub Total</p>
        <h6 className="font-semibold text-sm leading-4 text-gray-900">
          ₹{cart.cart?.totalMrpPrice}
        </h6>
      </div>
      <div className="flex items-center justify-between w-full pb-6  ">
        <p className="font-normal text-md leading-4 text-gray-600">Discount</p>
        <h6 className="font-semibold text-sm leading-4 ">
          ₹{cart.cart?.discount}
        </h6>
      </div>
      <div className="flex items-center justify-between w-full pb-6  ">
        <p className="font-normal text-md leading-4 text-gray-600">Shipping</p>
        <h6 className="font-semibold text-sm leading-4 ">₹75.00</h6>
      </div>
      <div className="flex items-center justify-between w-full pb-6  ">
        <p className="font-normal text-md leading-4 text-gray-600">
          Platform Fee
        </p>
        <h6 className="font-semibold text-sm leading-4 text-green-400">Free</h6>
      </div>
      <Divider />
      <div className="flex items-center justify-between w-full py-3">
        <p className="font-manrope font-medium text-xl leading-9 text-gray-900">
          Total
        </p>
        <h6 className="font-manrope font-medium text-xl leading-4 text-primary-color">
          ₹{cart.cart?.totalSellingPrice}
        </h6>
      </div>
      {/* <div className="text-center">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ py: "10px" }}
        >
          BUY NOW
        </Button>
      </div> */}
    </div>
  );
};

export default PricingCard;
