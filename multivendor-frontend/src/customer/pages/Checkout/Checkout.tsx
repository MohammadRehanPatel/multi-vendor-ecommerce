import React, { useState } from "react";
import AddressCard from "./AddressCard";
import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import AddressForm from "./AddressForm";
import PricingCard from "../Cart/PricingCard";
import { useAppDispatch, useAppSelecter } from "../../../State/Store";
import { createOrder } from "../../../State/customer/orderSlice";

const Checkout = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useAppDispatch();
  const [paymentGateway, setPaymentGateway] = useState("RAZORPAY");
  const [selectedAddress, setSelectedAddress] = useState();
  const { auth } = useAppSelecter((store) => store);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const paymentGatewayList = [
    {
      value: "RAZORPAY",
      img: "https://razorpay.com/newsroom-content/uploads/2020/12/output-onlinepngtools-1-1.png",
    },
    {
      value: "STRIPE",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png",
    },
  ];
  const handleCheckOut = () => {
    if (!selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }
    dispatch(
      createOrder({
        address: selectedAddress,
        jwt: localStorage.getItem("jwt") || "",
        paymentGateway: paymentGateway,
      })
    );
  };
  console.log("address ", auth.user?.addresses);
  const handlePaymentChange = (e: any) => {
    setPaymentGateway(e.target.value);
  };
  return (
    <>
      <div className="pt-10 px-5 sm:px-10 md:px-60 min-h-screen ">
        <div className="grid lg:space-y-0 lg:grid-cols-3 gap-5 ">
          <div className="address lg:col-span-2 space-y-5">
            <div className="flex justify-between items-center   ">
              <h1 className="text-xl font-semibold">Select Delivery Address</h1>
              <Button onClick={handleOpen} color="primary" variant="outlined">
                Add New Address
              </Button>
            </div>
            <div className="font-normal text-sm space-y-5"></div>
            <p className=" pt-4">Saved Address</p>
            <div className="">
              {auth?.user?.addresses?.map((item: any, index) => (
                <div className="space-y-3" key={index}>
                  <AddressCard
                    item={item}
                    isSelected={selectedAddress === item}
                    onSelect={() => setSelectedAddress(item)}
                  />
                </div>
              ))}
            </div>
            <div className=" mt-2">
              <Button
                color="primary"
                variant="outlined"
                fullWidth
                startIcon={<Add />}
                className="px-2 py-3 "
                sx={{ py: "10px" }}
                onClick={handleOpen}
              >
                Add New Address
              </Button>
            </div>
          </div>
          <div className="">
            <div className="space-y-3 border p-5 pr-0 rounded-md">
              <h1 className="text-lg pb-4   text-center text-primary-color">
                Choose Payment Gateway
              </h1>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                className="flex justify-between   pr-0"
                onChange={handlePaymentChange}
                value={paymentGateway}
              >
                {paymentGatewayList.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    className="w-[45%] border pr-2 rounded-md flex  justify-center"
                    value={item.value}
                    control={<Radio onChange={(e) => e.target.value} />}
                    label={
                      <img
                        className={`${
                          item.value == "stripe" ? "w-14" : ""
                        } object-cover`}
                        src={item.img}
                        alt={item.value}
                      />
                    }
                  />
                ))}
              </RadioGroup>
            </div>
            <div className="border rounded-md"></div>
            <PricingCard />
            <div className="p-5">
              <Button
                fullWidth
                variant="contained"
                sx={{ py: "11px" }}
                onClick={handleCheckOut}
              >
                CheckOut
              </Button>
            </div>
          </div>
        </div>
      </div>
      <React.Fragment>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={() => handleClose}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={style}>
            <AddressForm paymentGateway={paymentGateway} />
          </Box>
        </Modal>
      </React.Fragment>
    </>
  );
};

export default Checkout;
