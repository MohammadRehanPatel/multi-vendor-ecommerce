import { CheckCircle, FiberManualRecord } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

const steps = [
  {
    name: "Order Placed",
    description: "on Thu, 11 Jul",
    value: "PLACED",
  },
  {
    name: "Packed",
    description: "Item Packed in Dispatch Warehouse",
    value: "CONFIRMED",
  },
  {
    name: "Shipped",
    description: "by Mon, 15 Jul",
    value: "SHIPPED",
  },
  {
    name: "Arriving",
    description: "by Thu, 18 Jul",
    value: "ARRIVING",
  },
  {
    name: "Arrived",
    description: "by Fri, 19 Jul",
    value: "DELIVERED",
  },
];

const canceledStep = [
  {
    name: "Order Placed",
    description: "on Thu, 11 Jul",
    value: "PLACED",
  },
  {
    name: "Order Canceled",
    description: "on Thu, 11 Jul",
    value: "CANCELLED",
  },
];
const currentStep = 2;

const OrderStepper = ({ orderStatus }: any) => {
  const [statusStep, setStatusStep] = useState(steps);

  useEffect(() => {
    if (orderStatus === "CANCELLED") {
      setStatusStep(canceledStep);
    } else {
      setStatusStep(steps);
    }
  }, [orderStatus]);

  return (
    <Box className=" my-10">
      {statusStep.map((step, index) => (
        <>
          <div key={index} className={`flex px-4`}>
            <div className="flex flex-col items-center">
              <Box
                sx={{ zIndex: -1 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                  index <= currentStep
                    ? "bg-gray-200 text-primary-color   "
                    : "bg-gray-300 text-gray-500"
                } `}
              >
                {step.value === orderStatus ? (
                  <CheckCircle />
                ) : (
                  <FiberManualRecord sx={{ zIndex: -1 }} />
                )}
              </Box>
              {index < statusStep.length - 1 && (
                <div
                  className={`border h-20 w-[2px] ${
                    index < currentStep
                      ? "bg-primary-color"
                      : "bg-gray-300 text-gray-600"
                  } `}
                ></div>
              )}
            </div>
            <div className="ml-2 w-full">
              <div
                className={`${
                  step.value === orderStatus
                    ? "bg-primary-color p-2 text-white font-medium rounded-md -translate-y-3"
                    : ""
                }  ${
                  orderStatus === "CANCELLED" && step.value === orderStatus
                    ? "bg-red-500"
                    : ""
                } w-full`}
              >
                <p className={``}>{step.name}</p>
                <p
                  className={`  ${
                    step.value === orderStatus
                      ? "text-gray-200"
                      : "text-gray-400"
                  } text-xs `}
                >
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        </>
      ))}
    </Box>
  );
};

export default OrderStepper;
